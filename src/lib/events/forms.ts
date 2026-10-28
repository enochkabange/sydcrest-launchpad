import { isRegionSlug } from "@/lib/regions";
import { SLUG_PATTERN, slugify } from "@/lib/roadmap-admin";
import { hasJoinLink, hasVenue, isEventFormat, isEventKind, isEventStatus, type EventFormat, type EventKind, type EventStatus } from "./labels";
import { fromDateTimeInput } from "./time";

/**
 * Validation for the event forms: the admin editor, the joining link, a
 * recording and attendee feedback. Mirrors the checks on the tables so people
 * get a sentence instead of a database error. Pure, so it is unit tested.
 */

export type Errors = Record<string, string | undefined>;

/** Static routes under /events that an event slug must not shadow. */
export const RESERVED_EVENT_SLUGS = ["recordings"];

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optional(form: FormData, key: string) {
  return text(form, key) || null;
}

export type EventInput = {
  slug: string;
  kind: EventKind;
  title: string;
  summary: string | null;
  description: string | null;
  format: EventFormat;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  venue_address: string | null;
  city: string | null;
  region: string | null;
  chapter_id: string | null;
  capacity: number | null;
  status: EventStatus;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseEventForm(form: FormData): { data: EventInput; errors: Errors } {
  const errors: Errors = {};
  const title = text(form, "title");
  if (!title) errors.title = "Give the event a title.";
  else if (title.length > 120) errors.title = "Keep the title to 120 characters.";

  const slug = text(form, "slug").toLowerCase() || slugify(title);
  if (!SLUG_PATTERN.test(slug)) errors.slug = "Use lowercase letters, numbers and hyphens (2 to 80 characters).";
  else if (RESERVED_EVENT_SLUGS.includes(slug)) errors.slug = "This slug is taken by a page. Choose another.";

  const kind = text(form, "kind");
  if (!isEventKind(kind)) errors.kind = "Choose the type of event.";
  const format = text(form, "format");
  if (!isEventFormat(format)) errors.format = "Choose how people attend.";
  const status = text(form, "status") || "draft";
  if (!isEventStatus(status)) errors.status = "Choose a status.";

  const summary = optional(form, "summary");
  if (summary && summary.length > 500) errors.summary = "Keep the summary to 500 characters.";
  const description = optional(form, "description");
  if (description && description.length > 8000) errors.description = "Keep the description to 8000 characters.";

  const startsAt = fromDateTimeInput(text(form, "starts_at"));
  if (!startsAt) errors.starts_at = "Enter the start date and time.";
  const endsAt = fromDateTimeInput(text(form, "ends_at"));
  if (!endsAt) errors.ends_at = "Enter the end date and time.";
  else if (startsAt && Date.parse(endsAt) <= Date.parse(startsAt)) errors.ends_at = "The end must be after the start.";

  const venueName = optional(form, "venue_name");
  if (venueName && venueName.length > 120) errors.venue_name = "Keep the venue name to 120 characters.";
  if (!venueName && isEventFormat(format) && hasVenue(format) && status !== "draft") {
    errors.venue_name = "Add the venue before publishing an in person event.";
  }
  const venueAddress = optional(form, "venue_address");
  if (venueAddress && venueAddress.length > 300) errors.venue_address = "Keep the address to 300 characters.";
  const city = optional(form, "city");
  if (city && city.length > 80) errors.city = "Keep the city to 80 characters.";
  const region = optional(form, "region");
  if (region && !isRegionSlug(region)) errors.region = "Choose a region from the list.";

  const chapterId = optional(form, "chapter_id");
  if (chapterId && !UUID.test(chapterId)) errors.chapter_id = "Choose a chapter from the list.";

  const capacityText = text(form, "capacity");
  let capacity: number | null = null;
  if (capacityText) {
    capacity = Number(capacityText);
    if (!Number.isInteger(capacity) || capacity < 1 || capacity > 100000) {
      errors.capacity = "Enter a whole number of seats from 1 to 100000, or leave it empty for no limit.";
    }
  }

  return {
    data: {
      slug,
      kind: kind as EventKind,
      title,
      summary,
      description,
      format: format as EventFormat,
      starts_at: startsAt ?? "",
      ends_at: endsAt ?? "",
      venue_name: format === "online" ? null : venueName,
      venue_address: format === "online" ? null : venueAddress,
      city,
      region,
      chapter_id: chapterId,
      capacity,
      status: status as EventStatus,
    },
    errors,
  };
}

/** event_access.join_url: an https link, or empty to clear it. */
export function parseJoinUrl(form: FormData, format: string): { joinUrl: string | null; error?: string } {
  const value = text(form, "join_url");
  if (!value) return { joinUrl: null };
  if (!hasJoinLink(format)) return { joinUrl: null, error: "In person events do not have a joining link." };
  if (value.length > 500 || !/^https:\/\/\S+$/.test(value)) return { joinUrl: null, error: "Enter a full link that starts with https://" };
  return { joinUrl: value };
}

export type RecordingInput = {
  title: string;
  summary: string | null;
  video_url: string;
  duration_minutes: number | null;
  is_published: boolean;
};

export function parseRecordingForm(form: FormData): { data: RecordingInput; errors: Errors } {
  const errors: Errors = {};
  const title = text(form, "title");
  if (!title) errors.title = "Give the recording a title.";
  else if (title.length > 160) errors.title = "Keep the title to 160 characters.";
  const summary = optional(form, "summary");
  if (summary && summary.length > 2000) errors.summary = "Keep the summary to 2000 characters.";
  const videoUrl = text(form, "video_url");
  if (!/^https:\/\/\S+$/.test(videoUrl) || videoUrl.length > 500) errors.video_url = "Enter a full link that starts with https://";
  const durationText = text(form, "duration_minutes");
  let duration: number | null = null;
  if (durationText) {
    duration = Number(durationText);
    if (!Number.isInteger(duration) || duration < 1 || duration > 1440) errors.duration_minutes = "Enter whole minutes from 1 to 1440.";
  }
  return {
    data: { title, summary, video_url: videoUrl, duration_minutes: duration, is_published: form.get("is_published") === "on" },
    errors,
  };
}

export type FeedbackInput = {
  confidence: number | null;
  usefulness: number | null;
  clarity: number | null;
  logistics: number | null;
  recommend: number | null;
  attend_again: boolean | null;
  comment: string | null;
  quote_consent: boolean;
};

/** The impact snapshot questions (Planning 04 §8). */
export const FEEDBACK_SCALES = [
  { key: "confidence", question: "How much more confident do you feel about the skill after this event?" },
  { key: "usefulness", question: "How useful was the content for you?" },
  { key: "clarity", question: "How clear were the sessions?" },
  { key: "logistics", question: "How well was it organised (timing, venue or link, start on time)?" },
] as const;

function score(form: FormData, key: string, min: number, max: number, errors: Errors) {
  const value = text(form, key);
  if (!value) return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) {
    errors[key] = `Choose a number from ${min} to ${max}.`;
    return null;
  }
  return n;
}

