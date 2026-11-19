const s = (slug, title, menu, group, short, hot = false) => ({
  slug, title, menu, group, short, tagline: short, hot,
});

const D = "Documentation Services";

export const catalogServices = [
  // Documentation
  s("stamp-paper-notary", "Stamp Paper & Notary", "documentation", D, "Stamp paper, e-stamping and notary attestation for affidavits and agreements.", true),
  s("lease-rent-agreement", "Lease Deed & Rent Agreement", "documentation", D, "Rent and lease agreements drafted, stamped and executed correctly."),
  s("property-registry", "Property Registry", "documentation", D, "Sale deed and property registration support at the sub-registrar office."),
  s("contract-drafting", "Contract Drafting", "documentation", D, "Clear, enforceable contracts drafted around your deal and risks."),
  s("live-in-relationship-certificate", "Live-in Relationship Certificate", "documentation", D, "Agreement and documentation for couples in a live-in relationship."),
  s("court-marriage-registration", "Court Marriage & Registration", "documentation", D, "Marriage registration under the Special Marriage Act, with documentation support."),
  s("legal-notices", "Legal Notices", "documentation", D, "Drafting and sending of legal notices, and replies to notices received."),
  s("franchise-agreement", "Franchise Agreement", "documentation", D, "Franchise agreements covering rights, fees, territory and exit terms."),
  s("certified-copy", "Certified Copy", "documentation", D, "Certified true copies of court, registry and official records."),
  s("business-contracts", "Business Contracts", "documentation", D, "Vendor, service, NDA and partnership contracts for businesses."),
  s("police-cyber-fraud-complaint", "Police & Cyber Fraud Complaint", "documentation", D, "Help drafting and filing police and cyber fraud complaints."),
  s("consumer-complaint-rti", "Consumer Complaint & RTI", "documentation", D, "Consumer complaints and RTI applications drafted and filed."),

  // Legal & IPR
  s("bail-matters", "Bail Matters", "legal", "Criminal Cases", "Documentation and representation support for bail applications."),
  s("call-centre-crime-license", "Call Centre Crime & License", "legal", "Criminal Cases", "Legal support for call centre compliance and related matters."),
  s("cheque-bounce", "Cheque Bounce", "legal", "Criminal Cases", "Notices and cases under Section 138 of the Negotiable Instruments Act."),
  s("civil-criminal-litigation", "Civil & Criminal Litigation", "legal", "Litigation", "Representation in civil and criminal court matters."),
  s("arbitration-matrimonial-disputes", "Arbitration & Matrimonial Disputes", "legal", "Litigation", "Arbitration, mediation and family law dispute support."),
  s("trademark-registration", "Trademark Registration", "legal", "IPR Registration", "Protect your brand name and logo with a registered trademark.", true),
  s("copyright-registration", "Copyright", "legal", "IPR Registration", "Registration for books, music, software and other creative work."),
  s("patent-filing", "Patent", "legal", "IPR Registration", "Patent search, drafting and filing to protect your invention."),
  s("design-registration", "Design Registration", "legal", "IPR Registration", "Protect the look and shape of your product."),
  s("traffic-challan", "Traffic / MCD / NDMC Challan", "legal", "Challan", "Help with traffic, MCD and NDMC challans."),
  s("rto-gst-challan", "RTO / GST Challan", "legal", "Challan", "Help with RTO and GST related challans and penalties."),

  // Accounts & Tax
  s("private-limited-company", "Private Limited", "accounts", "Company Setup", "Register a private limited company with complete documentation.", true),
  s("public-limited-company", "Public Limited", "accounts", "Company Setup", "Incorporation of a public limited company."),
  s("nbfc-registration", "NBFC", "accounts", "Company Setup", "NBFC set-up and RBI registration support."),
  s("society-trust-registration", "Society & Trust", "accounts", "Company Setup", "Registration of societies, trusts and non-profit bodies."),
  s("opc-proprietorship", "OPC & Proprietorship", "accounts", "Company Setup", "One Person Company and proprietorship registration for solo founders."),
  s("bookkeeping-audit", "Book Keeping & Audit", "accounts", "Taxation & Filing", "Accounting, bookkeeping and audit support."),
  s("gst-return-filing", "GST Returns", "accounts", "Taxation & Filing", "Monthly, quarterly and annual GST return filing.", true),
  s("itr-filing", "ITR Filing", "accounts", "Taxation & Filing", "Income tax return filing for individuals, firms and companies."),
  s("annual-filing", "Annual Filing", "accounts", "Taxation & Filing", "Yearly company and LLP filings with the Registrar."),
  s("loan-project-reports", "Loan Project Reports", "accounts", "Others", "Project reports prepared for bank loans and funding."),
  s("debt-tribunal-appeal", "Loan & Debt Tribunal Appeal", "accounts", "Others", "Support in debt recovery tribunal matters and appeals."),
  s("document-attestation", "Document Attestation", "accounts", "Others", "Apostille and embassy attestation for your documents."),

  // Licenses
  s("drug-license", "Drug License", "licenses", "Healthcare", "Wholesale and retail drug licence for pharma businesses and chemists.", true),
  s("fssai-license", "FSSAI", "licenses", "License Filing", "FSSAI registration and licence for food businesses.", true),
  s("trade-license", "Trade License", "licenses", "License Filing", "Municipal trade licence for shops and businesses."),
  s("import-export-code", "Import Export Code", "licenses", "License Filing", "IEC registration from DGFT to start importing or exporting.", true),
  s("lmpc-certificate", "Legal Metrology (LMPC)", "licenses", "License Filing", "LMPC registration and label compliance for packaged goods.", true),
  s("epr-certificate", "EPR Certificate", "licenses", "License Filing", "EPR registration for plastic, e-waste and battery producers."),
  s("pims-registration", "PIMS Registration", "licenses", "License Filing", "Registration on the PIMS portal for covered products."),
  s("iso-certificate", "ISO Certificate", "licenses", "Certifications", "ISO certification support for quality and management systems.", true),
  s("apeda-registration", "APEDA", "licenses", "Certifications", "APEDA registration for exporters of agricultural products."),
  s("psara-license", "PSARA", "licenses", "Certifications", "Licence to run a private security agency."),
  s("bis-hallmark", "BIS / Hallmark", "licenses", "Certifications", "BIS certification and hallmarking registration.", true),
  s("sims-registration", "SIMS Registration", "licenses", "Certifications", "Registration on the SIMS portal for steel imports."),
  s("chims-registration", "CHIMS Registration", "licenses", "Certifications", "Registration on the CHIMS portal for chemical imports."),
  s("wpc-vno", "WPC / VNO", "licenses", "Telecom & Others", "WPC approval and VNO licence for wireless and telecom services."),
  s("bpo-license", "BPO License", "licenses", "Telecom & Others", "Registration for BPO and call centre operations."),

  // More
  s("certificate-of-origin", "Certificate of Origin", "more", "Other Services", "Certificates of origin for export shipments."),
  s("model-approval", "Model Approval", "more", "Other Services", "Legal metrology model approval for weighing and measuring devices."),
  s("gem-registration", "GeM Registration & Tenders", "more", "Other Services", "Seller registration on GeM and support for government tenders."),
  s("director-nomination", "Director Nomination", "more", "Other Services", "Director appointment, nomination and related filings."),
  s("mutual-fund-distributor-license", "Mutual Fund Distributor License", "more", "Other Services", "AMFI registration to distribute mutual funds."),
  s("ffmc-license", "FFMC License", "more", "Other Services", "Licence for full-fledged money changers."),
  s("weight-and-measurement", "Weight & Measurement", "more", "Other Services", "Legal metrology licences for manufacturers, dealers and repairers."),
];

export const menuTabs = [
  { key: "documentation", label: "Documentation" },
  { key: "legal", label: "Legal & IPR" },
  { key: "accounts", label: "Accounts & Tax" },
  { key: "licenses", label: "Licenses" },
];

export function groupsFor(menu) {
  const groups = [];
  catalogServices
    .filter((x) => x.menu === menu)
    .forEach((x) => {
      let g = groups.find((y) => y.title === x.group);
      if (!g) groups.push((g = { title: x.group, items: [] }));
      g.items.push({ href: `/services/${x.slug}`, title: x.title });
    });
  return groups;
}