import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";

const STATUSES = ["New", "In progress", "Closed"];

export async function GET(request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) return NextResponse.json({ error: "Could not load" }, { status: 500 });
  return NextResponse.json({ enquiries: data });
}

export async function PATCH(request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await request.json();
  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: "Could not update" }, { status: 500 });
  return NextResponse.json({ success: true });
}