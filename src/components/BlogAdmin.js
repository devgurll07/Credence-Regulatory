"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { supabaseBrowser } from "../lib/supabaseClient";

async function uploadImage(file) {
  const { data } = await supabaseBrowser.auth.getSession();
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${data.session?.access_token}` },
    body: fd,
  });
  if (!res.ok) throw new Error("upload failed");
  return (await res.json()).url;
}

function Btn({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`rounded px-3 py-1 text-sm ${active ? "bg-navy text-white" : "bg-white ring-1 ring-black/10"}`}
    >
      {children}
    </button>
  );
}

function Editor({ authFetch, id, onClose }) {
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", category: "",
    cover_url: "", author: "Credence Regulatory", featured: false,
  });
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false }), Image],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "blog-editor min-h-[320px] rounded-b border border-gray-300 bg-white p-4 focus:outline-none" },
    },
  });

  useEffect(() => {
    if (!id || !editor) return;
    (async () => {
      const res = await authFetch(`/api/admin/blog?id=${id}`);
      if (!res || !res.ok) return setMsg("Could not load post");
      const { post } = await res.json();
      setForm({
        title: post.title || "", slug: post.slug || "", excerpt: post.excerpt || "",
        category: post.category || "", cover_url: post.cover_url || "",
        author: post.author || "Credence Regulatory", featured: !!post.featured,
      });
      setPublished(!!post.published);
      editor.commands.setContent(post.content || "");
      setLoading(false);
    })();
  }, [id, editor, authFetch]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function pickImage(e, target) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setMsg("Uploading image...");
    try {
      const url = await uploadImage(file);
      if (target === "cover") setForm((f) => ({ ...f, cover_url: url }));
      else editor.chain().focus().setImage({ src: url, alt: form.title }).run();
      setMsg("");
    } catch {
      setMsg("Image upload failed (max 5MB; png, jpg, webp or gif)");
    }
  }

  function addLink() {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Link URL (leave empty to remove the link)", prev);
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url }).run();
  }

  async function save(publish) {
    if (!form.title.trim()) return setMsg("Title is required");
    const html = editor.getHTML();
    if (html === "<p></p>") return setMsg("Content is empty");
    setSaving(true);
    setMsg("");
    const res = await authFetch("/api/admin/blog", {
      method: id ? "PATCH" : "POST",
      body: JSON.stringify({ ...form, id, content: html, published: publish }),
    });
    setSaving(false);
    if (!res) return;
    if (res.status === 409) return setMsg("This slug already exists. Please change it");
    if (!res.ok) return setMsg("Could not save. Please try again");
    onClose(true);
  }

  if (loading) return <p className="py-10 text-center">Loading...</p>;

  const input = "w-full rounded border border-gray-300 bg-white px-4 py-2 text-sm focus:border-gold focus:outline-none";

  return (
    <div className="space-y-4">
      <style>{`
        .blog-editor h2{font-size:1.5rem;font-weight:700;margin:1rem 0 .5rem}
        .blog-editor h3{font-size:1.2rem;font-weight:700;margin:1rem 0 .5rem}
        .blog-editor ul{list-style:disc;padding-left:1.5rem}
        .blog-editor ol{list-style:decimal;padding-left:1.5rem}
        .blog-editor a{color:#b8860b;text-decoration:underline}
        .blog-editor img{max-width:100%;border-radius:8px;margin:.75rem 0}
        .blog-editor blockquote{border-left:4px solid #ccc;padding-left:1rem;color:#555}
        .blog-editor p{margin:.5rem 0}
      `}</style>

      <button onClick={() => onClose(false)} className="text-sm underline">← Back to posts</button>

      <div className="grid gap-4 md:grid-cols-2">
        <input className={`${input} md:col-span-2 text-lg font-semibold`} placeholder="Blog title" value={form.title} onChange={set("title")} />
        <input className={input} placeholder="Slug (leave empty to generate from title)" value={form.slug} onChange={set("slug")} />
        <input className={input} placeholder="Category" value={form.category} onChange={set("category")} />
        <input className={input} placeholder="Author" value={form.author} onChange={set("author")} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured post
        </label>
        <textarea rows={2} className={`${input} md:col-span-2`} placeholder="Short excerpt (for listings and Google)" value={form.excerpt} onChange={set("excerpt")} />
      </div>

      <div className="rounded-xl bg-white p-4 ring-1 ring-black/5">
        <p className="text-sm font-semibold text-navy">Cover image</p>
        {form.cover_url && <img src={form.cover_url} alt="" className="mt-3 max-h-48 rounded" />}
        <div className="mt-3 flex items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => pickImage(e, "cover")} className="text-sm" />
          {form.cover_url && (
            <button type="button" onClick={() => setForm({ ...form, cover_url: "" })} className="text-sm text-red-600 underline">Remove</button>
          )}
        </div>
      </div>

      <div>
        {editor && (
          <div className="flex flex-wrap gap-2 rounded-t border border-b-0 border-gray-300 bg-cream p-2">
            <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></Btn>
            <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></Btn>
            <Btn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></Btn>
            <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
            <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
            <Btn title="Bullets" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
            <Btn title="Numbered" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
            <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>" "</Btn>
            <Btn title="Link" active={editor.isActive("link")} onClick={addLink}>Link</Btn>
            <label className="cursor-pointer rounded bg-white px-3 py-1 text-sm ring-1 ring-black/10">
              Image
              <input type="file" accept="image/*" className="hidden" onChange={(e) => pickImage(e, "inline")} />
            </label>
            <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}>↶</Btn>
            <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}>↷</Btn>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>

      {msg && <p className="text-sm text-red-600">{msg}</p>}

      <div className="flex flex-wrap gap-3">
        <button disabled={saving} onClick={() => save(false)} className="rounded border border-gray-400 bg-white px-5 py-2 font-semibold disabled:opacity-60">
          {published ? "Unpublish (save as draft)" : "Save draft"}
        </button>
        <button disabled={saving} onClick={() => save(true)} className="rounded bg-gold px-5 py-2 font-semibold text-white disabled:opacity-60">
          {published ? "Update & keep published" : "Publish"}
        </button>
      </div>
    </div>
  );
}

export default function BlogAdmin({ authFetch, onDenied }) {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState("loading");
  const [editing, setEditing] = useState(null); // null = list, "new" ya post id

  async function load() {
    const res = await authFetch("/api/admin/blog");
    if (!res) return;
    if (res.status === 401) return onDenied();
    if (!res.ok) return setState("error");
    setPosts((await res.json()).posts);
    setState("ready");
  }

  useEffect(() => {
    if (editing === null) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  async function remove(p) {
    if (!window.confirm(`Permanently delete "${p.title}"?`)) return;
    const res = await authFetch("/api/admin/blog", { method: "DELETE", body: JSON.stringify({ id: p.id }) });
    if (res && res.ok) setPosts(posts.filter((x) => x.id !== p.id));
  }

  if (editing !== null) {
    return <Editor authFetch={authFetch} id={editing === "new" ? null : editing} onClose={() => setEditing(null)} />;
  }

  if (state === "loading") return <p className="py-10 text-center">Loading...</p>;
  if (state === "error") return <p className="py-10 text-center text-red-600">Could not load posts.</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {posts.filter((p) => p.published).length} published, {posts.filter((p) => !p.published).length} draft
        </p>
        <button onClick={() => setEditing("new")} className="rounded bg-gold px-5 py-2 font-semibold text-white">+ New post</button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream text-navy">
            <tr>
              {["Title", "Category", "Status", "Views", "Enquiries", "Updated", ""].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">No posts yet.</td></tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="border-t align-top">
                <td className="max-w-xs px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3">{p.category || "-"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold">{p.views}</td>
                <td className="px-4 py-3 font-semibold">{p.enquiries}</td>
                <td className="whitespace-nowrap px-4 py-3">{new Date(p.updated_at || p.created_at).toLocaleDateString("en-GB")}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <button onClick={() => setEditing(p.id)} className="mr-3 text-gold underline">Edit</button>
                  {p.published && <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="mr-3 underline">View</a>}
                  <button onClick={() => remove(p)} className="text-red-600 underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}