import Image from "next/image";
import Link from "next/link";
import { clients } from "../data/clients";

const MIN_ITEMS = 8;

// Repeats the list so each row is always wider than the screen, even with few clients.
const fill = (list) => {
  const times = Math.max(1, Math.ceil(MIN_ITEMS / list.length));
  return Array.from({ length: times }).flatMap(() => list);
};

const fade = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

function Logo({ c }) {
  const initial = c.name.trim().charAt(0).toUpperCase();
  const hasLogo = c.logo && c.logo.startsWith("/");

  return (
    <div className="group mx-2 flex h-20 shrink-0 items-center gap-3 rounded-2xl bg-white px-4 shadow-[0_8px_24px_-14px_rgba(76,50,190,0.35)] ring-1 ring-[#6c47ff]/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(76,50,190,0.45)] hover:ring-[#6c47ff]/40 sm:mx-3 sm:h-24 sm:px-6">
      {hasLogo ? (
        <span
          className={`relative block h-10 shrink-0 sm:h-12 ${
            c.wide ? "w-36 sm:w-52" : "w-24 sm:w-32"
          } ${c.dark ? "rounded-lg bg-[#1c1a4a]" : ""}`}
        >
          <Image
            src={c.logo}
            alt={`${c.name} logo`}
            fill
            sizes="(min-width: 640px) 208px, 144px"
            className={`object-contain ${c.dark ? "p-1.5" : ""}`}
          />
        </span>
      ) : (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8467f7] to-[#5a38e6] text-lg font-bold text-white sm:h-12 sm:w-12">
          {initial}
        </span>
      )}
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-sm font-semibold text-ink sm:text-base">{c.name}</span>
        {c.tag && <span className="block whitespace-nowrap text-[11px] text-[#6a67a0] sm:text-xs">{c.tag}</span>}
      </span>
    </div>
  );
}
function Row({ items, duration, reverse = false }) {
  return (
    <div className="logo-row overflow-hidden py-5" style={{ maskImage: fade, WebkitMaskImage: fade }}>
      <div
        className={`flex w-max ${reverse ? "logo-scroll-reverse" : "logo-scroll"}`}
        style={{ animationDuration: duration }}
      >
        <div className="flex">
          {items.map((c, i) => (
            <Logo key={`a-${i}`} c={c} />
          ))}
        </div>
        {/* Second copy makes the loop seamless; hidden from screen readers */}
        <div className="flex" aria-hidden="true">
          {items.map((c, i) => (
            <Logo key={`b-${i}`} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClientLogos() {
  if (!clients || clients.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f4ff] to-white py-12 md:py-16">
      <div aria-hidden="true" className="dots-light pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 hidden h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[#c9bdff]/30 blur-3xl md:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
        <span className="inline-block rounded-full bg-[#ece8ff] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#5a38e6]">
          Our Clients
        </span>
        <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
          Customers Who <span className="text-[#6c47ff]">Trust Us</span>
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#6c47ff]" />
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#2a2850] md:text-base">
          Businesses that rely on Credence Regulatory for their compliance and certification needs.
        </p>
      </div>

      <div className="relative mt-6 sm:mt-8">
        <Row items={fill(clients)} duration="40s" />
        <Row items={fill([...clients].reverse())} duration="52s" reverse />
      </div>

      <div className="relative mt-6 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#6c47ff] px-6 py-3 text-sm font-semibold text-[#2a1a8f] transition hover:-translate-y-0.5 hover:bg-[#6c47ff] hover:text-white"
        >
          Become our next success story <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}