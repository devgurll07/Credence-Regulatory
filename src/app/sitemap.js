import { allServices } from "../data/allServices";
import { supabase } from "../lib/supabase";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const pages = ["", "/services", "/about", "/contact", "/blog", "/privacy-policy", "/terms"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
  const svc = services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() }));

  let posts = [];
  try {
    const { data } = await supabase.from("blog_posts").select("slug, updated_at").eq("published", true);
    posts = (data || []).map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.updated_at) }));
  } catch {}

  return [...pages, ...svc, ...posts];
}