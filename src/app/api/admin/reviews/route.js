import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";

const deny = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET(request) {
  if (!(await requireAdmin(request))) return deny();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("approved", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) {
    console.error("Admin reviews error:", error);
    return NextResponse.json({ error: "Could not load" }, { status: 500 });
  }
  return NextResponse.json({ reviews: data });
}

export async function PATCH(request) {
  if (!(await requireAdmin(request))) return deny();
  const { id, approved } = await request.json();
  if (!id || typeof approved !== "boolean") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
  if (error) return NextResponse.json({ error: "Could not update" }, { status: 500 });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  if (!(await requireAdmin(request))) return deny();
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not delete" }, { status: 500 });
  revalidatePath("/");
  return NextResponse.json({ success: true });
}