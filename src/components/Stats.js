import Link from "next/link";
import Counter from "./Counter";
import { journey, trust } from "../data/stats";
import { allServices } from "../data/allServices";

// Finds the real service page by keyword; falls back to /services.
const serviceLink = (keyword) => {
  const s = allServices.find((x) => x.title.toLowerCase().includes(keyword));
  return s ? `/services/${s.slug}` : "/services";
};

function Svg({ children, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const UsersIcon = (p) => (
  <Svg {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);
const ScaleIcon = (p) => (
  <Svg {...p}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </Svg>
);
const FileIcon = (p) => (
  <Svg {...p}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="m9 15 2 2 4-4" />
  </Svg>
);
const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);
const CalendarIcon = (p) => (
  <Svg {...p}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </Svg>
);
const ThumbsIcon = (p) => (
  <Svg {...p}>
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </Svg>
);
const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Svg>
);
const LandmarkIcon = (p) => (
  <Svg {...p}>
    <path d="M3 22h18" />
    <path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
    <path d="m12 2 8 5H4Z" />
  </Svg>
);
const GlobeIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </Svg>
);
const LeafIcon = (p) => (
  <Svg {...p}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </Svg>
);

// Icons follow the order of the items in src/data/stats.js
const journeyIcons = [UsersIcon, ScaleIcon, FileIcon];
const trustIcons = [ShieldIcon, CalendarIcon, ThumbsIcon, ClockIcon];

const tiles = [
  { label: "LMPC WPC", icon: LandmarkIcon, href: serviceLink("lmpc") },
  { label: "IPR Export Import", icon: GlobeIcon, href: serviceLink("import") },
  { label: "Environmental Compliances", icon: LeafIcon, href: serviceLink("epr") },
  { label: "Legal Licenses & Certification", icon: ScaleIcon, href: "/services" },
  { label: "Global Services", icon: GlobeIcon, href: "/services" },
  { label: "Global Compliances", icon: ShieldIcon, href: serviceLink("compliance") },
];

function SideLines({ children }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="hidden h-px w-16 bg-[#6c47ff]/40 md:block lg:w-28" />
      {children}
      <span className="hidden h-px w-16 bg-[#6c47ff]/40 md:block lg:w-28" />
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f4ff] via-[#efecff] to-[#e8ebff]">
      <div aria-hidden="true" className="dots-light pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 hidden h-72 w-72 rounded-full bg-[#c9bdff]/40 blur-3xl md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 hidden h-80 w-80 rounded-full bg-[#b8c4ff]/40 blur-3xl md:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
        {/* Heading */}
        <div className="text-center">
          <SideLines>
            <span className="rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-[#2a2850] shadow-sm">
              Our Impact
            </span>
          </SideLines>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-ink md:text-4xl">
            Our Journey So Far
          </h2>
          <p className="mt-2 text-sm text-[#2a2850] md:text-base">
            Building Compliance. Enabling Growth. Creating Global Opportunities.
          </p>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#6c47ff]" />
        </div>

        {/* Journey cards */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-5">
          {journey.map((it, i) => {
            const Icon = journeyIcons[i] || UsersIcon;
            return (
              <div
                key={it.label}
                className="relative overflow-hidden rounded-2xl bg-white/90 px-5 pb-6 pt-5 shadow-[0_10px_30px_-12px_rgba(76,50,190,0.25)] ring-1 ring-[#6c47ff]/10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ece8ff] text-[#5a38e6] md:h-16 md:w-16">
                    <Icon className="h-7 w-7 md:h-8 md:w-8" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-3xl font-bold text-ink md:text-4xl">
                      <Counter value={it.value} suffix={it.suffix} />
                    </p>
                    <p className="text-sm text-[#2a2850]">{it.label}</p>
                  </div>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#c9bdff] via-[#6c47ff] to-[#4b2fd0]" />
              </div>
            );
          })}
        </div>

        {/* Trust heading */}
        <div className="mt-12 text-center md:mt-14">
          <SideLines>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-ink md:text-3xl">
              Trusted <span className="text-[#6c47ff]">Compliance</span> &amp;{" "}
              <span className="text-[#6c47ff]">Technology</span> Partner
            </h2>
          </SideLines>
          <p className="mt-2 text-sm text-[#2a2850] md:text-base">Your Growth. Our Commitment.</p>
        </div>

        {/* Trust cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {trust.map((it, i) => {
            const Icon = trustIcons[i] || ShieldIcon;
            return (
              <div
                key={it.label}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white/85 p-4 text-center shadow-[0_8px_24px_-14px_rgba(76,50,190,0.3)] ring-1 ring-[#6c47ff]/10 lg:flex-row lg:gap-4 lg:text-left"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ece8ff] text-[#5a38e6] lg:h-14 lg:w-14">
                  <Icon className="h-6 w-6 lg:h-7 lg:w-7" />
                </span>
                <span className="hidden h-12 w-px bg-[#6c47ff]/30 lg:block" />
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-ink lg:text-3xl">
                    <Counter value={it.value} suffix={it.suffix} />
                  </p>
                  <p className="text-xs text-[#2a2850] sm:text-sm">{it.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service tiles */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="group flex flex-col items-center gap-2 rounded-xl bg-white/85 px-3 py-4 text-center shadow-sm ring-1 ring-[#6c47ff]/10 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              <span className="text-[#5a38e6]">
                <t.icon className="h-6 w-6" />
              </span>
              <span className="h-0.5 w-5 rounded bg-[#6c47ff] transition-all group-hover:w-8" />
              <span className="text-xs font-medium leading-snug text-[#1c1a4a] sm:text-sm">{t.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA pill */}
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4a4594] to-[#6c47ff] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Together for a Compliant &amp; Prosperous Future <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}