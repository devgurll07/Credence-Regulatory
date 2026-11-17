"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "../data/services";

const underline =
  "relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-gold hover:after:w-full";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {/* Top info bar */}
      <div className="hidden bg-navy text-xs text-gray-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <p>🌍 Global Business Compliance Partner</p>
          <div className="flex gap-6">
            <a href="tel:+917042032325" className="hover:text-white">📞 +91 7042032325</a>
            <a href="mailto:sails.credenceregulatory@gmail.com" className="hover:text-white">
              ✉ sails.credenceregulatory@gmail.com
            </a>
          </div>
        </div>
      </div>

      <header className="animate-fade-up sticky top-0 z-40 bg-white/95 text-navy shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" onClick={close}>
            <Image src="/logo.png" alt="Credence Regulatory" width={180} height={48} priority className="h-12 w-auto" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 font-medium lg:flex">
            <li className="group relative">
              <Link href="/services" className={underline}>Services ▾</Link>
              <div className="invisible absolute left-0 top-full w-96 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="rounded-lg bg-white p-3 shadow-xl ring-1 ring-black/5">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="block rounded-md p-3 hover:bg-cream">
                      <p className="font-semibold text-navy">{s.title}</p>
                      <p className="mt-1 text-xs font-normal text-gray-500">{s.tagline}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li><Link href="/about" className={underline}>About</Link></li>
            <li><Link href="/contact" className={underline}>Contact</Link></li>
          </ul>

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="px-3 py-2 font-medium hover:text-gold">Login</Link>
            <Link href="/signup" className="rounded border border-navy px-4 py-2 font-medium hover:bg-navy hover:text-white">
              Sign up
            </Link>
            <Link href="/contact" className="rounded bg-gold px-5 py-2 font-semibold text-white transition hover:opacity-90">
              Talk to an Expert
            </Link>
          </div>

          <button className="text-2xl lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="space-y-4 border-t px-6 pb-6 pt-4 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Services</p>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} onClick={close} className="block">
                {s.title}
              </Link>
            ))}
            <Link href="/about" onClick={close} className="block">About</Link>
            <Link href="/contact" onClick={close} className="block">Contact</Link>
            <div className="flex gap-3 pt-2">
              <Link href="/login" onClick={close} className="rounded border border-navy px-4 py-2">Login</Link>
              <Link href="/signup" onClick={close} className="rounded border border-navy px-4 py-2">Sign up</Link>
            </div>
            <Link href="/contact" onClick={close} className="block rounded bg-gold px-5 py-3 text-center font-semibold text-white">
              Talk to an Expert
            </Link>
          </div>
        )}
      </header>
    </>
  );
}