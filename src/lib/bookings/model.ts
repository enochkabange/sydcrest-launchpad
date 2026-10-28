/**
 * Booking requests, their thread and the review after (#151). Pure, so it is
 * unit tested and shared by the request form, the inbox and the thread page.
 *
 * The database is the source of truth: `set_booking_status` decides every
 * status change and RLS decides who reads and writes. These helpers only
 * decide what to offer on screen and how to word what comes back.
 */

import { RATE_LIMIT_MESSAGE, RATE_LIMITED_CODE } from "@/lib/rate-limit";

export const BOOKING_STATUSES = ["requested", "accepted", "declined", "completed", "cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && (BOOKING_STATUSES as readonly string[]).includes(value);
}

export const STATUS_LABEL: Record<BookingStatus, string> = {
  requested: "Requested",
  accepted: "Accepted",
  declined: "Declined",
  completed: "Completed",
  cancelled: "Cancelled",
};

/** Plural headings for the inbox filter. */
export const STATUS_FILTER_LABEL: Record<BookingStatus, string> = {
  requested: "Waiting for a reply",
  accepted: "Accepted",
  declined: "Declined",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const STATUS_TONE: Record<BookingStatus, string> = {
  requested: "bg-info-bg text-info-fg",
  accepted: "bg-success-bg text-success-fg",
  completed: "bg-success-bg text-success-fg",
  declined: "bg-surface-sunken text-content-2",
  cancelled: "bg-surface-sunken text-content-2",
};

/** Which side of a booking the viewer is on. Organisation members act on the requester side. */
export type BookingRole = "requester" | "expert";

export type BookingAction = "accept" | "decline" | "cancel" | "complete";

/**
 * The actions to show, mirroring set_booking_status:
 *   requested -> accepted | declined     the expert
 *   requested | accepted -> cancelled    either party
 *   accepted -> completed                either party
 * While a request waits, the expert answers it (decline) rather than cancels.
 */
export function allowedActions(status: BookingStatus, role: BookingRole): BookingAction[] {
  if (status === "requested") return role === "expert" ? ["accept", "decline"] : ["cancel"];
  if (status === "accepted") return ["complete", "cancel"];
  return [];
}

export const ACTION_STATUS: Record<BookingAction, BookingStatus> = {
  accept: "accepted",
  decline: "declined",
  cancel: "cancelled",
  complete: "completed",
};

export function isBookingAction(value: unknown): value is BookingAction {
  return typeof value === "string" && value in ACTION_STATUS;
}

/** The thread stays open for messages while the booking is live, and after it is completed. */
export function canMessage(status: BookingStatus) {
  return status === "requested" || status === "accepted" || status === "completed";
}

/** Only the person who booked reviews, once, after the booking is completed. */
export function canReview(status: BookingStatus, role: BookingRole, hasReview: boolean, isRequester: boolean) {
  return status === "completed" && role === "requester" && isRequester && !hasReview;
}

// Rows -------------------------------------------------------------------------------------------

/** A `booking_threads` row as the views type it: every column nullable. */
export type BookingThreadRow = {
  id: string | null;
  status: string | null;
  requester_id: string | null;
  requester_name: string | null;
  requester_avatar: string | null;
  expert_id: string | null;
  expert_name: string | null;
  expert_avatar: string | null;
  expert_slug: string | null;
  offer_id: string | null;
  offer_title: string | null;
  offer_kind: string | null;
  organisation_id: string | null;
  organisation_name: string | null;
  message: string | null;
  preferred_times: string | null;
  status_reason: string | null;
  responded_at: string | null;
  completed_at: string | null;
  has_review: boolean | null;
  last_message_at: string | null;
  created_at: string | null;
};

export type BookingThread = {
  id: string;
  status: BookingStatus;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string | null;
  expertId: string;
  expertName: string;
  expertAvatar: string | null;
  expertSlug: string | null;
  offerId: string | null;
  offerTitle: string | null;
  offerKind: string | null;
  organisationName: string | null;
  message: string;
  preferredTimes: string | null;
  statusReason: string | null;
  respondedAt: string | null;
  completedAt: string | null;
  hasReview: boolean;
  createdAt: string;
  /** The last message, or the request itself when nobody has written yet. */
  lastActivityAt: string;
};

const FALLBACK_NAME = "A SydCrest member";

/** Narrow a view row once, dropping rows without the columns every screen needs. */
export function toThread(row: BookingThreadRow): BookingThread | null {
  if (!row.id || !isBookingStatus(row.status) || !row.requester_id || !row.expert_id || !row.created_at) return null;
  return {
    id: row.id,
    status: row.status,
    requesterId: row.requester_id,
    requesterName: row.requester_name?.trim() || FALLBACK_NAME,
    requesterAvatar: row.requester_avatar,
    expertId: row.expert_id,
    expertName: row.expert_name?.trim() || FALLBACK_NAME,
    expertAvatar: row.expert_avatar,
    expertSlug: row.expert_slug,
    offerId: row.offer_id,
    offerTitle: row.offer_title,
    offerKind: row.offer_kind,
    organisationName: row.organisation_name,
    message: row.message ?? "",
    preferredTimes: row.preferred_times,
    statusReason: row.status_reason,
    respondedAt: row.responded_at,
    completedAt: row.completed_at,
    hasReview: row.has_review ?? false,
    createdAt: row.created_at,
    lastActivityAt: row.last_message_at && row.last_message_at > row.created_at ? row.last_message_at : row.created_at,
  };
}

/** The expert sees their side; everyone else who can read the booking is on the requester side. */
export function roleIn(thread: Pick<BookingThread, "expertId">, viewerId: string): BookingRole {
  return thread.expertId === viewerId ? "expert" : "requester";
}

/** The person on the other side, as the viewer sees them. */
export function otherParty(thread: BookingThread, viewerId: string) {
  return roleIn(thread, viewerId) === "expert"
    ? {
        id: thread.requesterId,
        name: thread.organisationName ? `${thread.requesterName}, ${thread.organisationName}` : thread.requesterName,
        avatarUrl: thread.requesterAvatar,
      }
    : { id: thread.expertId, name: thread.expertName, avatarUrl: thread.expertAvatar };
}

/** Newest activity first. */
export function sortByActivity(threads: BookingThread[]) {
  return [...threads].sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt));
}

