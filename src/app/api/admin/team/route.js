import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";
import { services } from "../../../../data/services";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const titles = services.map((s) => s.title);
const deny = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });
const cleanServices = (v) => (Array.isArray(v) ? v.filter((t) => titles.includes(t)) : []);
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function GET(request) {
  if (!(await requireAdmin(request))) return deny();
  const { data, error } = await supabase.from("team_members").select("*").order("created_at");
  if (error) return NextResponse.json({ error: "Could not load" }, { status: 500 });
  return NextResponse.json({ team: data });
}

export async function POST(request) {
  if (!(await requireAdmin(request))) return deny();
  const b = await request.json();
  const name = String(b.name || "").trim().slice(0, 100);
  const email = String(b.email || "").trim().toLowerCase().slice(0, 200);
  if (!name || !validEmail(email)) return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
  const { error } = await supabase.from("team_members").insert({ name, email, services: cleanServices(b.services) });
  if (error) return NextResponse.json({ error: "Could not save" }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PATCH(request) {
  if (!(await requireAdmin(request))) return deny();
  const b = await request.json();
  if (!UUID.test(b.id || "")) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const patch = {};
  if (typeof b.active === "boolean") patch.active = b.active;
  if (b.services !== undefined) patch.services = cleanServices(b.services);
  if (Object.keys(patch).length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  const { error } = await supabase.from("team_members").update(patch).eq("id", b.id);
  if (error) return NextResponse.json({ error: "Could not update" }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  if (!(await requireAdmin(request))) return deny();
  const { id } = await request.json();
  if (!UUID.test(id || "")) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not delete" }, { status: 500 });
  return NextResponse.json({ success: true });
}