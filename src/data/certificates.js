import { allServices } from "./allServices";

// Finds the real service page by keywords (first match wins); falls back to /services.
const serviceHref = (...keywords) => {
  for (const k of keywords) {
    const s = allServices.find((x) => `${x.slug} ${x.title}`.toLowerCase().includes(k));
    if (s) return { href: `/services/${s.slug}`, label: s.title };
  }
  return { href: "/services", label: "Our Services" };
};

// Add one object per certificate image (saved in public/certificates/).
// `category` decides which service pages show it: lmpc, fssai, ewaste or bis.
export const certificates = [
  { category: "lmpc", title: "LMPC Certificate", caption: "Legal Metrology (Packaged Commodities)", image: "/images/certificates/lmpc-certificate.png", ...serviceHref("lmpc", "legal metrology") },
  { category: "fssai", title: "FSSAI Licence", caption: "Food Safety and Standards Authority of India", image: "/images/certificates/fssai-licence.png", ...serviceHref("fssai") },
  { category: "ewaste", title: "E-Waste Certificate", caption: "E-Waste Management", image: "/images/certificates/e-waste-licence.png", ...serviceHref("e-waste", "ewaste", "epr", "waste") },
  { category: "bis", title: "Gold Hallmark", caption: "BIS Hallmark", image: "/images/certificates/gold-bishallmark.png", ...serviceHref("hallmark", "bis") },
  { category: "bis", title: "Silver Hallmark", caption: "BIS Hallmark", image: "/images/certificates/silver-bishallmark.png", ...serviceHref("hallmark", "bis") },
];

// Words that connect a page (its slug and title) to a certificate category.
const keywords = {
  lmpc: ["lmpc", "legalmetrology"],
  fssai: ["fssai", "food"],
  ewaste: ["ewaste", "epr", "cpcb", "pollution"],
  bis: ["bis", "hallmark"],
};

// Pass the page's slug and title, e.g. certificatesFor(`${s.slug} ${s.title}`)
export function certificatesFor(text = "") {
  const tokens = text.toLowerCase().split(/[^a-z0-9]+/);
  const flat = tokens.join("");
  const matched = Object.keys(keywords).filter((cat) =>
    keywords[cat].some((k) => (k.length <= 4 ? tokens.includes(k) : flat.includes(k)))
  );
  return certificates.filter((c) => matched.includes(c.category));
}

// Flipbooks: a group of pages that turn like a book. Add more groups the same way.
export const flipbooks = [
  {
    key: "attestation",
    keywords: ["attestation", "apostille", "mofa"],
    title: "Attestation, Step by Step",
    subtitle: "A real document attestation handled by our team: notary, MEA apostille and UAE MOFA.",
    pages: [
      {
        image: "/images/certificates/attestation-1.jpg",
        title: "Notary & Apostille",
        caption: "Notary Public attestation, SDM seal and the apostille issued by the Ministry of External Affairs.",
        ...serviceHref("apostille", "attestation"),
      },
      {
        image: "/images/certificates/attestation-2.jpg",
        title: "MEA Attestation",
        caption: "Notary Public (Delhi) and Ministry of External Affairs seals confirming the document chain.",
        ...serviceHref("attestation", "apostille"),
      },
      {
        image: "/images/certificates/attestation-3.jpg",
        title: "UAE MOFA Attestation",
        caption: "Final attestation by the UAE Ministry of Foreign Affairs, digitally signed and verifiable online.",
        ...serviceHref("embassy", "mofa", "attestation"),
      },
    ],
  },
];

export function flipbookFor(text = "") {
  const t = text.toLowerCase();
  return flipbooks.find((f) => f.keywords.some((k) => t.includes(k))) || null;
}