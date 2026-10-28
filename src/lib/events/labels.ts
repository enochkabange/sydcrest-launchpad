/**
 * Words for the four event types of the events playbook (Planning 04 §1),
 * the three formats and the four statuses. Values match the checks on
 * public.community_events. User facing copy: no dashes.
 */

export const EVENT_KINDS = [
  {
    value: "skillshop",
    label: "Skillshop",
    plural: "Skillshops",
    blurb: "A hands on session in a chapter city. Bring a device if you have one.",
  },
  {
    value: "webinar",
    label: "Launchpad Blueprint webinar",
    plural: "Launchpad Blueprint webinars",
    blurb: "An online session on how to become a role, recorded for the library.",
  },
  {
    value: "flagship",
    label: "Flagship event",
    plural: "Flagship events",
    blurb: "A large day with expert speakers, a panel and time to meet people.",
  },
  {
    value: "activation",
    label: "Campus or partner activation",
    plural: "Campus and partner activations",
    blurb: "A session run with a university, hub or partner.",
  },
] as const;

export type EventKind = (typeof EVENT_KINDS)[number]["value"];

export const EVENT_FORMATS = [
  { value: "in_person", label: "In person" },
  { value: "online", label: "Online" },
  { value: "hybrid", label: "In person and online" },
] as const;

export type EventFormat = (typeof EVENT_FORMATS)[number]["value"];

export const EVENT_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
] as const;

export type EventStatus = (typeof EVENT_STATUSES)[number]["value"];

export type RsvpStatus = "going" | "waitlisted" | "cancelled";

export function isEventKind(value: string): value is EventKind {
  return EVENT_KINDS.some((k) => k.value === value);
}

export function isEventFormat(value: string): value is EventFormat {
  return EVENT_FORMATS.some((f) => f.value === value);
}

export function isEventStatus(value: string): value is EventStatus {
  return EVENT_STATUSES.some((s) => s.value === value);
}

export function kindLabel(kind: string) {
  return EVENT_KINDS.find((k) => k.value === kind)?.label ?? "Event";
}

export function formatLabel(format: string) {
  return EVENT_FORMATS.find((f) => f.value === format)?.label ?? format;
}

export function statusLabel(status: string) {
  return EVENT_STATUSES.find((s) => s.value === status)?.label ?? status;
}

/** Online events have no venue; in person and hybrid ones do. */
export function hasVenue(format: string) {
  return format !== "online";
}

/** Online and hybrid events have a joining link. */
export function hasJoinLink(format: string) {
  return format !== "in_person";
}
