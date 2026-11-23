"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "../data/services";
import { menuTabs, groupsFor } from "../data/catalog";

const tabs = [
  ...menuTabs.map((t) => ({ label: t.label, groups: groupsFor(t.key) })),
  {
    label: "Global Services",
    groups: [
      {
        title: "Credence Global Services",
        items: services.map((s) => ({ href: `/services/${s.slug}`, title: s.title })),
      },
    ],
  },
  {
    label: "More",
    groups: [
      {
        title: "Company",
        items: [
          { href: "/about", title: "About Us" },
          { href: "/blog", title: "Blog" },
          { href: "/contact", title: "Contact" },
        ],
      },
      ...groupsFor("more"),
    ],
  },
];

const topLink =
  "flex items-center gap-1 py-5 text-sm font-medium transition hover:text-gold";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
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

      <header className="sticky top-0 z-40 bg-white text-ink shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" onClick={close} className="py-3">
           <Image src="/logo.png" alt="Credence Regulatory" width={180} height={48} priority className="h-auto w-36 sm:w-44" />
          </Link>

          {/* Desktop mega menu */}
          <ul className="hidden items-center gap-6 xl:flex">
            {tabs.map((tab) => (
              <li key={tab.label} className="group">
                <button className={topLink} aria-haspopup="true">
                  {tab.label} <span className="text-[10px]">▾</span>
                </button>

                <div className="invisible absolute left-0 right-0 top-full border-t border-gold/30 bg-white opacity-0 shadow-xl transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="mx-auto max-w-7xl px-6 py-8">
                    <div
                      className="grid gap-8"
                      style={{ gridTemplateColumns: `repeat(${Math.min(tab.groups.length, 4)}, minmax(0, 1fr))` }}
                    >
                      {tab.groups.map((g) => (
                        <div key={g.title}>
                          <p className="border-b border-gold/30 pb-2 text-xs font-bold uppercase tracking-widest text-gold">
                            {g.title}
                          </p>
                          <ul
                            className={`mt-3 gap-x-8 ${
                              tab.groups.length === 1 ? "grid grid-cols-3" : "space-y-1"
                            }`}
                          >
                            {g.items.map((it) => (
                              <li key={it.href}>
                                <Link href={it.href} className="block rounded py-1.5 text-[15px] text-gray-700 hover:text-gold">
                                  {it.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between rounded-lg bg-cream px-5 py-3 text-sm">
                      <span className="text-gray-600">Not sure which service you need?</span>
                      <Link href="/contact" className="font-semibold text-gold">Talk to an expert →</Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 xl:flex">
            <Link href="/login" className="text-sm font-medium hover:text-gold">Login</Link>
            <Link href="/signup" className="rounded border border-navy px-3 py-2 text-sm font-medium hover:bg-navy hover:text-white">
              Sign up
            </Link>
            <Link href="/contact" className="rounded bg-gold px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              Talk to an Expert
            </Link>
          </div>

          <button className="py-3 text-2xl xl:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="max-h-[80vh] overflow-y-auto border-t px-6 pb-6 pt-2 xl:hidden">
            {tabs.map((tab) => (
              <details key={tab.label} className="border-b py-3">
                <summary className="cursor-pointer font-semibold">{tab.label}</summary>
                <div className="mt-3 space-y-4 pl-2">
                  {tab.groups.map((g) => (
                    <div key={g.title}>
                      <p className="text-xs font-bold uppercase tracking-widest text-gold">{g.title}</p>
                      <ul className="mt-2 space-y-2">
                        {g.items.map((it) => (
                          <li key={it.href}>
                            <Link href={it.href} onClick={close} className="block text-sm text-gray-700">{it.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <div className="flex gap-3 pt-4">
              <Link href="/login" onClick={close} className="rounded border border-navy px-4 py-2">Login</Link>
              <Link href="/signup" onClick={close} className="rounded border border-navy px-4 py-2">Sign up</Link>
            </div>
            <Link href="/contact" onClick={close} className="mt-4 block rounded bg-gold px-5 py-3 text-center font-semibold text-white">
              Talk to an Expert
            </Link>
          </div>
        )}
      </header>
    </>
  );
}