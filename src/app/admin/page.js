"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabaseClient";

const STATUSES = ["New", "In progress", "Closed"];
const badge = {
  New: "bg-blue-100 text-blue-700",
  "In progress": "bg-yellow-100 text-yellow-700",
  Closed: "bg-green-100 text-green-700",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [state, setState] = useState("loading"); // loading | ready | denied | error

  const authFetch = useCallback(async (url, options = {}) => {
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
  }, [router]);

  useEffect(() => {
    (async () => {
      const res = await authFetch("/api/admin/enquiries");
      if (!res) return;
      if (res.status === 401) return setState("denied");
      if (!res.ok) return setState("error");
      const json = await res.json();
      setEnquiries(json.enquiries);
      setState("ready");
    })();
  }, [authFetch]);

  async function changeStatus(id, status) {
    const old = enquiries;
    setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status } : e)));
    const res = await authFetch("/api/admin/enquiries", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
    });
    if (!res || !res.ok) setEnquiries(old);
  }

  async function logout() {
    await supabaseBrowser.auth.signOut();
    router.replace("/admin/login");
  }

  if (state === "loading") return <p className="p-10 text-center">Loading...</p>;
  if (state === "denied")
    return (
      <div className="p-10 text-center">
        <p>You do not have access to this page.</p>
        <button onClick={logout} className="mt-4 underline">Sign out</button>
      </div>
    );
  if (state === "error") return <p className="p-10 text-center text-red-600">Could not load enquiries.</p>;

  const count = (s) => enquiries.filter((e) => e.status === s).length;
  const shown = filter === "All" ? enquiries : enquiries.filter((e) => e.status === filter);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">Dashboard</h1>
        <button onClick={logout} className="rounded border border-navy px-4 py-2 text-sm">Sign out</button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {[["Total", enquiries.length], ...STATUSES.map((s) => [s, count(s)])].map(([label, n]) => (
          <div key={label} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-navy">{n}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {["All", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1 text-sm ${filter === s ? "bg-navy text-white" : "bg-white ring-1 ring-black/10"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-navy">
            <tr>
              {["Date", "Name", "Contact", "Country", "Service", "Message", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">No enquiries yet.</td></tr>
            )}
            {shown.map((e) => (
              <tr key={e.id} className="border-t align-top">
                <td className="whitespace-nowrap px-4 py-3">{new Date(e.created_at).toLocaleDateString("en-GB")}</td>
                <td className="px-4 py-3 font-medium">{e.name}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${e.email}`} className="block text-gold">{e.email}</a>
                  <a href={`https://wa.me/${e.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="block">{e.phone}</a>
                </td>
                <td className="px-4 py-3">{e.country}</td>
                <td className="px-4 py-3">{e.service}</td>
                <td className="max-w-xs px-4 py-3 text-gray-600">{e.message || "-"}</td>
                <td className="px-4 py-3">
                  <select
                    value={e.status}
                    onChange={(ev) => changeStatus(e.id, ev.target.value)}
                    className={`rounded px-2 py-1 text-xs font-semibold ${badge[e.status]}`}
                  >
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}