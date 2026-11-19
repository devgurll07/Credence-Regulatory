"use client";

import { useState } from "react";
import { allServices } from "../data/allServices";

export default function EnquiryForm({ defaultService = "" }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const data = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full rounded border border-gray-300 px-4 py-3 text-gray-800 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-6 shadow-md">
      <input name="name" required placeholder="Full Name" className={input} />
      <input name="email" type="email" required placeholder="Email Address" className={input} />
      <input name="phone" required placeholder="Phone / WhatsApp (with country code)" className={input} />
      <input name="country" required placeholder="Your Country" className={input} />

      <select name="service" required className={input} defaultService="">
        <option value="" disabled>Select a Service</option>
        {allServices.map((s) => (
          <option key={s.slug} value={s.title}>{s.title}</option>
        ))}
      </select>

      <textarea name="message" rows={4} placeholder="Tell us about your requirement" className={input} />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-gold px-6 py-3 font-semibold text-navy hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Submit Enquiry"}
      </button>

      {status === "success" && (
        <p className="text-green-700">Thank you! Our team will contact you shortly.</p>
      )}
      {status === "error" && (
        <p className="text-red-600">Something went wrong. Please try again or WhatsApp us.</p>
      )}
    </form>
  );
}