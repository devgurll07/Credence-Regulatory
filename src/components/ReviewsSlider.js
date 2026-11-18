"use client";

import { useEffect, useRef, useState } from "react";
import Stars from "./Stars";
import ReviewCard from "./ReviewCard";

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
    const step = card ? card.offsetWidth + 24 : 320;
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
    "flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-white text-xl text-navy shadow-sm transition hover:bg-gold hover:text-white";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Client Reviews</p>
          <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl">
            What Our Clients Say
          </h2>
          {average && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Stars rating={Math.round(average * 2) / 2} className="text-2xl" />
              <span className="text-2xl font-bold text-navy">{average.toFixed(1)} / 5</span>
              <span className="text-sm text-gray-500">
                based on {rated.length} review{rated.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
        {!showAll && (
          <div className="flex gap-3">
            <button onClick={() => slide(-1)} aria-label="Previous review" className={arrow}>←</button>
            <button onClick={() => slide(1)} aria-label="Next review" className={arrow}>→</button>
          </div>
        )}
      </div>

      {showAll ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => <ReviewCard key={r.name + r.quote} r={r} />)}
        </div>
      ) : (
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {reviews.map((r) => (
            <div
              key={r.name + r.quote}
              className="min-w-[85%] shrink-0 snap-start sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
            >
              <ReviewCard r={r} />
            </div>
          ))}
        </div>
      )}

      {reviews.length > 3 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="rounded bg-gold px-8 py-3 font-semibold text-white shadow hover:opacity-90"
          >
            {showAll ? "Show Less" : "View All Reviews ↗"}
          </button>
        </div>
      )}
    </div>
  );
}