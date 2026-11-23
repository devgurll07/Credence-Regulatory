import Link from "next/link";
import { supabase } from "../../lib/supabase";

export const metadata = {
  title: "Blog | Credence Regulatory",
  description: "Guides and updates on company registration, trademarks, compliance, trade and more.",
};

const fields = "slug, title, excerpt, category, cover_url, published_at, featured";

function Card({ p, featured = false }) {
  return (
    <Link
      href={`/blog/${p.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        featured ? "border-gold ring-2 ring-gold/30" : "border-gold/30"
      }`}
    >
      {featured && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-bold text-white shadow">
          ★ Featured
        </span>
      )}
      {p.cover_url ? (
        <img src={p.cover_url} alt={p.title} className="aspect-video w-full object-cover" />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-navy to-navy-light text-5xl text-gold">
          ✦
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {p.category && <p className="text-xs font-semibold uppercase tracking-widest text-gold">{p.category}</p>}
        <h2 className="mt-2 text-xl font-bold text-ink group-hover:text-gold">{p.title}</h2>
        {p.excerpt && <p className="mt-3 flex-1 text-gray-600">{p.excerpt}</p>}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {p.published_at &&
              new Date(p.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
          <span className="font-semibold text-gold">Read article →</span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage({ searchParams }) {
  const { category, q } = await searchParams;
  const search = String(q || "").replace(/[%_,()]/g, "").slice(0, 60);
  const filtering = Boolean(category || search);

  let query = supabase
    .from("blog_posts")
    .select(fields)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(60);
  if (category) query = query.eq("category", category);
  if (search) query = query.ilike("title", `%${search}%`);

  const [{ data }, { data: cats }] = await Promise.all([
    query,
    supabase.from("blog_posts").select("category").eq("published", true),
  ]);

  const posts = data || [];
  const featured = filtering ? [] : posts.filter((p) => p.featured);
  const rest = filtering ? posts : posts.filter((p) => !p.featured);
  const categories = [...new Set((cats || []).map((c) => c.category).filter(Boolean))];

  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Insights</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
            Guides for Doing Business Across Borders
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link href="/blog" className={`rounded-full px-4 py-1 text-sm ${!category ? "bg-navy text-white" : "bg-white ring-1 ring-black/10"}`}>
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                href={`/blog?category=${encodeURIComponent(c)}`}
                className={`rounded-full px-4 py-1 text-sm ${category === c ? "bg-navy text-white" : "bg-white ring-1 ring-black/10"}`}
              >
                {c}
              </Link>
            ))}
          </div>
          <form action="/blog" className="flex gap-2">
            <input name="q" defaultValue={search} placeholder="Search articles..." className="rounded border border-gray-300 px-4 py-2 text-sm" />
            <button className="rounded bg-gold px-4 py-2 text-sm font-semibold text-white">Search</button>
          </form>
        </div>

        {posts.length === 0 && (
          <p className="py-20 text-center text-gray-500">No articles found yet. Please check back soon.</p>
        )}

        {featured.length > 0 && (
          <section className="mt-12">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-ink">Featured Articles</h2>
            <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => <Card key={p.slug} p={p} featured />)}
            </div>
          </section>
        )}

        {rest.length > 0 && (
          <section className="mt-14">
            {!filtering && featured.length > 0 && (
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-ink">Latest Articles</h2>
            )}
            <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => <Card key={p.slug} p={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}