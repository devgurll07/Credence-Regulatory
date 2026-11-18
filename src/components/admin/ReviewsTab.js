"use client";

import { useEffect, useState } from "react";
import { Stat, BarList } from "./shared";

export default function ReviewsTab({ authFetch, onDenied }) {
  const [reviews, setReviews] = useState([]);
  const [state, setState] = useState("loading");
  const [filter, setFilter] = useState("All");

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

  const published = reviews.filter((r) => r.approved);
  const pending = reviews.length - published.length;
  const avg = published.length ? (published.reduce((s, r) => s + r.rating, 0) / published.length).toFixed(1) : "-";
  const dist = [5, 4, 3, 2, 1].map((n) => ({
    label: `${n} star${n > 1 ? "s" : ""}`,
    value: published.filter((r) => r.rating === n).length,
  }));
  const shown = reviews.filter((r) => filter === "All" || (filter === "Pending" ? !r.approved : r.approved));

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Submitted" value={reviews.length} hint="Through the website form" />
        <Stat label="Published" value={published.length} />
        <Stat label="Pending" value={pending} />
        <Stat label="Average rating" value={avg === "-" ? "-" : `${avg} / 5`} hint="Published reviews" />
      </div>
      <div className="mt-4">
        <BarList title="Rating breakdown (published)" items={dist} />
      </div>

      <div className="mt-8 flex gap-2">
        {["All", "Pending", "Published"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1 text-sm ${filter === f ? "bg-navy text-white" : "bg-white ring-1 ring-black/10"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {shown.length === 0 && <p className="py-8 text-center text-gray-500">No reviews here.</p>}
        {shown.map((r) => (
          <div key={r.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-navy">
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
              <button onClick={() => setApproved(r.id, !r.approved)} className="rounded bg-gold px-4 py-2 text-sm font-semibold text-white">
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