import LegalLayout from "../../components/LegalLayout";

export const metadata = { title: "Privacy Policy | Credence Regulatory" };

const sections = [
  { title: "Information We Collect", text: "When you submit an enquiry or review, we collect the details you provide, such as your name, email address, phone number, country, selected service and message. We may also collect basic website usage information, such as pages visited and device type." },
  { title: "How We Use Your Information", text: "We use your information to respond to your enquiry, provide our services, improve our website, and communicate with you about your request. We do not sell your personal information." },
  { title: "Who We Share It With", text: "We share information only with service providers who help us run the website and our services, such as hosting and database providers, and with authorities where required by law or needed to complete a service you requested." },
  { title: "Cookies and Analytics", text: "Our website may use cookies or similar technologies to understand how visitors use the site and to improve it." },
  { title: "Data Retention and Security", text: "We keep your information for as long as needed to provide our services and meet legal obligations. We take reasonable steps to protect it, but no online system can be guaranteed to be fully secure." },
  { title: "Your Choices", text: "You may ask us to access, correct or delete the information you have shared with us by contacting us at sails.credenceregulatory@gmail.com." },
  { title: "Changes to This Policy", text: "We may update this policy from time to time. The latest version will always be available on this page." },
];

export default function Page() {
  return <LegalLayout title="Privacy Policy" updated="November 2026" sections={sections} />;
}