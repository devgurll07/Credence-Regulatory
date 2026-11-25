import Image from "next/image";
import Link from "next/link";
import { services } from "../data/services";

const link = "hover:text-white hover:underline";

export default function Footer() {
  return (
   <footer className="bg-gradient-to-br from-navy to-navy-light text-white/85">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-10 lg:py-14">
        <div>
          <div className="inline-block rounded bg-white px-3 py-2">
            <Image src="/logo.png" alt="Credence Regulatory" width={160} height={42} className="h-auto w-32" />
          </div>
          <p className="mt-4 text-sm">
            Global business setup, compliance, trademark and professional services for international businesses.
          </p>
          <p className="mt-4 text-xs text-white/60">Social media: coming soon</p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={link}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className={link}>Blog</Link></li>
            <li><Link href="/about" className={link}>About</Link></li>
            <li><Link href="/contact" className={link}>Contact</Link></li>
            <li><Link href="/certificates" className={link}>Certificates</Link></li>
            <li><Link href="/privacy-policy" className={link}>Privacy Policy</Link></li>
            <li><Link href="/terms" className={link}>Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Phone: <a href="tel:+917042032325" className={link}>+91 7042032325</a></li>
            <li>WhatsApp: <a href="https://wa.me/918800672422" className={link}>+91 8800672422</a></li>
            <li>
              <a href="mailto:sails.credenceregulatory@gmail.com" className={`break-all ${link}`}>
                sails.credenceregulatory@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Extra bottom padding on mobile so the floating buttons never cover this line */}
      <div className="border-t border-white/15 px-4 pb-20 pt-4 text-center text-xs sm:pb-4">
        &copy; {new Date().getFullYear()} Credence Regulatory. All rights reserved.
      </div>
    </footer>
  );
}