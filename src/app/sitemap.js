import { services } from "../data/services";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const pages = ["", "/services", "/about", "/contact", "/privacy-policy", "/terms"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
  const svc = services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() }));
  return [...pages, ...svc];
}