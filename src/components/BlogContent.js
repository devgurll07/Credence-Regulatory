const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|\/(?!\/))[^)\s]+\))/g;

function inline(text) {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (m) {
      const external = m[2].startsWith("http");
      return (
        <a key={i} href={m[2]} className="font-semibold text-gold underline" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {m[1]}
        </a>
      );
    }
    return part;
  });
}

export default function BlogContent({ content }) {
  const blocks = content.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className="space-y-5 text-lg leading-relaxed text-gray-700">
      {blocks.map((b, i) => {
        if (b.startsWith("### ")) return <h3 key={i} className="pt-4 text-xl font-bold text-ink">{inline(b.slice(4))}</h3>;
        if (b.startsWith("## ")) return <h2 key={i} className="pt-6 font-[family-name:var(--font-playfair)] text-2xl font-bold text-ink md:text-3xl">{inline(b.slice(3))}</h2>;
        const lines = b.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return <ul key={i} className="list-disc space-y-2 pl-6">{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>;
        }
        return <p key={i} className="whitespace-pre-line">{inline(b)}</p>;
      })}
    </div>
  );
}