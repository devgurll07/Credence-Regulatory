// Details shown in the preview card. A service is matched by a keyword in its title.
// DRAFT content: please confirm with sir and edit freely.
export const explorerDetails = [
  {
    match: "business setup",
    tagLabel: "Popular jurisdictions",
    tags: ["UAE", "USA", "Singapore", "UK", "India"],
    deliverables: [
      "Company name check and incorporation filings",
      "Licence, registered address and bank account support",
      "Post-incorporation compliance setup",
    ],
  },
  {
    match: "trademark",
    tagLabel: "Key authorities",
    tags: ["IP India", "WIPO (Madrid Protocol)", "USPTO", "EUIPO"],
    deliverables: [
      "Trademark search and availability report",
      "Application filing in India and abroad",
      "Objection replies and registration follow-up",
    ],
  },
  {
    match: "compliance",
    tagLabel: "Key authorities",
    tags: ["FEMA", "RBI", "MCA", "Tax authorities"],
    deliverables: [
      "Filing calendar and annual filings",
      "Regulatory health check",
      "Dedicated compliance advisory",
    ],
  },
  {
    match: "immigration",
    tagLabel: "Covers",
    tags: ["Business visas", "Work permits", "Residence permits"],
    deliverables: [
      "Visa and permit guidance by country",
      "Document checklist and application filing",
      "Support for business and work mobility",
    ],
  },
  {
    match: "professional",
    tagLabel: "Key authorities",
    tags: ["MCA / ROC", "Income Tax", "GST"],
    deliverables: [
      "Company law and secretarial compliance",
      "Accounting, audit and tax filings",
      "Legal drafting and notices",
    ],
  },
  {
    match: "virtual",
    tagLabel: "Best for",
    tags: ["Company registration address", "GST registration", "Meeting and workspace"],
    deliverables: [
      "Business address for registration and mail",
      "Virtual or physical office options",
      "Documentation for address proof",
    ],
  },
  {
    match: "manufacturing",
    tagLabel: "Key authorities",
    tags: ["BIS", "CPCB / SPCB", "FSSAI", "Factory licensing"],
    deliverables: [
      "Plant licences and approvals",
      "Layout, safety and compliance audit",
      "Quality and documentation systems",
    ],
  },
  {
    match: "import",
    tagLabel: "Key authorities",
    tags: ["DGFT", "Customs", "RBI (AD banks)"],
    deliverables: [
      "IEC and trade licence registration",
      "Import/export documentation and HS code guidance",
      "Customs and FEMA compliance support",
    ],
  },
  {
    match: "property",
    tagLabel: "Key authorities",
    tags: ["RERA", "Sub-Registrar", "Municipal bodies"],
    deliverables: [
      "Title and document verification",
      "Agreement drafting and registration support",
      "Approvals and property compliance",
    ],
  },
  {
    match: "networking",
    tagLabel: "What you get",
    tags: ["Partner introductions", "Business events", "Market entry"],
    deliverables: [
      "Introductions to partners and buyers",
      "Access to business networks and events",
      "Support to enter new markets",
    ],
  },
];

export const defaultDetail = {
  tagLabel: "Covers",
  tags: ["End-to-end support"],
  deliverables: [
    "Free consultation and clear plan",
    "Filing and documentation by our experts",
    "Delivery and ongoing support",
  ],
};

export function detailFor(title = "") {
  const t = title.toLowerCase();
  return explorerDetails.find((d) => t.includes(d.match)) || defaultDetail;
}