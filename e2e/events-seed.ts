/**
 * Seeds events for the events specs through the service role helpers
 * (e2e/supabase-admin.ts), relative to the current time so every state is
 * reachable: an upcoming Skillshop with one seat, a webinar that is on now
 * (check in open, joining link set), a past webinar with a recording, and a
 * cancelled activation. Test code only.
 */
import { admin, insert } from "./supabase-admin";

const HOUR = 60 * 60 * 1000;
const iso = (offsetHours: number) => new Date(Date.now() + offsetHours * HOUR).toISOString();

export type SeededEvents = {
  suffix: string;
  chapter: { id: string; slug: string; name: string };
  skillshop: { id: string; slug: string; title: string };
  live: { id: string; slug: string; title: string; code: string; joinUrl: string };
  past: { id: string; slug: string; title: string; recording: string };
  cancelled: { id: string; slug: string; title: string };
};

export async function seedEvents(): Promise<SeededEvents> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const [chapter] = await insert<{ slug: string; name: string }>("chapters", [
    { slug: `e2e-tamale-${suffix}`, name: `Tamale ${suffix}`, region: "northern", city: "Tamale", status: "active" },
  ]);

  const [skillshop, live, past, cancelled] = await insert<{ slug: string; title: string }>("community_events", [
    {
      slug: `e2e-skillshop-${suffix}`,
      kind: "skillshop",
      title: `Tamale Skillshop ${suffix}`,
      summary: "Build your first web page with Wumpini Abukari. Bring a device if you have one.",
      description: "Welcome and framing.\n\nHands on: a page about your favourite chop bar.\n\nQuestions and next steps.",
      format: "in_person",
      starts_at: iso(72),
      ends_at: iso(77),
      venue_name: "Tamale Tech Hub",
      venue_address: "Off Bolgatanga Road",
      city: "Tamale",
      region: "northern",
      chapter_id: chapter.id,
      capacity: 1,
      status: "published",
    },
    {
      slug: `e2e-live-${suffix}`,
      kind: "webinar",
      title: `How to become a data analyst ${suffix}`,
      summary: "A Launchpad Blueprint webinar with Mariama Seidu.",
      format: "online",
      starts_at: iso(-0.5),
      ends_at: iso(1),
      status: "published",
    },
    {
      slug: `e2e-past-${suffix}`,
      kind: "webinar",
      title: `How to become a virtual assistant ${suffix}`,
      summary: "Recorded with Fuseini Alhassan.",
      format: "online",
      starts_at: iso(-240),
      ends_at: iso(-239),
      status: "completed",
    },
    {
      slug: `e2e-cancelled-${suffix}`,
      kind: "activation",
      title: `Campus activation ${suffix}`,
      format: "in_person",
      starts_at: iso(120),
      ends_at: iso(123),
      venue_name: "Main hall",
      city: "Wa",
      region: "upper_west",
      status: "cancelled",
    },
  ]);

  const joinUrl = `https://meet.example.org/e2e-${suffix}`;
  const [access] = await admin<{ checkin_code: string }[]>(`/rest/v1/event_access?event_id=eq.${live.id}`, {
    method: "PATCH",
    body: { join_url: joinUrl },
  });
  const recordingTitle = `Virtual assistant webinar recording ${suffix}`;
  await insert("event_recordings", [
    {
      event_id: past.id,
      title: recordingTitle,
      summary: "The full session, with questions from the audience.",
      video_url: `https://video.example.org/e2e-${suffix}`,
      duration_minutes: 58,
      is_published: true,
    },
  ]);

  return {
    suffix,
    chapter: { id: chapter.id, slug: chapter.slug, name: chapter.name },
    skillshop: { id: skillshop.id, slug: skillshop.slug, title: skillshop.title },
    live: { id: live.id, slug: live.slug, title: live.title, code: access.checkin_code, joinUrl },
    past: { id: past.id, slug: past.slug, title: past.title, recording: recordingTitle },
    cancelled: { id: cancelled.id, slug: cancelled.slug, title: cancelled.title },
  };
}

export async function deleteEvents(seeded: SeededEvents) {
  const ids = [seeded.skillshop.id, seeded.live.id, seeded.past.id, seeded.cancelled.id].join(",");
  await admin(`/rest/v1/community_events?id=in.(${ids})`, { method: "DELETE" });
  await admin(`/rest/v1/chapters?id=eq.${seeded.chapter.id}`, { method: "DELETE" });
}

/** Make someone a lead of a chapter, which makes them host of its events. */
export async function makeLead(chapterId: string, profileId: string) {
  await insert("chapter_members", [{ chapter_id: chapterId, profile_id: profileId, role: "lead" }]);
}
