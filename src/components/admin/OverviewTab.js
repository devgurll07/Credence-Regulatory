"use client";

import { useEffect, useState, useCallback } from "react";
import { Stat, BarList, countryName } from "./shared";

export default function OverviewTab({ authFetch, onDenied }) {
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
        <Stat label="Unique visitors" value={data.unique_visitors} hint="Only visitors who accepted cookies" />
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h3 className="font-bold text-ink">Page views per day</h3>
        <div className="mt-6 flex h-48 items-end gap-1">
          {data.daily.map((d) => (
            <div key={d.day} className="flex h-full flex-1 items-end" title={`${d.day}: ${d.views} views`}>
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