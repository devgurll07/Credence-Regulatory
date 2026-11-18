import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";
import { sendMail, esc, layout } from "../../../../lib/mail";

const STATUSES = ["New", "In progress", "Closed"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const deny = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET(request) {
  if (!(await requireAdmin(request))) return deny();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) {
    console.error("Enquiries error:", error);
    return NextResponse.json({ error: "Could not load" }, { status: 500 });
  }
  return NextResponse.json({ enquiries: data });
}

export async function PATCH(request) {
  const admin = await requireAdmin(request);
  if (!admin) return deny();

  const body = await request.json();
  const { id, status, assigned_to, follow_up_date } = body;
  if (!UUID.test(id || "")) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const patch = {};
  const logs = [];
  let member = null;

  if (status !== undefined) {
    if (!STATUSES.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    patch.status = status;
    logs.push(["status", `Status changed to ${status}`]);
  }

  if (assigned_to !== undefined) {
    if (assigned_to !== null && !UUID.test(assigned_to)) {
      return NextResponse.json({ error: "Invalid assignee" }, { status: 400 });
    }
    if (assigned_to) {
      const { data } = await supabase.from("team_members").select("id, name, email").eq("id", assigned_to).single();
      if (!data) return NextResponse.json({ error: "Member not found" }, { status: 400 });
      member = data;
    }
    patch.assigned_to = assigned_to;
    logs.push(["assign", member ? `Assigned to ${member.name}` : "Unassigned"]);
  }

  if (follow_up_date !== undefined) {
    if (follow_up_date !== null && !DATE.test(follow_up_date)) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }
    patch.follow_up_date = follow_up_date;
    logs.push(["note", follow_up_date ? `Follow-up set for ${follow_up_date}` : "Follow-up cleared"]);
  }

  if (Object.keys(patch).length === 0) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  const { data: enq, error } = await supabase.from("enquiries").update(patch).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: "Could not update" }, { status: 500 });

  await supabase.from("enquiry_updates").insert(
    logs.map(([kind, text]) => ({ enquiry_id: id, kind, body: text, author: admin.email }))
  );

  if (member) {
    await sendMail({
      to: member.email,
      subject: `Enquiry assigned to you: ${enq.service}`,
      replyTo: enq.email,
      html: layout(`<h2>An enquiry is assigned to you</h2>
        <p><b>Name:</b> ${esc(enq.name)}</p><p><b>Email:</b> ${esc(enq.email)}</p>
        <p><b>Phone:</b> ${esc(enq.phone)}</p><p><b>Country:</b> ${esc(enq.country)}</p>
        <p><b>Service:</b> ${esc(enq.service)}</p><p><b>Message:</b> ${esc(enq.message) || "-"}</p>`),
    });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  if (!(await requireAdmin(request))) return deny();
  const { id } = await request.json();
  if (!UUID.test(id || "")) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not delete" }, { status: 500 });
  return NextResponse.json({ success: true });
}