import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";
import { sendMail, esc, layout } from "../../../../lib/mail";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const deny = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET(request) {
  if (!(await requireAdmin(request))) return deny();
  const enquiryId = new URL(request.url).searchParams.get("enquiryId") || "";
  if (!UUID.test(enquiryId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const { data, error } = await supabase
    .from("enquiry_updates")
    .select("*")
    .eq("enquiry_id", enquiryId)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Could not load" }, { status: 500 });
  return NextResponse.json({ updates: data });
}

export async function POST(request) {
  const admin = await requireAdmin(request);
  if (!admin) return deny();

  const { enquiryId, kind, body } = await request.json();
  const text = String(body || "").trim().slice(0, 2000);
  if (!UUID.test(enquiryId || "") || !text || !["note", "client_update"].includes(kind)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  if (kind === "client_update") {
    const { data: enq } = await supabase.from("enquiries").select("name, email, service").eq("id", enquiryId).single();
    if (!enq) return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });

    const sent = await sendMail({
      to: enq.email,
      subject: `Update on your enquiry: ${enq.service}`,
      html: layout(`<h2>Hello ${esc(enq.name)},</h2>
        <p style="white-space:pre-line">${esc(text)}</p>
        <p>Reply to this email or message us on WhatsApp if you have any questions.</p>`),
    });
    if (!sent) {
      return NextResponse.json(
        { error: "Email could not be sent. Check the Resend domain setup." },
        { status: 502 }
      );
    }
    await supabase.from("enquiry_updates").insert({
      enquiry_id: enquiryId, kind: "email", body: `Emailed to client: ${text}`, author: admin.email,
    });
    return NextResponse.json({ success: true });
  }

  const { error } = await supabase.from("enquiry_updates").insert({
    enquiry_id: enquiryId, kind: "note", body: text, author: admin.email,
  });
  if (error) return NextResponse.json({ error: "Could not save" }, { status: 500 });
  return NextResponse.json({ success: true });
}