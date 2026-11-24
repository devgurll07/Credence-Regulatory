import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { allServices } from "../data/allServices";

// Finds the real service page by keyword; falls back to /services.
const serviceLink = (keyword) => {
  const s = allServices.find((x) => x.title.toLowerCase().includes(keyword));
  return s ? `/services/${s.slug}` : "/services";
};

function Icon({ children, className = "h-6 w-6" }) {
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

const GlobeIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </Icon>
);
const ShieldIcon = (p) => (
  <Icon {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const UsersIcon = (p) => (
  <Icon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);
const BriefcaseIcon = (p) => (
  <Icon {...p}>
    <rect width="20" height="14" x="2" y="7" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Icon>
);
const CopyrightIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9.354a4 4 0 1 0 0 5.292" />
  </Icon>
);
const ShipIcon = (p) => (
  <Icon {...p}>
    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
    <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
    <path d="M12 10v4" />
    <path d="M12 2v3" />
  </Icon>
);

const trust = [
  { icon: ShieldIcon, text: "End-to-end business support" },
  { icon: GlobeIcon, text: "Cross-border expertise" },
  { icon: UsersIcon, text: "One dedicated team" },
];

const bar = [
  { icon: BriefcaseIcon, label: "Business Setup", href: serviceLink("business setup") },
  { icon: CopyrightIcon, label: "Trademark & IPR", href: serviceLink("trademark") },
  { icon: ShieldIcon, label: "Global Compliance", href: serviceLink("compliance") },
  { icon: UsersIcon, label: "Immigration", href: serviceLink("immigration") },
  { icon: ShipIcon, label: "Import & Export", href: serviceLink("import") },
];

// Splits text into words; each word slides in from the left with a small delay.
function Words({ text, start = 0, className = "" }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={`${start}-${i}`}>
      <span
        className={`word-in inline-block ${className}`}
        style={{ animationDelay: `${(start + i) * 0.12}s` }}
      >
        {w}
      </span>{" "}
    </Fragment>
  ));
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#faf9ff] via-[#f1f0ff] to-[#e6e9ff]">
      {/* Soft background glow and dotted texture */}
      <div className="pointer-events-none absolute -right-32 top-0 h-[36rem] w-[36rem] rounded-full bg-[#b8b6f9]/40 blur-3xl" />
      <div
        className="pointer-events-none absolute left-0 top-0 h-64 w-96 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(108,71,255,0.25) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to bottom right, black, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom right, black, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1500px] gap-x-10 px-4 pb-8 pt-10 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:pt-16">
        {/* Top content: badge, heading, paragraph */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e9e6ff] py-1.5 pl-1.5 pr-4 text-[11px] font-semibold uppercase tracking-wide text-[#1c1a4a] sm:text-xs">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c47ff] text-white">
                <GlobeIcon className="h-4 w-4" />
              </span>
              Your global business, compliance &amp; regulatory partner
            </span>
            <span className="hidden h-px w-20 bg-[#6c47ff]/40 sm:block" />
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-[1.1] text-[#0d0b3e] sm:text-5xl md:text-6xl xl:text-7xl">
            <Words text="Navigate" start={0} />
            <Words text="Global Business" start={1} className="text-[#6c47ff]" />
            <Words text="With" start={3} />
            <Words text="Confidence." start={4} className="text-[#6c47ff]" />
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-[#2a2850] sm:text-lg"
            style={{ animationDelay: "0.7s" }}
          >
            From <b className="text-[#0d0b3e]">company setup</b> and international IP protection to{" "}
            <b className="text-[#0d0b3e]">regulatory compliance</b> and cross-border expansion, we help you move
            forward with clarity.
          </p>
        </div>

        {/* Globe: sits between the paragraph and the buttons on mobile, on the right on desktop */}
        <div className="slide-in-right my-2 flex justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:my-0 lg:justify-end lg:self-center">
          <Image
            src="/images/hero-globe-large.webp"
            alt="Global business network"
            width={1005}
            height={855}
            priority
            sizes="(min-width: 1024px) 55vw, 90vw"
            className="animate-float h-auto w-full max-w-[360px] motion-reduce:animate-none sm:max-w-[520px] lg:max-w-[820px] xl:max-w-[900px]"
          />
        </div>

        {/* Bottom content: buttons and trust row */}
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <div
            className="animate-fade-up mt-4 flex flex-wrap gap-3 sm:gap-4 lg:mt-8"
            style={{ animationDelay: "0.9s" }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#6c47ff] px-6 py-3 font-semibold text-white shadow-[0_10px_25px_-8px_rgba(108,71,255,0.7)] transition hover:-translate-y-0.5 hover:bg-[#5a38e6] sm:px-8 sm:py-4"
            >
              Talk to an Expert <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#6c47ff] px-6 py-3 font-semibold text-[#2a1a8f] transition hover:-translate-y-0.5 hover:bg-[#6c47ff] hover:text-white sm:px-8 sm:py-4"
            >
              Explore Our Services <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <ul
            className="animate-fade-up mt-8 grid grid-cols-1 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6"
            style={{ animationDelay: "1.1s" }}
          >
            {trust.map((t, i) => (
              <li key={t.text} className="flex items-center gap-6">
                {i > 0 && <span className="hidden h-10 w-px bg-[#6c47ff]/20 sm:block" />}
                <span className="flex items-center gap-3">
                  <t.icon className="h-7 w-7 shrink-0 text-[#6c47ff]" />
                  <span className="text-sm font-medium leading-snug text-[#2a2850] sm:max-w-[8rem]">{t.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Services bar */}
      <div className="relative mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-12">
        <nav
          aria-label="Main services"
          className="grid grid-cols-2 gap-1 rounded-2xl bg-white/90 p-2 shadow-[0_20px_50px_-20px_rgba(60,40,160,0.35)] ring-1 ring-[#6c47ff]/10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {bar.map((b) => (
            <Link
              key={b.label}
              href={b.href}
              className="flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-xs font-medium text-[#1c1a4a] transition hover:bg-[#f1f0ff] hover:text-[#6c47ff] sm:gap-3 sm:px-4 sm:py-4 sm:text-sm"
            >
              <b.icon className="h-5 w-5 shrink-0 text-[#6c47ff] sm:h-6 sm:w-6" />
              {b.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}