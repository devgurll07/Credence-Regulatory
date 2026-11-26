import { allServices } from "../../data/allServices";

export default function DebugServices() {
  return (
    <main style={{ padding: 24, fontFamily: "monospace" }}>
      <h1>Services ({allServices.length})</h1>
      <ul>
        {allServices.map((s) => (
          <li key={s.slug}>
            {s.slug} — {s.title}
          </li>
        ))}
      </ul>
    </main>
  );
}