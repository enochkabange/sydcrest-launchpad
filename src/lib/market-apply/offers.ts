import type { FieldErrors } from "@/lib/validation";
import { parseSkills } from "@/lib/social/public-profile";

/**
 * Offers an expert lists (issue #149). Limits and per kind rules mirror the
 * checks on public.offers. Nothing is charged during the soft launch: the
 * indicative price is a display number only, in whole cedis.
 */

export const OFFER_KINDS = ["one_to_one", "group", "async_review", "project", "recurring", "gig"] as const;
export type OfferKind = (typeof OFFER_KINDS)[number];

export const OFFER_KIND_LABELS: Record<OfferKind, string> = {
  one_to_one: "One to one session",
  group: "Group session",
  async_review: "Async review",
  project: "Project",
  recurring: "Recurring mentorship",
  gig: "Gig",
};

export const OFFER_KIND_HINTS: Record<OfferKind, string> = {
  one_to_one: "A live call with one learner, for example a CV review or a mock interview.",
  group: "A live session for several learners at once.",
  async_review: "You review work in your own time and send written or recorded feedback.",
  project: "A piece of work you guide or deliver over a few days or weeks.",
  recurring: "Regular check ins with the same learner, weekly, fortnightly or monthly.",
  gig: "A fixed scope job with a clear deliverable and a delivery time.",
};

export const CADENCES = ["weekly", "fortnightly", "monthly"] as const;
export type Cadence = (typeof CADENCES)[number];
export const CADENCE_LABELS: Record<Cadence, string> = { weekly: "Weekly", fortnightly: "Fortnightly", monthly: "Monthly" };

export const OFFER_LIMITS = {
  title: 120,
  description: 4000,
  scope: 4000,
  skills: 20,
  duration: [15, 480],
  delivery: [1, 180],
  participants: [2, 500],
  revisions: [0, 10],
  price: [0, 1_000_000],
} as const;

/** Which optional fields each kind shows, and which it requires. */
export const KIND_FIELDS: Record<
  OfferKind,
  { duration?: "required" | "optional"; delivery?: "required" | "optional"; scope?: "required" | "optional"; participants?: "required"; cadence?: "required"; revisions?: "optional" }
> = {
  one_to_one: { duration: "required" },
  group: { duration: "required", participants: "required" },
  async_review: { delivery: "optional", revisions: "optional" },
  project: { scope: "optional", delivery: "optional", revisions: "optional" },
  recurring: { duration: "optional", cadence: "required" },
  gig: { scope: "required", delivery: "required", revisions: "optional" },
};

export type OfferFields =
  | "kind"
  | "title"
  | "description"
  | "scope"
  | "duration_minutes"
  | "delivery_days"
  | "max_participants"
  | "cadence"
  | "revisions_included"
  | "skills"
  | "indicative_price_ghs";

export type OfferInput = {
  kind: OfferKind;
  title: string;
  description: string;
  scope: string | null;
  duration_minutes: number | null;
  delivery_days: number | null;
  max_participants: number | null;
  cadence: Cadence | null;
  revisions_included: number | null;
  skills: string[];
  indicative_price_ghs: number | null;
  is_active: boolean;
};

/** The shape OfferForm starts from: an existing offer, or blanks for a new one. */
export type OfferValues = Omit<OfferInput, "kind"> & { kind: OfferKind | "" };

export const EMPTY_OFFER: OfferValues = {
  kind: "",
  title: "",
  description: "",
  scope: null,
  duration_minutes: null,
  delivery_days: null,
  max_participants: null,
  cadence: null,
  revisions_included: null,
  skills: [],
  indicative_price_ghs: null,
  is_active: true,
};

export function isOfferKind(value: string): value is OfferKind {
  return (OFFER_KINDS as readonly string[]).includes(value);
}

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** A whole number in range, or an error. Empty is null. Accepts "1,500" and "GH₵ 50". */
function wholeNumber(raw: string, [min, max]: readonly [number, number], label: string) {
  const cleaned = raw.replace(/[,\s]/g, "").replace(/^(gh₵|ghs|gh¢|₵)/i, "");
  if (!cleaned) return { value: null };
  if (!/^\d+$/.test(cleaned)) return { error: `Enter ${label} as a whole number.` };
  const value = Number(cleaned);
  if (value < min || value > max) return { error: `Enter ${label} from ${min.toLocaleString("en-GB")} to ${max.toLocaleString("en-GB")}.` };
  return { value };
}

