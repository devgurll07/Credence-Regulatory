import Link from "next/link";
import ServiceIcon from "./ServiceIcon";
import { services } from "../data/services";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-center justify-center gap-4">
        <span className="hidden h-px w-24 bg-gold/60 sm:block" />
        <h2 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">
          Our Comprehensive Services
        </h2>
        <span className="hidden h-px w-24 bg-gold/60 sm:block" />
      </div>
      <p className="mt-2 text-center text-navy">End-to-end solutions for your global business needs</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-gold/30 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold hover:shadow-lg"
          >
            <span className="shrink-0 text-gold">
              <ServiceIcon name={s.icon} />
            </span>
            <span className="flex-1 text-sm font-semibold leading-snug text-navy">{s.title}</span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs text-navy transition group-hover:bg-gold group-hover:text-white">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
