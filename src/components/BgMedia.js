"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BgMedia({
  video,
  image,
  alt = "",
  opacity = 0.5,
  position = "center",
  priority = false,
}) {
  const box = useRef(null);
  const vid = useRef(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!video || !box.current) return;
    // Slow data saver ya reduced-motion wale users ko image hi dikhao
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (reduce || saveData) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        const v = vid.current;
        if (v) (entry.isIntersecting ? v.play() : v.pause())?.catch?.(() => {});
      },
      { rootMargin: "200px" }
    );
    obs.observe(box.current);
    return () => obs.disconnect();
  }, [video]);

  return (
    <div ref={box} className="absolute inset-0" style={{ opacity }}>
      {image && (
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      )}
      {video && near && !failed && (
        <video
          ref={vid}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: position }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}