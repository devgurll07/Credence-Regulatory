import EnquiryForm from "../../components/EnquiryForm";

export const metadata = {
  title: "Contact Us | Credence Regulatory",
  description: "Get a free consultation for foreign company registration, document attestation and international trademark registration.",
};

export default function ContactPage() {
  return (
    <main className="bg-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-navy">
            Let's Talk About Your Business
          </h1>
          <p className="mt-4 text-gray-600">
            Share your requirement and our experts will get back to you within one business day.
          </p>

          <ul className="mt-8 space-y-3 text-gray-700">
            <li>📞 <a href="tel:+917042032325" className="hover:text-gold">+91 7042032325</a></li>
            <li>💬 <a href="https://wa.me/918800672422" className="hover:text-gold">+91 8800672422 (WhatsApp)</a></li>
            <li>✉️ <a href="mailto:sails.credenceregulatory@gmail.com" className="hover:text-gold">sails.credenceregulatory@gmail.com</a></li>
          </ul>
        </div>

        <EnquiryForm />
      </div>
    </main>
  );
}