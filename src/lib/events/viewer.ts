import "server-only";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type { RsvpStatus } from "./labels";

/**
 * Request time reads for one viewer. They read cookies, so callers sit inside
 * <Suspense>. RLS decides what comes back: own RSVP, own check in and own
 * feedback; event_access only for hosts, which is also how hosting is told.
 */

export type Attendance = { going: number; waitlisted: number; seatsLeft: number | null };

/** Going and waitlisted counts and seats left (numbers only, anyone may read). */
export async function getAttendance(eventId: string): Promise<Attendance> {
  const supabase = await createPublicClient();
  const { data } = await supabase
    .from("event_attendance")
    .select("going_count, waitlist_count, seats_left")
    .eq("event_id", eventId)
    .maybeSingle();
  return { going: data?.going_count ?? 0, waitlisted: data?.waitlist_count ?? 0, seatsLeft: data?.seats_left ?? null };
}

export type EventViewer =
  | { signedIn: false }
  | {
      signedIn: true;
      userId: string;
      rsvp: RsvpStatus | null;
      checkedInAt: string | null;
      isHost: boolean;
      hasFeedback: boolean;
    };

export const getEventViewer = cache(async (eventId: string): Promise<EventViewer> => {
  const user = await getCurrentUser();
  if (!user) return { signedIn: false };
  const supabase = await createClient();
  const [rsvp, checkin, access, feedback] = await Promise.all([
    supabase.from("event_rsvps").select("status").eq("event_id", eventId).eq("profile_id", user.id).maybeSingle(),
    supabase.from("event_checkins").select("checked_in_at").eq("event_id", eventId).eq("profile_id", user.id).maybeSingle(),
    supabase.from("event_access").select("event_id").eq("event_id", eventId).maybeSingle(),
    supabase.from("event_feedback").select("event_id").eq("event_id", eventId).eq("profile_id", user.id).maybeSingle(),
  ]);
  return {
    signedIn: true,
    userId: user.id,
    rsvp: (rsvp.data?.status as RsvpStatus | undefined) ?? null,
    checkedInAt: checkin.data?.checked_in_at ?? null,
    isHost: Boolean(access.data),
    hasFeedback: Boolean(feedback.data),
  };
});

/** The joining link, for people going and hosts. Null when none is set or the viewer may not see it. */
export async function getJoinLink(eventId: string): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("event_join_link", { p_event_id: eventId });
  if (error) return null;
  return data ?? null;
}

export type ViewerEvent = {
  id: string;
  slug: string;
  kind: string;
  title: string;
  summary: string | null;
  format: string;
  starts_at: string;
  ends_at: string;
  venue_name: string | null;
  venue_address: string | null;
  city: string | null;
  region: string | null;
  capacity: number | null;
  status: string;
  chapter_id: string | null;
};

/**
 * One event as the signed in viewer may see it: public events for everyone,
 * drafts for their hosts. For the check in, feedback and host pages.
 */
export const getViewerEvent = cache(async (slug: string): Promise<ViewerEvent | null> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("community_events")
    .select("id, slug, kind, title, summary, format, starts_at, ends_at, venue_name, venue_address, city, region, capacity, status, chapter_id")
    .eq("slug", slug)
    .maybeSingle();
  return data;
});
