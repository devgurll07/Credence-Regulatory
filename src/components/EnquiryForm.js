"use client";

import { useRef, useState } from "react";
import { allServices } from "../data/allServices";
import { panelBgStyle } from "../data/panelBg";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-white/80">{label}</span>
      {children}
    </label>
  );
}

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
    el.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
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
    "w-full rounded-md border border-transparent bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-gold focus:shadow-lg";

  return (
    <div style={{ perspective: "1000px" }}>
      <style>{`
        @keyframes enq-pop { 0% { transform: scale(.5); opacity: 0 } 70% { transform: scale(1.1) } 100% { transform: scale(1); opacity: 1 } }
        .enq-pop { animation: enq-pop .5s ease-out both }
        @media (prefers-reduced-motion: reduce) { .enq-pop { animation: none } }
      `}</style>

      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-2xl border border-white/10 p-5 text-white"
        style={{
          ...panelBgStyle,
          transformStyle: "preserve-3d",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        {/* Glow that follows the cursor */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(240px circle at var(--gx, 50%) var(--gy, 0%), rgba(255,255,255,0.12), transparent 70%)",
          }}
        />

        <div className="relative">
          {status === "success" ? (
            <div className="py-12 text-center">
              <div className="enq-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-3xl text-navy">✓</div>
              <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl font-bold">Thank you!</h3>
              <p className="mt-2 text-sm text-gray-300">Our team will contact you shortly.</p>
              <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-gold underline">
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold">Get a Free Consultation</h3>
              <div className="mt-2 h-0.5 w-10 rounded bg-gold" />

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <Field label="Your Name">
                  <input name="name" required placeholder="Name" className={input} />
                </Field>
                <Field label="Your Email">
                  <input name="email" type="email" required placeholder="Email" className={input} />
                </Field>
                <Field label="Phone / WhatsApp">
                  <input name="phone" required placeholder="With country code" className={input} />
                </Field>
                <Field label="Your Country">
                  <input name="country" required placeholder="Country" className={input} />
                </Field>
                <Field label="Service Required">
                  <select name="service" required defaultValue={defaultService} className={input}>
                    <option value="" disabled>Select a Service</option>
                    {allServices.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Your Enquiry">
                  <textarea name="message" rows={3} placeholder="Your queries" className={input} />
                </Field>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-md bg-gold px-6 py-3 font-semibold uppercase tracking-wide text-navy transition duration-150 hover:-translate-y-0.5 active:translate-y-1 disabled:opacity-60"
                  style={{ boxShadow: "0 5px 0 rgba(0,0,0,0.35), 0 12px 20px rgba(0,0,0,0.3)" }}
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-red-300">Something went wrong. Please try again or WhatsApp us.</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}