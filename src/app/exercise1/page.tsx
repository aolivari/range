"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Range from "ui/Range";
import { getNormalRange, NormalRangeResponse } from "services/api";

export default function Exercise1() {
  const [data, setData] = useState<NormalRangeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNormalRange()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching range:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>Normal Range</h1>
      {loading ? (
        <p>Loading range data...</p>
      ) : (
        <>
          <p>Normal Range Selection</p>
          {data && <Range type="normal" min={data.min} max={data.max} />}
        </>
      )}
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Back to Examples</Link>
      </div>
    </main>
  );
}
