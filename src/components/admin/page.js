"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabaseClient";
import { useAuthFetch } from "../../components/admin/shared";
import OverviewTab from "../../components/admin/OverviewTab";
import InsightsTab from "../../components/admin/InsightsTab";
import EnquiriesTab from "../../components/admin/EnquiriesTab";
import ReviewsTab from "../../components/admin/ReviewsTab";
import BlogTab from "../../components/admin/BlogTab";
import TeamTab from "../../components/admin/TeamTab";

const tabs = [
  ["overview", "Traffic", OverviewTab],
  ["insights", "Enquiry Insights", InsightsTab],
  ["enquiries", "Enquiries", EnquiriesTab],
  ["reviews", "Reviews", ReviewsTab],
  ["blog", "Blog", BlogTab],
  ["team", "Team", TeamTab],
];

export default function AdminDashboard() {
  const router = useRouter();
  const authFetch = useAuthFetch();
  const [tab, setTab] = useState("enquiries");
  const [denied, setDenied] = useState(false);
  const onDenied = useCallback(() => setDenied(true), []);

  async function logout() {
    await supabaseBrowser.auth.signOut();
    router.replace("/admin/login");
  }

  if (denied) {
    return (
      <div className="p-10 text-center">
        <p>You do not have access to this page.</p>
        <button onClick={logout} className="mt-4 underline">Sign out</button>
      </div>
    );
  }

  const Active = tabs.find(([key]) => key === tab)[2];

  return (
    <main className="min-h-screen bg-cream">
      <header className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="font-[family-name:var(--font-playfair)] text-xl font-bold">
            Credence <span className="text-gold">Admin</span>
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" target="_blank" className="hover:text-gold">View site ↗</Link>
            <button onClick={logout} className="rounded border border-white/40 px-4 py-1.5 hover:bg-white/10">Sign out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex gap-2 overflow-x-auto border-b border-black/10">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`-mb-px whitespace-nowrap border-b-2 px-5 py-3 font-semibold ${tab === key ? "border-gold text-ink" : "border-transparent text-gray-500"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <Active authFetch={authFetch} onDenied={onDenied} />
      </div>
    </main>
  );
}