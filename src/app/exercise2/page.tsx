"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Range from "@/components/Range";
import { getFixedRange, FixedRangeResponse } from "@/services/api";

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
      <h1>Exercise 2</h1>
      
      {loading ? (
        <p>Loading fixed values...</p>
      ) : (
        <>
          <p>Available values: {data?.values.join(", ")}</p>
          <Range isFixed={true} />
        </>
      )}
      
      <div style={{ marginTop: "2rem" }}>
        <Link href="/">Back to Home</Link>
      </div>
    </main>
  );
}
