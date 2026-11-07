/**
 * First party analytics taxonomy (issues #51 and #242) and the guards that
 * keep events anonymous. Pure (no server imports) so it can be unit tested
 * and shared by the server, the beacon route and the browser.
 *
 * Every event names the props it may carry, and every prop has a kind that
 * can only hold an id, a slug, an enum value, a count, a duration, a flag or
 * a short code. Free text is allowed in one place only: the scrubbed,
 * truncated message of an error event. Anything else is dropped before it
 * reaches the database, so a careless call site cannot record personal data.
 *
 * Must match private.is_event_name() in supabase/migrations (a unit test
 * checks), and docs/analytics.md describes each event.
 */

// Field kinds ---------------------------------------------------------------------

export type FieldKind = "id" | "slug" | "enum" | "count" | "num" | "ms" | "flag" | "code" | "digest" | "message";

export type Field =
  | { kind: "id" | "slug" | "count" | "num" | "ms" | "flag" | "code" | "digest" | "message" }
  | { kind: "enum"; values: readonly string[] };

/** A database id (uuid). */
export const id = () => ({ kind: "id" }) as const;
/** A content slug such as a roadmap or skill: lowercase words and hyphens, never a person's slug. */
export const slug = () => ({ kind: "slug" }) as const;
/** One of a fixed list. */
export const oneOf = <const T extends readonly string[]>(values: T) => ({ kind: "enum", values }) as const;
/** A whole number of things (0 to a million). */
export const count = () => ({ kind: "count" }) as const;
/** A measurement such as a Web Vital (finite, 0 to ten million). */
export const num = () => ({ kind: "num" }) as const;
/** A duration in whole milliseconds. */
export const ms = () => ({ kind: "ms" }) as const;
/** True or false. */
export const flag = () => ({ kind: "flag" }) as const;
/** A short machine code: a Postgres error code, an error class name, a digest. */
export const code = () => ({ kind: "code" }) as const;
/** The digest Next gives a server error (a hash, often all digits). Error events only. */
export const digest = () => ({ kind: "digest" }) as const;
/** Error text, scrubbed of emails, numbers and links and cut to 120 characters. Error events only. */
export const message = () => ({ kind: "message" }) as const;

// Shared enums --------------------------------------------------------------------

/** Forms whose start and submit are counted for abandonment (data-analytics-form). */
export const FORM_NAMES = [
  "sign_up",
  "sign_in",
  "welcome",
  "programme_apply",
  "expert_apply",
  "booking_request",
  "brief",
  "pitch",
  "outcome",
  "community_post",
  "submission",
  "organisation",
  "talent_listing",
  "event_feedback",
  "profile",
  "skill_portfolio",
] as const;
export type FormName = (typeof FORM_NAMES)[number];

/** Why an action said no. */
export const REFUSALS = ["rate_limited", "validation", "forbidden", "server_error"] as const;
export type Refusal = (typeof REFUSALS)[number];

export const VITAL_METRICS = ["LCP", "INP", "CLS", "FCP", "TTFB"] as const;
export const DEVICE_CLASSES = ["mobile", "tablet", "desktop", "bot", "unknown"] as const;
export type DeviceClass = (typeof DEVICE_CLASSES)[number];

const DECISION = oneOf([
  "accepted",
  "waitlisted",
  "declined",
  "approved",
  "rejected",
  "verified",
  "suspended",
  "unverified",
  "changes_requested",
]);
const SHARE_CHANNEL = oneOf(["copy", "share", "whatsapp", "x", "linkedin", "facebook", "download"]);

// The taxonomy --------------------------------------------------------------------

type Spec = {
  /** The product area, for docs and dashboards. */
  feature: string;
  /** Who may send it: the server only, or also the browser through the beacon. */
  source: "server" | "client";
  props: Record<string, Field>;
};

