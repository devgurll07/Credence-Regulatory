"use client";

import { useEffect, useState, useCallback } from "react";
import { Stat, BarList } from "./shared";

const monthLabel = (m) =>
  new Date(`${m}-15`).toLocaleString("en-GB", { month: "short", year: "2-digit" });

export default function InsightsTab({ authFetch, onDenied }) {
  const [d, setD] = useState(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    const res = await authFetch("/api/admin/insights");
    if (!res) return;
    if (res.status === 401) return onDenied();
    if (!res.ok) return setError(true);
    setD(await res.json());
  }, [authFetch, onDenied]);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <p className="py-10 text-center text-red-600">Could not load insights.</p>;
  if (!d) return <p className="py-10 text-center">Loading...</p>;

  const max = Math.max(1, ...d.monthly.map((m) => m.count));
  const rate = d.visitors30 ? ((d.totals.last30 / d.visitors30) * 100).toFixed(1) : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Total enquiries" value={d.totals.all} />
        <Stat label="This month" value={d.totals.thisMonth} />
        <Stat label="Open" value={d.totals.open} hint="New + In progress" />
        <Stat label="Unassigned" value={d.totals.unassigned} hint="Open and not assigned" />
        <Stat
          label="Enquiries per 100 visitors"
          value={rate ?? "-"}
          hint="Last 30 days, approximate"
        />
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <h3 className="font-bold text-navy">Enquiries per month</h3>
        <div className="mt-6 flex h-48 items-end gap-3">
          {d.monthly.map((m) => (
            <div key={m.month} className="flex h-full flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-xs font-semibold text-navy">{m.count}</span>
              <div
                className="w-full rounded-t bg-gold"
                style={{ height: `${(m.count / max) * 80}%`, minHeight: m.count ? 4 : 1 }}
              />
              <span className="mt-2 text-xs text-gray-500">{monthLabel(m.month)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BarList title="Enquiries by service" items={d.byService} />
        <BarList title="Enquiries by country" items={d.byCountry.slice(0, 10)} />
        <BarList title="By status" items={d.byStatus} />
        <BarList title="By team member" items={d.byAssignee} />
      </div>
    </div>
  );
}