
import Footer from "../components/Footer";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Credence Regulatory",
  description:
    "Foreign company registration, document attestation and international trademark registration for global businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}