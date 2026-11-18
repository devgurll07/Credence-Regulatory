import LegalLayout from "../../components/LegalLayout";

export const metadata = { title: "Terms & Conditions | Credence Regulatory" };

const sections = [
  { title: "General Information", text: "The content on this website is for general information only. It is not legal, tax or financial advice, and rules and requirements change often. Please confirm current requirements for your specific case before acting." },
  { title: "Our Services", text: "Submitting an enquiry does not create a service agreement. Our services begin only after scope, fees and timelines are agreed in writing." },
  { title: "No Guarantee of Outcome", text: "Approvals, registrations, visas and certificates are decided by government and regulatory authorities. We prepare and file applications carefully, but we cannot guarantee any outcome or timeline." },
  { title: "Your Responsibilities", text: "You agree to provide accurate and complete information and documents. We are not responsible for delays or outcomes caused by incorrect or incomplete information." },
  { title: "Reviews and Feedback", text: "Reviews submitted through this website are checked before publishing. We may decline or remove reviews that are abusive, false or unrelated to our services." },
  { title: "Intellectual Property", text: "The content, design and logo of this website belong to Credence Regulatory and may not be copied or reused without permission." },
  { title: "Limitation of Liability", text: "To the extent permitted by law, Credence Regulatory is not liable for losses arising from the use of this website or from reliance on its general information." },
  { title: "Contact", text: "For questions about these terms, contact us at sails.credenceregulatory@gmail.com or +91 7042032325." },
];

export default function Page() {
  return <LegalLayout title="Terms & Conditions" updated="November 2026" sections={sections} />;
}