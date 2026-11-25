"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FLIP = "transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1)";
const hidden = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };
const stop = (e) => e.stopPropagation();

function Logo({ className = "h-6" }) {
  return (
    <Image src="/logo.png" alt="Credence Regulatory" width={140} height={38} className={`${className} w-auto`} />
  );
}

const serviceBtn =
  "inline-flex items-center gap-2 rounded-full bg-[#6c47ff] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#5a38e6]";

export default function CertificateFlipbook({
  pages,
  eyebrow = "Proof of Work",
  title = "See It Step by Step",
  subtitle = "",
  ratio = 455 / 768, // page width / height; use a bigger number for landscape certificates
  ctaHref = "/contact",
  ctaLabel = "Talk to an Expert",
}) {
  const n = pages ? pages.length : 0;
  const [current, setCurrent] = useState(0); // 0..n; n shows the closing page
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const [reduce, setReduce] = useState(false);
  const wrap = useRef(null);
  const touchX = useRef(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Turns pages by itself while visible, until the visitor takes over
  useEffect(() => {
    if (!inView || paused || manual || reduce || n < 2) return;
    const id = setTimeout(() => setCurrent((c) => (c >= n ? 0 : c + 1)), current >= n ? 4000 : 4500);
    return () => clearTimeout(id);
  }, [inView, paused, manual, reduce, n, current]);

  if (!n) return null;

  const go = (i) => {
    setManual(true);
    setCurrent(Math.min(Math.max(i, 0), n));
  };
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  const activeDot = Math.min(current, n - 1);
  const arrowBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[#6c47ff]/30 bg-white text-lg text-[#0d0b3e] shadow-sm transition hover:bg-[#6c47ff] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0d0b3e]";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6f4ff] to-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <span className="inline-block rounded-full bg-[#ece8ff] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#4b2fd0]">
          {eyebrow}
        </span>
        <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d0b3e] md:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded bg-[#6c47ff]" />
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-base font-medium text-[#1c1a4a] md:text-lg">{subtitle}</p>
        )}
      </div>

      {/* The book */}
      <div
        ref={wrap}
        tabIndex={0}
        role="group"
        aria-label={title}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative mx-auto mt-10 w-full max-w-[22rem] outline-none md:max-w-[48rem]"
      >
        <div aria-hidden="true" className="absolute inset-x-6 -bottom-5 h-10 rounded-full bg-[#4a4594]/30 blur-2xl" />

        <div
          className="relative w-full overflow-hidden [aspect-ratio:var(--ar)] md:overflow-visible md:[aspect-ratio:calc(var(--ar)*2)]"
          style={{ "--ar": ratio, perspective: "2200px" }}
        >
          {/* Left page when the book is closed (desktop only) */}
          <div className="absolute inset-y-0 left-0 hidden w-1/2 flex-col items-center justify-center overflow-hidden rounded-l-xl bg-gradient-to-br from-[#3f3a8a] to-[#6c47ff] p-8 text-center text-white md:flex">
            <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-40" />
            <span className="relative rounded-lg bg-white px-4 py-2 shadow-md">
              <Logo className="h-9" />
            </span>
            <h3 className="relative mt-6 font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight">
              {title}
            </h3>
            <p className="relative mt-4 text-base font-medium text-white">
              {n} step{n > 1 ? "s" : ""} &middot; tap the page or use the arrows to turn it
            </p>
            <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/25 to-transparent" />
          </div>

          {/* Last page, shown after every leaf has turned */}
          <div className="absolute inset-y-0 left-0 flex w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#f6f4ff] to-[#e6e9ff] p-6 text-center md:left-1/2 md:w-1/2 md:rounded-l-none">
            <span className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 to-transparent" />
            <Logo className="h-9" />
            <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0d0b3e] md:text-3xl">
              Need this done for your documents?
            </h3>
            <p className="mt-3 text-base font-medium text-[#1c1a4a]">
              Our team handles every stamp, attestation and verification for you.
            </p>
            <Link href={ctaHref} className={`${serviceBtn} mt-5`}>
              {ctaLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
            <button type="button" onClick={() => go(0)} className="mt-3 text-sm font-semibold text-[#4b2fd0] underline">
              Read again
            </button>
          </div>

          {/* The turning pages */}
          {pages.map((p, i) => {
            const flipped = i < current;
            return (
              <div
                key={p.image}
                className="absolute inset-y-0 left-0 w-full md:left-1/2 md:w-1/2"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                  transition: reduce ? "none" : `${FLIP}, z-index 0s linear 0.45s`,
                  zIndex: flipped ? i + 1 : n - i + 1,
                }}
              >
                {/* Front: the certificate, with the Credence logo strip on top */}
                <div
                  className="absolute inset-0 cursor-pointer overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-[#6c47ff]/10 md:rounded-l-none"
                  style={hidden}
                  onClick={() => go(i + 1)}
                >
                  <div className="absolute inset-x-0 top-0 z-10 flex h-11 items-center justify-between border-b border-[#6c47ff]/15 bg-white px-3">
                    <Logo className="h-6" />
                    <span className="rounded-full bg-[#6c47ff] px-3 py-1 text-xs font-bold text-white">
                      Step {i + 1}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 top-11">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 384px, 90vw"
                      className="object-contain"
                    />
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Back: what this step is (shows on the left page on desktop) */}
                <div
                  className="absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white md:rounded-r-none"
                  style={{ ...hidden, transform: "rotateY(180deg)" }}
                  onClick={() => go(i)}
                >
                  <div className="flex h-11 shrink-0 items-center justify-between border-b border-[#6c47ff]/15 px-4 md:px-6">
                    <Logo className="h-6" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#4b2fd0]">
                      Step {i + 1} of {n}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-white to-[#f1eeff] p-6 md:p-8">
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight text-[#0d0b3e] md:text-4xl">
                      {p.title}
                    </h3>
                    <div className="mt-4 h-1 w-14 rounded bg-[#6c47ff]" />
                    <p className="mt-5 text-base font-medium leading-relaxed text-[#1c1a4a] md:text-lg">
                      {p.caption}
                    </p>
                    {p.href && (
                      <div className="mt-6">
                        <Link href={p.href} onClick={stop} className={serviceBtn}>
                          Explore this service <span aria-hidden="true">&rarr;</span>
                        </Link>
                        {p.label && (
                          <p className="mt-2 text-xs font-semibold text-[#4a4780]">Service: {p.label}</p>
                        )}
                      </div>
                    )}
                    <a
                      href={p.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={stop}
                      className="mt-5 w-fit text-sm font-semibold text-[#4b2fd0] underline"
                    >
                      View full image
                    </a>
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/15 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="relative mt-9 flex items-center justify-center gap-4">
        <button type="button" onClick={prev} disabled={current === 0} aria-label="Previous page" className={arrowBtn}>
          &larr;
        </button>
        <div className="flex items-center gap-2">
          {pages.map((p, i) => (
            <button
              key={p.image}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to step ${i + 1}: ${p.title}`}
              className={`h-2.5 rounded-full transition-all ${
                activeDot === i ? "w-8 bg-[#6c47ff]" : "w-2.5 bg-[#c9bdff]"
              }`}
            />
          ))}
        </div>
        <button type="button" onClick={next} disabled={current >= n} aria-label="Next page" className={arrowBtn}>
          &rarr;
        </button>
      </div>

      {/* Step details under the book on mobile */}
      <div className="mx-auto mt-6 max-w-[22rem] px-4 text-center md:hidden" aria-live="polite">
        {current < n ? (
          <>
            <p className="text-xs font-bold uppercase tracking-widest text-[#4b2fd0]">
              Step {current + 1} of {n}
            </p>
            <h3 className="mt-1 text-xl font-bold text-[#0d0b3e]">{pages[current].title}</h3>
            <p className="mt-2 text-base font-medium leading-relaxed text-[#1c1a4a]">{pages[current].caption}</p>
            {pages[current].href && (
              <div className="mt-4">
                <Link href={pages[current].href} className={serviceBtn}>
                  Explore this service <span aria-hidden="true">&rarr;</span>
                </Link>
                {pages[current].label && (
                  <p className="mt-2 text-xs font-semibold text-[#4a4780]">Service: {pages[current].label}</p>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-base font-medium text-[#1c1a4a]">Need this done for your documents? Talk to our team.</p>
        )}
      </div>
    </section>
  );
}