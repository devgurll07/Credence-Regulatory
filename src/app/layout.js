import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteShell from "../components/SiteShell";
import Tracker from "../components/Tracker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Credence Regulatory | Global Business Compliance Partner",
  description:
    "Global business setup, trademark and IP, compliance, immigration, legal CA CS, trade and more for international businesses.",
  openGraph: {
    title: "Credence Regulatory",
    description: "Your trusted partner for cross-border business.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Tracker />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}