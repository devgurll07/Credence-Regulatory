import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { sendMail, esc, layout } from "../../../lib/mail";
import { sendToBitrix } from "../../../lib/bitrix";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }

  if (!data.name || !data.email || !data.phone || !data.country || !data.service) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const email = String(data.email).trim().toLowerCase().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const row = {
    name: String(data.name).slice(0, 200),
    email,
    phone: String(data.phone).slice(0, 50),
    country: String(data.country).slice(0, 100),
    service: String(data.service).slice(0, 200),
    message: data.message ? String(data.message).slice(0, 3000) : null,
    source_page: data.source_page ? String(data.source_page).slice(0, 300) : null,
    source_blog_slug: data.source_blog_slug ? String(data.source_blog_slug).slice(0, 200) : null,
  };

  const { count: earlier } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("email", email);

  const { data: members } = await supabase
    .from("team_members")
    .select("id, name, email, services")
    .eq("active", true);
  const assignee = (members || []).find((m) => (m.services || []).includes(row.service)) || null;

  const { data: saved, error } = await supabase
    .from("enquiries")
    .insert({ ...row, ...(assignee ? { assigned_to: assignee.id } : {}) })
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }

  if (assignee) {
    await supabase.from("enquiry_updates").insert({
      enquiry_id: saved.id,
      kind: "assign",
      body: `Auto-assigned to ${assignee.name}`,
      author: "System",
    });
  }

  const sourceText = row.source_blog_slug
    ? `Blog: ${row.source_blog_slug}`
    : row.source_page || "-";

  const details = `
    <p><b>Name:</b> ${esc(row.name)}</p>
    <p><b>Email:</b> ${esc(row.email)}</p>
    <p><b>Phone:</b> ${esc(row.phone)}</p>
    <p><b>Country:</b> ${esc(row.country)}</p>
    <p><b>Service:</b> ${esc(row.service)}</p>
    <p><b>Source:</b> ${esc(sourceText)}</p>
    <p><b>Message:</b> ${esc(row.message) || "-"}</p>`;

  await Promise.allSettled([
    sendMail({
      to: (process.env.NOTIFY_EMAIL || "").split(","),
      subject: `New enquiry: ${row.service} (${row.country})`,
      replyTo: row.email,
      html: layout(`<h2>New enquiry received</h2>
        ${earlier > 0 ? `<p style="color:#b45309"><b>Returning client:</b> ${earlier} earlier enquiry(ies)</p>` : ""}
        ${assignee ? `<p><b>Assigned to:</b> ${esc(assignee.name)}</p>` : "<p><b>Assigned to:</b> nobody yet</p>"}
        ${details}`),
    }),
    sendMail({
      to: row.email,
      subject: "We received your enquiry | Credence Regulatory",
      html: layout(`<h2>Thank you, ${esc(row.name)}</h2>
        <p>We have received your enquiry about <b>${esc(row.service)}</b>. Our team will review it and get back to you soon.</p>
        <p>If it is urgent, you can message us on WhatsApp at +91 8800672422.</p>`),
    }),
    assignee &&
      sendMail({
        to: assignee.email,
        subject: `Enquiry assigned to you: ${row.service}`,
        replyTo: row.email,
        html: layout(`<h2>A new enquiry is assigned to you</h2>${details}`),
      }),
    (async () => {
      const leadId = await sendToBitrix({ ...row, assignee_name: assignee?.name });
      if (leadId) {
        await supabase.from("enquiries").update({ bitrix_lead_id: leadId }).eq("id", saved.id);
      }
    })(),
  ]);

  return NextResponse.json({ success: true });
}