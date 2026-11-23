"use client";

import { useEffect, useState, useCallback } from "react";
import { services } from "../../data/services";

const empty = {
  title: "", slug: "", category: "", excerpt: "", cover_url: "",
  author: "Credence Regulatory", content: "", published: false,
};
const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);

export default function BlogTab({ authFetch, onDenied }) {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("loading");
  const [form, setForm] = useState(null);
  const [id, setId] = useState(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await authFetch("/api/admin/blog");
    if (!res) return;
    if (res.status === 401) return onDenied();
    if (!res.ok) return setState("error");
    setPosts((await res.json()).posts);
    setState("ready");
  }, [authFetch, onDenied]);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    setForm(empty); setId(null); setSlugTouched(false); setMsg("");
  }

  async function edit(postId) {
    const res = await authFetch(`/api/admin/blog?id=${postId}`);
    if (!res?.ok) return;
    const { post } = await res.json();
    setForm({
      title: post.title, slug: post.slug, category: post.category || "", excerpt: post.excerpt || "",
      cover_url: post.cover_url || "", author: post.author || "", content: post.content, published: post.published,
    });
    setId(post.id); setSlugTouched(true); setMsg("");
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const res = await authFetch("/api/admin/blog", { method: id ? "PATCH" : "POST", body: JSON.stringify({ ...form, id }) });
    setSaving(false);
    if (!res) return;
    const j = await res.json().catch(() => ({}));
    if (!res.ok) return setMsg(j.error || "Could not save.");
    if (!id && j.id) setId(j.id);
    setMsg("Saved.");
    load();
  }

  async function remove(postId) {
    if (!window.confirm("Delete this post permanently?")) return;
    const res = await authFetch("/api/admin/blog", { method: "DELETE", body: JSON.stringify({ id: postId }) });
    if (res?.ok) {
      if (postId === id) setForm(null);
      load();
    }
  }

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const input = "w-full rounded border border-gray-300 px-3 py-2 text-sm";

  if (state === "loading") return <p className="py-10 text-center">Loading...</p>;
  if (state === "error") return <p className="py-10 text-center text-red-600">Could not load posts.</p>;

  if (!form) {
    return (
      <div>
        <button onClick={startNew} className="rounded bg-gold px-5 py-2 font-semibold text-white">+ New post</button>
        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-ink">
              <tr>{["Title", "Category", "Status", "Updated", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {posts.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No posts yet.</td></tr>}
              {posts.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3">{p.category || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.published ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{new Date(p.updated_at).toLocaleDateString("en-GB")}</td>
                  <td className="space-x-3 whitespace-nowrap px-4 py-3">
                    <button onClick={() => edit(p.id)} className="font-semibold text-gold">Edit</button>
                    {p.published && <a href={`/blog/${p.slug}`} target="_blank" className="text-ink">View</a>}
                    <button onClick={() => remove(p.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={save} className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-ink">{id ? "Edit post" : "New post"}</h3>
        <button type="button" onClick={() => setForm(null)} className="text-sm underline">Back to list</button>
      </div>

      <input required value={form.title} maxLength={200} placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugTouched ? form.slug : slugify(e.target.value) })}
        className={input} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input required value={form.slug} placeholder="url-slug"
          onChange={(e) => { setSlugTouched(true); setForm({ ...form, slug: slugify(e.target.value) }); }} className={input} />
        <input list="cats" value={form.category} onChange={set("category")} placeholder="Category (e.g. Trademark)" className={input} />
        <datalist id="cats">{["Company Setup", "Trademark & IP", "Compliance", "Immigration", "Trade", "Property"].map((c) => <option key={c} value={c} />)}</datalist>
      </div>
      <input value={form.cover_url} onChange={set("cover_url")} placeholder="Cover image: /images/blog/name.jpg or https://..." className={input} />
      <input value={form.author} onChange={set("author")} placeholder="Author" className={input} />
      <textarea value={form.excerpt} onChange={set("excerpt")} rows={2} maxLength={300}
        placeholder="Short summary (shown on the blog list and Google)" className={input} />
      <textarea required value={form.content} onChange={set("content")} rows={16}
        placeholder={"Write your article here.\n\n## Heading\n\nParagraph text with **bold** words.\n\n- Bullet one\n- Bullet two"}
        className={`${input} font-mono`} />
      <p className="text-xs text-gray-500">
        Format: blank line between paragraphs, <code>## Heading</code>, <code>### Sub-heading</code>, <code>- bullet</code>,{" "}
        <code>**bold**</code>, <code>[text](https://link)</code>. Related services: {services.map((s) => s.title).join(", ")}.
      </p>

      <label className="flex items-center gap-2 text-sm font-semibold text-ink">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
        Published (visible on the website)
      </label>

      <div className="flex items-center gap-4">
        <button disabled={saving} className="rounded bg-gold px-6 py-2 font-semibold text-white disabled:opacity-60">
          {saving ? "Saving..." : "Save"}
        </button>
        {msg && <span className="text-sm text-gray-600">{msg}</span>}
      </div>
    </form>
  );
}