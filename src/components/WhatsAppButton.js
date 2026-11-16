export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918800672422?text=Hello%20Credence%20Regulatory%2C%20I%20need%20help%20with%20my%20business%20services."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 font-semibold text-white shadow-lg hover:bg-green-600"
    >
      💬 <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}