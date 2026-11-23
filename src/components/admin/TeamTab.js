"use client";

import { useEffect, useState, useCallback } from "react";
import { services } from "../../data/services";

export default function TeamTab({ authFetch, onDenied }) {
  const [team, setTeam] = useState([]);
  const [state, setState] = useState("loading");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState([]);
  const [msg, setMsg] = useState("");

  const load = useCallback(async () => {
    const res = await authFetch("/api/admin/team");
    if (!res) return;
    if (res.status === 401) return onDenied();
    if (!res.ok) return setState("error");
    setTeam((await res.json()).team);
    setState("ready");
  }, [authFetch, onDenied]);

  useEffect(() => {
    load();
  }, [load]);

  async function add(e) {
    e.preventDefault();
    setMsg("");
    const res = await authFetch("/api/admin/team", { method: "POST", body: JSON.stringify({ name, email, services: picked }) });
    if (!res) return;
    if (res.ok) {
      setName(""); setEmail(""); setPicked([]);
      load();
    } else {
      setMsg((await res.json().catch(() => ({}))).error || "Could not add.");
    }
  }

  async function update(id, fields) {
    await authFetch("/api/admin/team", { method: "PATCH", body: JSON.stringify({ id, ...fields }) });
    load();
  }

  async function remove(id) {
    if (!window.confirm("Remove this member? Their enquiries become unassigned.")) return;
    await authFetch("/api/admin/team", { method: "DELETE", body: JSON.stringify({ id }) });
    load();
  }

  const toggle = (list, t) => (list.includes(t) ? list.filter((x) => x !== t) : [...list, t]);
  const input = "w-full rounded border border-gray-300 px-3 py-2 text-sm";

  if (state === "loading") return <p className="py-10 text-center">Loading...</p>;
  if (state === "error") return <p className="py-10 text-center text-red-600">Could not load team.</p>;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form onSubmit={add} className="space-y-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5 lg:col-span-1">
        <h3 className="font-bold text-ink">Add service holder</h3>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={input} />
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={input} />
        <p className="text-xs font-semibold text-gray-500">Services handled</p>
        <div className="space-y-1">
          {services.map((s) => (
            <label key={s.slug} className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={picked.includes(s.title)} onChange={() => setPicked(toggle(picked, s.title))} className="mt-1" />
              {s.title}
            </label>
          ))}
        </div>
        <button className="w-full rounded bg-gold px-4 py-2 font-semibold text-white">Add member</button>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
        <p className="text-xs text-gray-500">
          New enquiries for a service are assigned automatically to the first active member who handles it.
        </p>
      </form>

      <div className="space-y-4 lg:col-span-2">
        {team.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">No team members yet.</p>}
        {team.map((m) => (
          <div key={m.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-ink">{m.name}</p>
                <p className="text-sm text-gray-500">{m.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => update(m.id, { active: !m.active })}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${m.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}
                >
                  {m.active ? "Active" : "Inactive"}
                </button>
                <button onClick={() => remove(m.id)} className="rounded border border-red-300 px-3 py-1 text-xs text-red-600">Remove</button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => {
                const on = (m.services || []).includes(s.title);
                return (
                  <button
                    key={s.slug}
                    onClick={() => update(m.id, { services: toggle(m.services || [], s.title) })}
                    className={`rounded-full px-3 py-1 text-xs ${on ? "bg-navy text-white" : "bg-cream text-gray-600"}`}
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}