export function countByStatus(threads: BookingThread[]): Record<BookingStatus, number> {
  const counts = { requested: 0, accepted: 0, declined: 0, completed: 0, cancelled: 0 };
  for (const t of threads) counts[t.status] += 1;
  return counts;
}

/** `?status=` for the inbox. Missing or unknown values show everything. */
export function parseStatusFilter(value: string | string[] | undefined): BookingStatus | null {
  const v = Array.isArray(value) ? value[0] : value;
  return isBookingStatus(v) ? v : null;
}

/** `?side=` for the inbox: requests you sent, requests sent to you, or both. */
export type InboxSide = "all" | "sent" | "received";

export function parseSide(value: string | string[] | undefined): InboxSide {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "sent" || v === "received" ? v : "all";
}

export function filterInbox(threads: BookingThread[], viewerId: string, side: InboxSide, status: BookingStatus | null) {
  return sortByActivity(
    threads.filter(
      (t) =>
        (status === null || t.status === status) &&
        (side === "all" || (side === "received") === (roleIn(t, viewerId) === "expert")),
    ),
  );
}

// Forms ------------------------------------------------------------------------------------------

export const REQUEST_MESSAGE_MAX = 2000;
export const PREFERRED_TIMES_MAX = 500;
export const MESSAGE_MAX = 4000;
export const REASON_MAX = 1000;
export const REVIEW_MAX = 2000;

type Parsed<T> = { data: T; errors: Record<string, string> };

