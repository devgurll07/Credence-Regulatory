"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabaseClient";
import BlogAdmin from "../../components/BlogAdmin";

const STATUSES = ["New", "In progress", "Closed"];
const badge = {
  New: "bg-blue-100 text-blue-700",
  "In progress": "bg-yellow-100 text-yellow-700",
  Closed: "bg-green-100 text-green-700",
};

function countryName(code) {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

function useAuthFetch() {
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

function Stat({ label, value, hint }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

function BarList({ title, items }) {
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

function Overview({ authFetch, onDenied }) {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    const res = await authFetch(`/api/admin/analytics?days=${days}`);
    if (!res) return;
    if (res.status === 401) return onDenied();
    if (!res.ok) return setError(true);
    setError(false);
    setData(await res.json());
  }, [authFetch, days, onDenied]);

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [load]);

  if (error) return <p className="py-10 text-center text-red-600">Could not load analytics.</p>;
  if (!data) return <p className="py-10 text-center">Loading...</p>;

  const max = Math.max(1, ...data.daily.map((d) => d.views));

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`rounded-full px-4 py-1 text-sm ${days === d ? "bg-navy text-white" : "bg-white ring-1 ring-black/10"}`}
          >
            Last {d} days
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Live now" value={data.live_visitors} hint="Last 5 minutes" />
        <Stat label="Views today" value={data.today_views} />
        <Stat label="Page views" value={data.total_views} hint={`Last ${days} days`} />
        <Stat label="Unique visitors" value={data.unique_visitors} hint={`Last ${days} days`} />
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h3 className="font-bold text-ink">Page views per day</h3>
        <div className="mt-6 flex h-48 items-end gap-1">
          {data.daily.map((d) => (
            <div
              key={d.day}
              className="flex h-full flex-1 items-end"
              title={`${d.day}: ${d.views} views, ${d.visitors} visitors`}
            >
              <div
                className="w-full rounded-t bg-gold"
                style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? 4 : 1 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>{data.daily[0]?.day}</span>
          <span>{data.daily[data.daily.length - 1]?.day}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BarList title="Top pages" items={data.top_pages.map((p) => ({ label: p.path, value: p.views }))} />
        <BarList title="Countries" items={data.countries.map((c) => ({ label: countryName(c.country), value: c.views }))} />
        <BarList title="Devices" items={data.devices.map((d) => ({ label: d.device, value: d.views }))} />
        <BarList title="Traffic sources" items={data.sources.map((s) => ({ label: s.source, value: s.views }))} />
      </div>
    </div>
  );
}

function Enquiries({ authFetch, onDenied }) {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState("All");
  const [state, setState] = useState("loading");

  useEffect(() => {
    (async () => {
      const res = await authFetch("/api/admin/enquiries");
      if (!res) return;
      if (res.status === 401) return onDenied();
      if (!res.ok) return setState("error");
      setEnquiries((await res.json()).enquiries);
      setState("ready");
    })();
  }, [authFetch, onDenied]);

  async function changeStatus(id, status) {
    const old = enquiries;
    setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status } : e)));
    const res = await authFetch("/api/admin/enquiries", { method: "PATCH", body: JSON.stringify({ id, status }) });
    if (!res || !res.ok) setEnquiries(old);
  }

  if (state === "loading") return <p className="py-10 text-center">Loading...</p>;
  if (state === "error") return <p className="py-10 text-center text-red-600">Could not load enquiries.</p>;

  const count = (s) => enquiries.filter((e) => e.status === s).length;
  const shown = filter === "All" ? enquiries : enquiries.filter((e) => e.status === filter);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-4">
        {[["Total", enquiries.length], ...STATUSES.map((s) => [s, count(s)])].map(([label, n]) => (
          <Stat key={label} label={label} value={n} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
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
          <thead className="bg-cream text-ink">
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
    </div>
  );
}

function Reviews({ authFetch, onDenied }) {
  const [reviews, setReviews] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    (async () => {
      const res = await authFetch("/api/admin/reviews");
      if (!res) return;
      if (res.status === 401) return onDenied();
      if (!res.ok) return setState("error");
      setReviews((await res.json()).reviews);
      setState("ready");
    })();
  }, [authFetch, onDenied]);

  async function setApproved(id, approved) {
    const old = reviews;
    setReviews(reviews.map((r) => (r.id === id ? { ...r, approved } : r)));
    const res = await authFetch("/api/admin/reviews", { method: "PATCH", body: JSON.stringify({ id, approved }) });
    if (!res || !res.ok) setReviews(old);
  }

  async function remove(id) {
    if (!window.confirm("Delete this review permanently?")) return;
    const old = reviews;
    setReviews(reviews.filter((r) => r.id !== id));
    const res = await authFetch("/api/admin/reviews", { method: "DELETE", body: JSON.stringify({ id }) });
    if (!res || !res.ok) setReviews(old);
  }

  if (state === "loading") return <p className="py-10 text-center">Loading...</p>;
  if (state === "error") return <p className="py-10 text-center text-red-600">Could not load reviews.</p>;

  const pending = reviews.filter((r) => !r.approved).length;

  return (
    <div>
      <p className="text-sm text-gray-600">
        {pending} pending, {reviews.length - pending} published. Read each review before approving.
      </p>
      <div className="mt-4 space-y-4">
        {reviews.length === 0 && <p className="py-8 text-center text-gray-500">No reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-ink">
                  {r.name}
                  {r.country ? <span className="font-normal text-gray-500"> · {r.country}</span> : null}
                </p>
                <p className="text-amber-400">
                  {"★".repeat(r.rating)}
                  <span className="text-gray-300">{"★".repeat(5 - r.rating)}</span>
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${r.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {r.approved ? "Published" : "Pending"}
              </span>
            </div>
            <p className="mt-3 text-gray-700">{r.message}</p>
            <p className="mt-2 text-xs text-gray-400">{new Date(r.created_at).toLocaleString("en-GB")}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setApproved(r.id, !r.approved)}
                className="rounded bg-gold px-4 py-2 text-sm font-semibold text-white"
              >
                {r.approved ? "Unpublish" : "Approve"}
              </button>
              <button onClick={() => remove(r.id)} className="rounded border border-red-300 px-4 py-2 text-sm text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const authFetch = useAuthFetch();
  const [tab, setTab] = useState("overview");
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

  const tabs = [["overview", "Overview"], ["enquiries", "Enquiries"], ["blog", "Blog"], ["reviews", "Reviews"]];
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
        <div className="mb-8 flex gap-2 border-b border-black/10">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 px-5 py-3 font-semibold ${tab === key ? "border-gold text-ink" : "border-transparent text-gray-500"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && <Overview authFetch={authFetch} onDenied={onDenied} />}
        {tab === "enquiries" && <Enquiries authFetch={authFetch} onDenied={onDenied} />}
        {tab === "reviews" && <Reviews authFetch={authFetch} onDenied={onDenied} />}
        {tab === "blog" && <BlogAdmin authFetch={authFetch} onDenied={onDenied} />}
      </div>
    </main>
  );
}