import Link from "next/link";
import Reveal from "../components/Reveal";
import VideoBox from "../components/VideoBox";
import ServicesGrid from "../components/ServicesGrid";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import FaqSection from "../components/FaqSection";
import ReviewForm from "../components/ReviewForm";
import Hero from "../components/Hero";
import { generalFaqs } from "../data/faqs";
import ClientLogos from "../components/ClientLogos";
import CertificateGallery from "../components/CertificateGallery";
import { certificates } from "../data/certificates";

export const revalidate = 300;

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
      <Hero />
      <Stats />
      <ClientLogos />
      <CertificateGallery items={certificates} />
      <Testimonials />

      {/* TICKER */}
      <section className="overflow-hidden bg-gradient-to-r from-navy to-navy-light py-4 text-sm text-white/90">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i}>◆ {t}</span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <div className="bg-white">
        <ServicesGrid />
      </div>

      {/* HOW WE WORK */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 md:py-20">
          <Reveal>
            <VideoBox
              title="How We Work"
              src="/videos/How_We_Work.mp4"
            />
          </Reveal>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">How We Work</p>
            <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-ink sm:text-3xl">
              A Simple, Transparent Process
            </h2>
            <ol className="mt-6 space-y-5 md:mt-8">
              {steps.map((st, i) => (
                <li key={st.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{st.title}</p>
                    <p className="text-sm text-[#2a2850]">{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={generalFaqs} background="bg-white" aside={<ReviewForm />} />

      {/* CTA */}
      <section className="bg-gradient-to-r from-navy to-navy-light text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 md:py-16">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold sm:text-3xl md:text-4xl">
            Planning to Expand to a New Country?
          </h2>
          <p className="mt-3 text-white/85">Speak to our experts and get a clear plan for your requirement.</p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-ink shadow-lg transition hover:-translate-y-0.5"
          >
            Talk to an Expert
          </Link>
        </div>
      </section>
    </main>
  );
}