import Link from "next/link";
import Range from "@/components/Range";

export default function Exercise2() {
  return (
    <main>
      <h1>Ejercicio 2</h1>
      <p>aqui va el range con valores fijos</p>
      <Range isFixed={true} />
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Volver al inicio</Link>
      </div>
    </main>
  );
}
