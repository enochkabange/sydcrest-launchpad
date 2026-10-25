/**
 * First party analytics taxonomy and the guards that keep events anonymous.
 * Pure (no server imports) so it can be unit tested and shared.
 *
 * Must match the `events.name` check constraint in supabase/migrations.
 */
export const EVENT_NAMES = [
  "page_view",
  "signup",
  "quiz_run",
  "path_viewed",
  "node_started",
  "node_completed",
  "invite_sent",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/** Flat, small, and never personal: ids, slugs, counts and flags only. */
export type EventProps = Record<string, string | number | boolean>;

export function isEventName(value: unknown): value is EventName {
  return typeof value === "string" && (EVENT_NAMES as readonly string[]).includes(value);
}

const MAX_KEYS = 12;
const MAX_STRING = 200;
const KEY = /^[a-z][a-z0-9_]{0,39}$/;
/** Keys that only ever hold personal data. */
const PERSONAL_KEY = /(email|phone|password|token|birth|dob|address|full_name|first_name|last_name|display_name)/;
const EMAIL_LIKE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Eight or more digits with phone punctuation, e.g. +233 24 123 4567. */
const PHONE_LIKE = /\+?\d[\d\s().-]{6,}\d/;

function looksPersonal(value: string) {
  if (EMAIL_LIKE.test(value)) return true;
  if (UUID.test(value)) return false;
  return PHONE_LIKE.test(value) && value.replace(/\D/g, "").length >= 8;
}

/**
 * Drops anything that could identify a person or bloat the row: nested
 * values, personal keys, strings that look like an email or phone number,
 * overlong strings and non finite numbers. The database caps props at 4 KB.
 */
export function sanitizeProps(props: unknown): EventProps {
  if (!props || typeof props !== "object" || Array.isArray(props)) return {};
  const clean: EventProps = {};
  for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
    if (Object.keys(clean).length >= MAX_KEYS) break;
    if (key === "name" || !KEY.test(key) || PERSONAL_KEY.test(key)) continue;
    if (typeof value === "boolean") clean[key] = value;
    else if (typeof value === "number" && Number.isFinite(value)) clean[key] = value;
    else if (typeof value === "string" && value.length <= MAX_STRING && !looksPersonal(value)) clean[key] = value;
  }
  return clean;
}

/**
 * A page path safe to record: same site, no query string or fragment (which
 * can carry emails, tokens or codes), capped in length. Null if unusable.
 */
export function sanitizePath(path: unknown): string | null {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return null;
  const bare = path.split(/[?#]/, 1)[0];
  if (bare.length > MAX_STRING || looksPersonal(bare)) return null;
  return bare;
}