export const EVENTS = {
  // Navigation and experience (browser)
  page_view: { feature: "navigation", source: "client", props: {} },
  web_vital: {
    feature: "experience",
    source: "client",
    props: {
      metric: oneOf(VITAL_METRICS),
      value: num(),
      rating: oneOf(["good", "needs-improvement", "poor"]),
      navigation: oneOf(["navigate", "reload", "prerender", "back-forward", "back-forward-cache", "restore", "soft-navigation"]),
    },
  },
  form_started: { feature: "experience", source: "client", props: { form: oneOf(FORM_NAMES) } },
  form_submitted: { feature: "experience", source: "client", props: { form: oneOf(FORM_NAMES) } },
  share_clicked: {
    feature: "sharing",
    source: "client",
    props: { target: oneOf(["achievement", "certificate", "profile", "roadmap", "invite", "event"]), channel: SHARE_CHANNEL },
  },

  // Failures
  client_error: {
    feature: "failures",
    source: "client",
    props: { kind: oneOf(["boundary", "error", "rejection"]), message: message(), digest: digest(), error: code() },
  },
  server_error: {
    feature: "failures",
    source: "server",
    props: { route_type: oneOf(["render", "route", "action", "proxy"]), digest: digest(), error: code() },
  },
  action_failed: {
    feature: "failures",
    source: "server",
    props: { action: code(), refusal: oneOf(REFUSALS), code: code() },
  },

  // Account and settings
  signup: { feature: "auth", source: "server", props: { method: oneOf(["email", "google"]) } },
  sign_in: { feature: "auth", source: "server", props: { method: oneOf(["email", "google"]) } },
  sign_out: { feature: "auth", source: "server", props: {} },
  welcome_completed: { feature: "auth", source: "server", props: {} },
  password_reset_requested: { feature: "auth", source: "server", props: {} },
  password_updated: { feature: "auth", source: "server", props: {} },
  profile_updated: { feature: "settings", source: "server", props: { has_region: flag(), has_headline: flag() } },
  public_profile_updated: { feature: "settings", source: "server", props: { is_public: flag() } },
  profile_published: { feature: "sharing", source: "server", props: {} },
  whatsapp_consent_set: { feature: "settings", source: "server", props: { on: flag() } },
  display_prefs_saved: { feature: "settings", source: "server", props: {} },
  milestone_posts_set: { feature: "settings", source: "server", props: { on: flag() } },

  // Onboarding and the path
  waitlist_joined: { feature: "onboarding", source: "server", props: {} },
  quiz_run: { feature: "path", source: "server", props: { signed_in: flag() } },
  path_saved: { feature: "path", source: "server", props: {} },
  path_viewed: { feature: "path", source: "server", props: {} },

  // Learn
  lesson_opened: { feature: "learn", source: "server", props: { roadmap: slug(), node_id: id() } },
  node_started: { feature: "learn", source: "server", props: { roadmap: slug(), node_id: id() } },
  quiz_submitted: {
    feature: "learn",
    source: "server",
    props: { roadmap: slug(), node_id: id(), score: count(), passed: flag() },
  },
  node_completed: { feature: "learn", source: "server", props: { roadmap: slug(), node_id: id(), via: oneOf(["quiz", "self"]) } },
  review_completed: { feature: "review", source: "server", props: { items: count(), correct: count() } },
  weekly_goal_set: { feature: "review", source: "server", props: { goal: count() } },
  study_buddy_message: { feature: "study_buddy", source: "server", props: { turn: count() } },

  // Skills
  skill_quiz_submitted: { feature: "skills", source: "server", props: { passed: flag(), score: count() } },
  skill_portfolio_submitted: { feature: "skills", source: "server", props: {} },
  skill_portfolio_reviewed: { feature: "skills", source: "server", props: { decision: DECISION } },
  path_skills_claimed: { feature: "skills", source: "server", props: { claimed: count() } },

  // Programme, cohort, submissions and certificates
  application_submitted: { feature: "programme", source: "server", props: {} },
  application_withdrawn: { feature: "programme", source: "server", props: {} },
  application_decided: { feature: "programme", source: "server", props: { decision: DECISION } },
  specialisation_chosen: { feature: "cohort", source: "server", props: { specialisation: slug() } },
  submission_saved: { feature: "cohort", source: "server", props: { sent: flag() } },
  submission_graded: { feature: "cohort", source: "server", props: { passed: flag() } },
  peer_review_assigned: { feature: "cohort", source: "server", props: {} },
  peer_review_submitted: { feature: "cohort", source: "server", props: {} },
  learner_deferred: { feature: "cohort", source: "server", props: {} },
  certificate_issued: { feature: "certificates", source: "server", props: {} },
  certificate_revoked: { feature: "certificates", source: "server", props: {} },

  // Mentors and experts
  expert_applied: { feature: "experts", source: "server", props: {} },
  expert_application_decided: { feature: "experts", source: "server", props: { decision: DECISION } },
  offer_created: { feature: "experts", source: "server", props: {} },
  offer_updated: { feature: "experts", source: "server", props: {} },
  booking_requested: { feature: "bookings", source: "server", props: {} },
  booking_status_changed: {
    feature: "bookings",
    source: "server",
    props: { status: oneOf(["accepted", "declined", "cancelled", "completed"]) },
  },
  booking_message_sent: { feature: "bookings", source: "server", props: {} },
  booking_reviewed: { feature: "bookings", source: "server", props: { rating: count() } },

  // Briefs and pitches
  brief_created: { feature: "briefs", source: "server", props: {} },
  pitch_submitted: { feature: "briefs", source: "server", props: {} },
  pitch_withdrawn: { feature: "briefs", source: "server", props: {} },
  pitch_decided: { feature: "briefs", source: "server", props: { decision: oneOf(["accepted", "declined"]) } },

  // Opportunities, outcomes and talent
  opportunity_created: { feature: "opportunities", source: "server", props: { by: oneOf(["admin", "organisation"]) } },
  opportunity_reported: { feature: "opportunities", source: "server", props: {} },
  opportunity_saved: { feature: "opportunities", source: "server", props: { status: oneOf(["saved", "applied"]) } },
  opportunity_unsaved: { feature: "opportunities", source: "server", props: {} },
  outcome_reported: { feature: "outcomes", source: "server", props: {} },
  outcome_decided: { feature: "outcomes", source: "server", props: { decision: DECISION } },
  talent_listing_saved: { feature: "talent", source: "server", props: {} },
  talent_contact_requested: { feature: "talent", source: "server", props: {} },
  talent_contact_responded: { feature: "talent", source: "server", props: { accepted: flag() } },

  // Organisations
  organisation_created: { feature: "organisations", source: "server", props: {} },
  organisation_member_invited: { feature: "organisations", source: "server", props: { role: oneOf(["owner", "admin", "recruiter"]) } },
  organisation_invite_accepted: { feature: "organisations", source: "server", props: {} },
  organisation_decided: { feature: "organisations", source: "server", props: { decision: DECISION } },

  // Community, events, chapters and social
  post_created: { feature: "community", source: "server", props: { scope: oneOf(["everyone", "chapter", "cohort"]) } },
  reply_created: { feature: "community", source: "server", props: {} },
  reaction_set: { feature: "community", source: "server", props: { on: flag() } },
  content_reported: { feature: "community", source: "server", props: {} },
  content_moderated: { feature: "community", source: "server", props: { hide: flag() } },
  event_rsvp: { feature: "events", source: "server", props: { going: flag() } },
  event_checked_in: { feature: "events", source: "server", props: { by: oneOf(["self", "host"]) } },
  event_feedback_sent: { feature: "events", source: "server", props: { recommend: count() } },
  chapter_joined: { feature: "chapters", source: "server", props: {} },
  chapter_left: { feature: "chapters", source: "server", props: {} },
  profile_followed: { feature: "social", source: "server", props: { on: flag() } },
  profile_reported: { feature: "social", source: "server", props: {} },

  // Sharing and notifications
  invite_sent: { feature: "sharing", source: "server", props: { method: oneOf(["copy", "share"]) } },
  notification_opened: { feature: "notifications", source: "server", props: {} },
  notifications_read_all: { feature: "notifications", source: "server", props: {} },
} as const satisfies Record<string, Spec>;

