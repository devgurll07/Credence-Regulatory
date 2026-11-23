"use client";
import { useState } from "react";

// Yahan wahi service names rakho jo team_members.services mein hain,
// tabhi auto-assign sahi chalega.
const SERVICES = [
  "Private Limited", "LLP", "OPC", "Trademark", "GST", "FSSAI",
  "Foreign Company Registration", "Foreign Document Registration",
  "International Trademark", "Attestation", "Legal Notices", "Other",
];

export default function BlogEnquiryForm({ slug, defaultService = "" }) {
  const [status, setStatus] = useState("idle");
  const [f, setF] = useState({
    name: "", email: "", phone: "", country: "India",
    service: defaultService, message: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          source_page: window.location.pathname,
          source_blog_slug: null,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl bg-cream p-8 text-center">
        <h3 className="text-xl font-bold text-ink">Thank you!</h3>
        <p className="mt-2 text-gray-600">We have received your enquiry. Our team will contact you soon.</p>
      </div>
    );
  }

  const input = "w-full rounded border border-gray-300 px-4 py-3 text-sm focus:border-gold focus:outline-none";
  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      <input required className={input} placeholder="Full name" value={f.name} onChange={set("name")} />
      <input required type="email" className={input} placeholder="Email" value={f.email} onChange={set("email")} />
      <input required className={input} placeholder="Phone" value={f.phone} onChange={set("phone")} />
      <input required className={input} placeholder="Country" value={f.country} onChange={set("country")} />
      <select required className={`${input} md:col-span-2`} value={f.service} onChange={set("service")}>
        <option value="">Select service</option>
        {SERVICES.map((s) => <option key={s}>{s}</option>)}
      </select>
      <textarea rows={3} className={`${input} md:col-span-2`} placeholder="Your message (optional)" value={f.message} onChange={set("message")} />
      <button disabled={status === "sending"} className="rounded bg-gold px-6 py-3 font-semibold text-white md:col-span-2 disabled:opacity-60">
        {status === "sending" ? "Sending..." : "Send Enquiry"}
      </button>
     {status === "error" && <p className="text-sm text-red-600 md:col-span-2">Something went wrong. Please try again.</p>}
    </form>
  );
}