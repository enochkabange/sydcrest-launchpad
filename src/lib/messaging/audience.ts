/**
 * The audience composer (epic #320, issue #334): filters, templates, the
 * preview and the results maths. Pure, so the browser and the server share it
 * and it can be unit tested. The database decides who is actually in an
 * audience and enforces every limit (public.send_message in
 * supabase/migrations/20261115100000_audience_messaging.sql); this file only
 * cleans what a form sends and explains the numbers.
 */
import { normaliseTag } from "../analytics/attribution";
import { STAGES, type Stage } from "../learners/attributes";
import { REGIONS } from "../regions";
import { renderTemplate } from "./templates";

/** Most people one send may reach. Must match v_cap in public.send_message. */
export const SEND_CAP = 1000;
/** Sends per sender per day. Must match public.send_message. */
export const DAILY_SENDS = { lead: 5, staff: 20 } as const;
/** Nobody gets more than one of these messages in this many days. */
export const FREQUENCY_DAYS = 2;
/** Largest holdout share, in percent. */
export const HOLDOUT_MAX = 50;
/** The holdout share the composer starts with. */
export const HOLDOUT_DEFAULT = 10;
/** How long after sending a return counts. */
export const RETURN_WINDOW_DAYS = 7;

export const TITLE_MAX = 140;
export const BODY_MAX = 300;

export const CHANNELS = [
  { value: "in_app", label: "In app notification", hint: "Shows in the bell for everyone in the audience." },
  {
    value: "whatsapp",
    label: "WhatsApp",
    hint: "Only members who turned on WhatsApp updates. The title and link go out in our approved message.",
  },
] as const;
export type Channel = (typeof CHANNELS)[number]["value"];

export function isChannel(value: unknown): value is Channel {
  return typeof value === "string" && CHANNELS.some((c) => c.value === value);
}

/** Why there is no email option, shown in the composer. */
export const NO_EMAIL_NOTE = "Email is not offered: members have not been asked to agree to messages by email.";

// Filters ------------------------------------------------------------------------------------

