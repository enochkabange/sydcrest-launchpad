/**
 * Seeds two DMP cohorts, a mentor and four learners with some sent work for
 * the mentor console and peer review specs (issue #146). Uses the service
 * role helpers against the LOCAL stack only. Test code only.
 */
import { admin, insert } from "./supabase-admin";
import { createLearner, type Learner } from "./learners";

export type MentorSeed = {
  programId: string;
  cohort: { id: string; name: string };
  later: { id: string; name: string };
  mentor: Learner;
  learners: { wumpini: Learner & { memberId: string }; mariama: Learner & { memberId: string }; fuseini: Learner & { memberId: string }; abdul: Learner & { memberId: string } };
  capstoneSubmissionId: string;
  queuedSubmissionId: string;
};

const iso = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);

export async function seedMentorCohort(): Promise<MentorSeed> {
  const suffix = crypto.randomUUID().slice(0, 6);
  const [program] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  if (!program) throw new Error("The DMP programme is missing: run supabase db reset to apply the seed migration.");
  const weeks = await admin<{ id: string; week_number: number; specialization: string | null; is_capstone: boolean }[]>(
    `/rest/v1/program_weeks?program_id=eq.${program.id}&specialization=is.null&select=id,week_number,specialization,is_capstone`,
  );
  const week = (n: number) => weeks.find((w) => w.week_number === n)!;
  const capstone = weeks.find((w) => w.is_capstone)!;

  // Started 30 days ago, so weeks 1 to 4 are due and weeks 1 and 2 are past the grace days.
  const [cohort, later] = await insert<{ name: string }>("cohorts", [
    { program_id: program.id, name: `Tamale e2e ${suffix}`, starts_on: iso(-30), max_size: 20, status: "running" },
    { program_id: program.id, name: `Bolgatanga e2e ${suffix}`, starts_on: iso(60), max_size: 20, status: "enrolling" },
  ]);

  const [mentor, wumpini, mariama, fuseini, abdul] = await Promise.all([
    createLearner("Salifu Iddrisu"),
    createLearner("Wumpini Abukari"),
    createLearner("Mariama Seidu"),
    createLearner("Fuseini Alhassan"),
    createLearner("Abdul-Rahman Yakubu"),
  ]);
  await insert("cohort_members", [{ cohort_id: cohort.id, profile_id: mentor.id, role: "mentor" }]);
  const members = await insert("cohort_members", [
    { cohort_id: cohort.id, profile_id: wumpini.id, role: "learner", specialization: "seo" },
    { cohort_id: cohort.id, profile_id: mariama.id, role: "learner", specialization: "social_media" },
    { cohort_id: cohort.id, profile_id: fuseini.id, role: "learner" },
    { cohort_id: cohort.id, profile_id: abdul.id, role: "learner" },
  ]);

  const sent = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();
  const base = { program_id: program.id, cohort_id: cohort.id };
  const [, capstoneSub, queued] = await insert("submissions", [
    {
      ...base,
      profile_id: mariama.id,
      program_week_id: week(1).id,
      status: "graded",
      body_text: "My first audit of a Tamale shea butter seller's online presence.",
      submitted_at: sent(-22),
      final_score: 78,
      graded_at: sent(-20),
      mentor_feedback: "Clear and well sourced.",
    },
    {
      ...base,
      profile_id: mariama.id,
      program_week_id: capstone.id,
      status: "submitted",
      body_text: "Capstone: a three month campaign plan for a Tamale tailoring shop, with budget and measures.",
      link_url: "https://example.com/capstone-plan",
      submitted_at: sent(-1),
    },
    {
      ...base,
      profile_id: fuseini.id,
      program_week_id: week(1).id,
      status: "submitted",
      body_text: "Week one: the five customers I interviewed at Aboabo market.",
      submitted_at: sent(-2),
    },
  ]);

  return {
    programId: program.id,
    cohort: { id: cohort.id, name: cohort.name },
    later: { id: later.id, name: later.name },
    mentor,
    learners: {
      wumpini: { ...wumpini, memberId: members[0].id },
      mariama: { ...mariama, memberId: members[1].id },
      fuseini: { ...fuseini, memberId: members[2].id },
      abdul: { ...abdul, memberId: members[3].id },
    },
    capstoneSubmissionId: capstoneSub.id,
    queuedSubmissionId: queued.id,
  };
}

/** Removes everything seedMentorCohort made (submissions first: they restrict cohort deletes). */
export async function deleteMentorCohort(seed: MentorSeed) {
  const ids = [seed.cohort.id, seed.later.id].join(",");
  await admin(`/rest/v1/submissions?cohort_id=in.(${ids})`, { method: "DELETE" });
  await admin(`/rest/v1/cohorts?id=in.(${ids})`, { method: "DELETE" });
  const people = [seed.mentor, ...Object.values(seed.learners)];
  // Best effort: a slow local Auth must not fail a journey that already passed.
  await Promise.all(people.map((p) => admin(`/auth/v1/admin/users/${p.id}`, { method: "DELETE" }).catch(() => undefined)));
}
