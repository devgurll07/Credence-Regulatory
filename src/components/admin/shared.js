"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabaseClient";

export const STATUSES = ["New", "In progress", "Closed"];
export const statusBadge = {
  New: "bg-blue-100 text-blue-700",
  "In progress": "bg-yellow-100 text-yellow-700",
  Closed: "bg-green-100 text-green-700",
};

export function countryName(code) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

export function useAuthFetch() {
  const router = useRouter();
  return useCallback(
    async (url, options = {}) => {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        router.replace("/admin/login");
        return null;
      }
      return fetch(url, {
        ...options,
        headers: { ...options.headers, "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
    },
    [router]
  );
}

export function Stat({ label, value, hint }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function BarList({ title, items }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="font-bold text-ink">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">No data yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={i.label} className="text-sm">
              <div className="flex justify-between gap-3">
                <span className="truncate text-gray-700">{i.label}</span>
                <span className="font-semibold text-ink">{i.value}</span>
              </div>
              <div className="mt-1 h-1.5 rounded bg-cream">
                <div className="h-1.5 rounded bg-gold" style={{ width: `${(i.value / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}