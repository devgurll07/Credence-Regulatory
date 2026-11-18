"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cr_consent")) setShow(true);
    } catch {}
  }, []);

  function choose(value) {
    try {
      localStorage.setItem("cr_consent", value);
      if (value === "declined") localStorage.removeItem("cr_vid");
    } catch {}
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] rounded-xl bg-white p-5 shadow-2xl ring-1 ring-black/10 sm:right-auto sm:max-w-md">
      <p className="text-sm text-gray-700">
        We use a small identifier to count visitors and improve this website. You can accept or decline. Read our{" "}
        <Link href="/privacy-policy" className="font-semibold text-gold underline">Privacy Policy</Link>.
      </p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => choose("accepted")} className="rounded bg-gold px-5 py-2 text-sm font-semibold text-white">Accept</button>
        <button onClick={() => choose("declined")} className="rounded border border-gray-300 px-5 py-2 text-sm">Decline</button>
      </div>
    </div>
  );
}