"use client";

import { useState } from "react";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | norating

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rating) return setStatus("norating");
    setStatus("sending");
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setRating(0);
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full rounded border border-gray-300 px-4 py-3 text-gray-800 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-md ring-1 ring-black/5">
      <h3 className="text-center font-[family-name:var(--font-playfair)] text-2xl font-bold text-ink">
        Share Your Experience
      </h3>

      <div className="flex justify-center gap-1 text-4xl" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            className={n <= (hover || rating) ? "text-amber-400" : "text-gray-300"}
          >
            ★
          </button>
        ))}
      </div>

      <input name="name" required maxLength={100} placeholder="Your Name" className={input} />
      <input name="country" maxLength={100} placeholder="Country (optional)" className={input} />
      <textarea name="message" required minLength={10} maxLength={600} rows={4} placeholder="Tell us about your experience" className={input} />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-gold px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Submitting..." : "Submit Review"}
      </button>

      {status === "norating" && <p className="text-center text-sm text-red-600">Please select a star rating.</p>}
      {status === "success" && (
        <p className="text-center text-sm text-green-700">Thank you! Your review will appear after our team approves it.</p>
      )}
      {status === "error" && <p className="text-center text-sm text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}