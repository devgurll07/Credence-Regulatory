"use client";

import { useRef, useState } from "react";
import { allServices } from "../data/allServices";

export default function EnquiryForm({ defaultService = "", sourceBlogSlug = null }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const cardRef = useRef(null);

  function handleMove(e) {
    const el = cardRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 0.1s ease-out";
    el.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  }

  function handleLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s ease-out";
    el.style.transform = "rotateY(0deg) rotateX(0deg)";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source_page: window.location.pathname,
          source_blog_slug: sourceBlogSlug,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch (err) {
      console.error("Enquiry submit failed:", err);
      setStatus("error");
    }
  }

  const input =
    "w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-gold focus:bg-white/15 focus:shadow-lg";

  return (
    <div style={{ perspective: "1000px" }}>
      <style>{`
        @keyframes enq-pop { 0% { transform: scale(.5); opacity: 0 } 70% { transform: scale(1.1) } 100% { transform: scale(1); opacity: 1 } }
        @keyframes enq-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        .enq-pop { animation: enq-pop .5s ease-out both }
        .enq-float { animation: enq-float 3s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .enq-pop, .enq-float { animation: none } }
      `}</style>

      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-navy to-navy-light p-6 text-white"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* Glow that follows the cursor */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(260px circle at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,0.14), transparent 70%)",
          }}
        />
        {/* Decorative gold blob */}
        <div className="enq-float pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold opacity-20 blur-2xl" />

        <div className="relative">
          {status === "success" ? (
            <div className="py-10 text-center">
              <div className="enq-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-3xl text-navy">✓</div>
              <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl font-bold">Thank you!</h3>
              <p className="mt-2 text-sm text-gray-300">Our team will contact you shortly.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-gold underline"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold">Get a Free Consultation</h3>
              <p className="mt-1 text-sm text-gray-300">Tell us what you need and our experts will get back to you.</p>

              <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                <input name="name" required placeholder="Full Name" className={input} />
                <input name="email" type="email" required placeholder="Email Address" className={input} />
                <input name="phone" required placeholder="Phone / WhatsApp (with country code)" className={input} />
                <input name="country" required placeholder="Your Country" className={input} />

                <select name="service" required defaultValue={defaultService} className={input}>
                  <option value="" disabled className="text-gray-900">Select a Service</option>
                  {allServices.map((s) => (
                    <option key={s.slug} value={s.title} className="text-gray-900">{s.title}</option>
                  ))}
                </select>

                <textarea name="message" rows={3} placeholder="Tell us about your requirement" className={input} />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-lg bg-gold px-6 py-3 font-semibold text-navy transition duration-150 hover:-translate-y-0.5 active:translate-y-1 disabled:opacity-60"
                  style={{ boxShadow: "0 6px 0 rgba(0,0,0,0.3), 0 14px 24px rgba(0,0,0,0.3)" }}
                >
                  {status === "sending" ? "Sending..." : "Submit Enquiry →"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-300">Something went wrong. Please try again or WhatsApp us.</p>
                )}
                <p className="text-center text-xs text-gray-400">Your details are kept confidential.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}