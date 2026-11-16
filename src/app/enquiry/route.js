import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  const data = await request.json();

  if (!data.name || !data.email || !data.phone || !data.country || !data.service) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase.from("enquiries").insert({
    name: String(data.name).slice(0, 200),
    email: String(data.email).slice(0, 200),
    phone: String(data.phone).slice(0, 50),
    country: String(data.country).slice(0, 100),
    service: String(data.service).slice(0, 200),
    message: data.message ? String(data.message).slice(0, 3000) : null,
  });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}