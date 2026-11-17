import Link from "next/link";
import Reveal from "../../components/Reveal";
import ServiceIcon from "../../components/ServiceIcon";
import { services } from "../../data/services";

export const metadata = {
  title: "Services | Credence Regulatory",
  description: "End-to-end solutions for your global business needs.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Our Services</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
            Complete Support for Doing Business Across Borders
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2">
        {services.map((s) => (
          <Reveal key={s.slug}>
            <div className="h-full rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="text-gold"><ServiceIcon name={s.icon} /></span>
                <h2 className="text-xl font-semibold text-navy">{s.title}</h2>
              </div>
              <p className="mt-4 text-sm text-gray-600">{s.overview}</p>
              <Link href={`/services/${s.slug}`} className="mt-5 inline-block font-semibold text-gold">
                View Full Details →
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}