function text(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export function parseRequest(form: FormData): Parsed<{ message: string; preferred_times: string | null }> {
  const message = text(form, "message");
  const preferred = text(form, "preferred_times");
  const errors: Record<string, string> = {};
  if (!message) errors.message = "Tell the expert what you need help with.";
  else if (message.length > REQUEST_MESSAGE_MAX) errors.message = `Keep it under ${REQUEST_MESSAGE_MAX} characters.`;
  if (preferred.length > PREFERRED_TIMES_MAX) errors.preferred_times = `Keep it under ${PREFERRED_TIMES_MAX} characters.`;
  return { data: { message, preferred_times: preferred || null }, errors };
}

export function parseMessage(form: FormData): Parsed<{ body: string }> {
  const body = text(form, "body");
  const errors: Record<string, string> = {};
  if (!body) errors.body = "Write a message first.";
  else if (body.length > MESSAGE_MAX) errors.body = `Keep it under ${MESSAGE_MAX} characters.`;
  return { data: { body }, errors };
}

export function parseReason(form: FormData): Parsed<{ reason: string | null }> {
  const reason = text(form, "reason");
  const errors: Record<string, string> = {};
  if (reason.length > REASON_MAX) errors.reason = `Keep it under ${REASON_MAX} characters.`;
  return { data: { reason: reason || null }, errors };
}

export function parseReview(form: FormData): Parsed<{ rating: number; body: string | null }> {
  const raw = text(form, "rating");
  const rating = /^[1-5]$/.test(raw) ? Number(raw) : 0;
  const body = text(form, "review");
  const errors: Record<string, string> = {};
  if (!rating) errors.rating = "Choose a rating from 1 to 5.";
  if (body.length > REVIEW_MAX) errors.review = `Keep it under ${REVIEW_MAX} characters.`;
  return { data: { rating, body: body || null }, errors };
}

// Errors -----------------------------------------------------------------------------------------

type DbError = { code?: string; message?: string } | null | undefined;

/** Words for what the database refused when sending a request. */
export function requestErrorMessage(error: DbError): string {
  switch (error?.code) {
    case RATE_LIMITED_CODE:
      return RATE_LIMIT_MESSAGE;
    case "23505":
      return "You already have a request waiting with this expert. Open it from your bookings.";
    case "23514":
      return "This is your own offer, so you cannot request it.";
    case "22023":
      return "This expert is not taking requests for this offer right now.";
    case "42501":
      return "The expert market is for adults aged 18 and over.";
    default:
      return "We could not send your request. Try again.";
  }
}

/** Words for a refused status change. The usual cause is the other person acting first. */
export function statusErrorMessage(error: DbError): string {
  switch (error?.code) {
    case "22023":
      return "This booking has already moved on. The page now shows where it stands.";
    case "42501":
      return "Only the other person can do that on this booking.";
    case "P0002":
      return "We could not find this booking.";
    default:
      return "That did not go through. Try again.";
  }
}

export function messageErrorMessage(error: DbError): string {
  if (error?.code === RATE_LIMITED_CODE) return RATE_LIMIT_MESSAGE;
  return error?.code === "42501"
    ? "This thread is closed because the booking was declined or cancelled."
    : "Your message did not send. Try again.";
}

export function reviewErrorMessage(error: DbError): string {
  switch (error?.code) {
    case "23505":
      return "You have already reviewed this booking.";
    case "42501":
      return "Only the person who booked can review, once the booking is completed.";
    default:
      return "Your review did not save. Try again.";
  }
}

// Notifications ----------------------------------------------------------------------------------

export type BookingEvent = "requested" | "accepted" | "declined" | "cancelled" | "completed" | "message" | "review";

export type BookingNotification = {
  kind: "booking" | "review";
  payload: {
    event: BookingEvent;
    booking_id: string;
    actor_name: string;
    offer_title: string | null;
    title: string;
    body: string;
    href: string;
  };
};

const EVENT_TITLE: Record<BookingEvent, (actor: string) => string> = {
  requested: (a) => `New request from ${a}`,
  accepted: (a) => `${a} accepted your request`,
  declined: (a) => `${a} declined your request`,
  cancelled: (a) => `${a} cancelled a booking`,
  completed: (a) => `${a} marked a booking completed`,
  message: (a) => `New message from ${a}`,
  review: (a) => `${a} left you a review`,
};

/**
 * The in app notification for one booking event. Ids and names for the
 * notification centre, plus ready title, body and link (the table's
 * convention). Never phone or email, never message text beyond the offer.
 */
export function bookingNotification(
  event: BookingEvent,
  booking: { id: string; offerTitle: string | null },
  actorName: string,
): BookingNotification {
  const about = booking.offerTitle ? `About ${booking.offerTitle}.` : "About your booking.";
  const body =
    event === "completed" ? `${about} You can leave a review now.` : event === "requested" ? `${about} Accept or decline it.` : about;
  return {
    kind: event === "review" ? "review" : "booking",
    payload: {
      event,
      booking_id: booking.id,
      actor_name: actorName,
      offer_title: booking.offerTitle,
      title: EVENT_TITLE[event](actorName),
      body,
      href: bookingPath(booking.id),
    },
  };
}

export const BOOKINGS_PATH = "/bookings";
export const bookingPath = (id: string) => `${BOOKINGS_PATH}/${id}`;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function isUuid(value: string) {
  return UUID.test(value);
}

/** "27 October 2026" in Accra time. */
export function formatDay(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Accra" }).format(
    new Date(iso),
  );
}

/** "27 Oct, 14:05" in Accra time, for messages. */
export function formatMoment(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Africa/Accra",
  }).format(new Date(iso));
}
