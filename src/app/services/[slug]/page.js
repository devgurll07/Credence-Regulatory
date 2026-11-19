import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "../../../components/ServiceIcon";
import EnquiryForm from "../../../components/EnquiryForm";
import { allServices } from "../../../data/allServices";
import { serviceContent, whyUs } from "../../../data/serviceContent";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = allServices.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.title} | Credence Regulatory`, description: s.short };
}

const H2 = ({ children }) => (
  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl">{children}</h2>
);

function Section({ title, children }) {
  return (
    <section>
      <H2>{title}</H2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Cards({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-navy">{it.title}</h3>
          {it.text && <p className="mt-2 leading-relaxed text-gray-600">{it.text}</p>}
        </div>
      ))}
    </div>
  );
}

function Checks({ items }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((d) => (
        <li key={d} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-lg text-gray-700">
          <span className="font-bold text-gold">✔</span>
          {d}
        </li>
      ))}
    </ul>
  );
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const base = allServices.find((x) => x.slug === slug);
  if (!base) notFound();

  const s = { ...base, ...(serviceContent[slug] || {}) };
  const overview = s.whatItIs || [s.overview || s.short];
  const steps = s.procedure || s.process || [];
  const who = Array.isArray(s.whoUses) ? s.whoUses : s.whoNeedsIt ? [s.whoNeedsIt] : [];
  const related = s.group ? allServices.filter((x) => x.slug !== slug && x.group === s.group).slice(0, 6) : [];
  const para = "text-lg leading-8 text-gray-600";

  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link> / Services{s.group ? ` / ${s.group}` : ""}
          </p>
          {s.icon && <span className="mt-4 block text-gold"><ServiceIcon name={s.icon} className="h-12 w-12" /></span>}
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-6xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-200">{s.tagline || s.short}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="space-y-20 lg:col-span-2">
          <Section title="Overview">
            <div className="space-y-5">{overview.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
          </Section>

          {steps.length > 0 && (
            <Section title="Procedure">
              <ol className="space-y-6">
                {steps.map((p, i) => (
                  <li key={p.title} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-white">{i + 1}</span>
                    <div>
                      <h3 className="text-xl font-bold text-navy">{p.title}</h3>
                      <p className="mt-1 text-lg text-gray-600">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {s.about?.length > 0 && (
            <Section title={`About ${s.title}`}>
              <div className="space-y-5">{s.about.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
            </Section>
          )}

          {s.included?.length > 0 && <Section title="What Is Included"><Cards items={s.included} /></Section>}

          {s.extra?.map((sec) => (
            <Section key={sec.title} title={sec.title}>
              {sec.intro && <p className={`mb-5 ${para}`}>{sec.intro}</p>}
              <Cards items={sec.items} />
            </Section>
          ))}

          {who.length > 0 && <Section title="Who Uses This Service"><Checks items={who} /></Section>}

          {s.popularDocs?.length > 0 && <Section title="Popular Document Types We Handle"><Checks items={s.popularDocs} /></Section>}

          <Section title="Why Use Us for This Service"><Cards items={s.whyUs || whyUs} /></Section>

          {s.eligibility?.length > 0 && <Section title="Eligibility"><Checks items={s.eligibility} /></Section>}

          {s.documents?.length > 0 && (
            <Section title="Documents Required">
              <Checks items={s.documents} />
              <p className="mt-4 text-sm text-gray-500">The exact list depends on your case. We confirm it after a short consultation.</p>
            </Section>
          )}

          {s.importance?.length > 0 && (
            <Section title={`Why ${s.title} Is Important`}>
              <div className="space-y-5">{s.importance.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
            </Section>
          )}

          {s.mistakes?.length > 0 && (
            <Section title="Common Mistakes to Avoid">
              <ul className="space-y-3">
                {s.mistakes.map((m) => (
                  <li key={m} className="flex gap-3 text-lg text-gray-700"><span className="text-amber-500">⚠</span>{m}</li>
                ))}
              </ul>
            </Section>
          )}

          {s.note && (
            <section className="rounded-xl border-l-4 border-gold bg-cream p-6">
              <h2 className="text-2xl font-bold text-navy">Important to Know</h2>
              <p className={`mt-3 ${para}`}>{s.note}</p>
            </section>
          )}

          {s.faqs?.length > 0 && (
            <Section title="Frequently Asked Questions">
              <div className="space-y-3">
                {s.faqs.map((f) => (
                  <details key={f.q} className="group rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-navy">
                      {f.q}
                      <span className="shrink-0 text-3xl leading-none text-gold transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-lg text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}

          {related.length > 0 && (
            <Section title="Related Services">
              <div className="flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="rounded-full border border-gold/40 bg-white px-5 py-2 text-navy hover:bg-gold hover:text-white">
                    {r.title}
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-cream p-4 shadow-sm ring-1 ring-gold/30">
            <h3 className="px-2 pb-3 pt-2 text-xl font-bold text-navy">Submit Your Request</h3>
            <EnquiryForm defaultService={s.title} />
          </div>
          {s.timeline && (
            <div className="rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-navy">Typical Timeline</h3>
              <p className="mt-2 text-gray-600">{s.timeline}</p>
            </div>
          )}
          <a href="https://wa.me/918800672422" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-navy px-5 py-4 text-center font-semibold text-white hover:opacity-90">
            Chat on WhatsApp
          </a>
        </aside>
      </div>
    </main>
  );
}import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "../../../components/ServiceIcon";
import EnquiryForm from "../../../components/EnquiryForm";
import { allServices } from "../../../data/allServices";
import { serviceContent, whyUs } from "../../../data/serviceContent";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = allServices.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.title} | Credence Regulatory`, description: s.short };
}

