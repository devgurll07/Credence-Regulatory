import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { requireAdmin } from "../../../../lib/adminAuth";

const monthKey = (d) => new Date(d).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }).slice(0, 7);

function lastMonths(n) {
  const now = new Date();
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    out.push(monthKey(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 15))));
  }
  return out;
}

const tally = (arr, key) => {
  const m = {};
  arr.forEach((x) => {
    const k = key(x);
    if (k) m[k] = (m[k] || 0) + 1;
  });
  return Object.entries(m)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
};

export async function GET(request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [enqRes, teamRes, sumRes] = await Promise.all([
    supabase
      .from("enquiries")
      .select("service, country, status, created_at, assigned_to")
      .order("created_at", { ascending: false })
      .limit(5000),
    supabase.from("team_members").select("id, name"),
    supabase.rpc("analytics_summary", { p_days: 30 }),
  ]);

  if (enqRes.error) {
    console.error("Insights error:", enqRes.error);
    return NextResponse.json({ error: "Could not load" }, { status: 500 });
  }

  const enq = enqRes.data || [];
  const names = Object.fromEntries((teamRes.data || []).map((m) => [m.id, m.name]));
  const since = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const thisMonth = monthKey(new Date());
  const months = lastMonths(6);
  const perMonth = tally(enq, (e) => monthKey(e.created_at));

  return NextResponse.json({
    totals: {
      all: enq.length,
      thisMonth: enq.filter((e) => monthKey(e.created_at) === thisMonth).length,
      last30: enq.filter((e) => new Date(e.created_at).getTime() >= since).length,
      open: enq.filter((e) => e.status !== "Closed").length,
      unassigned: enq.filter((e) => !e.assigned_to && e.status !== "Closed").length,
    },
    visitors30: sumRes.data?.unique_visitors ?? null,
    monthly: months.map((m) => ({ month: m, count: perMonth.find((x) => x.label === m)?.value || 0 })),
    byService: tally(enq, (e) => e.service),
    byCountry: tally(enq, (e) => e.country?.trim()),
    byStatus: tally(enq, (e) => e.status),
    byAssignee: tally(enq, (e) => (e.assigned_to ? names[e.assigned_to] || "Removed member" : "Unassigned")),
  });
}