export type AudienceFilters = {
  track?: string;
  region?: string;
  chapter_id?: string;
  cohort_id?: string;
  stages?: Stage[];
  inactive_days?: number;
  campaign?: string;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const TRACK = /^[a-z0-9][a-z0-9-]{0,79}$/;

/** Something with get and getAll, like FormData or URLSearchParams. */
type FormLike = { get(name: string): unknown; getAll(name: string): unknown[] };

function text(form: FormLike, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * The filters a composer form asks for, cleaned: unknown regions, stages and
 * malformed ids are dropped, days are clamped to 1 to 365, the campaign is
 * normalised the way first touch tags are. `chapterId` is the chapter a
 * lead sends for; it always wins over any chapter in the form.
 */
export function buildAudienceFilters(form: FormLike, chapterId?: string | null): AudienceFilters {
  const filters: AudienceFilters = {};

  const track = text(form, "track").toLowerCase();
  if (TRACK.test(track)) filters.track = track;

  const region = text(form, "region");
  if (REGIONS.some((r) => r.slug === region)) filters.region = region;

  const chapter = chapterId ?? text(form, "chapter_id");
  if (chapter && UUID.test(chapter)) filters.chapter_id = chapter.toLowerCase();

  const cohort = text(form, "cohort_id");
  if (UUID.test(cohort)) filters.cohort_id = cohort.toLowerCase();

  const stages = form
    .getAll("stage")
    .filter((s): s is Stage => typeof s === "string" && STAGES.some((x) => x.value === s));
  if (stages.length) filters.stages = Array.from(new Set(stages));

  const days = Number.parseInt(text(form, "inactive_days"), 10);
  if (Number.isFinite(days) && days > 0) filters.inactive_days = Math.min(days, 365);

  const campaign = normaliseTag(text(form, "campaign"));
  if (campaign) filters.campaign = campaign;

  return filters;
}

/** A plain description of an audience, for the results page and the confirm line. */
export function describeFilters(filters: AudienceFilters, names: { chapter?: string; cohort?: string; track?: string } = {}): string {
  const parts: string[] = [];
  if (filters.stages?.length) {
    parts.push(filters.stages.map((s) => STAGES.find((x) => x.value === s)?.label.toLowerCase() ?? s).join(" or "));
  }
  parts.push("members");
  if (filters.chapter_id) parts.push(`of ${names.chapter ?? "one chapter"}`);
  if (filters.region) parts.push(`in ${REGIONS.find((r) => r.slug === filters.region)?.label ?? filters.region}`);
  if (filters.cohort_id) parts.push(`in ${names.cohort ?? "one cohort"}`);
  if (filters.track) parts.push(`on the ${names.track ?? filters.track} track`);
  if (filters.inactive_days) parts.push(`inactive for ${filters.inactive_days} days or more`);
  if (filters.campaign) parts.push(`who first came from the ${filters.campaign} campaign`);
  const sentence = parts.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

// Holdout ------------------------------------------------------------------------------------

/** A holdout share from a form: whole percent, 0 to HOLDOUT_MAX. */
export function holdoutShare(value: unknown): number {
  const n = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(n)) return 0;
  return Math.min(Math.max(Math.round(n), 0), HOLDOUT_MAX);
}

/**
 * How many of an audience are held out: round(n * share / 100), the same sum
 * public.send_message does (it picks who at random). Postgres rounds halves
 * away from zero, like Math.round for positive numbers.
 */
export function holdoutSize(audience: number, share: number): number {
  if (!Number.isFinite(audience) || audience <= 0) return 0;
  return Math.round((Math.floor(audience) * holdoutShare(share)) / 100);
}

/** Who would get the message and who would be held out, for the preview. */
export function splitPreview(audience: number, share: number) {
  const held = holdoutSize(audience, share);
  return { send: Math.max(Math.floor(audience) - held, 0), held };
}

// Templates and preview -------------------------------------------------------------------------

export type ComposerTemplate = { label: string; title: string; body: string; href: string };

/** Starting points for the composer; every field stays editable. */
export const COMPOSER_TEMPLATES = {
  come_back: {
    label: "We miss you",
    title: "Your roadmap is waiting for you",
    body: "Pick up where you left off. Even 20 minutes today keeps you moving.",
    href: "/dashboard",
  },
  event: {
    label: "Event invite",
    title: "Join us at our next meetup",
    body: "Come and learn with people near you. See the details and save your seat.",
    href: "/events",
  },
  chapter_news: {
    label: "Chapter news",
    title: "News from your chapter",
    body: "",
    href: "/chapters",
  },
  custom: { label: "Write your own", title: "", body: "", href: "" },
} as const satisfies Record<string, ComposerTemplate>;
export type ComposerTemplateName = keyof typeof COMPOSER_TEMPLATES;

export function isComposerTemplate(value: unknown): value is ComposerTemplateName {
  return typeof value === "string" && Object.hasOwn(COMPOSER_TEMPLATES, value);
}

/** A link inside the site: one leading slash, no spaces or backslashes. Null otherwise. */
export function sitePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const href = value.trim();
  if (!href) return null;
  if (!/^\/([^/\\\s][^\\\s]*)?$/.test(href) || /^\/+[a-z]+:/i.test(href) || /[<>"'`]/.test(href)) return null;
  return href.length <= 300 ? href : null;
}

export type MessageDraft = { channel: Channel; template: ComposerTemplateName; title: string; body: string; href: string | null };
export type DraftErrors = Partial<Record<"title" | "body" | "href" | "channel", string>>;

/** The message part of a composer form, checked. */
export function parseDraft(form: FormLike): { draft: MessageDraft; errors: DraftErrors } {
  const errors: DraftErrors = {};
  const channel = text(form, "channel");
  const template = text(form, "template");
  const title = text(form, "title").replace(/\s+/g, " ");
  const body = text(form, "body");
  const rawHref = text(form, "href");
  const href = rawHref ? sitePath(rawHref) : null;

  if (!isChannel(channel)) errors.channel = "Choose how to send it.";
  if (!title) errors.title = "Write a title.";
  else if (title.length > TITLE_MAX) errors.title = `Keep the title under ${TITLE_MAX} characters.`;
  if (body.length > BODY_MAX) errors.body = `Keep the message under ${BODY_MAX} characters.`;
  if (rawHref && !href) errors.href = "Use a page on this site, starting with a slash, like /events.";

  return {
    draft: {
      channel: isChannel(channel) ? channel : "in_app",
      template: isComposerTemplate(template) ? template : "custom",
      title,
      body,
      href,
    },
    errors,
  };
}

/** The WhatsApp text a member would get: the approved alert template, with their first name. */
export function whatsappPreview(draft: Pick<MessageDraft, "title" | "href">, origin: string, name = "Wumpini"): string {
  return renderTemplate("alert", { name, title: draft.title, url: `${origin.replace(/\/$/, "")}${draft.href ?? "/notifications"}` });
}

// Results --------------------------------------------------------------------------------------

export type ResultRow = { held_out: boolean; people: number; delivered: number; opened: number; came_back: number };

/** A share as a whole percent, or null when there is nobody to count. */
export function rate(part: number, whole: number): number | null {
  return whole > 0 ? Math.round((part / whole) * 100) : null;
}

/**
 * Came back rate for those sent the message and for the holdout, and the
 * difference in percentage points (null without a holdout).
 */
export function summariseResults(rows: ResultRow[]) {
  const sent = rows.find((r) => !r.held_out) ?? { held_out: false, people: 0, delivered: 0, opened: 0, came_back: 0 };
  const held = rows.find((r) => r.held_out) ?? { held_out: true, people: 0, delivered: 0, opened: 0, came_back: 0 };
  const sentRate = rate(sent.came_back, sent.people);
  const heldRate = rate(held.came_back, held.people);
  return {
    sent,
    held,
    openedRate: rate(sent.opened, sent.delivered),
    sentRate,
    heldRate,
    lift: sentRate !== null && heldRate !== null ? sentRate - heldRate : null,
  };
}
