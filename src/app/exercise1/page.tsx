import Link from "next/link";
import Range from "@/components/Range";

export default function Exercise1() {
  return (
    <main>
      <h1>Ejercicio 1</h1>
      <p>aqui va el range con valores normales</p>
      <Range />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Volver al inicio</Link>
      </div>
    </main>
  );
}
