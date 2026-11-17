import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";
import VideoBox from "../components/VideoBox";
import { services } from "../data/services";

const ticker = [
  "Foreign Company Registration",
  "Apostille",
  "Embassy Attestation",
  "International Trademark",
  "Madrid Protocol Filings",
  "Cross-Border Compliance",
];

const steps = [
  { title: "Free Consultation", text: "Tell us your goal and destination country." },
  { title: "Clear Plan", text: "We share the steps, documents and expected timeline." },
  { title: "We Execute", text: "Our team handles filings, attestation and follow-ups." },
  { title: "Delivery and Support", text: "You receive final documents and ongoing compliance support." },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-[#3b2a8f] text-white">
        <div className="bg-dots absolute inset-0" />
        <Image src="/images/world-map.svg" alt="" fill priority aria-hidden className="object-cover opacity-20" />
        <div className="animate-float absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
        <div className="animate-float absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up">
            <p className="mb-4 inline-block rounded-full border border-white/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
              🌍 For Global Businesses
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight md:text-6xl">
              Take Your Business Across Borders with Confidence
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Foreign company registration, document attestation and international
              trademark registration, handled end to end by experts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded bg-gold px-7 py-3 font-semibold text-white shadow-lg transition hover:scale-105">
                Talk to an Expert
              </Link>
              <Link href="/services" className="rounded border border-white px-7 py-3 font-semibold transition hover:bg-white hover:text-navy">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
              <Image src="/images/hero.jpg" alt="International business team" fill priority className="object-cover" />
            </div>
            <div className="animate-float absolute -bottom-5 -left-5 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-navy shadow-xl">
              ✅ Compliance-first approach
            </div>
            <div
              className="animate-float absolute -right-4 -top-4 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-navy shadow-xl"
              style={{ animationDelay: "1.5s" }}
            >
              🌐 Cross-border expertise
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <section className="overflow-hidden bg-navy py-4 text-sm text-gray-300">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i}>◆ {t}</span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gold">What We Do</p>
          <h2 className="mt-2 text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy md:text-4xl">
            Services Built for International Growth
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group block overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={s.image} alt={s.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy">{s.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{s.short}</p>
                  <span className="mt-4 inline-block font-semibold text-gold">Learn more →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <Reveal>
            <VideoBox title="How We Work" poster="/images/how-we-work-poster.jpg" /* youtubeId="PASTE_ID_HERE" */ />
          </Reveal>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">How We Work</p>
            <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">
              A Simple, Transparent Process
            </h2>
            <ol className="mt-8 space-y-5">
              {steps.map((st, i) => (
                <li key={st.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{st.title}</p>
                    <p className="text-sm text-gray-600">{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy to-navy-light text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-4xl">
            Planning to Expand to a New Country?
          </h2>
          <p className="mt-3 text-gray-300">Speak to our experts and get a clear plan for your requirement.</p>
          <Link href="/contact" className="mt-8 inline-block rounded bg-gold px-8 py-3 font-semibold text-white hover:opacity-90">
            Talk to an Expert
          </Link>
        </div>
      </section>
    </main>
  );
}