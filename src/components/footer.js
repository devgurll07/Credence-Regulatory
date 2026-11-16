import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-navy text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="inline-block rounded bg-white px-3 py-2">
  <Image src="/logo.png" alt="Credence Regulatory" width={160} height={42} className="h-10 w-auto" />
</div>
          <p className="mt-4 text-sm">
            Foreign company registration, document attestation and international
            trademark registration for global businesses.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-gold">Home</a></li>
            <li><a href="/services" className="hover:text-gold">Services</a></li>
            <li><a href="/about" className="hover:text-gold">About</a></li>
            <li><a href="/contact" className="hover:text-gold">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Phone: <a href="tel:+917042032325" className="hover:text-gold">+91 7042032325</a></li>
            <li>WhatsApp: <a href="https://wa.me/918800672422" className="hover:text-gold">+91 8800672422</a></li>
            <li>Email: <a href="mailto:sails.credenceregulatory@gmail.com" className="hover:text-gold">sails.credenceregulatory@gmail.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} Credence Regulatory. All rights reserved.
      </div>
    </footer>
  );
}