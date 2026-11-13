"use client";

import { useEffect, type ComponentProps } from "react";
import { clientTrack } from "@/lib/analytics/client/analytics";
import type { EventName, PropsOf } from "@/lib/analytics/events";

/** A browser event to record, passed from a Server Component (plain data only). */
export type TrackSpec = { [N in EventName]: { name: N; props?: PropsOf<N> } }[EventName];

function send(spec: TrackSpec) {
  clientTrack(spec.name, spec.props as never);
}

/**
 * An outside link that records a browser event when opened (click, middle
 * click or keyboard). Server pages render it in place of a plain <a>.
 */
export function TrackedLink({ track, ...props }: { track: TrackSpec } & ComponentProps<"a">) {
  return <a {...props} onClick={() => send(track)} onAuxClick={() => send(track)} />;
}

/**
 * Records one browser event when it mounts, and again only if the event
 * changes (new filters after a client navigation). Renders nothing.
 */
export function TrackOnView({ track }: { track: TrackSpec }) {
  const key = JSON.stringify(track);
  useEffect(() => {
    send(JSON.parse(key) as TrackSpec);
  }, [key]);
  return null;
}
