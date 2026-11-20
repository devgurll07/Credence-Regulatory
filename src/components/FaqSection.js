import Reveal from "./Reveal";
import AnimatedBg from "./AnimatedBg";


export default function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
  eyebrow = "FAQ",
  background = "bg-white",
  aside = null,
}) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const heading = aside ? "text-left" : "text-center";

  const list = (
    <>
      <Reveal>
        <p className={`${heading} text-sm font-semibold uppercase tracking-widest text-gold`}>{eyebrow}</p>
        <h2 className={`${heading} mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl`}>
          {title}
        </h2>
      </Reveal>

      <div className="mt-10 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-gold/30 bg-white p-5 shadow-sm open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
              {f.q}
              <span className="shrink-0 text-2xl leading-none text-gold transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );

  return (
   <section className={`relative overflow-hidden ${background}`}>
  <AnimatedBg variant="light" />
      {aside ? (
       <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-12 px-6 py-20 lg:grid-cols-2">
          <div>{list}</div>
          <div className="rounded-2xl bg-cream p-4 sm:p-6 lg:sticky lg:top-28">{aside}</div>
        </div>
      ) : (
       <div className="relative z-10 mx-auto max-w-3xl px-6 py-20">{list}</div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}