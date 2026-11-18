import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  const ok = NextResponse.json({ ok: true });
  try {
    const ua = request.headers.get("user-agent") || "";
    if (/bot|crawl|spider|slurp|preview|headless/i.test(ua)) return ok;

    const { path, visitorId, referrer } = await request.json();
    if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("/admin")) return ok;

    let source = "Direct";
    if (referrer) {
      try {
        const host = new URL(referrer).hostname.replace(/^www\./, "");
        const own = (request.headers.get("host") || "").replace(/^www\./, "").split(":")[0];
        source = host === own ? null : host;
      } catch {}
    }

    const device = /ipad|tablet/i.test(ua) ? "Tablet" : /mobile|android|iphone/i.test(ua) ? "Mobile" : "Desktop";

    await supabase.from("page_views").insert({
      path: path.slice(0, 200),
      visitor_id: typeof visitorId === "string" ? visitorId.slice(0, 64) : null,
      source,
      device,
      country: request.headers.get("x-vercel-ip-country") || null,
    });
  } catch (e) {
    console.error("Track error:", e);
  }
  return ok;
}