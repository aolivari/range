"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Range from "ui/Range";
import { getFixedRange, FixedRangeResponse } from "services/api";

export default function Exercise2() {
  const [data, setData] = useState<FixedRangeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFixedRange()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching fixed range:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>Fixed Range</h1>
      {loading ? (
        <p>Loading fixed values...</p>
      ) : (
        <>
          <p>Fixed Values Selection (Currency Snapping)</p>
          {data && (
            <Range
              type="fixed"
              options={data.values}
              min={data.values[0]}
              max={data.values[data.values.length - 1]}
            />
          )}
        </>
      )}
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Back to Examples</Link>
      </div>
    </main>
  );
}
