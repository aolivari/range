"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Range from "ui/Range";
import { getFixedRange, FixedRangeResponse } from "services/api";

export default function Exercise2() {
  const [data, setData] = useState<FixedRangeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [selection, setSelection] = useState({ min: 0, max: 0 });

  useEffect(() => {
    getFixedRange()
      .then((res) => {
        setData(res);
        setSelection({
          min: res.values[0],
          max: res.values[res.values.length - 1],
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fixed range:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Fixed Range</h1>
      {loading ? (
        <p>Loading fixed values...</p>
      ) : (
        <>
          <p>Fixed Values Selection (Currency Snapping)</p>
          <div
            style={{
              maxWidth: "500px",
              margin: "40px auto",
              textAlign: "center",
            }}
          >
            {data && (
              <Range
                type="fixed"
                options={data.values}
                min={data.values[0]}
                max={data.values[data.values.length - 1]}
                onChange={(min, max) => setSelection({ min, max })}
              />
            )}
          </div>
        </>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Back to Examples</Link>
      </div>
    </main>
  );
}
