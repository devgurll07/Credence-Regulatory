export const metadata = {
  title: "About Us | Credence Regulatory",
  description:
    "Credence Regulatory helps global businesses with foreign company registration, document attestation and international trademark registration.",
};

const values = [
  {
    title: "Compliance First",
    text: "Every filing and document is checked against the latest legal requirements before submission.",
  },
  {
    title: "Transparent Process",
    text: "Clear timelines, clear documents list and regular updates, so you always know where your case stands.",
  },
  {
    title: "Global Perspective",
    text: "We support businesses from different countries and understand cross-border requirements.",
  },
  {
    title: "Dedicated Support",
    text: "One point of contact for your case, reachable on phone, email and WhatsApp.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            About Credence Regulatory
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
            Your Trusted Partner for Cross-Border Business Compliance
          </h1>
        </div>
      </section>

      {/* Who we are */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">
            Who We Are
          </h2>
          <p className="mt-4 text-gray-600">
            Credence Regulatory is a professional services firm that helps
            international businesses set up, protect and grow their presence
            across borders. We handle foreign company registration, document
            attestation and international trademark registration from start to
            finish.
          </p>
          <p className="mt-4 text-gray-600">
            Our aim is simple: remove the legal and paperwork complexity so you
            can focus on running your business.
          </p>
        </div>

        <div className="rounded-lg bg-cream p-8">
          <h3 className="text-xl font-semibold text-navy">Our Mission</h3>
          <p className="mt-3 text-gray-600">
            To make international business expansion simple, compliant and
            stress-free for every client we work with.
          </p>
          <h3 className="mt-6 text-xl font-semibold text-navy">Our Vision</h3>
          <p className="mt-3 text-gray-600">
            To be the most trusted regulatory partner for global businesses.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">
            Why Clients Choose Us
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-navy">{v.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
            Ready to Expand Globally?
          </h2>
          <p className="mt-3 text-gray-300">
            Talk to our experts and get a free consultation.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-block rounded bg-gold px-6 py-3 font-semibold text-navy hover:opacity-90"
          >
            Get Free Consultation
          </a>
        </div>
      </section>
    </main>
  );
}