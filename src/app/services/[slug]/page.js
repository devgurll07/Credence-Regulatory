import { notFound } from "next/navigation";
import { services } from "../../../data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-navy">{service.title}</h1>
      <p className="mt-6 text-lg text-gray-600">{service.short}</p>

      <h2 className="mt-10 text-2xl font-semibold text-navy">What we offer</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
        {service.points.map((p) => <li key={p}>{p}</li>)}
      </ul>

      <a href="/contact" className="mt-10 inline-block rounded bg-gold px-6 py-3 font-semibold text-navy">
        Get Free Consultation
      </a>
    </main>
  );
}