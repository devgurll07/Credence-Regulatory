export default function AnimatedBg({ variant = "light" }) {
  if (variant === "dark") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-shift absolute inset-0 bg-gradient-to-r from-navy via-[#2b2f7a] to-navy" />
        <div className="bg-dots absolute inset-0 opacity-60" />
        <div className="blob-1 absolute -left-20 top-0 hidden h-80 w-80 rounded-full bg-gold/40 blur-3xl md:block" />
        <div className="blob-2 absolute -right-16 bottom-0 hidden h-96 w-96 rounded-full bg-sky-400/25 blur-3xl md:block" />
        <div className="absolute left-1/2 top-1/2 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 md:block">
          {[0, 2, 4].map((d) => (
            <span
              key={d}
              className="ring-pulse absolute inset-0 rounded-full border border-white/30"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

   return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="dots-light absolute inset-0" />
      <div className="blob-1 absolute -left-24 top-10 hidden h-80 w-80 rounded-full bg-gold/30 blur-3xl md:block" />
      <div className="blob-2 absolute -right-24 bottom-10 hidden h-96 w-96 rounded-full bg-sky-400/30 blur-3xl md:block" />
    </div>
  );
}