"use client";

import React, { useState } from "react";
import Link from "next/link";
import { allServices } from "../data/allServices";
import {
  Building2,
  Globe,
  Leaf,
  Scale,
  Briefcase,
  ShieldCheck,
  Clock,
  FileCheck2,
  ArrowUpRight,
  Users,
  Gavel,
  Cpu,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const DOMAINS = [
  {
    id: "lmpc-wpc",
    title: "LMPC WPC",
    tag: "Import & Telecom",
    icon: Building2,
    timeline: "15–20 Working Days",
    authority: "Legal Metrology / DoT",
    docs: ["IEC Certificate", "Product Manual", "Authorization Letter"],
    description:
      "Mandatory pre-import packaging registration and wireless equipment type approval for smooth customs clearance.",
    href: "/services/lmpc-wpc",
    accent: "from-indigo-500 to-blue-600",
  },
  {
    id: "ipr-export-import",
    title: "IPR Export Import",
    tag: "Global IP & Trade",
    icon: Globe,
    timeline: "7–15 Working Days",
    authority: "IP India / DGFT / WIPO",
    docs: ["Brand Mark / Logo", "MSME / Startup Cert", "User Affidavit"],
    description:
      "End-to-end trademark & IP protection, international filings, and DGFT export-import licensing support.",
    href: "/services/ipr-export-import",
    accent: "from-violet-500 to-purple-600",
  },
  {
    id: "environmental-compliances",
    title: "Environmental Compliances",
    tag: "Sustainability & EPR",
    icon: Leaf,
    timeline: "20–30 Working Days",
    authority: "CPCB / SPCB",
    docs: ["GST & CIN", "Product BOM Details", "Recycler Agreement"],
    description:
      "Extended Producer Responsibility (E-Waste, Plastic, Battery) registration and statutory compliance filings.",
    href: "/services/environmental-compliances",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "legal-licenses",
    title: "Legal Licenses & Certification",
    tag: "Statutory Approvals",
    icon: Scale,
    timeline: "25–35 Working Days",
    authority: "BIS / FSSAI / DPIIT",
    docs: ["Lab Test Reports", "Unit / Layout Details", "Quality Records"],
    description:
      "Core business licenses, product certifications, and statutory registrations for growing enterprises.",
    href: "/services/legal-licenses",
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: "global-services",
    title: "Global Services",
    tag: "Cross-Border Setup",
    icon: Briefcase,
    timeline: "10–18 Working Days",
    authority: "MEA / Apostille / Embassies",
    docs: ["KYC & Incorporation", "MOA / AOA Drafts", "Attestation / PoA"],
    description:
      "International entity setup, apostille, embassy attestation, and global expansion structuring.",
    href: "/services/global-services",
    accent: "from-sky-500 to-cyan-600",
  },
  {
    id: "global-compliances",
    title: "Global Compliances",
    tag: "Ongoing Advisory",
    icon: ShieldCheck,
    timeline: "24hr Desk Setup",
    authority: "FEMA / RBI / Cross-Border",
    docs: ["Filing Calendar", "Regulatory Ledger", "Audit Checklist"],
    description:
      "Continuous cross-border regulatory governance, filings, and dedicated compliance advisory.",
    href: "/services/global-compliances",
    accent: "from-fuchsia-500 to-pink-600",
  },
];

// Exact service slug per card. Fill a slug here to pin the link; if empty, the keywords below are used.
const SLUGS = {
  "lmpc-wpc": "",
  "ipr-export-import": "",
  "environmental-compliances": "",
  "legal-licenses": "",
  "global-services": "",
  "global-compliances": "",
};

const KEYS = {
  "lmpc-wpc": ["lmpc", "wpc"],
  "ipr-export-import": ["ipr", "trademark", "import"],
  "environmental-compliances": ["epr", "environment", "waste"],
  "legal-licenses": ["licen", "certification", "bis", "fssai"],
  "global-services": ["global services", "global business", "apostille"],
  "global-compliances": ["global compliance", "compliance"],
};

// Link to a real service page; falls back to /services if nothing matches.
function hrefFor(id) {
  const pinned = SLUGS[id];
  if (pinned && allServices.some((s) => s.slug === pinned)) return `/services/${pinned}`;
  for (const k of KEYS[id] || []) {
    const s = allServices.find((x) => `${x.slug} ${x.title}`.toLowerCase().includes(k));
    if (s) return `/services/${s.slug}`;
  }
  return "/services";
}

const DOMAIN_LIST = DOMAINS.map((d) => ({ ...d, href: hrefFor(d.id) }));

const IMPACT_STATS = [
  {
    value: "8,580",
    label: "Clients Served",
    sub: "Building Compliance Across Sectors",
    icon: Users,
  },
  {
    value: "3,532",
    label: "Legal Cases",
    sub: "Enabling Growth With Clarity",
    icon: Gavel,
  },
  {
    value: "4,548",
    label: "IT Projects",
    sub: "Creating Global Opportunities",
    icon: Cpu,
  },
];

const TRUST_METRICS = [
  { value: "500+", label: "Licences Processed" },
  { value: "8+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24hr", label: "Response Time" },
];

export default function Stats() {
  const [activeId, setActiveId] = useState(DOMAINS[0].id);

  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle Technical Blueprint Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "24px 24px, 96px 96px, 96px 96px",
        }}
      />

      {/* Ambient Top Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-wider text-indigo-700 uppercase shadow-xs backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Our Impact
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Our Journey So Far
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Building Compliance. Enabling Growth. Creating Global Opportunities.
          </p>
        </div>

        {/* Top 3D Bento Impact Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {IMPACT_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />

                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200/70">
                    <CheckCircle2 className="h-3 w-3" /> Track Record
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-slate-800">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trusted Compliance & Technology Partner Header + Dark Trust Strip */}
        <div className="mt-14">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Trusted Compliance &amp; Technology Partner
            </h3>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Your Growth. Our Commitment.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200/80 bg-slate-900 p-4 text-white shadow-lg sm:grid-cols-4 sm:p-5">
            {TRUST_METRICS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center border-slate-800 px-3 py-1 text-center sm:border-r last:border-r-0"
              >
                <span className="text-xl font-bold text-indigo-300 sm:text-2xl">
                  {item.value}
                </span>
                <span className="mt-0.5 text-xs font-medium text-slate-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Compliance Radar / Domain Matrix */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DOMAIN_LIST.map((domain) => {
            const Icon = domain.icon;
            const isActive = activeId === domain.id;

            return (
              <div
                key={domain.id}
                onMouseEnter={() => setActiveId(domain.id)}
                onClick={() => setActiveId(domain.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
                  isActive
                    ? "-translate-y-1 border-indigo-500/70 bg-white shadow-2xl shadow-indigo-500/15 ring-2 ring-indigo-500/20"
                    : "border-slate-200/90 bg-white/85 hover:border-indigo-300 hover:bg-white hover:shadow-lg"
                }`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${domain.accent} transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  }`}
                />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                          : "bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="inline-block text-[11px] font-semibold tracking-wide text-indigo-600 uppercase">
                        {domain.tag}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {domain.title}
                      </h4>
                    </div>
                  </div>

                  <Link
                    href={domain.href}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
                    aria-label={`Explore ${domain.title}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-slate-600">
                  {domain.description}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 font-semibold text-indigo-700">
                      <Clock className="h-3.5 w-3.5" />
                      {domain.timeline}
                    </span>
                    <span className="font-medium text-slate-500">
                      {domain.authority}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 uppercase">
                      <FileCheck2 className="h-3 w-3 text-emerald-600" />
                      Key Documents Required
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {domain.docs.map((doc) => (
                        <span
                          key={doc}
                          className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                        >
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-1">
                    <Link
                      href={domain.href}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
                    >
                      Explore Service
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <span className="text-[11px] text-slate-400">
                      {isActive ? "Active Preview" : "Hover or tap to inspect"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}