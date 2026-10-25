"use client";

import { useEffect, useRef } from "react";

/**
 * Marks the node in progress once the learner opens it. Rendered only when the
 * page saw no progress yet, and the action re-checks, so a finished node is
 * never pushed back to in progress.
 */
export function StartNode({ nodeId, action }: { nodeId: string; action: (nodeId: string) => Promise<void> }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    action(nodeId).catch(() => {
      // Starting is a nicety; failing it must not break studying.
    });
  }, [nodeId, action]);
  return null;
}
