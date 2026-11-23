import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import BlogContent from "../../../components/BlogContent";
import EnquiryForm from "../../../components/EnquiryForm";
import { allServices } from "../../../data/allServices";

export const revalidate = 300;
const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Services shown in the left sidebar. A service is included if its title contains any of these words.
const MAIN_SERVICE_KEYWORDS = ["lmpc", "epr", "wpc", "global", "international", "foreign"];
const mainServices = allServices.filter((s) =>
  MAIN_SERVICE_KEYWORDS.some((k) => s.title.toLowerCase().includes(k))
);
const sidebarServices = mainServices.length > 0 ? mainServices : allServices;

async function getPost(slug) {
  const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single();
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Credence Regulatory`,
    description: post.excerpt || undefined,
    openGraph: { title: post.title, description: post.excerpt || undefined, type: "article", ...(post.cover_url ? { images: [post.cover_url] } : {}) },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  let related = [];
  if (post.category) {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt")
      .eq("published", true)
      .eq("category", post.category)
      .neq("slug", slug)
      .order("published_at", { ascending: false })
      .limit(3);
    related = data || [];
  }

  const url = `${site}/blog/${post.slug}`;
  const words = post.content.split(/\s+/).length;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author || "Credence Regulatory" },
    publisher: { "@type": "Organization", name: "Credence Regulatory" },
    mainEntityOfPage: url,
    ...(post.cover_url ? { image: post.cover_url } : {}),
  };
  const enc = encodeURIComponent;
  const share = "rounded border border-gray-300 px-4 py-2 text-sm hover:bg-cream";

  return (
    <main>
      <article>
        <header className="bg-gradient-to-br from-navy to-navy-light text-white">
          <div className="mx-auto max-w-7xl px-6 py-14">
            {post.category && <p className="text-sm font-semibold uppercase tracking-widest text-gold">{post.category}</p>}
            <h1 className="mt-3 max-w-4xl font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-sm text-gray-300">
              {post.author} · {new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {Math.max(1, Math.round(words / 200))} min read
            </p>
          </div>
        </header>
<div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start">
  {/* Left: main services */}
  <aside className="order-3 w-full lg:order-1 lg:w-64 lg:shrink-0">
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-navy">Our Services</h2>
      <ul className="mt-4 space-y-1">
        {sidebarServices.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="block rounded px-3 py-2 text-sm text-gray-700 hover:bg-cream hover:text-navy">
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </aside>

  {/* Middle: blog */}
  <div className="order-1 min-w-0 w-full lg:order-2 lg:flex-1">
    {post.cover_url && <img src={post.cover_url} alt={post.title} className="mb-10 w-full rounded-xl object-cover shadow" />}
    <BlogContent content={post.content} />

    <div className="mt-12 flex flex-wrap items-center gap-3 border-t pt-6">
      <span className="text-sm font-semibold text-navy">Share:</span>
      <a className={share} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${enc(`${post.title} ${url}`)}`}>WhatsApp</a>
      <a className={share} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>LinkedIn</a>
      <a className={share} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(post.title)}`}>X</a>
    </div>
  </div>

  {/* Right: enquiry form */}
  <aside id="enquiry" className="order-2 w-full scroll-mt-24 lg:order-3 lg:w-80 lg:shrink-0">
    <div className="lg:sticky lg:top-24">
      <div className="rounded-xl bg-navy p-5 text-white">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold">Need help with this?</h2>
        <p className="mt-1 text-sm text-gray-300">Share your details and our experts will get back to you.</p>
      </div>
      <div className="mt-3">
        <EnquiryForm sourceBlogSlug={post.slug} />
      </div>
    </div>
  </aside>
</div>

          {/* Middle: blog */}
          <div className="order-1 min-w-0 lg:order-2">
            {post.cover_url && <img src={post.cover_url} alt={post.title} className="mb-10 w-full rounded-xl object-cover shadow" />}
            <BlogContent content={post.content} />

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t pt-6">
              <span className="text-sm font-semibold text-navy">Share:</span>
              <a className={share} target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${enc(`${post.title} ${url}`)}`}>WhatsApp</a>
              <a className={share} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>LinkedIn</a>
              <a className={share} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(post.title)}`}>X</a>
            </div>
          </div>

          {/* Right: enquiry form */}
          <aside id="enquiry" className="order-2 scroll-mt-24 lg:order-3">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl bg-navy p-5 text-white">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold">Need help with this?</h2>
                <p className="mt-1 text-sm text-gray-300">Share your details and our experts will get back to you.</p>
              </div>
              <div className="mt-3">
                <EnquiryForm sourceBlogSlug={post.slug} />
              </div>
            </div>
          </aside>
      </article>

      {related.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy">Related articles</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md">
                  <h3 className="font-bold text-navy">{r.title}</h3>
                  {r.excerpt && <p className="mt-2 text-sm text-gray-600">{r.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </main>
  );
}