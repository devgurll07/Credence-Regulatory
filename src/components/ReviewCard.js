import Image from "next/image";
import Stars from "./Stars";

export default function ReviewCard({ r }) {
  const sub = [r.role, r.company, r.country].filter(Boolean).join(", ");
  return (
    <figure className="flex h-full flex-col rounded-xl border border-gold/30 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className="font-[family-name:var(--font-playfair)] text-6xl font-bold leading-none text-gold">“</span>
        {r.rating && <Stars rating={r.rating} className="text-xl" />}
      </div>

      {r.title && <p className="mt-2 text-lg font-bold text-navy">{r.title}</p>}
      <blockquote className="mt-2 flex-1 leading-relaxed text-gray-600">{r.quote}</blockquote>

      <figcaption className="mt-6 flex items-center gap-4">
        {r.photo ? (
          <Image src={r.photo} alt={r.name} width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
        ) : (
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-xl font-semibold text-white">
            {r.name.charAt(0).toUpperCase()}
          </span>
        )}
        <span>
          <span className="block text-lg font-bold text-navy">{r.name}</span>
          {sub && <span className="block text-xs text-gray-500">{sub}</span>}
        </span>
      </figcaption>
    </figure>
  );
}