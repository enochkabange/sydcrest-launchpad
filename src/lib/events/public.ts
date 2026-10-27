import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Public event content for /events, cached with `use cache`. Reads are
 * anonymous (publishable key, no cookies), so RLS returns published,
 * cancelled and completed events only: never drafts, codes, joining links or
 * names. Attendance numbers change with every RSVP, so they are read at
 * request time in an island (./viewer.ts), not here.
 *
 * Tagged so admin edits refresh the pages at once (./revalidate.ts).
 */

export const EVENTS_TAG = "events";
export const eventTag = (slug: string) => `event:${slug}`;
export const ALL_EVENTS_TAG = "events:all";

/** Placeholder param for build validation when nothing is published yet. */
export const PLACEHOLDER_EVENT_SLUG = "__none__";

export const eventPath = (slug: string) => `/events/${slug}`;

function anonClient() {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

/** The CI build has no database: at build time a failed read is empty; at runtime it throws (and is never cached). */
async function guarded<T>(what: string, empty: T, run: () => Promise<T>): Promise<T> {
  try {
    return await run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.warn(`Events: could not load ${what} at build time (${message}); rendering on demand.`);
      return empty;
    }
    throw new Error(`Could not load ${what}: ${message}`);
  }
}

function check(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export type EventChapter = { slug: string; name: string; city: string };

export type PublicEvent = {
  id: string;
  slug: string;
  kind: string;
  title: string;
  summary: string | null;
  format: string;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  city: string | null;
  region: string | null;
  capacity: number | null;
  status: string;
  updated_at: string;
  chapter: EventChapter | null;
  recording_count: number;
};

export type PublicEventDetail = PublicEvent & { description: string | null; venue_address: string | null };

const LIST_COLUMNS =
  "id, slug, kind, title, summary, format, starts_at, ends_at, venue_name, city, region, capacity, status, updated_at, chapter:chapters(slug, name, city), event_recordings(count)";

type ListRow = Omit<PublicEvent, "recording_count"> & { event_recordings: { count: number }[] };

function toEvent({ event_recordings, ...row }: ListRow): PublicEvent {
  return { ...row, recording_count: event_recordings[0]?.count ?? 0 };
}

/** Every public event (not drafts), soonest first. The page splits upcoming and past. */
export async function getPublicEvents(): Promise<PublicEvent[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(EVENTS_TAG, ALL_EVENTS_TAG);

  return guarded("events", [], async () => {
    const { data, error } = await anonClient()
      .from("community_events")
      .select(LIST_COLUMNS)
      .neq("status", "draft")
      .order("starts_at")
      .limit(500)
      .overrideTypes<ListRow[], { merge: false }>();
    check(error);
    return (data ?? []).map(toEvent);
  });
}

export async function getPublicEvent(slug: string): Promise<PublicEventDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(eventTag(slug), ALL_EVENTS_TAG);

  return guarded("event", null, async () => {
    const { data, error } = await anonClient()
      .from("community_events")
      .select(`${LIST_COLUMNS}, description, venue_address`)
      .eq("slug", slug)
      .neq("status", "draft")
      .maybeSingle()
      .overrideTypes<(ListRow & { description: string | null; venue_address: string | null }) | null, { merge: false }>();
    check(error);
    if (!data) return null;
    const { description, venue_address, ...rest } = data;
    return { ...toEvent(rest), description, venue_address };
  });
}

/** Chapters with at least one public event, for the chapter filter. */
export async function getEventChapters(): Promise<EventChapter[]> {
  const events = await getPublicEvents();
  const bySlug = new Map<string, EventChapter>();
  for (const e of events) if (e.chapter) bySlug.set(e.chapter.slug, e.chapter);
  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export type PublicRecording = {
  id: string;
  title: string;
  summary: string | null;
  video_url: string;
  duration_minutes: number | null;
  created_at: string;
  event: { slug: string; title: string; kind: string; starts_at: string } | null;
};

/** Published recordings of public events, newest event first. */
export async function getPublicRecordings(): Promise<PublicRecording[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(EVENTS_TAG, ALL_EVENTS_TAG);

  return guarded("recordings", [], async () => {
    const { data, error } = await anonClient()
      .from("event_recordings")
      .select("id, title, summary, video_url, duration_minutes, created_at, event:community_events(slug, title, kind, starts_at)")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(500)
      .overrideTypes<PublicRecording[], { merge: false }>();
    check(error);
    return (data ?? []).sort((a, b) => Date.parse(b.event?.starts_at ?? b.created_at) - Date.parse(a.event?.starts_at ?? a.created_at));
  });
}

/** Published recordings of one event, cached with that event's page. */
export async function getEventRecordings(slug: string): Promise<PublicRecording[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(eventTag(slug), ALL_EVENTS_TAG);

  return guarded("event recordings", [], async () => {
    const { data, error } = await anonClient()
      .from("event_recordings")
      .select("id, title, summary, video_url, duration_minutes, created_at, event:community_events!inner(slug, title, kind, starts_at)")
      .eq("is_published", true)
      .eq("event.slug", slug)
      .order("created_at")
      .overrideTypes<PublicRecording[], { merge: false }>();
    check(error);
    return data ?? [];
  });
}
