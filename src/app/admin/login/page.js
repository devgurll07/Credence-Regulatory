"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../../lib/supabaseClient";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { email, password } = Object.fromEntries(new FormData(e.target));
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError("Invalid email or password.");
    router.push("/admin");
  }

  const input = "w-full rounded border border-gray-300 px-4 py-3 focus:border-gold focus:outline-none";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-ink">
          Admin Login
        </h1>
        <input name="email" type="email" required placeholder="Email" className={input} />
        <input name="password" type="password" required placeholder="Password" className={input} />
        <button disabled={loading} className="w-full rounded bg-gold px-6 py-3 font-semibold text-white disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && <p className="text-center text-sm text-red-600">{error}</p>}
      </form>
    </main>
  );
}