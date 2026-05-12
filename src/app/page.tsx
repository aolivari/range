import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Ejercicio de Mango</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Link href="/exercise1">Ir al Ejercicio 100 (Normal)</Link>
        <Link href="/exercise2">Ir al Ejercicio 2 (Valores fijos)</Link>
      </div>
    </main>
  );
}
