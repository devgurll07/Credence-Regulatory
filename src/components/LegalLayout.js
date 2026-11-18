export default function LegalLayout({ title, updated, sections }) {
  return (
    <main>
      <section className="bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-gray-300">Last updated: {updated}</p>
        </div>
      </section>
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-14">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-bold text-navy">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{s.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}