export type EventName = keyof typeof EVENTS;
export const EVENT_NAMES = Object.keys(EVENTS) as EventName[];

/** Names from the Phase 1 schema that the database still accepts; nothing sends them. */
export const LEGACY_EVENT_NAMES = [
  "signup_started",
  "signup_completed",
  "onboarding_completed",
  "roadmap_viewed",
  "node_opened",
  "path_quiz_started",
  "path_quiz_completed",
  "achievement_shared",
] as const;

/** Events the browser may send through the beacon. Everything else is recorded by the server. */
export const CLIENT_EVENT_NAMES = EVENT_NAMES.filter((n) => EVENTS[n].source === "client");

export function isEventName(value: unknown): value is EventName {
  return typeof value === "string" && Object.hasOwn(EVENTS, value);
}

export function isClientEventName(value: unknown): value is EventName {
  return isEventName(value) && EVENTS[value].source === "client";
}

// Typed props ---------------------------------------------------------------------

type ValueOf<F> = F extends { kind: "enum"; values: readonly (infer V)[] }
  ? V
  : F extends { kind: "flag" }
    ? boolean
    : F extends { kind: "count" | "num" | "ms" }
      ? number
      : string;

/** The props an event may carry; all optional, extra keys are a type error. */
export type PropsOf<N extends EventName> = {
  [K in keyof (typeof EVENTS)[N]["props"]]?: ValueOf<(typeof EVENTS)[N]["props"][K]>;
};