const H2 = ({ children }) => (
  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl">{children}</h2>
);

function Section({ title, children }) {
  return (
    <section>
      <H2>{title}</H2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Cards({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-navy">{it.title}</h3>
          {it.text && <p className="mt-2 leading-relaxed text-gray-600">{it.text}</p>}
        </div>
      ))}
    </div>
  );
}

function Checks({ items }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((d) => (
        <li key={d} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-lg text-gray-700">
          <span className="font-bold text-gold">✔</span>
          {d}
        </li>
      ))}
    </ul>
  );
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const base = allServices.find((x) => x.slug === slug);
  if (!base) notFound();

  const s = { ...base, ...(serviceContent[slug] || {}) };
  const overview = s.whatItIs || [s.overview || s.short];
  const steps = s.procedure || s.process || [];
  const who = Array.isArray(s.whoUses) ? s.whoUses : s.whoNeedsIt ? [s.whoNeedsIt] : [];
  const related = s.group ? allServices.filter((x) => x.slug !== slug && x.group === s.group).slice(0, 6) : [];
  const para = "text-lg leading-8 text-gray-600";

  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link> / Services{s.group ? ` / ${s.group}` : ""}
          </p>
          {s.icon && <span className="mt-4 block text-gold"><ServiceIcon name={s.icon} className="h-12 w-12" /></span>}
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-6xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-200">{s.tagline || s.short}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="space-y-20 lg:col-span-2">
          <Section title="Overview">
            <div className="space-y-5">{overview.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
          </Section>

          {steps.length > 0 && (
            <Section title="Procedure">
              <ol className="space-y-6">
                {steps.map((p, i) => (
                  <li key={p.title} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-white">{i + 1}</span>
                    <div>
                      <h3 className="text-xl font-bold text-navy">{p.title}</h3>
                      <p className="mt-1 text-lg text-gray-600">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {s.about?.length > 0 && (
            <Section title={`About ${s.title}`}>
              <div className="space-y-5">{s.about.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
            </Section>
          )}

          {s.included?.length > 0 && <Section title="What Is Included"><Cards items={s.included} /></Section>}

          {s.extra?.map((sec) => (
            <Section key={sec.title} title={sec.title}>
              {sec.intro && <p className={`mb-5 ${para}`}>{sec.intro}</p>}
              <Cards items={sec.items} />
            </Section>
          ))}

          {who.length > 0 && <Section title="Who Uses This Service"><Checks items={who} /></Section>}

          {s.popularDocs?.length > 0 && <Section title="Popular Document Types We Handle"><Checks items={s.popularDocs} /></Section>}

          <Section title="Why Use Us for This Service"><Cards items={s.whyUs || whyUs} /></Section>

          {s.eligibility?.length > 0 && <Section title="Eligibility"><Checks items={s.eligibility} /></Section>}

          {s.documents?.length > 0 && (
            <Section title="Documents Required">
              <Checks items={s.documents} />
              <p className="mt-4 text-sm text-gray-500">The exact list depends on your case. We confirm it after a short consultation.</p>
            </Section>
          )}

          {s.importance?.length > 0 && (
            <Section title={`Why ${s.title} Is Important`}>
              <div className="space-y-5">{s.importance.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
            </Section>
          )}

          {s.mistakes?.length > 0 && (
            <Section title="Common Mistakes to Avoid">
              <ul className="space-y-3">
                {s.mistakes.map((m) => (
                  <li key={m} className="flex gap-3 text-lg text-gray-700"><span className="text-amber-500">⚠</span>{m}</li>
                ))}
              </ul>
            </Section>
          )}

          {s.note && (
            <section className="rounded-xl border-l-4 border-gold bg-cream p-6">
              <h2 className="text-2xl font-bold text-navy">Important to Know</h2>
              <p className={`mt-3 ${para}`}>{s.note}</p>
            </section>
          )}

          {s.faqs?.length > 0 && (
            <Section title="Frequently Asked Questions">
              <div className="space-y-3">
                {s.faqs.map((f) => (
                  <details key={f.q} className="group rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-navy">
                      {f.q}
                      <span className="shrink-0 text-3xl leading-none text-gold transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-lg text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}

          {related.length > 0 && (
            <Section title="Related Services">
              <div className="flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="rounded-full border border-gold/40 bg-white px-5 py-2 text-navy hover:bg-gold hover:text-white">
                    {r.title}
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-cream p-4 shadow-sm ring-1 ring-gold/30">
            <h3 className="px-2 pb-3 pt-2 text-xl font-bold text-navy">Submit Your Request</h3>
            <EnquiryForm defaultService={s.title} />
          </div>
          {s.timeline && (
            <div className="rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-navy">Typical Timeline</h3>
              <p className="mt-2 text-gray-600">{s.timeline}</p>
            </div>
          )}
          <a href="https://wa.me/918800672422" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-navy px-5 py-4 text-center font-semibold text-white hover:opacity-90">
            Chat on WhatsApp
          </a>
        </aside>
      </div>
    </main>
  );
}import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceIcon from "../../../components/ServiceIcon";
import EnquiryForm from "../../../components/EnquiryForm";
import { allServices } from "../../../data/allServices";
import { serviceContent, whyUs } from "../../../data/serviceContent";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = allServices.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.title} | Credence Regulatory`, description: s.short };
}

const H2 = ({ children }) => (
  <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl">{children}</h2>
);

function Section({ title, children }) {
  return (
    <section>
      <H2>{title}</H2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Cards({ items }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((it) => (
        <div key={it.title} className="rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-navy">{it.title}</h3>
          {it.text && <p className="mt-2 leading-relaxed text-gray-600">{it.text}</p>}
        </div>
      ))}
    </div>
  );
}

function Checks({ items }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((d) => (
        <li key={d} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-lg text-gray-700">
          <span className="font-bold text-gold">✔</span>
          {d}
        </li>
      ))}
    </ul>
  );
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const base = allServices.find((x) => x.slug === slug);
  if (!base) notFound();

  const s = { ...base, ...(serviceContent[slug] || {}) };
  const overview = s.whatItIs || [s.overview || s.short];
  const steps = s.procedure || s.process || [];
  const who = Array.isArray(s.whoUses) ? s.whoUses : s.whoNeedsIt ? [s.whoNeedsIt] : [];
  const related = s.group ? allServices.filter((x) => x.slug !== slug && x.group === s.group).slice(0, 6) : [];
  const para = "text-lg leading-8 text-gray-600";

  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm text-gray-300">
            <Link href="/" className="hover:text-white">Home</Link> / Services{s.group ? ` / ${s.group}` : ""}
          </p>
          {s.icon && <span className="mt-4 block text-gold"><ServiceIcon name={s.icon} className="h-12 w-12" /></span>}
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-6xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-200">{s.tagline || s.short}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3">
        <div className="space-y-20 lg:col-span-2">
          <Section title="Overview">
            <div className="space-y-5">{overview.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
          </Section>

          {steps.length > 0 && (
            <Section title="Procedure">
              <ol className="space-y-6">
                {steps.map((p, i) => (
                  <li key={p.title} className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-white">{i + 1}</span>
                    <div>
                      <h3 className="text-xl font-bold text-navy">{p.title}</h3>
                      <p className="mt-1 text-lg text-gray-600">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {s.about?.length > 0 && (
            <Section title={`About ${s.title}`}>
              <div className="space-y-5">{s.about.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
            </Section>
          )}

          {s.included?.length > 0 && <Section title="What Is Included"><Cards items={s.included} /></Section>}

          {s.extra?.map((sec) => (
            <Section key={sec.title} title={sec.title}>
              {sec.intro && <p className={`mb-5 ${para}`}>{sec.intro}</p>}
              <Cards items={sec.items} />
            </Section>
          ))}

          {who.length > 0 && <Section title="Who Uses This Service"><Checks items={who} /></Section>}

          {s.popularDocs?.length > 0 && <Section title="Popular Document Types We Handle"><Checks items={s.popularDocs} /></Section>}

          <Section title="Why Use Us for This Service"><Cards items={s.whyUs || whyUs} /></Section>

          {s.eligibility?.length > 0 && <Section title="Eligibility"><Checks items={s.eligibility} /></Section>}

          {s.documents?.length > 0 && (
            <Section title="Documents Required">
              <Checks items={s.documents} />
              <p className="mt-4 text-sm text-gray-500">The exact list depends on your case. We confirm it after a short consultation.</p>
            </Section>
          )}

          {s.importance?.length > 0 && (
            <Section title={`Why ${s.title} Is Important`}>
              <div className="space-y-5">{s.importance.map((p) => <p key={p.slice(0, 40)} className={para}>{p}</p>)}</div>
            </Section>
          )}

          {s.mistakes?.length > 0 && (
            <Section title="Common Mistakes to Avoid">
              <ul className="space-y-3">
                {s.mistakes.map((m) => (
                  <li key={m} className="flex gap-3 text-lg text-gray-700"><span className="text-amber-500">⚠</span>{m}</li>
                ))}
              </ul>
            </Section>
          )}

          {s.note && (
            <section className="rounded-xl border-l-4 border-gold bg-cream p-6">
              <h2 className="text-2xl font-bold text-navy">Important to Know</h2>
              <p className={`mt-3 ${para}`}>{s.note}</p>
            </section>
          )}

          {s.faqs?.length > 0 && (
            <Section title="Frequently Asked Questions">
              <div className="space-y-3">
                {s.faqs.map((f) => (
                  <details key={f.q} className="group rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-navy">
                      {f.q}
                      <span className="shrink-0 text-3xl leading-none text-gold transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-lg text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </Section>
          )}

          {related.length > 0 && (
            <Section title="Related Services">
              <div className="flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/services/${r.slug}`} className="rounded-full border border-gold/40 bg-white px-5 py-2 text-navy hover:bg-gold hover:text-white">
                    {r.title}
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-cream p-4 shadow-sm ring-1 ring-gold/30">
            <h3 className="px-2 pb-3 pt-2 text-xl font-bold text-navy">Submit Your Request</h3>
            <EnquiryForm defaultService={s.title} />
          </div>
          {s.timeline && (
            <div className="rounded-xl border border-gold/30 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-navy">Typical Timeline</h3>
              <p className="mt-2 text-gray-600">{s.timeline}</p>
            </div>
          )}
          <a href="https://wa.me/918800672422" target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-navy px-5 py-4 text-center font-semibold text-white hover:opacity-90">
            Chat on WhatsApp
          </a>
        </aside>
      </div>
    </main>
  );
}