export function parseFeedbackForm(form: FormData): { data: FeedbackInput; errors: Errors } {
  const errors: Errors = {};
  const data: FeedbackInput = {
    confidence: score(form, "confidence", 1, 5, errors),
    usefulness: score(form, "usefulness", 1, 5, errors),
    clarity: score(form, "clarity", 1, 5, errors),
    logistics: score(form, "logistics", 1, 5, errors),
    recommend: score(form, "recommend", 0, 10, errors),
    attend_again: text(form, "attend_again") === "yes" ? true : text(form, "attend_again") === "no" ? false : null,
    comment: optional(form, "comment"),
    quote_consent: form.get("quote_consent") === "on",
  };
  if (data.comment && data.comment.length > 2000) errors.comment = "Keep your comment to 2000 characters.";
  if (data.quote_consent && !data.comment) data.quote_consent = false;
  const answered = [data.confidence, data.usefulness, data.clarity, data.logistics, data.recommend, data.attend_again, data.comment].some(
    (v) => v !== null,
  );
  if (!answered && Object.keys(errors).length === 0) errors.form = "Answer at least one question before you send.";
  return { data, errors };
}

/** A check in code as people type it: "abcd-efgh" or "ABCD EFGH". The database ignores case, spaces and hyphens too. */
export function normaliseCode(input: string) {
  return input.toUpperCase().replace(/[\s-]/g, "");
}

/** "ABCDEFGH" -> "ABCD EFGH", easier to read out at a venue. */
export function displayCode(code: string) {
  return code.length === 8 ? `${code.slice(0, 4)} ${code.slice(4)}` : code;
}

/** Messages for the database errors the event functions raise (see the schema PR). */
export function eventErrorMessage(error: { code?: string; message?: string } | null | undefined): string {
  if (!error) return "Something went wrong. Try again.";
  const message = error.message ?? "";
  if (message.includes("Wrong code")) return "That code does not match. Check it with the host and try again.";
  if (message.includes("Check in is not open")) return "Check in is not open right now. It opens two hours before the start.";
  if (message.includes("not taking RSVPs")) return "This event is no longer taking RSVPs.";
  if (message.includes("Sign in first")) return "Sign in first.";
  if (message.includes("RSVP first")) return "RSVP first to see the joining link.";
  if (error.code === "P0002") return "We could not find this event.";
  if (error.code === "42501") return "You do not have access to do that.";
  if (error.code === "54000") return "Slow down a little and try again.";
  return "Something went wrong. Try again.";
}
