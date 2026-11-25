// Add one object per certificate image (saved in public/certificates/).
// `category` decides which service pages show it: lmpc, fssai, ewaste or bis.
export const certificates = [
  { category: "lmpc", title: "LMPC Certificate", caption: "Legal Metrology (Packaged Commodities)", image: "/certificates/lmpc-certificate.jpg" },
  { category: "fssai", title: "FSSAI Licence", caption: "Food Safety and Standards Authority of India", image: "/certificates/fssai-licence.jpg" },
  { category: "ewaste", title: "E-Waste Certificate", caption: "E-Waste Management", image: "/certificates/e-waste-certificate.jpg" },
  { category: "bis", title: "Gold Hallmark", caption: "BIS Hallmark", image: "/certificates/gold-hallmark.jpg" },
  { category: "bis", title: "Silver Hallmark", caption: "BIS Hallmark", image: "/certificates/silver-hallmark.jpg" },
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