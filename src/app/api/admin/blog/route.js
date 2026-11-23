import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";
import { sendMail, esc, layout } from "../../../../lib/mail";

const deny = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120);

function clean(b) {
  return {
    title: String(b.title || "").trim().slice(0, 250),
    slug: slugify(b.slug || b.title || ""),
    excerpt: b.excerpt ? String(b.excerpt).slice(0, 500) : null,
    content: String(b.content || ""),
    category: b.category ? String(b.category).slice(0, 100) : null,
    cover_url: b.cover_url ? String(b.cover_url).slice(0, 500) : null,
    author: b.author ? String(b.author).slice(0, 100) : "Credence Regulatory",
    featured: !!b.featured,
  };
}

async function notifyPublished(post) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/blog/${post.slug}`;
  try {
    await sendMail({
      to: (process.env.NOTIFY_EMAIL || "").split(","),
      subject: `Blog published: ${post.title}`,
      html: layout(`<h2>New blog published</h2><p><b>${esc(post.title)}</b></p><p><a href="${url}">${url}</a></p>`),
    });
  } catch (e) {
    console.error("Blog mail error:", e);
  }
}

function refresh(slug) {
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function GET(request) {
  if (!(await requireAdmin(request))) return deny();
  const id = new URL(request.url).searchParams.get("id");

  if (id) {
    const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
    if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post: data });
  }

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, category, published, published_at, created_at, updated_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("Admin blog error:", error);
    return NextResponse.json({ error: "Could not load" }, { status: 500 });
  }

  const withStats = await Promise.all(
    posts.map(async (p) => {
      const [v, e] = await Promise.all([
        supabase.from("page_views").select("*", { count: "exact", head: true }).eq("path", `/blog/${p.slug}`),
        supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("source_blog_slug", p.slug),
      ]);
      return { ...p, views: v.count || 0, enquiries: e.count || 0 };
    })
  );
  return NextResponse.json({ posts: withStats });
}

export async function POST(request) {
  if (!(await requireAdmin(request))) return deny();
  const body = await request.json();
  const post = clean(body);
  if (!post.title || !post.slug || !post.content) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  const published = !!body.published;
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({ ...post, published, published_at: published ? new Date().toISOString() : null })
    .select()
    .single();
  if (error) {
    if (error.code === "23505") return NextResponse.json({ error: "Slug exists" }, { status: 409 });
    console.error("Blog insert error:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
  refresh(data.slug);
  if (published) await notifyPublished(data);
  return NextResponse.json({ success: true, post: data });
}

export async function PATCH(request) {
  if (!(await requireAdmin(request))) return deny();
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  const post = clean(body);
  if (!post.title || !post.slug || !post.content) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { data: old } = await supabase
    .from("blog_posts").select("slug, published, published_at").eq("id", body.id).single();
  if (!old) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const published = !!body.published;
  const justPublished = published && !old.published;
  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      ...post,
      published,
      published_at: justPublished ? new Date().toISOString() : old.published_at,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id)
    .select()
    .single();
  if (error) {
    if (error.code === "23505") return NextResponse.json({ error: "Slug exists" }, { status: 409 });
    console.error("Blog update error:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
  refresh(old.slug);
  refresh(data.slug);
  if (justPublished) await notifyPublished(data);
  return NextResponse.json({ success: true, post: data });
}

export async function DELETE(request) {
  if (!(await requireAdmin(request))) return deny();
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  const { data: old } = await supabase.from("blog_posts").select("slug").eq("id", id).single();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not delete" }, { status: 500 });
  refresh(old?.slug);
  return NextResponse.json({ success: true });
}