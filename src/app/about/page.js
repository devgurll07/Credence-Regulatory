import Image from "next/image";
import Link from "next/link";
import Reveal from "../../components/Reveal";
import VideoBox from "../../components/VideoBox";

export const metadata = {
  title: "About Us | Credence Regulatory",
  description: "Credence Regulatory helps global businesses with foreign company registration, document attestation and international trademark registration.",
};

const reasons = [
  { title: "Compliance First", text: "Every filing and document is checked against current legal requirements before submission." },
  { title: "Transparent Process", text: "Clear timelines, a clear document list and regular updates on your case." },
  { title: "Global Perspective", text: "We understand cross-border requirements and support clients from different countries." },
  { title: "Dedicated Support", text: "One point of contact, reachable on phone, email and WhatsApp." },
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">About Credence Regulatory</p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
            Your Trusted Partner for Cross-Border Business Compliance
          </h1>
        </div>
      </section>

      {/* WHO WE ARE + VIDEO */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <Reveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">Who We Are</h2>
          <p className="mt-4 text-gray-600">
            Credence Regulatory is a professional services firm that helps international
            businesses set up, protect and grow their presence across borders. We handle
            foreign company registration, document attestation and international
            trademark registration from start to finish.
          </p>
          <p className="mt-4 text-gray-600">
            Our aim is simple: remove the legal and paperwork complexity so you can focus on your business.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-cream p-5">
              <h3 className="font-semibold text-navy">Our Mission</h3>
              <p className="mt-2 text-sm text-gray-600">Make international expansion simple, compliant and stress-free.</p>
            </div>
            <div className="rounded-lg bg-cream p-5">
              <h3 className="font-semibold text-navy">Our Vision</h3>
              <p className="mt-2 text-sm text-gray-600">Be the most trusted regulatory partner for global businesses.</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <VideoBox title="Who We Are" /* youtubeId="PASTE_ID_HERE" */ />
        </Reveal>
      </section>

      {/* WHY CHOOSE US + IMAGES */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <Reveal>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">Why Choose Us</h2>
            <div className="mt-8 space-y-5">
              {reasons.map((r) => (
                <div key={r.title} className="rounded-lg bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-navy">{r.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{r.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/about/why-1.jpg" alt="Professional consultation" fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <Image src="/images/about/why-2.jpg" alt="Business documents and planning" fill className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">Let's Talk About Your Business</h2>
          <Link href="/contact" className="mt-6 inline-block rounded bg-gold px-6 py-3 font-semibold text-white hover:opacity-90">
            Talk to an Expert
          </Link>
        </div>
      </section>
    </main>
  );
}