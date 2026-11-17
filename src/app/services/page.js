import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import { services } from "../../data/services";

export const metadata = {
  title: "Services | Credence Regulatory",
  description:
    "Foreign company registration, document attestation and international trademark registration services.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Our Services
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
            Complete Support for Doing Business Across Borders
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-6 py-20">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ${
                  i % 2 ? "md:order-2" : ""
                }`}
              >
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">
                  {s.title}
                </h2>
                <p className="mt-3 text-gray-600">{s.overview}</p>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {s.subServices.map((sub) => (
                    <li key={sub.title}>✔ {sub.title}</li>
                  ))}
                </ul>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-6 inline-block rounded bg-gold px-6 py-3 font-semibold text-white hover:opacity-90"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}