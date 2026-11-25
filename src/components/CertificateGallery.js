"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Logo({ className = "h-5" }) {
  return (
    <Image src="/logo.png" alt="Credence Regulatory" width={140} height={38} className={`${className} w-auto`} />
  );
}

export default function CertificateGallery({
  items,
  eyebrow = "Proof of Work",
  title = "Our Certificates",
  subtitle = "A few of the certificates we have helped our clients obtain.",
}) {
  const [open, setOpen] = useState(null); // index of the opened certificate, or null
  const count = items ? items.length : 0;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + count) % count)),
    [count]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  if (!count) return null;

  const current = open !== null ? items[open] : null;
  const navBtn =
    "absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-[#0d0b3e] shadow-lg transition hover:bg-white";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f4ff] to-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#ece8ff] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#4b2fd0]">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d0b3e] md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#6c47ff]" />
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-[#1c1a4a] md:text-lg">{subtitle}</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
          {items.map((c, i) => (
            <button
              key={c.image}
              type="button"
              onClick={() => setOpen(i)}
              className="group w-[calc(50%-6px)] text-left sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
              aria-label={`View ${c.title}`}
            >
              <span className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_-14px_rgba(76,50,190,0.35)] ring-1 ring-[#6c47ff]/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_32px_-14px_rgba(76,50,190,0.45)] group-hover:ring-[#6c47ff]/40">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-contain p-2"
                />
                <span className="absolute left-2 top-2 rounded-md bg-white/95 px-1.5 py-1 shadow-sm ring-1 ring-[#6c47ff]/10">
                  <Logo className="h-4 sm:h-5" />
                </span>
                <span className="absolute bottom-2 right-2 rounded-full bg-[#6c47ff] px-2.5 py-1 text-[11px] font-bold text-white opacity-90 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                  View
                </span>
              </span>
              <span className="mt-2 block text-sm font-bold text-[#0d0b3e] sm:text-base">{c.title}</span>
              {c.caption && <span className="block text-xs font-medium text-[#4a4780] sm:text-sm">{c.caption}</span>}
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={close}
        >
          <div className="relative flex h-[88vh] w-full max-w-3xl flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex-1 overflow-hidden rounded-t-lg bg-white">
              <Image src={current.image} alt={current.title} fill sizes="100vw" className="object-contain" />
              <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 shadow ring-1 ring-[#6c47ff]/10">
                <Logo className="h-7" />
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-lg border-t border-[#6c47ff]/15 bg-white px-4 py-3">
              <div>
                <p className="text-base font-bold text-[#0d0b3e]">{current.title}</p>
                {current.label && <p className="text-xs font-semibold text-[#4a4780]">Service: {current.label}</p>}
              </div>
              {current.href && (
                <Link
                  href={current.href}
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-full bg-[#6c47ff] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#5a38e6]"
                >
                  Explore this service <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -top-3 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-[#0d0b3e] shadow-lg sm:-right-3"
            >
              &times;
            </button>
            {count > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous" className={`${navBtn} left-2`}>
                  &larr;
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next" className={`${navBtn} right-2`}>
                  &rarr;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}