/**
 * Seeds a small programme and cohort for the cohort home specs (#144),
 * through the shared service role helpers. Test code only. Each call makes
 * its own programme so parallel tests never share rows, and links its first
 * week to a seeded roadmap so lessons resolve to /learn pages.
 */
import { admin, insert } from "./supabase-admin";
import { createLearner, type Learner } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";

export type SeededCohort = {
  programId: string;
  cohortId: string;
  cohortName: string;
  laterCohortName: string;
  laterCohortId: string;
  memberId: string;
  roadmap: SeededRoadmap;
  mentor: Learner;
  peer: Learner;
  weekIds: Record<string, string>;
};

function isoDay(offset: number) {
  return new Date(Date.now() + offset * 86_400_000).toISOString().slice(0, 10);
}

/**
 * A four week programme: weeks 1, 2 and 4 shared (4 is the capstone), week 3
 * forks into two specializations. The cohort started two days ago, so week 1
 * is this week. A later cohort exists for the deferral view.
 */
export async function seedCohort(learnerId: string): Promise<SeededCohort> {
  const suffix = crypto.randomUUID().slice(0, 8);
  const roadmap = await seedRoadmap();
  const [program] = await insert("programs", [
    {
      slug: `e2e-prog-${suffix}`,
      title: `Tamale Marketing Test ${suffix}`,
      duration_weeks: 4,
      grace_days: 7,
      pass_score: 60,
      specializations: [
        { slug: "seo", label: "Search and content" },
        { slug: "social_media", label: "Social media" },
      ],
      is_published: true,
    },
  ]);
  const weeks = await insert<{ week_number: number; specialization: string | null }>("program_weeks", [
    {
      program_id: program.id,
      week_number: 1,
      theme: "Spreadsheets for a market stall — the basics",
      objectives: ["Keep a price list in a sheet", "Add up a day of sales"],
      assignment: "Build a price sheet for five items sold at Aboabo market and total one day of sales.",
      resource_name: "Free spreadsheet course",
      resource_url: "https://example.com/sheets",
    },
    {
      program_id: program.id,
      week_number: 2,
      theme: "Writing for customers",
      objectives: ["Write a clear product post"],
      assignment: "Write three posts for a shea butter seller in Tamale.",
    },
    {
      program_id: program.id,
      week_number: 3,
      specialization: "seo",
      theme: "Search basics for a small business",
      objectives: ["Pick keywords people in Tamale search for"],
      assignment: "List ten keywords for a tailor in Sagnarigu.",
    },
    {
      program_id: program.id,
      week_number: 3,
      specialization: "social_media",
      theme: "Short video for a shop",
      objectives: ["Plan a thirty second video"],
      assignment: "Script a short video for a phone repair shop.",
    },
    {
      program_id: program.id,
      week_number: 4,
      theme: "Capstone campaign",
      objectives: ["Plan and run a small campaign"],
      assignment: "Run a one week campaign for a real local business and report what happened.",
      is_capstone: true,
    },
  ]);
  const weekIds = Object.fromEntries(weeks.map((w) => [`${w.week_number}${w.specialization ? `-${w.specialization}` : ""}`, w.id]));
  await insert("program_week_nodes", [
    { program_week_id: weekIds["1"], roadmap_slug: roadmap.slug, node_slug: roadmap.quizNode.slug, position: 0 },
    { program_week_id: weekIds["1"], roadmap_slug: roadmap.slug, node_slug: roadmap.plainNode.slug, position: 1 },
    // Linked but not on the site: the page says so honestly.
    { program_week_id: weekIds["2"], roadmap_slug: "digital-marketer", node_slug: "copywriting", position: 0 },
  ]);

  const cohortName = `Tamale Pilot ${suffix}`;
  const laterCohortName = `Bolgatanga Cohort ${suffix}`;
  const [cohort, later] = await insert("cohorts", [
    { program_id: program.id, name: cohortName, starts_on: isoDay(-2), status: "running" },
    { program_id: program.id, name: laterCohortName, starts_on: isoDay(60), status: "enrolling" },
  ]);

  // One at a time: the local auth server times out on parallel sign ups.
  const mentor = await createLearner("Abdul-Rahman Iddrisu");
  const peer = await createLearner("Fuseini Mahama");
  const [member] = await insert("cohort_members", [
    { cohort_id: cohort.id, profile_id: learnerId, role: "learner" },
    { cohort_id: cohort.id, profile_id: mentor.id, role: "mentor" },
    { cohort_id: cohort.id, profile_id: peer.id, role: "learner" },
  ]);

  return {
    programId: program.id,
    cohortId: cohort.id,
    cohortName,
    laterCohortId: later.id,
    laterCohortName,
    memberId: member.id,
    roadmap,
    mentor,
    peer,
    weekIds,
  };
}

/** Defers the learner with no target, the way staff do through defer_learner (service role skips the staff check here). */
export async function deferWithoutTarget(memberId: string) {
  await admin(`/rest/v1/cohort_members?id=eq.${memberId}`, {
    method: "PATCH",
    body: { status: "deferred", deferred_at: new Date().toISOString() },
  });
}

/** Removes everything seedCohort made. Memberships cascade from cohorts; the programme cascades its weeks. */
export async function deleteCohort(seeded: SeededCohort) {
  await admin(`/rest/v1/submissions?program_id=eq.${seeded.programId}`, { method: "DELETE" });
  await admin(`/rest/v1/cohorts?program_id=eq.${seeded.programId}`, { method: "DELETE" });
  await admin(`/rest/v1/programs?id=eq.${seeded.programId}`, { method: "DELETE" });
  await deleteRoadmap(seeded.roadmap.id);
}

export type SeededDmpCohort = { cohortId: string; people: Learner[] };

/**
 * A cohort of the seeded DMP (real curriculum rows) in its second week, with
 * a mentor and two other learners, for the screenshots. The learner has
 * chosen a specialization so weeks 7 to 9 show their themes.
 */
export async function seedDmpCohort(learnerId: string): Promise<SeededDmpCohort> {
  const [program] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  const [cohort] = await insert("cohorts", [
    {
      program_id: program.id,
      name: `Tamale Pilot ${crypto.randomUUID().slice(0, 4)}`,
      starts_on: isoDay(-9),
      status: "running",
    },
  ]);
  const people: Learner[] = [];
  for (const name of ["Abdul-Rahman Iddrisu", "Fuseini Mahama", "Mariama Seidu"]) people.push(await createLearner(name));
  await insert("cohort_members", [
    { cohort_id: cohort.id, profile_id: learnerId, role: "learner", specialization: "social_media" },
    { cohort_id: cohort.id, profile_id: people[0].id, role: "mentor" },
    { cohort_id: cohort.id, profile_id: people[1].id, role: "learner", specialization: "seo" },
    { cohort_id: cohort.id, profile_id: people[2].id, role: "learner" },
  ]);
  return { cohortId: cohort.id, people };
}

export async function deleteDmpCohort(seeded: SeededDmpCohort) {
  await admin(`/rest/v1/cohorts?id=eq.${seeded.cohortId}`, { method: "DELETE" });
}
