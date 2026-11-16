import { services } from "../../data/services";

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-navy">Our Services</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div key={s.slug} className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-navy">{s.title}</h2>
            <p className="mt-3 text-sm text-gray-600">{s.short}</p>
            <a href={`/services/${s.slug}`} className="mt-4 inline-block font-semibold text-gold">View details →</a>
          </div>
        ))}
      </div>
    </main>
  );
}