/** Flat, small, and never personal: ids, slugs, counts and flags only. */
export type EventProps = Record<string, string | number | boolean>;

// Guards --------------------------------------------------------------------------

const MAX_KEYS = 12;
const MAX_STRING = 200;
const MESSAGE_MAX = 120;
const KEY = /^[a-z][a-z0-9_]{0,39}$/;
/** Keys that only ever hold personal data. */
export const PERSONAL_KEY =
  /(email|phone|password|token|birth|dob|address|full_name|first_name|last_name|display_name|^name$|^ip$|^user_agent$)/;
const EMAIL_LIKE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Eight or more digits with phone punctuation, e.g. +233 24 123 4567. */
const PHONE_LIKE = /\+?\d[\d\s().-]{6,}\d/;
const SLUG = /^[a-z0-9][a-z0-9_-]{0,79}$/;
const CODE = /^[A-Za-z0-9_.:-]{1,60}$/;

function looksPersonal(value: string) {
  if (EMAIL_LIKE.test(value)) return true;
  if (UUID.test(value)) return false;
  return PHONE_LIKE.test(value) && value.replace(/\D/g, "").length >= 8;
}

/**
 * Error text that is safe to keep: links, emails, quoted strings and runs of
 * digits are replaced, whitespace collapsed, and the result cut to 120
 * characters. Only the first line, so never a stack.
 */
export function scrubMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const clean = value
    .split("\n", 1)[0]
    .replace(/\b[a-z][a-z0-9+.-]*:\/\/\S+/gi, "[link]")
    .replace(/[^\s@]+@[^\s@]+/g, "[email]")
    .replace(/(["'`]).*?\1/g, "[text]")
    .replace(/\d[\d\s().+-]*\d|\d/g, "#")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return null;
  return clean.length > MESSAGE_MAX ? `${clean.slice(0, MESSAGE_MAX - 1)}…` : clean;
}

function checkField(field: Field, value: unknown): string | number | boolean | undefined {
  switch (field.kind) {
    case "id":
      return typeof value === "string" && UUID.test(value) ? value.toLowerCase() : undefined;
    case "slug":
      return typeof value === "string" && SLUG.test(value) && !looksPersonal(value) ? value : undefined;
    case "enum":
      return typeof value === "string" && field.values.includes(value) ? value : undefined;
    case "count":
      return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 1_000_000 ? value : undefined;
    case "num":
      return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 10_000_000
        ? Math.round(value * 10_000) / 10_000
        : undefined;
    case "ms":
      return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 31_536_000_000
        ? Math.round(value)
        : undefined;
    case "flag":
      return typeof value === "boolean" ? value : undefined;
    case "code":
      return typeof value === "string" && CODE.test(value) && !looksPersonal(value) ? value : undefined;
    case "digest":
      return typeof value === "string" && /^[A-Za-z0-9]{1,64}$/.test(value) ? value : undefined;
    case "message":
      return scrubMessage(value) ?? undefined;
  }
}

/**
 * The props an event is allowed to keep: only the keys its spec names, each
 * checked against its kind. Unknown keys and bad values are dropped, never
 * thrown: analytics must not break the caller.
 */
export function validateProps(name: EventName, props: unknown): EventProps {
  if (!props || typeof props !== "object" || Array.isArray(props)) return {};
  const spec = EVENTS[name].props as Record<string, Field>;
  const clean: EventProps = {};
  const digests: EventProps = {};
  for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
    if (!Object.hasOwn(spec, key)) continue;
    const checked = checkField(spec[key], value);
    if (checked === undefined) continue;
    // A digest is a hash Next made, often all digits: the phone number guard would drop it.
    if (spec[key].kind === "digest") digests[key] = checked;
    else clean[key] = checked;
  }
  return { ...sanitizeProps(clean), ...digests };
}

/**
 * The last line of defence, whatever the spec says: drops nested values,
 * personal keys, strings that look like an email or phone number, overlong
 * strings and non finite numbers. The database caps props at 4 KB.
 */
export function sanitizeProps(props: unknown): EventProps {
  if (!props || typeof props !== "object" || Array.isArray(props)) return {};
  const clean: EventProps = {};
  for (const [key, value] of Object.entries(props as Record<string, unknown>)) {
    if (Object.keys(clean).length >= MAX_KEYS) break;
    if (!KEY.test(key) || PERSONAL_KEY.test(key)) continue;
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
