import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  const data = await request.json();

  // Bots honeypot bhar dete hain, chupchap ignore karo
  if (data.website) return NextResponse.json({ success: true });

  const rating = Number(data.rating);
  if (!data.name || !data.message || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const { error } = await supabase.from("reviews").insert({
    name: String(data.name).slice(0, 100),
    country: data.country ? String(data.country).slice(0, 100) : null,
    rating,
    message: String(data.message).slice(0, 600),
  });

  if (error) {
    console.error("Review error:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}