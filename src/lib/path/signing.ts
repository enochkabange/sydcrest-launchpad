import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Tamper evident cookie values: `<base64url json>.<base64url hmac>` with an
 * expiry inside the signed payload. Pure (secret passed in) so it can be
 * unit tested; cookie.ts supplies the secret and the cookie store.
 */

function mac(body: string, secret: string) {
  // Derive a purpose bound key so the signing secret is never used raw.
  const key = createHmac("sha256", secret).update("sydcrest:path-answers:v1").digest();
  return createHmac("sha256", key).update(body).digest("base64url");
}

export function signValue(value: unknown, secret: string, ttlSeconds: number, now = Date.now()): string {
  const body = Buffer.from(JSON.stringify({ exp: now + ttlSeconds * 1000, value })).toString("base64url");
  return `${body}.${mac(body, secret)}`;
}

export function verifyValue(token: string | undefined, secret: string, now = Date.now()): unknown {
  if (!token) return null;
  const [body, sig, extra] = token.split(".");
  if (!body || !sig || extra !== undefined) return null;
  const expected = Buffer.from(mac(body, secret));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { exp?: unknown; value?: unknown };
    if (typeof parsed.exp !== "number" || parsed.exp < now) return null;
    return parsed.value ?? null;
  } catch {
    return null;
  }
}
