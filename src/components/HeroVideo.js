"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroVideo({ src, poster, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
      {failed ? (
        <Image src={poster} alt={alt} fill priority className="object-cover" />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
    </div>
  );
}