"use client";

import { useEffect } from "react";
import { clientTrack, flush } from "@/lib/analytics/client/analytics";

/** Whole minutes beyond this are not reading time (a tab left open); capped. */
const MAX_MS = 2 * 60 * 60 * 1000;

/**
 * How a lesson was read (epic #320): when the learner leaves the lesson, or
 * the tab is hidden for good, records lesson_left with the time the page was
 * visible, how far down they scrolled, and whether the topic was done when
 * they arrived. Renders nothing.
 */
export function LessonReading({ roadmap, nodeId, done }: { roadmap: string; nodeId: string; done: boolean }) {
  useEffect(() => {
    let visibleMs = 0;
    let since = document.visibilityState === "visible" ? performance.now() : null;
    let deepest = 0;
    let sent = false;

    const depth = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
      deepest = Math.max(deepest, Math.min(100, Math.max(0, pct)));
    };
    const pause = () => {
      if (since !== null) visibleMs += performance.now() - since;
      since = null;
    };
    const report = () => {
      if (sent) return;
      sent = true;
      pause();
      clientTrack("lesson_left", {
        roadmap,
        node_id: nodeId,
        time_spent_ms: Math.min(MAX_MS, Math.round(visibleMs)),
        scroll_percent: deepest,
        done_before: done,
      });
      flush();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") since ??= performance.now();
      else pause();
    };

    depth();
    window.addEventListener("scroll", depth, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", report);
    return () => {
      window.removeEventListener("scroll", depth);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", report);
      // Leaving for another page in the app unmounts the lesson.
      report();
    };
  }, [roadmap, nodeId, done]);
  return null;
}
