/**
 * Turns a notification row into what the centre shows. The database stores
 * ids and names only (kind + payload, see docs/data-model.md), so the copy
 * lives here, one renderer per kind. Server code that sends its own copy
 * (event reminders, bookings, briefs) puts title, body and href in the
 * payload; those kinds, and any kind added later, go through the generic
 * renderer, which never fails: an unknown kind with an odd payload still
 * shows a sensible line.
 *
 * Links are only ever site paths (one leading slash), so a payload can never
 * send someone off site or run script.
 */

export type NotificationIcon = "reply" | "chapter" | "event" | "event-cancelled" | "skill" | "booking" | "cohort" | "opportunity" | "general";

export type RenderedNotification = {
  title: string;
  body: string | null;
  href: string | null;
  icon: NotificationIcon;
};

export type Payload = Record<string, unknown>;

const MAX_TITLE = 140;
const MAX_BODY = 300;

function str(payload: Payload, key: string, max = MAX_TITLE): string | null {
  const value = payload[key];
  if (typeof value !== "string") return null;
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return null;
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

const SLUG = /^[a-z0-9][a-z0-9-]{0,98}$/i;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function slug(payload: Payload, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && SLUG.test(value) ? value : null;
}

function uuid(payload: Payload, key: string): string | null {
  const value = payload[key];
  return typeof value === "string" && UUID.test(value) ? value : null;
}

/** A same site path, or null. Rejects absolute URLs, protocol relative //host and backslash tricks. */
export function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const href = value.trim();
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\")) return null;
  if (/[\s<>"'`]/.test(href) || /^\/+[a-z]+:/i.test(href)) return null;
  return href.length <= 500 ? href : null;
}

/** "Saturday 7 November at 10:00", in Ghana time. Null when the value is not a date. */
export function formatWhen(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const day = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Accra" }).format(date);
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Accra" }).format(date);
  return `${day} at ${time}`;
}

const postHref = (p: Payload) => {
  const id = uuid(p, "post_id");
  return id ? `/community/post/${id}` : "/community";
};
const eventHref = (p: Payload) => {
  const s = slug(p, "event_slug");
  return s ? `/events/${s}` : "/events";
};
const skillHref = (p: Payload) => {
  const s = slug(p, "skill_slug");
  return s ? `/skills/${s}` : "/skills";
};

type Renderer = (payload: Payload) => RenderedNotification;

/** Copy for the kinds the database writes itself. */
export const RENDERERS: Record<string, Renderer> = {
  community_reply: (p) => ({
    title: "Someone replied to your post",
    body: "Open the conversation to read it and reply.",
    href: postHref(p),
    icon: "reply",
  }),
  chapter_post: (p) => {
    const chapter = str(p, "chapter_name");
    return {
      title: chapter ? `New post from your ${chapter} lead` : "New post from your chapter lead",
      body: "Your chapter lead shared an update with members.",
      href: postHref(p),
      icon: "chapter",
    };
  },
  event_waitlist_promoted: (p) => {
    const event = str(p, "event_title");
    const when = formatWhen(p.starts_at);
    return {
      title: event ? `You have a seat at ${event}` : "You have a seat at an event",
      body: `A place opened up, so you moved off the waitlist.${when ? ` It starts ${when}.` : ""}`,
      href: eventHref(p),
      icon: "event",
    };
  },
  event_update: (p) => {
    const event = str(p, "event_title") ?? "An event you joined";
    const when = formatWhen(p.starts_at);
    if (p.status === "cancelled") {
      return { title: `${event} is cancelled`, body: "Sorry, this event will not go ahead.", href: eventHref(p), icon: "event-cancelled" };
    }
    return {
      title: `${event} has changed`,
      body: when ? `Check the details. It now starts ${when}.` : "Check the new time and place.",
      href: eventHref(p),
      icon: "event",
    };
  },
  verified_skill: (p) => {
    const skill = str(p, "skill_name");
    return {
      title: skill ? `You earned a verified skill: ${skill}` : "You earned a verified skill",
      body: "It now shows on your profile and to organisations looking for talent.",
      href: skillHref(p),
      icon: "skill",
    };
  },
  skill_review: (p) => {
    const skill = str(p, "skill_name");
    if (p.approved === true) {
      return {
        title: skill ? `Your ${skill} portfolio was approved` : "Your portfolio was approved",
        body: "A reviewer checked your work and verified the skill.",
        href: skillHref(p),
        icon: "skill",
      };
    }
    return {
      title: skill ? `Your ${skill} portfolio was reviewed` : "Your portfolio was reviewed",
      body: "Read the reviewer's note and try again when you are ready.",
      href: skillHref(p),
      icon: "skill",
    };
  },
};

/** Titles and icons for kinds whose copy normally comes from server code. */
const GENERIC: Record<string, { title: string; icon: NotificationIcon }> = {
  booking: { title: "Update on a booking", icon: "booking" },
  review: { title: "You have a new review", icon: "booking" },
  cohort: { title: "News from your cohort", icon: "cohort" },
  opportunity: { title: "A new opportunity for you", icon: "opportunity" },
  system: { title: "News from SydCrest", icon: "general" },
};

/** Uses the payload's own title, body and href when present; never throws. */
export function renderGeneric(kind: string, payload: Payload): RenderedNotification {
  const fallback = Object.hasOwn(GENERIC, kind) ? GENERIC[kind] : { title: "Something new on SydCrest", icon: "general" as const };
  return {
    title: str(payload, "title") ?? fallback.title,
    body: str(payload, "body", MAX_BODY),
    href: safeHref(payload.href),
    icon: fallback.icon,
  };
}

/**
 * Kinds sent by server code that already writes its own title, body and
 * href (bookings #186, briefs and pitches #187, event reminders #183). The
 * sender's copy wins; these fill in a title and a link from the ids when a
 * payload arrives without them.
 */
function senderCopy(p: Payload, fallback: RenderedNotification): RenderedNotification {
  return {
    title: str(p, "title") ?? fallback.title,
    body: str(p, "body", MAX_BODY) ?? fallback.body,
    href: safeHref(p.href) ?? fallback.href,
    icon: fallback.icon,
  };
}

const BOOKING_TITLES: Record<string, (actor: string) => string> = {
  requested: (a) => `${a} asked to book a session with you`,
  accepted: (a) => `${a} accepted your booking`,
  declined: (a) => `${a} declined your booking request`,
  cancelled: (a) => `${a} cancelled the booking`,
  completed: (a) => `${a} marked the booking complete`,
  message: (a) => `New message from ${a}`,
  review: (a) => `${a} left you a review`,
};

function bookingFallback(p: Payload, kind: "booking" | "review"): RenderedNotification {
  const bookingId = uuid(p, "booking_id");
  const briefId = uuid(p, "brief_id");
  const event = typeof p.event === "string" && Object.hasOwn(BOOKING_TITLES, p.event) ? p.event : kind === "review" ? "review" : null;
  const actor = str(p, "actor_name", 60);
  const offer = str(p, "offer_title");
  // Pitch news on a brief (#187) arrives as kind "booking" (the fixed kind
  // list has no brief kind). Until a pitch becomes a booking it reads as brief
  // news, with the brief icon, so it is not mistaken for a booking.
  const briefOnly = kind === "booking" && !bookingId && !!briefId;
  return {
    title: event && actor ? BOOKING_TITLES[event](actor) : kind === "review" ? "You have a new review" : briefOnly ? "News about a brief" : "Update on a booking",
    body: offer ? `About ${offer}.` : null,
    href: bookingId ? `/bookings/${bookingId}` : briefId ? `/briefs/${briefId}` : "/bookings",
    icon: briefOnly ? "opportunity" : "booking",
  };
}

Object.assign(RENDERERS, {
  booking: (p: Payload) => senderCopy(p, bookingFallback(p, "booking")),
  review: (p: Payload) => senderCopy(p, bookingFallback(p, "review")),
  opportunity: (p: Payload) => {
    const briefId = uuid(p, "brief_id");
    const opportunitySlug = slug(p, "opportunity_slug");
    return senderCopy(p, {
      title: briefId ? "A new brief matches your skills" : "A new opportunity for you",
      body: null,
      href: briefId ? `/briefs/${briefId}` : opportunitySlug ? `/opportunities/${opportunitySlug}` : "/opportunities",
      icon: "opportunity",
    });
  },
  system: (p: Payload) => renderGeneric("system", p),
} satisfies Record<string, Renderer>);

export function renderNotification(kind: string, payload: unknown): RenderedNotification {
  const p: Payload = payload && typeof payload === "object" && !Array.isArray(payload) ? (payload as Payload) : {};
  const renderer = Object.hasOwn(RENDERERS, kind) ? RENDERERS[kind] : null;
  try {
    return renderer ? renderer(p) : renderGeneric(kind, p);
  } catch {
    return renderGeneric(kind, {});
  }
}

/** "just now", "5 minutes ago", "yesterday", "3 days ago", then a plain date. */
export function timeAgo(iso: string, now: Date): string {
  const then = new Date(iso);
  const seconds = Math.round((now.getTime() - then.getTime()) / 1000);
  if (Number.isNaN(seconds)) return "";
  if (seconds < 60) return "just now";
  const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, "minute");
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return rtf.format(-hours, "hour");
  const days = Math.floor(hours / 24);
  if (days < 7) return rtf.format(-days, "day");
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: then.getFullYear() === now.getFullYear() ? undefined : "numeric", timeZone: "Africa/Accra" }).format(then);
}
