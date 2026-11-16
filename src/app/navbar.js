export default function Navbar() {
  return (
    <header className="bg-navy text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold">
          Credence <span className="text-gold">Regulatory</span>
        </a>

        <ul className="hidden gap-8 md:flex">
          <li><a href="/" className="hover:text-gold">Home</a></li>
          <li><a href="/services" className="hover:text-gold">Services</a></li>
          <li><a href="/about" className="hover:text-gold">About</a></li>
          <li><a href="/contact" className="hover:text-gold">Contact</a></li>
        </ul>

        <a
          href="/contact"
          className="rounded bg-gold px-5 py-2 font-semibold text-navy hover:opacity-90"
        >
          Free Consultation
        </a>
      </nav>
    </header>
  );
}