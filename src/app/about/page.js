import Link from "next/link";
import Reveal from "../../components/Reveal";
import VideoBox from "../../components/VideoBox";
import AnimatedBg from "../../components/AnimatedBg";
import EnquiryForm from "../../components/EnquiryForm";

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

const h2 =
  "font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d0b3e] md:text-4xl";
const para = "mt-4 text-base font-medium leading-8 text-[#1c1a4a] md:text-lg";

export default function AboutPage() {
  return (
    <main>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f4ff] to-white">
        <AnimatedBg variant="light" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 md:pb-14 md:pt-16">
          <span className="inline-block rounded-full bg-[#ece8ff] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#4b2fd0]">
            About Credence Regulatory
          </span>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-playfair)] text-3xl font-bold leading-tight text-[#0d0b3e] sm:text-4xl md:text-5xl">
            Your Trusted Partner for Cross-Border{" "}
            <span className="text-[#6c47ff]">Business Compliance</span>
          </h1>
          <div className="mt-4 h-1 w-16 rounded bg-[#6c47ff]" />
        </div>
      </section>

      {/* CONTENT + ENQUIRY FORM */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-10 sm:px-6 md:py-14 lg:flex-row lg:items-start lg:gap-12">
        <div className="min-w-0 flex-1 space-y-14 md:space-y-16">
          {/* Who We Are */}
          <Reveal>
            <h2 className={h2}>Who We Are</h2>
            <p className={para}>
              Credence Regulatory is a professional services firm that helps international
              businesses set up, protect and grow their presence across borders. We handle
              foreign company registration, document attestation and international
              trademark registration from start to finish.
            </p>
            <p className={para}>
              Our aim is simple: remove the legal and paperwork complexity so you can focus on your business.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 border-[#6c47ff] bg-white p-5 shadow-sm ring-1 ring-[#6c47ff]/10">
                <h3 className="text-lg font-bold text-[#0d0b3e]">Our Mission</h3>
                <p className="mt-2 text-sm font-medium text-[#1c1a4a] md:text-base">
                  Make international expansion simple, compliant and stress-free.
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-[#6c47ff] bg-white p-5 shadow-sm ring-1 ring-[#6c47ff]/10">
                <h3 className="text-lg font-bold text-[#0d0b3e]">Our Vision</h3>
                <p className="mt-2 text-sm font-medium text-[#1c1a4a] md:text-base">
                  Be the most trusted regulatory partner for global businesses.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <VideoBox title="Who We Are" src="/videos/who-we-are.mp4" />
          </Reveal>

          {/* Why Choose Us */}
          <Reveal>
            <h2 className={h2}>Why Choose Us</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  className="rounded-xl bg-white p-5 shadow-[0_8px_24px_-14px_rgba(76,50,190,0.3)] ring-1 ring-[#6c47ff]/10 transition hover:-translate-y-1 hover:ring-[#6c47ff]/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ece8ff] text-sm font-bold text-[#5a38e6]">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#0d0b3e]">{r.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-[#1c1a4a] md:text-base">{r.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Enquiry form */}
        <aside
          id="enquiry"
          className="w-full scroll-mt-24 lg:sticky lg:top-24 lg:w-[22rem] lg:shrink-0 lg:self-start xl:w-[24rem]"
        >
          <EnquiryForm />
        </aside>
      </div>

      {/* CTA */}
      <section className="px-4 pb-12 sm:px-6 md:pb-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-[#f6f4ff] to-[#e6e9ff] px-6 py-12 text-center shadow-sm ring-1 ring-[#6c47ff]/10 md:py-14">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#0d0b3e] md:text-4xl">
            Let&rsquo;s Talk About Your Business
          </h2>
          <p className="mt-4 text-base font-medium text-[#1c1a4a] md:text-lg">
            Share your requirement and our experts will guide you on the next steps.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#6c47ff] px-8 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#5a38e6]"
            >
              Talk to an Expert <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              href="https://wa.me/918800672422"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border-2 border-[#6c47ff] px-8 py-3 font-semibold text-[#2a1a8f] transition hover:-translate-y-0.5 hover:bg-[#6c47ff] hover:text-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}