"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * While an AI review is running in the background, re-reads the page a few
 * times so the feedback appears without a manual reload. Stops after about
 * two minutes; the page says the learner can come back later.
 */
export function ReviewRefresher({ attempt, every = 10_000, times = 12 }: { attempt: number; every?: number; times?: number }) {
  const router = useRouter();
  useEffect(() => {
    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      if (document.visibilityState === "visible") router.refresh();
      if (count >= times) window.clearInterval(id);
    }, every);
    return () => window.clearInterval(id);
  }, [router, attempt, every, times]);
  return null;
}
