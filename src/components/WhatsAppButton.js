const pill =
  "flex h-11 w-11 items-center justify-center gap-2 rounded-full font-semibold text-white shadow-lg transition hover:scale-105 sm:h-auto sm:w-auto sm:px-5 sm:py-3";

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-5 w-5 shrink-0",
  "aria-hidden": true,
};

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5 sm:gap-3">
      <a
        href="tel:+917042032325"
        aria-label="Call us at +91 7042032325"
        className={`${pill} bg-gold hover:opacity-90`}
      >
        <svg {...icon}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="hidden sm:inline">+91 7042032325</span>
      </a>

      <a
        href="https://wa.me/918800672422?text=Hello%20Credence%20Regulatory%2C%20I%20need%20help%20with%20my%20business%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${pill} bg-green-500 hover:bg-green-600`}
      >
        <svg {...icon}>
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}