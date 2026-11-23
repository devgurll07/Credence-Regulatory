import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">Error 404</p>
      <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-gray-600">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="mt-8 rounded bg-gold px-6 py-3 font-semibold text-white">Back to Home</Link>
    </main>
  );
}