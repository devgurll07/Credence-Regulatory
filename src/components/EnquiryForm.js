"use client";

import { useState } from "react";
import Image from "next/image";
import { allServices } from "../data/allServices";

const COUNTRIES = [
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "CA", name: "Canada", dial: "+1" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "NP", name: "Nepal", dial: "+977" },
  { iso: "BD", name: "Bangladesh", dial: "+880" },
  { iso: "XX", name: "Other", dial: "" },
];

function Svg({ children, className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const UserIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </Svg>
);
const ChatIcon = (p) => (
  <Svg {...p}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </Svg>
);
const MailIcon = (p) => (
  <Svg {...p}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </Svg>
);
const BriefcaseIcon = (p) => (
  <Svg {...p}>
    <rect width="20" height="14" x="2" y="7" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Svg>
);
const NoteIcon = (p) => (
  <Svg {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8M8 13h5" />
  </Svg>
);
const UsersIcon = (p) => (
  <Svg {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);
const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);
const BoltIcon = (p) => (
  <Svg {...p}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </Svg>
);
const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="m5 12 5 5L20 7" />
  </Svg>
);

const inputCls =
  "w-full rounded-lg border border-[#dcd9f7] bg-[#f8f7ff] py-2 pl-9 pr-3 text-sm text-[#0d0b3e] placeholder:text-[#9a98c0] outline-none transition focus:border-[#6c47ff] focus:bg-white focus:ring-2 focus:ring-[#6c47ff]/20";

function Label({ text, required }) {
  return (
    <span className="mb-1 block text-xs font-semibold text-[#0d0b3e]">
      {text} {required && <span className="text-red-500">*</span>}
    </span>
  );
}

function IconBox({ icon, top = false }) {
  return (
    <span
      className={`pointer-events-none absolute left-3 text-[#7b78a8] ${top ? "top-3" : "top-1/2 -translate-y-1/2"}`}
    >
      {icon}
    </span>
  );
}

export default function EnquiryForm({ defaultService = "", sourceBlogSlug = null }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [iso, setIso] = useState("IN");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const d = Object.fromEntries(new FormData(e.target));
    const c = COUNTRIES.find((x) => x.iso === iso) || COUNTRIES[0];
    const number = String(d.mobile || "").trim();

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d.name,
          email: d.email || "",
          phone: `${c.dial} ${number}`.trim(),
          country: c.name,
          service: d.service,
          message: d.message || "",
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

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b0a35] to-[#1c1a5e] shadow-xl">
      {/* Header */}
      <div className="relative overflow-hidden px-4 pb-4 pt-4">
        <Image
          src="/images/form-skyline.webp"
          alt=""
          width={177}
          height={268}
          className="pointer-events-none absolute bottom-0 right-0 h-full w-auto"
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex rounded-md bg-white px-2 py-1">
              <Image src="/logo.png" alt="Credence Regulatory" width={110} height={30} className="h-auto w-24" />
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a72ff] bg-[#6c47ff]/30 px-2.5 py-1 text-[11px] font-semibold text-white">
              <CheckIcon className="h-3.5 w-3.5" /> Free Consultation
            </span>
          </div>
          <h3 className="mt-3 max-w-[75%] font-[family-name:var(--font-playfair)] text-xl font-bold leading-tight text-white">
            Get Expert Help for Your <span className="text-[#a592ff]">Business</span>
          </h3>
          <p className="mt-1.5 max-w-[72%] text-xs leading-snug text-white/80">
            Tell us what you need. Our experts will help you find the right solution.
          </p>
        </div>
      </div>

      {/* White card */}
      <div className="mx-3 rounded-xl bg-white p-4 shadow-lg">
        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#6c47ff] text-white">
              <CheckIcon className="h-7 w-7" />
            </div>
            <h4 className="mt-4 text-lg font-bold text-[#0d0b3e]">Thank you!</h4>
            <p className="mt-1 text-sm text-[#5a5880]">Our team will contact you shortly.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-[#6c47ff] underline">
              Send another enquiry
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6c47ff] text-white">
                <UsersIcon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold leading-tight text-[#0d0b3e]">Let&rsquo;s Discuss Your Requirements</h4>
                <p className="text-[11px] leading-snug text-[#5a5880]">Fill in the details and our team will get in touch.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
              <label className="block">
                <Label text="Your Name" required />
                <span className="relative block">
                  <IconBox icon={<UserIcon />} />
                  <input name="name" required maxLength={100} placeholder="Enter your full name" className={inputCls} />
                </span>
              </label>

              <div>
                <Label text="WhatsApp Number" required />
                <div className="flex gap-2">
                  <select
                    value={iso}
                    onChange={(e) => setIso(e.target.value)}
                    aria-label="Country code"
                    className="w-[5.4rem] shrink-0 rounded-lg border border-[#dcd9f7] bg-[#f8f7ff] px-2 py-2 text-sm text-[#0d0b3e] outline-none focus:border-[#6c47ff]"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.iso} value={c.iso}>
                        {c.dial ? `${c.iso} ${c.dial}` : "Other"}
                      </option>
                    ))}
                  </select>
                  <span className="relative block min-w-0 flex-1">
                    <IconBox icon={<ChatIcon />} />
                    <input
                      name="mobile"
                      required
                      type="tel"
                      inputMode="tel"
                      minLength={6}
                      maxLength={20}
                      placeholder="Mobile number"
                      className={inputCls}
                    />
                  </span>
                </div>
              </div>

              <label className="block">
                <Label text="Email (optional)" />
                <span className="relative block">
                  <IconBox icon={<MailIcon />} />
                  <input name="email" type="email" maxLength={200} placeholder="you@example.com" className={inputCls} />
                </span>
              </label>

              <label className="block">
                <Label text="Service Required" required />
                <span className="relative block">
                  <IconBox icon={<BriefcaseIcon />} />
                  <select name="service" required defaultValue={defaultService} className={inputCls}>
                    <option value="" disabled>Select your requirement</option>
                    {allServices.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </span>
              </label>

              <label className="block">
                <Label text="Your Message (optional)" />
                <span className="relative block">
                  <IconBox icon={<NoteIcon />} top />
                  <textarea name="message" rows={2} maxLength={1000} placeholder="Tell us how we can help you..." className={`${inputCls} resize-none`} />
                </span>
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#5a38e6] to-[#7c5cff] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Request My Free Consultation"}
                {status !== "sending" && <span aria-hidden="true">&rarr;</span>}
              </button>

              {status === "error" && (
                <p className="text-xs text-red-600">Something went wrong. Please try again or WhatsApp us.</p>
              )}
            </form>

            <ul className="mt-3 grid grid-cols-3 divide-x divide-[#e6e4fb] text-[10px] leading-tight text-[#2a2850]">
              <li className="flex items-center gap-1.5 pr-2">
                <ShieldIcon className="h-5 w-5 shrink-0 text-[#6c47ff]" /> 100% Confidential
              </li>
              <li className="flex items-center gap-1.5 px-2">
                <UsersIcon className="h-5 w-5 shrink-0 text-[#6c47ff]" /> Professional Support
              </li>
              <li className="flex items-center gap-1.5 pl-2">
                <BoltIcon className="h-5 w-5 shrink-0 text-[#6c47ff]" /> Quick Response
              </li>
            </ul>
          </>
        )}
      </div>

      <p className="px-4 py-2.5 text-center text-[11px] text-white/70">Trusted by Businesses Worldwide</p>
    </div>
  );
}