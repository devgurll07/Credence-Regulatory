export default function AnimatedBg({ variant = "light" }) {
  if (variant === "dark") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy to-navy-light">
        <div className="bg-dots absolute inset-0 opacity-40" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="dots-light absolute inset-0" />
      <div className="absolute -right-24 top-0 hidden h-96 w-96 bg-[radial-gradient(circle_at_center,rgba(184,182,249,0.35),transparent_70%)] md:block" />
    </div>
  );
}