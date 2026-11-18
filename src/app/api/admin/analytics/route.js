import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";

export async function GET(request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requested = Number(new URL(request.url).searchParams.get("days"));
  const days = [7, 30, 90].includes(requested) ? requested : 30;

  const { data, error } = await supabase.rpc("analytics_summary", { p_days: days });
  if (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Could not load" }, { status: 500 });
  }
  return NextResponse.json(data);
}