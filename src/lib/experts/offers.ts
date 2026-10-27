/**
 * Offer kinds and the facts shown for an offer. Pure, so it is unit tested
 * and shared by the directory, the expert page and the offer page.
 */

export const OFFER_KINDS = [
  { kind: "one_to_one", label: "One to one session", blurb: "A live call with the expert, just you." },
  { kind: "group", label: "Group session", blurb: "A live session shared with a small group." },
  { kind: "async_review", label: "Review", blurb: "Send your work and get written or recorded feedback." },
  { kind: "project", label: "Project help", blurb: "Hands on help with a piece of work over a few days." },
  { kind: "recurring", label: "Ongoing mentorship", blurb: "Regular sessions at an agreed rhythm." },
  { kind: "gig", label: "Gig", blurb: "A fixed scope job delivered by a set date." },
] as const;

export type OfferKind = (typeof OFFER_KINDS)[number]["kind"];

export function isOfferKind(value: string): value is OfferKind {
  return OFFER_KINDS.some((k) => k.kind === value);
}

export function offerKindLabel(kind: string): string {
  return OFFER_KINDS.find((k) => k.kind === kind)?.label ?? "Offer";
}

/** The columns of `offers` that describe what is delivered. */
export type OfferTerms = {
  kind: string;
  duration_minutes: number | null;
  delivery_days: number | null;
  max_participants: number | null;
  cadence: string | null;
  revisions_included: number | null;
};

const CADENCE: Record<string, string> = { weekly: "Every week", fortnightly: "Every two weeks", monthly: "Every month" };

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const h = `${hours} ${hours === 1 ? "hour" : "hours"}`;
  return rest ? `${h} ${rest} minutes` : h;
}

/** Label and value pairs for the offer's terms, only for the ones it sets. */
export function offerFacts(offer: OfferTerms): { label: string; value: string }[] {
  const facts: { label: string; value: string }[] = [];
  if (offer.duration_minutes) facts.push({ label: "Length", value: formatDuration(offer.duration_minutes) });
  if (offer.delivery_days)
    facts.push({ label: "Delivery", value: `${offer.delivery_days} ${offer.delivery_days === 1 ? "day" : "days"}` });
  if (offer.max_participants) facts.push({ label: "Group size", value: `Up to ${offer.max_participants} people` });
  if (offer.cadence && CADENCE[offer.cadence]) facts.push({ label: "How often", value: CADENCE[offer.cadence] });
  if (offer.revisions_included !== null && offer.revisions_included !== undefined)
    facts.push({
      label: "Revisions",
      value:
        offer.revisions_included === 0
          ? "None included"
          : `${offer.revisions_included} ${offer.revisions_included === 1 ? "revision" : "revisions"} included`,
    });
  return facts;
}

/** A short one line summary for an offer card: "One to one session, 45 minutes". */
export function offerSummary(offer: OfferTerms): string {
  const first = offerFacts(offer)[0];
  const label = offerKindLabel(offer.kind);
  return first ? `${label}, ${first.value.charAt(0).toLowerCase()}${first.value.slice(1)}` : label;
}

/** Nothing is charged during the soft launch; the price line says so everywhere. */
export const SOFT_LAUNCH_PRICE = "Free during the soft launch";

/** Where the booking flow (#151) lives. This feature only links to it. */
export const expertPath = (slug: string) => `/experts/${slug}`;
export const offerPath = (slug: string, offerId: string) => `/experts/${slug}/offers/${offerId}`;
export const requestPath = (slug: string, offerId: string) => `${offerPath(slug, offerId)}/request`;
