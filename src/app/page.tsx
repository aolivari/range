import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Range Component Examples</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Link href="/exercise1">📌 Normal Range</Link>
        <Link href="/exercise2">📌 Fixed Range</Link>
      </div>
    </main>
  );
}
