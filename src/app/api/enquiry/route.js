import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function notify(e) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Credence Website <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL.split(",").map((s) => s.trim()),
        reply_to: e.email,
        subject: `New enquiry: ${e.service} (${e.country})`.replace(/[\r\n]+/g, " "),
        html: `
          <h2>New enquiry received</h2>
          <p><b>Name:</b> ${esc(e.name)}</p>
          <p><b>Email:</b> ${esc(e.email)}</p>
          <p><b>Phone:</b> ${esc(e.phone)}</p>
          <p><b>Country:</b> ${esc(e.country)}</p>
          <p><b>Service:</b> ${esc(e.service)}</p>
          <p><b>Message:</b> ${esc(e.message) || "-"}</p>
        `,
      }),
    });
  } catch (err) {
    console.error("Email error:", err);
  }
}

export async function POST(request) {
  const data = await request.json();

  if (!data.name || !data.email || !data.phone || !data.country || !data.service) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const row = {
    name: String(data.name).slice(0, 200),
    email: String(data.email).slice(0, 200),
    phone: String(data.phone).slice(0, 50),
    country: String(data.country).slice(0, 100),
    service: String(data.service).slice(0, 200),
    message: data.message ? String(data.message).slice(0, 3000) : null,
  };

  const { error } = await supabase.from("enquiries").insert(row);
  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  await notify(row);
  return NextResponse.json({ success: true });
}