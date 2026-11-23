import Link from "next/link";
import Reveal from "../../components/Reveal";
import VideoBox from "../../components/VideoBox";
import BgMedia from "../../components/BgMedia";
import AnimatedBg from "../../components/AnimatedBg";


export const metadata = {
  title: "About Us | Credence Regulatory",
  description:
    "Credence Regulatory helps global businesses with foreign company registration, document attestation and international trademark registration.",
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
        {/* HEADER + WHO WE ARE (ek hi background image) */}
<div className="relative overflow-hidden bg-navy text-white">
  <BgMedia image="/images/about/about-who-we-are.jpeg" alt="" opacity={10} />
  <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/65 to-navy/90" />

  {/* Header */}
  <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-16">
    <p className="text-sm font-semibold uppercase tracking-widest text-gold">About Credence Regulatory</p>
    <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-playfair)] text-4xl font-bold md:text-5xl">
      Your Trusted Partner for Cross-Border Business Compliance
    </h1>
  </div>

  {/* Who We Are */}
  <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-12 md:grid-cols-2">
    <Reveal>
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-4xl">Who We Are</h2>
      <p className="mt-4 text-lg leading-8 text-gray-200">
        Credence Regulatory is a professional services firm that helps international
        businesses set up, protect and grow their presence across borders. We handle
        foreign company registration, document attestation and international
        trademark registration from start to finish.
      </p>
      <p className="mt-4 text-lg leading-8 text-gray-200">
        Our aim is simple: remove the legal and paperwork complexity so you can focus on your business.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
          <h3 className="font-semibold text-gold">Our Mission</h3>
          <p className="mt-2 text-sm text-gray-100">Make international expansion simple, compliant and stress-free.</p>
        </div>
        <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
          <h3 className="font-semibold text-gold">Our Vision</h3>
          <p className="mt-2 text-sm text-gray-100">Be the most trusted regulatory partner for global businesses.</p>
        </div>
      </div>
    </Reveal>
    <Reveal>
      <VideoBox title="Who We Are" src="/videos/who-we-are.mp4" />
    </Reveal>
  </div>
</div>
      {/* WHY CHOOSE US */}
<section className="relative overflow-hidden bg-navy text-white">
  <BgMedia image="/images/about/about-why-choose-us.png" alt="" opacity={10} position="right center" />
  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/20" />

  <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
    <Reveal className="md:w-1/2">
      <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-4xl">Why Choose Us</h2>
      <div className="mt-8 space-y-4">
        {reasons.map((r) => (
          <div key={r.title} className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <h3 className="font-semibold text-gold">{r.title}</h3>
            <p className="mt-1 text-sm text-gray-100">{r.text}</p>
          </div>
        ))}
      </div>
    </Reveal>
  </div>
</section>

      <section className="relative overflow-hidden bg-navy text-white">
  <AnimatedBg variant="dark" />
  <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
    <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold md:text-5xl">
      Let's Talk About Your Business
    </h2>
    <p className="mt-4 text-lg text-gray-200">
      Share your requirement and our experts will guide you on the next steps.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Link href="/contact" className="rounded bg-gold px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105">
        Talk to an Expert
      </Link>
      <a
        href="https://wa.me/918800672422"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border border-white px-8 py-3 font-semibold transition hover:bg-white hover:text-ink"
      >
        Chat on WhatsApp
      </a>
    </div>
  </div>
</section>
    </main>
  );
}