import Link from "next/link";
import ServiceIcon from "./ServiceIcon";
import { services } from "../data/services";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex items-center justify-center gap-4">
        <span className="hidden h-px w-24 bg-gold/60 sm:block" />
        <h2 className="text-center font-[family-name:var(--font-playfair)] text-2xl font-bold text-ink sm:text-3xl">
          Our Comprehensive Services
        </h2>
        <span className="hidden h-px w-24 bg-gold/60 sm:block" />
      </div>
      <p className="mt-2 text-center text-sm text-[#2a2850] sm:text-base">
        End-to-end solutions for your global business needs
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5 md:mt-10">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-gold/20 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-gold hover:shadow-lg sm:p-5"
          >
            <span className="shrink-0 text-gold">
              <ServiceIcon name={s.icon} />
            </span>
            <span className="flex-1 text-sm font-semibold leading-snug text-ink">{s.title}</span>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream text-xs text-ink transition group-hover:bg-gold group-hover:text-white">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}