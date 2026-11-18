import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "../../../components/ServiceIcon";
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

function H2({ children }) {
  return <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy md:text-3xl">{children}</h2>;
}

function CardGrid({ items }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="rounded-xl border border-gold/30 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-navy">{it.title}</h3>
          {it.text && <p className="mt-2 text-sm leading-relaxed text-gray-600">{it.text}</p>}
        </div>
      ))}
    </div>
  );
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="text-gold"><ServiceIcon name={service.icon} className="h-12 w-12" /></span>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">{service.tagline}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="space-y-16 lg:col-span-2">
          {/* What it is */}
          <section>
            <H2>What It Is</H2>
            <div className="mt-4 space-y-4 text-gray-600">
              {(service.whatItIs || [service.overview]).map((p) => (
                <p key={p.slice(0, 40)} className="leading-relaxed">{p}</p>
              ))}
            </div>
          </section>

          {/* Who needs it */}
          {service.whoNeedsIt && (
            <section className="rounded-xl bg-cream p-6">
              <h2 className="text-xl font-bold text-navy">Who Needs It</h2>
              <p className="mt-3 text-gray-700">{service.whoNeedsIt}</p>
            </section>
          )}

          {/* Included */}
          {service.included?.length > 0 && (
            <section>
              <H2>What Is Included</H2>
              <CardGrid items={service.included} />
            </section>
          )}

          {/* Extra sections */}
          {service.extra?.map((sec) => (
            <section key={sec.title}>
              <H2>{sec.title}</H2>
              {sec.intro && <p className="mt-3 text-gray-600">{sec.intro}</p>}
              <CardGrid items={sec.items} />
            </section>
          ))}

          {/* Process */}
          {service.process?.length > 0 && (
            <section>
              <H2>How It Works</H2>
              <ol className="mt-6 space-y-5">
                {service.process.map((p, i) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-navy">{p.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Documents */}
          {service.documents?.length > 0 && (
            <section>
              <H2>Documents Usually Needed</H2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.documents.map((d) => (
                  <li key={d} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
                    <span className="font-bold text-gold">✔</span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-500">The exact list depends on your case. We confirm it after a short consultation.</p>
            </section>
          )}

          {/* Mistakes */}
          {service.mistakes?.length > 0 && (
            <section>
              <H2>Common Mistakes to Avoid</H2>
              <ul className="mt-5 space-y-3">
                {service.mistakes.map((m) => (
                  <li key={m} className="flex gap-3 text-gray-700">
                    <span className="text-amber-500">⚠</span>
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Important note */}
          {service.note && (
            <section className="rounded-xl border-l-4 border-gold bg-cream p-6">
              <h2 className="text-xl font-bold text-navy">Important to Know</h2>
              <p className="mt-3 text-gray-700">{service.note}</p>
            </section>
          )}

          {/* FAQs */}
          {service.faqs?.length > 0 && (
            <section>
              <H2>Frequently Asked Questions</H2>
              <div className="mt-6 space-y-3">
                {service.faqs.map((f) => (
                  <details key={f.q} className="group rounded-xl border border-gold/30 bg-white p-5 shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
                      {f.q}
                      <span className="shrink-0 text-2xl leading-none text-gold transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {service.timeline && (
            <div className="rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-navy">Typical Timeline</h3>
              <p className="mt-2 text-sm text-gray-600">{service.timeline}</p>
            </div>
          )}
          <div className="rounded-xl bg-navy p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold">Need help with this?</h3>
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