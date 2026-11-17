"use client";

import { useEffect, useRef, useState } from "react";
import { journey, trust } from "../data/stats";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const duration = 1500;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(value * p));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

function Group({ title, items, cols }) {
  return (
    <div>
      <h2 className="text-center font-[family-name:var(--font-playfair)] text-2xl font-bold md:text-3xl">
        {title}
      </h2>
      <div className={`mt-8 grid gap-6 text-center ${cols}`}>
        {items.map((it) => (
          <div key={it.label} className="rounded-xl border border-white/15 bg-white/5 p-6">
            <p className="text-4xl font-bold text-gold">
              <Counter value={it.value} suffix={it.suffix} />
            </p>
            <p className="mt-2 text-sm text-gray-200">{it.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-16">
        <Group title="Our Journey So Far" items={journey} cols="sm:grid-cols-3" />
        <Group title="Trusted Compliance & Technology Partner" items={trust} cols="grid-cols-2 md:grid-cols-4" />
      </div>
    </section>
  );
}
