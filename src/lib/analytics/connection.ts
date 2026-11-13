/**
 * Connection class (issue #331): how fast the browser says its connection is,
 * so the Reliability dashboard can show where slow connections hurt. Pure, so
 * the browser and unit tests share it.
 *
 * Read from the Network Information API (navigator.connection), which only
 * Chromium browsers offer: effectiveType is the browser's own estimate
 * (slow-2g, 2g, 3g or 4g) and saveData is the data saver setting. Anything
 * else is "unknown". Recorded with page speed and session starts only; it
 * never enters a score about a person.
 */

export const CONNECTION_TYPES = ["slow-2g", "2g", "3g", "4g", "unknown"] as const;
export type ConnectionType = (typeof CONNECTION_TYPES)[number];

export type ConnectionProps = { connection: ConnectionType; save_data?: boolean };

type NetworkInformationLike = { effectiveType?: unknown; saveData?: unknown } | null | undefined;

/** The connection props for an event, from navigator (or anything shaped like it). Never throws. */
export function connectionProps(nav: { connection?: NetworkInformationLike } | null | undefined): ConnectionProps {
  try {
    const info = nav?.connection;
    const type = info?.effectiveType;
    const connection = typeof type === "string" && (CONNECTION_TYPES as readonly string[]).includes(type) ? (type as ConnectionType) : "unknown";
    return typeof info?.saveData === "boolean" ? { connection, save_data: info.saveData } : { connection };
  } catch {
    return { connection: "unknown" };
  }
}

/** This browser's connection props; "unknown" outside a browser. */
export function currentConnection(): ConnectionProps {
  return connectionProps(typeof navigator === "undefined" ? null : (navigator as { connection?: NetworkInformationLike }));
}
