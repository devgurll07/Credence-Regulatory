"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import CookieBanner from "./CookieBanner";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}