import "server-only";
import { lookup as dnsLookup, type LookupAddress } from "node:dns";
import { request } from "node:https";
import { isIP } from "node:net";
import { checkRemoteUrl, isBlockedAddress, SafeFetchError } from "./url-guard";

/**
 * Fetches a public https resource for an Open Badge import, safely:
 *
 * - https on port 443 only, no credentials in the URL, no internal host names
 *   (url-guard.ts);
 * - the address is checked at connect time: the socket uses our own DNS
 *   lookup, which refuses loopback, private, link local (cloud metadata),
 *   carrier grade NAT, multicast and reserved ranges. The check and the
 *   connection use the same answer, so a DNS record that changes between
 *   them (rebinding) cannot reach an internal address;
 * - redirects are followed by hand, at most three, and every hop goes
 *   through the same checks;
 * - a total time limit and a byte limit; the body is read as a stream and
 *   abandoned as soon as it passes the limit.
 */

export type SafeResponse = { url: string; status: number; contentType: string; body: Buffer };

export type SafeFetchOptions = {
  accept?: string;
  maxBytes?: number;
  timeoutMs?: number;
  maxRedirects?: number;
};

type LookupCallback = (err: NodeJS.ErrnoException | null, address: string | LookupAddress[], family?: number) => void;

/** A dns.lookup replacement for sockets that refuses blocked addresses. */
export function guardedLookup(
  resolve: (hostname: string, cb: (err: NodeJS.ErrnoException | null, addresses: LookupAddress[]) => void) => void = (h, cb) =>
    dnsLookup(h, { all: true, verbatim: true }, cb),
) {
  return (hostname: string, options: { all?: boolean } | number | undefined, callback: LookupCallback) => {
    resolve(hostname, (err, addresses) => {
      if (err) return callback(err, []);
      if (addresses.length === 0 || addresses.some((a) => isBlockedAddress(a.address))) {
        const blocked = Object.assign(new Error("That address is not on the public internet."), { code: "EBLOCKED" });
        return callback(blocked, []);
      }
      if (typeof options === "object" && options?.all) return callback(null, addresses);
      callback(null, addresses[0].address, addresses[0].family);
    });
  };
}

const lookup = guardedLookup();

function once(url: URL, opts: Required<SafeFetchOptions>, signal: AbortSignal): Promise<{ status: number; location: string | null; contentType: string; body: Buffer }> {
  return new Promise((resolve, reject) => {
    // An IP literal skips DNS, so check it here; names are checked in lookup.
    const host = url.hostname.replace(/^\[|\]$/g, "");
    if (isIP(host) && isBlockedAddress(host)) return reject(new SafeFetchError("blocked", "That address is not on the public internet."));

    const req = request(
      url,
      {
        method: "GET",
        lookup: lookup as never,
        signal,
        headers: { Accept: opts.accept, "User-Agent": "SydCrestLaunchpad-BadgeImport/1.0", "Accept-Encoding": "identity" },
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const location = typeof res.headers.location === "string" ? res.headers.location : null;
        const contentType = String(res.headers["content-type"] ?? "").toLowerCase();
        if (status >= 300 && status < 400) {
          res.resume();
          return resolve({ status, location, contentType, body: Buffer.alloc(0) });
        }
        const declared = Number(res.headers["content-length"] ?? 0);
        if (declared > opts.maxBytes) {
          res.destroy();
          return reject(new SafeFetchError("too_large", "That file is too large."));
        }
        const chunks: Buffer[] = [];
        let size = 0;
        res.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > opts.maxBytes) {
            res.destroy();
            reject(new SafeFetchError("too_large", "That file is too large."));
            return;
          }
          chunks.push(chunk);
        });
        res.on("end", () => resolve({ status, location, contentType, body: Buffer.concat(chunks) }));
        res.on("error", (e) => reject(e));
      },
    );
    req.on("error", (e: NodeJS.ErrnoException) => {
      if (e.code === "EBLOCKED") reject(new SafeFetchError("blocked", "That address is not on the public internet."));
      else if (e.name === "AbortError") reject(new SafeFetchError("timeout", "The issuer took too long to answer."));
      else reject(new SafeFetchError("network", "We could not reach that address."));
    });
    req.end();
  });
}

export async function safeFetch(rawUrl: string, options: SafeFetchOptions = {}): Promise<SafeResponse> {
  const opts: Required<SafeFetchOptions> = {
    accept: options.accept ?? "application/json, application/ld+json, */*;q=0.5",
    maxBytes: options.maxBytes ?? 1_048_576,
    timeoutMs: options.timeoutMs ?? 8_000,
    maxRedirects: options.maxRedirects ?? 3,
  };
  const signal = AbortSignal.timeout(opts.timeoutMs);
  let url = checkRemoteUrl(rawUrl);
  for (let hop = 0; hop <= opts.maxRedirects; hop++) {
    const res = await once(url, opts, signal);
    if (res.status >= 300 && res.status < 400) {
      if (!res.location) throw new SafeFetchError("network", "The issuer answered with a broken redirect.");
      url = checkRemoteUrl(new URL(res.location, url).toString());
      continue;
    }
    return { url: url.toString(), status: res.status, contentType: res.contentType, body: res.body };
  }
  throw new SafeFetchError("network", "Too many redirects.");
}

/** Fetches and parses JSON; null body or bad JSON throws a SafeFetchError. */
export async function safeFetchJson(url: string): Promise<{ url: string; status: number; json: unknown; text: string }> {
  const res = await safeFetch(url, { accept: "application/ld+json, application/json, application/vc+jwt, text/plain;q=0.5" });
  const text = res.body.toString("utf8");
  if (res.status === 410) return { url: res.url, status: 410, json: null, text };
  if (res.status !== 200) throw new SafeFetchError("http", `The issuer answered ${res.status}.`);
  try {
    return { url: res.url, status: 200, json: JSON.parse(text), text };
  } catch {
    // A VC JWT served as text is fine; callers look at text.
    return { url: res.url, status: 200, json: null, text: text.trim() };
  }
}
