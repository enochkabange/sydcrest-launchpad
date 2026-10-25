import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Twilio request signing (X-Twilio-Signature): base64 HMAC SHA1, keyed with
 * the auth token, over the full URL followed by every POST parameter as
 * name + value, sorted by name. Mirrors validateRequest in the twilio package,
 * minus its legacy query string fallbacks (our webhook URL has no query).
 */
export function expectedSignature(authToken: string, url: string, params: Record<string, string>) {
  const data = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + key + params[key], url);
  return createHmac("sha1", authToken).update(Buffer.from(data, "utf-8")).digest("base64");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Twilio may sign the URL with or without the default port; accept either. */
function urlVariants(url: string) {
  const parsed = new URL(url);
  const withoutPort = `${parsed.protocol}//${parsed.hostname}${parsed.pathname}${parsed.search}`;
  const port = parsed.port || (parsed.protocol === "https:" ? "443" : "80");
  const withPort = `${parsed.protocol}//${parsed.hostname}:${port}${parsed.pathname}${parsed.search}`;
  return Array.from(new Set([url, withoutPort, withPort]));
}

export function isValidTwilioSignature(
  authToken: string,
  signature: string | null | undefined,
  url: string,
  params: Record<string, string>,
) {
  if (!authToken || !signature) return false;
  return urlVariants(url).some((candidate) => safeEqual(signature, expectedSignature(authToken, candidate, params)));
}
