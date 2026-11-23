"use client";

import { useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "../lib/supabaseClient";

export default function AuthCard({ mode }) {
  const isSignup = mode === "signup";
  const [error, setError] = useState("");

  async function signIn(provider) {
    setError("");
    const { error } = await supabaseBrowser.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
        ...(provider === "azure" ? { scopes: "email" } : {}),
      },
    });
    if (error) setError("Login is not available yet. Please try again later.");
  }

  const btn =
    "flex w-full items-center justify-center gap-3 rounded border border-gray-300 bg-white px-4 py-3 font-medium text-ink transition hover:bg-gray-50";

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-16">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center font-[family-name:var(--font-playfair)] text-3xl font-bold text-ink">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignup ? "Sign up to track your requests with Credence Regulatory." : "Login to continue."}
        </p>

        <div className="mt-8 space-y-4">
          <button onClick={() => signIn("google")} className={btn}>
            <span className="font-bold text-red-500">G</span> Continue with Google
          </button>
          <button onClick={() => signIn("azure")} className={btn}>
            <span className="font-bold text-blue-600">▦</span> Continue with Microsoft
          </button>
        </div>

        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}

        <p className="mt-8 text-center text-sm text-gray-600">
          {isSignup ? (
            <>Already have an account? <Link href="/login" className="font-semibold text-gold">Login</Link></>
          ) : (
            <>New here? <Link href="/signup" className="font-semibold text-gold">Sign up</Link></>
          )}
        </p>
      </div>
    </main>
  );
}