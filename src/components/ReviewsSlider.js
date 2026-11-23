"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Stars from "./Stars";

function Card({ r }) {
  const initial = (r.name || "?").trim().charAt(0).toUpperCase();
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-gold/15 bg-white p-5 shadow-sm">
      <Stars rating={r.rating || 5} className="text-lg" />
      <blockquote className="mt-3 flex-1 break-words text-sm leading-relaxed text-[#2a2850]">
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {r.photo ? (
          <Image src={r.photo} alt={r.name} width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 font-semibold text-gold">
            {initial}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate font-semibold text-ink">{r.name}</span>
          {r.country && <span className="block text-xs text-gray-500">{r.country}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ReviewsSlider({ reviews }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const rated = reviews.filter((r) => r.rating);
  const average = rated.length ? rated.reduce((s, r) => s + r.rating, 0) / rated.length : null;

  function slide(dir) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.offsetWidth + 16 : 300;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    const atStart = el.scrollLeft <= 8;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  useEffect(() => {
    if (paused || showAll || reviews.length < 2) return;
    const id = setInterval(() => slide(1), 4500);
    return () => clearInterval(id);
  }, [paused, showAll, reviews.length]);

  const arrow =
    "flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white text-lg text-ink shadow-sm transition hover:bg-gold hover:text-white";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Client Reviews</p>
          <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
            What Our Clients Say
          </h2>
          {average && (
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
              <Stars rating={Math.round(average * 2) / 2} className="text-xl sm:text-2xl" />
              <span className="text-xl font-bold text-ink sm:text-2xl">{average.toFixed(1)} / 5</span>
              <span className="text-sm text-gray-500">
                based on total review{rated.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
        {!showAll && (
          <div className="flex gap-2">
            <button onClick={() => slide(-1)} aria-label="Previous review" className={arrow}>&larr;</button>
            <button onClick={() => slide(1)} aria-label="Next review" className={arrow}>&rarr;</button>
          </div>
        )}
      </div>

      {showAll ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name + r.quote} r={r} />
          ))}
        </div>
      ) : (
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
        >
          {reviews.map((r) => (
            <div
              key={r.name + r.quote}
              className="flex w-[85%] shrink-0 snap-start sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
            >
              <Card r={r} />
            </div>
          ))}
        </div>
      )}

      {reviews.length > 3 && (
        <div className="mt-6 text-center sm:mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded-full bg-gold px-8 py-3 font-semibold text-white shadow transition hover:opacity-90"
          >
            {showAll ? "Show Less" : "View All Reviews"}
          </button>
        </div>
      )}
    </div>
  );
}