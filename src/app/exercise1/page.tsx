"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Range from "@/components/Range";
import { getNormalRange, NormalRangeResponse } from "@/services/api";

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
      <h1>Exercise 1</h1>
      
      {loading ? (
        <p>Loading range data...</p>
      ) : (
        <>
          <p>Range from {data?.min} to {data?.max}</p>
          <Range />
        </>
      )}
      
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Back to Home</Link>
      </div>
    </main>
  );
}
