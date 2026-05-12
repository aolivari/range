"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Range from "ui/Range";
import { getNormalRange, NormalRangeResponse } from "services/api";

export default function Exercise1() {
  const [data, setData] = useState<NormalRangeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [selection, setSelection] = useState({ min: 0, max: 0 });

  useEffect(() => {
    getNormalRange()
      .then((res) => {
        setData(res);
        setSelection({ min: res.min, max: res.max });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching range:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Normal Range</h1>
      {loading ? (
        <p>Loading range data...</p>
      ) : (
        <>
          <p>Normal Range Selection</p>
          <div style={{ maxWidth: "500px", margin: "40px auto", textAlign: "center" }}>
            {data && (
              <Range 
                type="normal" 
                min={data.min} 
                max={data.max} 
                onChange={(min, max) => setSelection({ min, max })}
              />
            )}
            <div style={{ marginTop: "20px", color: "#666", fontSize: "14px" }} data-testid="selection-result">
              Selection: {selection.min.toFixed(2)}€ - {selection.max.toFixed(2)}€
            </div>
          </div>
        </>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Back to Examples</Link>
      </div>
    </main>
  );
}
