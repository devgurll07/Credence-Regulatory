import Reveal from "./Reveal";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gold">
            Client Testimonials
          </p>
          <h2 className="mt-2 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl">
            What Our Clients Say
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.name + t.company}>
              <figure className="h-full rounded-xl bg-cream p-6 shadow-sm">
                <span className="text-4xl leading-none text-gold">“</span>
                <blockquote className="mt-2 text-sm text-gray-700">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-gray-200 pt-4">
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.role}, {t.company} · {t.country}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}