import { isIP } from "node:net";

/**
 * The address and URL rules behind safe-fetch.ts, pure so they are unit
 * tested. An Open Badge import fetches a URL the learner typed, so the server
 * must never be turned into a way to reach its own network: only https on
 * the standard port, to a public internet address.
 */

export type SafeFetchReason = "bad_url" | "blocked" | "timeout" | "too_large" | "network" | "http";

export class SafeFetchError extends Error {
  constructor(
    readonly reason: SafeFetchReason,
    message: string,
  ) {
    super(message);
    this.name = "SafeFetchError";
  }
}

/** Host names that point inside a network or at cloud metadata services. */
const BLOCKED_HOSTS = new Set([
  "localhost",
  "metadata",
  "metadata.google.internal",
  "metadata.goog",
  "instance-data",
  "instance-data.ec2.internal",
  "metadata.azure.com",
]);

const BLOCKED_SUFFIXES = [".localhost", ".local", ".internal", ".intranet", ".lan", ".home.arpa", ".corp"];

function ipv4ToInt(ip: string) {
  return ip.split(".").reduce((n, part) => (n << 8) + Number(part), 0) >>> 0;
}

function inV4(ip: string, base: string, bits: number) {
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipv4ToInt(ip) & mask) === (ipv4ToInt(base) & mask);
}

const V4_BLOCKS: [string, number][] = [
  ["0.0.0.0", 8], // this network
  ["10.0.0.0", 8], // private
  ["100.64.0.0", 10], // carrier grade NAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link local, cloud metadata (169.254.169.254)
  ["172.16.0.0", 12], // private
  ["192.0.0.0", 24], // IETF protocol assignments
  ["192.0.2.0", 24], // documentation
  ["192.88.99.0", 24], // 6to4 relay
  ["192.168.0.0", 16], // private
  ["198.18.0.0", 15], // benchmarking
  ["198.51.100.0", 24], // documentation
  ["203.0.113.0", 24], // documentation
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved and broadcast
];

/** Expands an IPv6 address to eight 16 bit groups, or null. */
function v6Groups(ip: string): number[] | null {
  let text = ip.toLowerCase().split("%")[0];
  // A trailing dotted IPv4 (::ffff:1.2.3.4) becomes two groups.
  const v4 = text.match(/(\d+\.\d+\.\d+\.\d+)$/);
  if (v4) {
    const n = ipv4ToInt(v4[1]);
    text = text.slice(0, -v4[1].length) + `${(n >>> 16).toString(16)}:${(n & 0xffff).toString(16)}`;
  }
  const [head, tail] = text.split("::");
  const parse = (s: string | undefined) => (s ? s.split(":").filter(Boolean).map((g) => parseInt(g, 16)) : []);
  const a = parse(head);
  const b = parse(tail);
  if (text.includes("::")) {
    const fill = 8 - a.length - b.length;
    if (fill < 0) return null;
    return [...a, ...Array(fill).fill(0), ...b];
  }
  return a.length === 8 ? a : null;
}

/** True for any address that is not a plain public unicast address. */
export function isBlockedAddress(address: string): boolean {
  const ip = address.replace(/^\[|\]$/g, "");
  const kind = isIP(ip);
  if (kind === 4) return V4_BLOCKS.some(([base, bits]) => inV4(ip, base, bits));
  if (kind !== 6) return true;
  const g = v6Groups(ip);
  if (!g) return true;
  if (g.every((x) => x === 0)) return true; // ::
  if (g.slice(0, 7).every((x) => x === 0) && g[7] === 1) return true; // ::1
  // IPv4 mapped (::ffff:a.b.c.d) and IPv4 compatible (::a.b.c.d): judge the IPv4 address.
  if (g.slice(0, 5).every((x) => x === 0) && (g[5] === 0xffff || g[5] === 0)) {
    const v4 = `${g[6] >> 8}.${g[6] & 255}.${g[7] >> 8}.${g[7] & 255}`;
    return isBlockedAddress(v4);
  }
  if (g[0] === 0x64 && g[1] === 0xff9b) return true; // NAT64
  if ((g[0] & 0xfe00) === 0xfc00) return true; // unique local fc00::/7
  if ((g[0] & 0xffc0) === 0xfe80) return true; // link local fe80::/10
  if ((g[0] & 0xffc0) === 0xfec0) return true; // site local (deprecated)
  if ((g[0] & 0xff00) === 0xff00) return true; // multicast
  if (g[0] === 0x2001 && g[1] === 0x0db8) return true; // documentation
  if (g[0] === 0x2002) return true; // 6to4 can wrap a private IPv4
  if (g[0] === 0x2001 && g[1] === 0) return true; // Teredo
  return false;
}

/**
 * Parses and checks a URL the learner gave (or a redirect target). Throws a
 * SafeFetchError("bad_url" | "blocked") when it may not be fetched.
 */
export function checkRemoteUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    throw new SafeFetchError("bad_url", "That is not a full web address.");
  }
  if (url.protocol !== "https:") throw new SafeFetchError("bad_url", "Only https links can be imported.");
  if (url.username || url.password) throw new SafeFetchError("bad_url", "Links with a user name or password cannot be imported.");
  if (url.port && url.port !== "443") throw new SafeFetchError("blocked", "Only links on the standard https port can be imported.");
  const host = url.hostname.toLowerCase().replace(/\.$/, "").replace(/^\[|\]$/g, "");
  if (!host) throw new SafeFetchError("bad_url", "That is not a full web address.");
  if (isIP(host)) {
    if (isBlockedAddress(host)) throw new SafeFetchError("blocked", "That address is not on the public internet.");
    return url;
  }
  if (BLOCKED_HOSTS.has(host) || BLOCKED_SUFFIXES.some((s) => host.endsWith(s)) || !host.includes(".")) {
    throw new SafeFetchError("blocked", "That address is not on the public internet.");
  }
  return url;
}
