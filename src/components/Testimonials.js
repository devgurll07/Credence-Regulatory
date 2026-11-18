"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  function slide(dir) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("figure");
    const step = card ? card.offsetWidth + 24 : 320;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    const atStart = el.scrollLeft <= 8;

    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const id = setInterval(() => slide(1), 4000);
    return () => clearInterval(id);
  }, [paused]);

  if (testimonials.length === 0) return null;

  const arrow =
    "flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-white text-xl text-navy shadow-sm transition hover:bg-gold hover:text-white";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Client Testimonials</p>
            <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => slide(-1)} aria-label="Previous testimonial" className={arrow}>←</button>
            <button onClick={() => slide(1)} aria-label="Next testimonial" className={arrow}>→</button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="min-w-[280px] max-w-[280px] shrink-0 snap-start rounded-xl border border-gold/30 bg-cream p-6 shadow-sm sm:min-w-[340px] sm:max-w-[340px]"
            >
              <span className="text-5xl leading-none text-gold">“</span>
              <blockquote className="mt-2 min-h-[64px] text-gray-700">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-gold/20 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-semibold text-white">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-navy">{t.name}</span>
                  {(t.role || t.company || t.country) && (
                    <span className="block text-xs text-gray-500">
                      {[t.role, t.company, t.country].filter(Boolean).join(", ")}
                    </span>
                  )}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}