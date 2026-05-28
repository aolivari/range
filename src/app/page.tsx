"use client";

import { useState } from "react";
import Link from "next/link";
import Range from "ui/Range";
import styles from "./page.module.css";

export default function Home() {
  const [normalMin, setNormalMin] = useState(0);
  const [normalMax, setNormalMax] = useState(100);
  const [fixedMin, setFixedMin] = useState(1.99);
  const [fixedMax, setFixedMax] = useState(70.99);

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.badge}>React Library Showcase</div>
        <h1 className={styles.title}>Mango Range Selector</h1>
        <p className={styles.subtitle}>
          A premium, high-fidelity custom range slider component. Built for precise drag-and-drop mechanics, keyboard navigation, and full integration testing.
        </p>
      </header>

      <section className={styles.grid}>
        {/* Normal Range Showcase */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>⚙️ Normal Range Mode</h2>
          <p className={styles.cardDesc}>
            Allows free numeric input within absolute min/max boundaries. Features fully editable currency input labels that auto-validate and sync back to the slider state.
          </p>
          <div className={styles.demoWrapper}>
            <div style={{ width: "100%", maxWidth: "340px" }}>
              <Range
                type="normal"
                min={0}
                max={100}
                onChange={(min, max) => {
                  setNormalMin(min);
                  setNormalMax(max);
                }}
              />
              <div style={{ marginTop: 18, fontSize: 13, textAlign: "center", fontWeight: 600, color: "var(--text-secondary)" }}>
                State Readout: {normalMin.toFixed(2)}€ - {normalMax.toFixed(2)}€
              </div>
            </div>
          </div>
          <pre className={styles.codeViewer}>
<code>{`// Free Numeric Selection
<Range 
  type="normal" 
  min={0} 
  max={100} 
  onChange={(min, max) => console.log(min, max)} 
/>`}</code>
          </pre>
          <Link href="/exercise1" className={styles.actionButton}>
            Open Exercise 1 Sandbox &rarr;
          </Link>
        </div>

        {/* Fixed Range Showcase */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>⚙️ Fixed Values Range Mode</h2>
          <p className={styles.cardDesc}>
            Snaps handles to a predefined set of array values. To comply with requirements, currency outputs are non-editable labels and the handles cannot overlap or cross.
          </p>
          <div className={styles.demoWrapper}>
            <div style={{ width: "100%", maxWidth: "340px" }}>
              <Range
                type="fixed"
                options={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]}
                onChange={(min, max) => {
                  setFixedMin(min);
                  setFixedMax(max);
                }}
              />
              <div style={{ marginTop: 18, fontSize: 13, textAlign: "center", fontWeight: 600, color: "var(--text-secondary)" }}>
                State Readout: {fixedMin.toFixed(2)}€ - {fixedMax.toFixed(2)}€
              </div>
            </div>
          </div>
          <pre className={styles.codeViewer}>
<code>{`// Fixed Step Snapping Selection
<Range 
  type="fixed" 
  options={[1.99, 5.99, 10.99, 30.99, 50.99, 70.99]} 
  onChange={(min, max) => console.log(min, max)} 
/>`}</code>
          </pre>
          <Link href="/exercise2" className={styles.actionButton}>
            Open Exercise 2 Sandbox &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
