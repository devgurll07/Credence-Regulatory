import Image from "next/image";
import Link from "next/link";
import { services } from "../data/services";

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="inline-block rounded bg-white px-3 py-2">
            <Image src="/logo.png" alt="Credence Regulatory" width={160} height={42} className="h-10 w-auto" />
          </div>
          <p className="mt-4 text-sm">
            Global business setup, compliance, trademark and professional services for international businesses.
          </p>
          <p className="mt-4 text-xs text-gray-400">Social media: coming soon</p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-gold">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-gold">Blog</Link></li>
            <li><Link href="/about" className="hover:text-gold">About</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Phone: <a href="tel:+917042032325" className="hover:text-gold">+91 7042032325</a></li>
            <li>WhatsApp: <a href="https://wa.me/918800672422" className="hover:text-gold">+91 8800672422</a></li>
            <li><a href="mailto:sails.credenceregulatory@gmail.com" className="break-all hover:text-gold">sails.credenceregulatory@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} Credence Regulatory. All rights reserved.
      </div>
    </footer>
  );
}