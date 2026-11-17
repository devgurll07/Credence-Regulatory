import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../../../data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: `${service.title} | Credence Regulatory`, description: service.short };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main>
      {/* Header with image */}
      <section className="relative isolate overflow-hidden text-white">
        <Image src={service.image} alt={service.title} fill priority className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-navy/80" />
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h1 className="max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">{service.tagline}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="space-y-14 lg:col-span-2">
          <section>
            <h2 className="text-2xl font-bold text-navy">Overview</h2>
            <p className="mt-4 text-gray-600">{service.overview}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">What We Cover</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.subServices.map((sub) => (
                <div key={sub.title} className="rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-navy">{sub.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{sub.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">Our Process</h2>
            <ol className="mt-6 space-y-5">
              {service.process.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-navy">{p.title}</p>
                    <p className="text-sm text-gray-600">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">Documents Required</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
              {service.documents.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p className="mt-3 text-xs text-gray-500">The exact list depends on your case. We confirm it after a short consultation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-3">
              {service.faqs.map((f) => (
                <details key={f.q} className="rounded-lg border border-gray-200 p-4">
                  <summary className="cursor-pointer font-semibold text-navy">{f.q}</summary>
                  <p className="mt-3 text-sm text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl bg-navy p-6 text-white shadow-lg">
            <h3 className="text-xl font-semibold">Need help with this?</h3>
            <p className="mt-2 text-sm text-gray-300">Speak to an expert and get a clear plan for your case.</p>
            <Link href="/contact" className="mt-5 block rounded bg-gold px-5 py-3 text-center font-semibold text-white hover:opacity-90">
              Talk to an Expert
            </Link>
            <a href="https://wa.me/918800672422" target="_blank" rel="noopener noreferrer" className="mt-3 block rounded border border-white/40 px-5 py-3 text-center text-sm hover:bg-white/10">
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}