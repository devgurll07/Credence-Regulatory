"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// [left %, top %, delay s, size px]
const dots = [
  [12, 20, 0, 6], [25, 60, 1.2, 4], [38, 30, 2.4, 5], [47, 75, 0.6, 4],
  [58, 22, 1.8, 6], [66, 55, 3, 4], [78, 35, 0.9, 5], [88, 65, 2.1, 6],
  [18, 80, 3.4, 4], [92, 18, 1.5, 4], [52, 50, 2.7, 3], [72, 80, 0.3, 5],
];

export default function HeroScene({
  image,
  width,
  height,
  motionVideo,
  screenVideo,
  fullVideo,
  screen = { left: 42.7, top: 27.9, width: 15.2, height: 17.1 },
  clip,
  debug = false,
}) {
  const [open, setOpen] = useState(false);
  const full = fullVideo || screenVideo;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const box = {
    left: `${screen.left}%`,
    top: `${screen.top}%`,
    width: `${screen.width}%`,
    height: `${screen.height}%`,
  };
  const cx = screen.left + screen.width / 2;
  const cy = screen.top + screen.height / 2;

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        <div className={`absolute inset-0 ${motionVideo ? "" : "hero-zoom"}`}>
          {motionVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={image}
            >
              <source src={motionVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={image}
              alt="Credence Regulatory global business network"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}

          {/* Glow behind the laptop */}
          <div
            className="hero-glow pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ background: `radial-gradient(circle at ${cx}% ${cy}%, rgba(90,180,255,0.55), transparent 38%)` }}
          />

          {/* Sparkles */}
          {dots.map(([l, t, d, s], i) => (
            <span
              key={i}
              className="hero-dot pointer-events-none absolute rounded-full bg-white/90 shadow-[0_0_10px_3px_rgba(120,190,255,0.8)]"
              style={{ left: `${l}%`, top: `${t}%`, width: s, height: s, animationDelay: `${d}s` }}
            />
          ))}

          {/* Video on the laptop screen */}
          {screenVideo && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Play our video"
              className="group absolute hidden overflow-hidden md:block"
              style={{ ...box, clipPath: clip }}
            >
              <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata">
                <source src={screenVideo} type="video/mp4" />
              </video>
              <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/40">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs text-ink lg:h-10 lg:w-10 lg:text-sm">
                  ▶
                </span>
              </span>
            </button>
          )}

          {debug && <div className="pointer-events-none absolute border-2 border-dashed border-red-500" style={box} />}
        </div>
      </div>

      {/* Mobile button */}
      {screenVideo && (
        <div className="px-6 py-5 text-center md:hidden">
          <button onClick={() => setOpen(true)} className="rounded bg-gold px-6 py-3 font-semibold text-white">
            ▶ Watch our video
          </button>
        </div>
      )}

      {/* Full video popup */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="mb-2 ml-auto block text-3xl text-white"
            >
              ✕
            </button>
            <video className="aspect-video w-full rounded-xl bg-black" controls autoPlay playsInline>
              <source src={full} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}