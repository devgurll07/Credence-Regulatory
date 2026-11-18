export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function layout(inner) {
  return `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#1c2144">${inner}
  <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
  <p style="font-size:12px;color:#888">Credence Regulatory<br>+91 7042032325 · WhatsApp +91 8800672422<br>sails.credenceregulatory@gmail.com</p></div>`;
}

export async function sendMail({ to, subject, html, replyTo }) {
  if (!process.env.RESEND_API_KEY) return false;
  const recipients = (Array.isArray(to) ? to : [to]).map((s) => String(s || "").trim()).filter(Boolean);
  if (!recipients.length) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "Credence Regulatory <onboarding@resend.dev>",
        to: recipients,
        reply_to: replyTo || "sails.credenceregulatory@gmail.com",
        subject: String(subject).replace(/[\r\n]+/g, " ").slice(0, 200),
        html,
      }),
    });
    if (!res.ok) {
      console.error("Mail error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("Mail error:", e);
    return false;
  }
}