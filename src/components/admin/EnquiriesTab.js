"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { STATUSES, statusBadge } from "./shared";

const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

function csvCell(v) {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
}

function Detail({ enquiry, all, team, authFetch, patch, onClose, onDelete }) {
  const [history, setHistory] = useState([]);
  const [note, setNote] = useState("");
  const [update, setUpdate] = useState("");
  const [msg, setMsg] = useState("");

  const loadHistory = useCallback(async () => {
    const res = await authFetch(`/api/admin/enquiry-updates?enquiryId=${enquiry.id}`);
    if (res?.ok) setHistory((await res.json()).updates);
  }, [authFetch, enquiry.id]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  async function change(fields) {
    if (await patch(enquiry.id, fields)) loadHistory();
  }

  async function post(kind, body, clear) {
    setMsg("");
    const res = await authFetch("/api/admin/enquiry-updates", {
      method: "POST",
      body: JSON.stringify({ enquiryId: enquiry.id, kind, body }),
    });
    if (!res) return;
    const j = await res.json().catch(() => ({}));
    if (res.ok) {
      clear("");
      setMsg(kind === "client_update" ? "Update emailed to the client." : "Note added.");
      loadHistory();
    } else {
      setMsg(j.error || "Something went wrong.");
    }
  }

  const earlier = all.filter(
    (x) => x.id !== enquiry.id && (x.email === enquiry.email || x.phone === enquiry.phone)
  );
  const field = "w-full rounded border border-gray-300 px-3 py-2 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-navy">{enquiry.name}</h2>
            <p className="text-sm text-gray-500">
              {enquiry.service} · {enquiry.country} · {new Date(enquiry.created_at).toLocaleString("en-GB")}
            </p>
          </div>
          <button onClick={onClose} className="text-2xl leading-none">✕</button>
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <a href={`mailto:${enquiry.email}`} className="block text-gold">{enquiry.email}</a>
          <a href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="block">
            {enquiry.phone} (WhatsApp)
          </a>
        </div>
        <p className="mt-4 rounded-lg bg-cream p-4 text-sm text-gray-700">{enquiry.message || "No message."}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="text-xs font-semibold text-gray-500">
            Status
            <select value={enquiry.status} onChange={(e) => change({ status: e.target.value })} className={`${field} mt-1`}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-gray-500">
            Assigned to
            <select
              value={enquiry.assigned_to || ""}
              onChange={(e) => change({ assigned_to: e.target.value || null })}
              className={`${field} mt-1`}
            >
              <option value="">Unassigned</option>
              {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </label>
          <label className="text-xs font-semibold text-gray-500">
            Follow-up date
            <input
              type="date"
              value={enquiry.follow_up_date || ""}
              onChange={(e) => change({ follow_up_date: e.target.value || null })}
              className={`${field} mt-1`}
            />
          </label>
        </div>

        {earlier.length > 0 && (
          <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm font-bold text-amber-800">Returning client: {earlier.length} earlier enquiry(ies)</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {earlier.map((x) => (
                <li key={x.id}>
                  {new Date(x.created_at).toLocaleDateString("en-GB")} · {x.service} ·{" "}
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${statusBadge[x.status]}`}>{x.status}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-bold text-navy">Send an update to the client (email)</h3>
          <textarea value={update} onChange={(e) => setUpdate(e.target.value)} rows={3} maxLength={2000}
            placeholder="e.g. Your documents are verified. We will file the application tomorrow." className={`${field} mt-2`} />
          <button
            disabled={!update.trim()}
            onClick={() => post("client_update", update, setUpdate)}
            className="mt-2 rounded bg-gold px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Email update to client
          </button>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-navy">Internal note (team only)</h3>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={2000}
            placeholder="Call details, documents received, next step..." className={`${field} mt-2`} />
          <button
            disabled={!note.trim()}
            onClick={() => post("note", note, setNote)}
            className="mt-2 rounded border border-navy px-4 py-2 text-sm font-semibold text-navy disabled:opacity-50"
          >
            Add note
          </button>
        </div>
        {msg && <p className="mt-3 text-sm text-gray-600">{msg}</p>}

        <div className="mt-8">
          <h3 className="font-bold text-navy">Timeline</h3>
          <ul className="mt-3 space-y-3 border-l-2 border-gold/40 pl-4">
            {history.length === 0 && <li className="text-sm text-gray-500">No activity yet.</li>}
            {history.map((h) => (
              <li key={h.id} className="text-sm">
                <p className="text-gray-700">{h.body}</p>
                <p className="text-xs text-gray-400">
                  {h.author || "System"} · {new Date(h.created_at).toLocaleString("en-GB")}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => onDelete(enquiry.id)} className="mt-10 text-sm text-red-600 underline">
          Delete this enquiry
        </button>
      </div>
    </div>
  );
}

export default function EnquiriesTab({ authFetch, onDenied }) {
  const [enquiries, setEnquiries] = useState([]);
  const [team, setTeam] = useState([]);
  const [state, setState] = useState("loading");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [service, setService] = useState("All");
  const [assignee, setAssignee] = useState("All");
  const [dueOnly, setDueOnly] = useState(false);
  const [openId, setOpenId] = useState(null);

  const load = useCallback(async () => {
    const [a, b] = await Promise.all([authFetch("/api/admin/enquiries"), authFetch("/api/admin/team")]);
    if (!a || !b) return;
    if (a.status === 401) return onDenied();
    if (!a.ok) return setState("error");
    setEnquiries((await a.json()).enquiries);
    setTeam(b.ok ? (await b.json()).team : []);
    setState("ready");
  }, [authFetch, onDenied]);

  useEffect(() => {
    load();
  }, [load]);

  async function patch(id, fields) {
    const old = enquiries;
    setEnquiries((list) => list.map((e) => (e.id === id ? { ...e, ...fields } : e)));
    const res = await authFetch("/api/admin/enquiries", { method: "PATCH", body: JSON.stringify({ id, ...fields }) });
    if (!res || !res.ok) {
      setEnquiries(old);
      return false;
    }
    return true;
  }

  async function remove(id) {
    if (!window.confirm("Delete this enquiry permanently?")) return;
    const res = await authFetch("/api/admin/enquiries", { method: "DELETE", body: JSON.stringify({ id }) });
    if (res?.ok) {
      setEnquiries((list) => list.filter((e) => e.id !== id));
      setOpenId(null);
    }
  }

  const memberName = useMemo(() => Object.fromEntries(team.map((m) => [m.id, m.name])), [team]);
  const emailCount = useMemo(() => {
    const c = {};
    enquiries.forEach((e) => (c[e.email] = (c[e.email] || 0) + 1));
    return c;
  }, [enquiries]);
  const serviceList = useMemo(() => [...new Set(enquiries.map((e) => e.service))], [enquiries]);

  const shown = useMemo(() => {
    const t = today();
    const needle = q.trim().toLowerCase();
    return enquiries.filter((e) => {
      if (status !== "All" && e.status !== status) return false;
      if (service !== "All" && e.service !== service) return false;
      if (assignee === "Unassigned" && e.assigned_to) return false;
      if (assignee !== "All" && assignee !== "Unassigned" && e.assigned_to !== assignee) return false;
      if (dueOnly && !(e.follow_up_date && e.follow_up_date <= t && e.status !== "Closed")) return false;
      if (needle && !`${e.name} ${e.email} ${e.phone} ${e.country} ${e.service}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [enquiries, q, status, service, assignee, dueOnly]);

  function exportCsv() {
    const head = ["Date", "Name", "Email", "Phone", "Country", "Service", "Status", "Assigned To", "Follow-up", "Message"];
    const rows = shown.map((e) => [
      new Date(e.created_at).toISOString().slice(0, 10), e.name, e.email, e.phone, e.country,
      e.service, e.status, memberName[e.assigned_to] || "", e.follow_up_date || "", e.message || "",
    ]);
    const csv = [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${today()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (state === "loading") return <p className="py-10 text-center">Loading...</p>;
  if (state === "error") return <p className="py-10 text-center text-red-600">Could not load enquiries.</p>;

  const current = enquiries.find((e) => e.id === openId);
  const sel = "rounded border border-gray-300 bg-white px-3 py-2 text-sm";
  const t = today();

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone, country..." className={`${sel} min-w-64 flex-1`} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={sel}>
          {["All", ...STATUSES].map((s) => <option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>)}
        </select>
        <select value={service} onChange={(e) => setService(e.target.value)} className={sel}>
          <option value="All">All services</option>
          {serviceList.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className={sel}>
          <option value="All">Everyone</option>
          <option value="Unassigned">Unassigned</option>
          {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <button
          onClick={() => setDueOnly(!dueOnly)}
          className={`rounded px-3 py-2 text-sm ${dueOnly ? "bg-navy text-white" : "border border-gray-300 bg-white"}`}
        >
          Follow-up due
        </button>
        <button onClick={exportCsv} className="rounded bg-gold px-4 py-2 text-sm font-semibold text-white">
          Export CSV
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-500">{shown.length} of {enquiries.length} enquiries</p>

      <div className="mt-3 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-navy">
            <tr>
              {["Date", "Client", "Service", "Assigned to", "Status", "Follow-up", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-500">No enquiries found.</td></tr>
            )}
            {shown.map((e) => (
              <tr key={e.id} className="border-t align-top">
                <td className="whitespace-nowrap px-4 py-3">{new Date(e.created_at).toLocaleDateString("en-GB")}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{e.name}</p>
                  <p className="text-xs text-gray-500">{e.email}</p>
                  {emailCount[e.email] > 1 && (
                    <span className="mt-1 inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                      Returning client ×{emailCount[e.email]}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <p>{e.service}</p>
                  <p className="text-xs text-gray-500">{e.country}</p>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={e.assigned_to || ""}
                    onChange={(ev) => patch(e.id, { assigned_to: ev.target.value || null })}
                    className="rounded border border-gray-300 px-2 py-1 text-xs"
                  >
                    <option value="">Unassigned</option>
                    {team.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-gray-600">{e.source_blog_slug ? `Blog: ${e.source_blog_slug}` : e.source_page || "-"}
                  <select
                    value={e.status}
                    onChange={(ev) => patch(e.id, { status: ev.target.value })}
                    className={`rounded px-2 py-1 text-xs font-semibold ${statusBadge[e.status]}`}
                  >
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td className={`whitespace-nowrap px-4 py-3 text-xs ${e.follow_up_date && e.follow_up_date <= t && e.status !== "Closed" ? "font-bold text-red-600" : "text-gray-600"}`}>
                  {e.follow_up_date || "-"}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => setOpenId(e.id)} className="font-semibold text-gold">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {current && (
        <Detail
          enquiry={current}
          all={enquiries}
          team={team}
          authFetch={authFetch}
          patch={patch}
          onClose={() => setOpenId(null)}
          onDelete={remove}
        />
      )}
    </div>
  );
}