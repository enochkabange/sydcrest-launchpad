/**
 * Seeds approved experts with offers, a completed booking and a review,
 * through the service role on the LOCAL stack (e2e/supabase-admin.ts).
 * Test data only: every row is created here and removed by deleteExperts.
 */
import { createLearner } from "./learners";
import { admin, insert } from "./supabase-admin";

export type SeededExperts = {
  /** Unique word in both experts' skills, so a search finds only this run's experts. */
  tag: string;
  verified: { id: string; slug: string; name: string; sessionId: string; gigId: string };
  paused: { id: string; slug: string; name: string; offerId: string };
  userIds: string[];
};

export async function seedExperts(): Promise<SeededExperts> {
  const suffix = crypto.randomUUID().slice(0, 6);
  const tag = `Kpalang${suffix}`;
  const [fuseini, mariama, hawa] = await Promise.all([
    createLearner("Fuseini Iddrisu"),
    createLearner("Mariama Seidu"),
    createLearner("Hawa Issahaku"),
  ]);
  const approvedAt = new Date().toISOString();

  await insert("expert_profiles", [
    {
      profile_id: fuseini.id,
      slug: `fuseini-${suffix}`,
      headline: "Data analyst helping NGOs in Tamale clean survey data",
      bio: "I have cleaned field survey data for health and farming projects across the Northern Region.\n\nI can help you get from a messy sheet to a clear report.",
      skills: ["Excel", "Power BI", tag],
      categories: ["data", "careers"],
      links: ["https://example.com/fuseini-portfolio"],
      languages: ["English", "Dagbani"],
      region: "northern",
      availability_note: "Weekday evenings and Saturday mornings.",
      offers_free_intro: true,
      status: "approved",
      approved_at: approvedAt,
      is_verified: true,
      verified_at: approvedAt,
      is_featured: true,
    },
    {
      profile_id: mariama.id,
      slug: `mariama-${suffix}`,
      headline: "Product designer for mobile money apps",
      skills: ["Figma", tag],
      categories: ["design"],
      accepting_requests: false,
      status: "approved",
      approved_at: approvedAt,
    },
  ]);

  const [session, gig, group] = await insert<{ id: string }>("offers", [
    {
      expert_id: fuseini.id,
      kind: "one_to_one",
      title: "Review your first data cleaning project",
      description: "We go through your spreadsheet together and fix the biggest problems first.",
      duration_minutes: 45,
      skills: ["Excel"],
      position: 1,
    },
    {
      expert_id: fuseini.id,
      kind: "gig",
      title: "Clean one survey sheet for your report",
      description: "Send me one survey export and I return a clean sheet with a short summary of what changed.",
      scope: "One sheet up to 2,000 rows, a cleaned copy and a change log.",
      delivery_days: 5,
      revisions_included: 1,
      position: 2,
    },
    {
      expert_id: mariama.id,
      kind: "group",
      title: "Design critique circle",
      description: "Bring a screen you are working on and get feedback from the group.",
      duration_minutes: 60,
      max_participants: 6,
    },
  ]);

  // A real completed booking and its review, so the trust signals have rows to count.
  const now = new Date().toISOString();
  const [booking] = await insert<{ id: string }>("booking_requests", [
    {
      requester_id: hawa.id,
      expert_id: fuseini.id,
      offer_id: session.id,
      message: "I need help with my first survey sheet.",
      status: "completed",
      responded_at: now,
      completed_at: now,
    },
  ]);
  await insert("expert_reviews", [
    {
      booking_id: booking.id,
      reviewer_id: hawa.id,
      rating: 5,
      body: "Fuseini showed me how to find duplicate rows. My report was ready the next day.",
    },
  ]);

  return {
    tag,
    verified: { id: fuseini.id, slug: `fuseini-${suffix}`, name: fuseini.name, sessionId: session.id, gigId: gig.id },
    paused: { id: mariama.id, slug: `mariama-${suffix}`, name: mariama.name, offerId: group.id },
    userIds: [fuseini.id, mariama.id, hawa.id],
  };
}

/** Deleting the accounts cascades to profiles, expert profiles, offers, bookings and reviews. */
export async function deleteExperts(seeded: SeededExperts | undefined) {
  if (!seeded) return;
  for (const id of seeded.userIds) await admin(`/auth/v1/admin/users/${id}`, { method: "DELETE" });
}
