/**
 * Seeds the people the brief journeys need, through the service role on the
 * LOCAL stack: a poster, an approved expert with a gig offer, and a verified
 * organisation with an owner. Test data only; deleteBriefsSeed removes it.
 */
import { createLearner, type Learner } from "./learners";
import { admin, insert } from "./supabase-admin";

export type BriefsSeed = {
  /** Unique skill for this run, so filters and matching only see this run's rows. */
  tag: string;
  /**
   * A second unique skill for this run. Briefs posted in a test name only
   * this run's skills, never a common one like "Excel": a new brief notifies
   * every approved expert sharing a skill, and other specs seed experts in
   * parallel on the same database.
   */
  sheetsTag: string;
  poster: Learner;
  expert: Learner & { slug: string; gigId: string };
  otherExpert: Learner;
  owner: Learner;
  org: { id: string; name: string };
};

export async function seedBriefs(): Promise<BriefsSeed> {
  const suffix = crypto.randomUUID().slice(0, 6);
  const tag = `Dagbon${suffix}`;
  const sheetsTag = `Sheets${suffix}`;
  const [poster, expert, otherExpert, owner] = await Promise.all([
    createLearner("Wumpini Alhassan"),
    createLearner("Fuseini Iddrisu"),
    createLearner("Hawa Issahaku"),
    createLearner("Abdul-Rahman Yakubu"),
  ]);
  const approvedAt = new Date().toISOString();
  await insert("expert_profiles", [
    {
      profile_id: expert.id,
      slug: `fuseini-briefs-${suffix}`,
      headline: "Data analyst helping NGOs in Tamale clean survey data",
      skills: [sheetsTag, tag],
      categories: ["data"],
      status: "approved",
      approved_at: approvedAt,
      is_verified: true,
      verified_at: approvedAt,
    },
    {
      profile_id: otherExpert.id,
      slug: `hawa-briefs-${suffix}`,
      headline: "Spreadsheet trainer for small shops",
      skills: [tag],
      categories: ["data"],
      status: "approved",
      approved_at: approvedAt,
    },
  ]);
  const [gig] = await insert<{ id: string }>("offers", [
    {
      expert_id: expert.id,
      kind: "gig",
      title: "Clean one survey sheet for your report",
      description: "Send me one survey export and I return a clean sheet with a short summary of what changed.",
      scope: "One sheet up to 2,000 rows, a cleaned copy and a change log.",
      delivery_days: 5,
    },
  ]);
  const name = `Savelugu Shea Cooperative ${suffix}`;
  const [org] = await insert<{ id: string }>("organisations", [
    {
      slug: `savelugu-shea-${suffix}`,
      name,
      region: "northern",
      verification_status: "verified",
      verified_at: approvedAt,
      created_by: owner.id,
    },
  ]);
  // Creating an organisation makes its creator the active owner (a database trigger).
  return { tag, sheetsTag, poster, expert: { ...expert, slug: `fuseini-briefs-${suffix}`, gigId: gig.id }, otherExpert, owner, org: { id: org.id, name } };
}

/** Deleting the organisation and the accounts cascades to briefs, pitches, bookings and notifications. */
export async function deleteBriefsSeed(seed: BriefsSeed | undefined) {
  if (!seed) return;
  await admin(`/rest/v1/organisations?id=eq.${seed.org.id}`, { method: "DELETE" });
  for (const user of [seed.poster, seed.expert, seed.otherExpert, seed.owner]) {
    await admin(`/auth/v1/admin/users/${user.id}`, { method: "DELETE" });
  }
}

export type Notification = { kind: string; payload: { title: string; href: string } };

export function notificationsFor(profileId: string) {
  return admin<Notification[]>(`/rest/v1/notifications?recipient_id=eq.${profileId}&select=kind,payload&order=created_at`);
}
