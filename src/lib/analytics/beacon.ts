/**
 * The wire format of the browser beacon (POST /api/analytics) and its
 * parser. Pure: shared by the route handler and the browser queue, and unit
 * tested.
 *
 *   { "sid": "<tab session uuid>", "events": [{ "n": "page_view", "p": {}, "r": "/roadmaps/[slug]" }] }
 */
import { cleanRoute, isSessionId } from "./context";
import { isClientEventName, validateProps, type EventName, type EventProps } from "./events";

export const BEACON_PATH = "/api/analytics";
/** Bytes per request; sendBeacon itself allows 64 KB across a page's pending beacons. */
export const BEACON_MAX_BYTES = 16_384;
export const BEACON_MAX_EVENTS = 25;

export type WireEvent = { n: string; p?: Record<string, unknown>; r?: string | null };
export type BeaconBody = { sid: string | null; events: WireEvent[] };

export type ParsedBeacon = {
  sessionId: string | null;
  events: { name: EventName; props: EventProps; route: string | null }[];
};

/**
 * Parses a beacon body. Null when it is not a beacon at all; otherwise the
 * events the browser is allowed to send, each with checked props and a route
 * pattern. Server only events and junk are dropped, not fatal.
 */
export function parseBeacon(text: string): ParsedBeacon | null {
  if (!text || text.length > BEACON_MAX_BYTES) return null;
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return null;
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const { sid, events } = body as { sid?: unknown; events?: unknown };
  if (!Array.isArray(events)) return null;
  const parsed: ParsedBeacon["events"] = [];
  for (const raw of events.slice(0, BEACON_MAX_EVENTS)) {
    if (!raw || typeof raw !== "object") continue;
    const { n, p, r } = raw as WireEvent;
    if (!isClientEventName(n)) continue;
    parsed.push({ name: n, props: validateProps(n, p), route: cleanRoute(r) });
  }
  return { sessionId: isSessionId(sid) ? sid : null, events: parsed };
}

/**
 * Splits queued events into request bodies that each fit the event and byte
 * caps. An event too large on its own is dropped.
 */
export function batchBodies(sessionId: string | null, events: WireEvent[]): string[] {
  const bodies: string[] = [];
  let current: WireEvent[] = [];
  const encode = (list: WireEvent[]) => JSON.stringify({ sid: sessionId, events: list } satisfies BeaconBody);
  for (const event of events) {
    const next = [...current, event];
    if (next.length > BEACON_MAX_EVENTS || encode(next).length > BEACON_MAX_BYTES) {
      if (current.length) bodies.push(encode(current));
      current = encode([event]).length > BEACON_MAX_BYTES ? [] : [event];
    } else {
      current = next;
    }
  }
  if (current.length) bodies.push(encode(current));
  return bodies;
}

/** Same origin only: the Origin header (sent with every POST) must match the host this request came to. */
export function sameOrigin(headers: { get(name: string): string | null }): boolean {
  const site = headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = headers.get("origin");
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!origin || !host || !URL.canParse(origin)) return false;
  return new URL(origin).host === host;
}
