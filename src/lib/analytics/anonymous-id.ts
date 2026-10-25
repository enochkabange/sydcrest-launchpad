/**
 * The anonymous visitor id: a random first party cookie that lets the funnel
 * count distinct visitors and link a visit to a later sign up. It holds no
 * personal data and is never shared with a third party.
 * Set by proxy.ts (a cookie written inside a Server Action would re-render the page).
 */
export const ANONYMOUS_ID_COOKIE = "sc_aid";

const ONE_YEAR = 60 * 60 * 24 * 365;

export const ANONYMOUS_ID_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: ONE_YEAR,
} as const;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Only ids we minted are trusted; anything else is ignored and replaced. */
export function isAnonymousId(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}

export function newAnonymousId() {
  return crypto.randomUUID();
}
