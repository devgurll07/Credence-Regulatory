const pill =
  "flex h-12 w-12 items-center justify-center gap-2 rounded-full font-semibold text-white shadow-lg transition hover:scale-105 sm:h-auto sm:w-auto sm:px-5 sm:py-3";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Call */}
      <a
        href="tel:+917042032325"
        aria-label="Call us at +91 7042032325"
        className={`${pill} bg-gold hover:opacity-90`}
      >
        <span className="text-xl sm:text-base">📞</span>
        <span className="hidden sm:inline">+91 7042032325</span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/918800672422?text=Hello%20Credence%20Regulatory%2C%20I%20need%20help%20with%20my%20business%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${pill} bg-green-500 hover:bg-green-600`}
      >
        <span className="text-xl sm:text-base">💬</span>
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}