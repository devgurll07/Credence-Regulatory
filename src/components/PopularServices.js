import Link from "next/link";
import { catalogServices } from "../data/catalog";

export default function PopularServices() {
  const hot = catalogServices.filter((s) => s.hot);
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-gold">Most Requested</p>
        <h2 className="mt-2 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-ink md:text-4xl">
          Popular Services
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {hot.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-xl border border-gold/30 bg-cream p-5 transition hover:-translate-y-1 hover:border-gold hover:shadow-lg">
              <h3 className="font-bold text-ink group-hover:text-gold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.short}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}