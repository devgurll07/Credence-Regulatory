import { services } from "../data/services";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              Global Business Compliance Partner
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight md:text-5xl">
              Expand Your Business Across Borders with Confidence
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Foreign company registration, document attestation and international
              trademark registration, handled end to end by experts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/contact" className="rounded bg-gold px-6 py-3 font-semibold text-navy hover:opacity-90">
                Get Free Consultation
              </a>
              <a href="/services" className="rounded border border-white px-6 py-3 font-semibold hover:bg-white hover:text-navy">
                Explore Services
              </a>
            </div>
          </div>
          <div className="rounded-lg bg-navy-light p-8">
            <p className="text-gray-300">(Yahan baad mein image aayegi)</p>
          </div>
        </div>
      </section>

      {/* Trust numbers (placeholder, asli numbers baad mein) */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 text-center md:grid-cols-4">
          {[
            { number: "500+", label: "Clients Served" },
            { number: "30+", label: "Countries" },
            { number: "1000+", label: "Documents Attested" },
            { number: "100%", label: "Compliance Focus" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-3xl font-bold text-navy">{item.number}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services (sirf ek baar) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">
          Our Services
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} className="rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md">
              <h3 className="text-xl font-semibold text-navy">{s.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{s.short}</p>
              <a href={`/services/${s.slug}`} className="mt-4 inline-block font-semibold text-gold">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}