export function parseOffer(form: FormData) {
  const kindRaw = text(form, "kind");
  const errors: FieldErrors<OfferFields> = {};
  const kind = isOfferKind(kindRaw) ? kindRaw : null;
  if (!kind) errors.kind = "Choose what kind of offer this is.";
  const rules = kind ? KIND_FIELDS[kind] : {};

  const title = text(form, "title");
  const description = text(form, "description");
  if (!title) errors.title = "Give your offer a title.";
  else if (title.length > OFFER_LIMITS.title) errors.title = `Keep the title under ${OFFER_LIMITS.title} characters.`;
  if (!description) errors.description = "Describe what the learner gets.";
  else if (description.length > OFFER_LIMITS.description) {
    errors.description = `Keep the description under ${OFFER_LIMITS.description} characters.`;
  }

  const skills = parseSkills(text(form, "skills"));
  if (skills.length > OFFER_LIMITS.skills) errors.skills = `List up to ${OFFER_LIMITS.skills} skills.`;

  // Fields a kind does not use are dropped, so switching kind never leaves stale values behind.
  let scope: string | null = null;
  if (rules.scope) {
    scope = text(form, "scope") || null;
    if (!scope && rules.scope === "required") errors.scope = "Describe exactly what you will deliver.";
    else if (scope && scope.length > OFFER_LIMITS.scope) errors.scope = `Keep the scope under ${OFFER_LIMITS.scope} characters.`;
  }

  function numberField(
    key: "duration_minutes" | "delivery_days" | "max_participants" | "revisions_included",
    rule: "required" | "optional" | undefined,
    range: readonly [number, number],
    label: string,
    missing: string,
  ) {
    if (!rule) return null;
    const parsed = wholeNumber(text(form, key), range, label);
    if (parsed.error) errors[key] = parsed.error;
    else if (parsed.value == null && rule === "required") errors[key] = missing;
    return parsed.value ?? null;
  }

  const duration_minutes = numberField("duration_minutes", rules.duration, OFFER_LIMITS.duration, "the length in minutes", "Say how long a session lasts, in minutes.");
  const delivery_days = numberField("delivery_days", rules.delivery, OFFER_LIMITS.delivery, "the delivery time in days", "Say how many days you need to deliver.");
  const max_participants = numberField("max_participants", rules.participants, OFFER_LIMITS.participants, "the group size", "Say how many learners can join.");
  const revisions_included = numberField("revisions_included", rules.revisions, OFFER_LIMITS.revisions, "the number of revisions", "");

  let cadence: Cadence | null = null;
  if (rules.cadence) {
    const raw = text(form, "cadence");
    if ((CADENCES as readonly string[]).includes(raw)) cadence = raw as Cadence;
    else errors.cadence = "Choose how often you meet.";
  }

  const price = wholeNumber(text(form, "indicative_price_ghs"), OFFER_LIMITS.price, "the indicative price in cedis");
  if (price.error) errors.indicative_price_ghs = price.error;

  const data: OfferInput = {
    kind: kind ?? "one_to_one",
    title,
    description,
    scope,
    duration_minutes,
    delivery_days,
    max_participants,
    cadence,
    revisions_included,
    skills,
    indicative_price_ghs: price.value ?? null,
    is_active: form.get("is_active") === "on",
  };
  return { data, errors };
}

/** Whole cedis for display, always labelled as indicative: nothing is charged. */
export function formatIndicativePrice(ghs: number | null | undefined) {
  if (ghs == null) return null;
  return `Indicative price GH₵ ${ghs.toLocaleString("en-GB")}`;
}

/** Short facts for an offer card: "60 minutes", "Up to 12 learners", "Delivered in 5 days". */
export function offerFacts(offer: Pick<OfferInput, "duration_minutes" | "delivery_days" | "max_participants" | "cadence" | "revisions_included">) {
  const facts: string[] = [];
  if (offer.duration_minutes) facts.push(`${offer.duration_minutes} minutes`);
  if (offer.cadence) facts.push(CADENCE_LABELS[offer.cadence]);
  if (offer.max_participants) facts.push(`Up to ${offer.max_participants} learners`);
  if (offer.delivery_days) facts.push(`Delivered in ${offer.delivery_days} ${offer.delivery_days === 1 ? "day" : "days"}`);
  if (offer.revisions_included != null) {
    facts.push(offer.revisions_included === 1 ? "1 revision" : `${offer.revisions_included} revisions`);
  }
  return facts;
}

export const SOFT_LAUNCH_NOTE = "Free during the soft launch";
