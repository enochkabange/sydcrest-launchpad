import { createLearner, type Learner } from "./learners";
import { admin, insert } from "./supabase-admin";

/**
 * A cohort of the seeded DMP programme with one active learner, for the
 * submission journey. Local stack only (supabase-admin refuses anything else).
 */
export type SeededCohort = { cohortId: string; programId: string; weekId: string; weekTheme: string };

export async function seedCohortWithLearner(learnerId: string): Promise<SeededCohort> {
  const [program] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  if (!program) throw new Error("The DMP seed is missing; run supabase db reset.");
  const [week] = await admin<{ id: string; theme: string }[]>(
    `/rest/v1/program_weeks?program_id=eq.${program.id}&week_number=eq.1&specialization=is.null&select=id,theme`,
  );
  const [cohort] = await insert("cohorts", [
    {
      program_id: program.id,
      name: `E2E submissions ${crypto.randomUUID().slice(0, 8)}`,
      starts_on: new Date().toISOString().slice(0, 10),
      status: "running",
    },
  ]);
  await insert("cohort_members", [{ cohort_id: cohort.id, profile_id: learnerId, role: "learner" }]);
  return { cohortId: cohort.id, programId: program.id, weekId: week.id, weekTheme: week.theme };
}

/** What grade_submission does, written with the secret key (the console that calls it is #146). */
export async function gradeAsMentor(submissionId: string, finalScore: number, feedback: string) {
  await admin(`/rest/v1/submissions?id=eq.${submissionId}`, {
    method: "PATCH",
    body: { status: "graded", final_score: finalScore, mentor_feedback: feedback, graded_at: new Date().toISOString() },
  });
}

export async function findSubmission(learnerId: string, weekId: string) {
  const [row] = await admin<{ id: string; status: string; attempt: number; body_text: string | null }[]>(
    `/rest/v1/submissions?profile_id=eq.${learnerId}&program_week_id=eq.${weekId}&select=id,status,attempt,body_text`,
  );
  return row ?? null;
}

export async function deleteSeededCohort(seed: SeededCohort, learnerId: string) {
  await retry504(() => admin(`/rest/v1/submissions?cohort_id=eq.${seed.cohortId}`, { method: "DELETE" }));
  await retry504(() => admin(`/rest/v1/cohorts?id=eq.${seed.cohortId}`, { method: "DELETE" }));
  await retry504(() => admin(`/auth/v1/admin/users/${learnerId}`, { method: "DELETE" }));
}

/** A busy local Docker stack sometimes answers 504 while auth or the database reconnects. */
async function retry504<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= 4 || !/ failed with 50[0-4]|: 50[0-4] /.test(String(error))) throw error;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

/** createLearner, retried on a 504 from a busy local stack. */
export function createLearnerRetrying(name: string): Promise<Learner> {
  return retry504(() => createLearner(name));
}

/**
 * Sent work with an AI review already stored, as record_ai_review would
 * leave it, so screenshots show the feedback layout without calling a model.
 */
export async function seedReviewedSubmission(seed: SeededCohort, learnerId: string) {
  const [rubric] = await admin<{ criteria: { id: string; max_points: number }[] }[]>(
    `/rest/v1/rubrics?program_id=eq.${seed.programId}&program_week_id=is.null&select=criteria`,
  );
  const criteria = rubric.criteria.map((c, i) => ({
    id: c.id,
    points: Math.max(0, c.max_points - (i % 2)),
    comment: i % 2 ? "Good start. Add one example from your own town." : "Clear and accurate.",
  }));
  const [row] = await insert("submissions", [
    {
      profile_id: learnerId,
      program_id: seed.programId,
      program_week_id: seed.weekId,
      cohort_id: seed.cohortId,
      status: "ai_reviewed",
      body_text:
        "Staying safe online\n\n1. Use a long passphrase and a different one for each account.\n2. Turn on two step sign in for email and mobile money.\n3. Never share a code sent by SMS, even with someone who says they work for the bank.",
      link_url: "https://docs.example.com/tip-sheet",
      submitted_at: new Date().toISOString(),
      ai_feedback: { summary: "A clear, practical tip sheet. Add one local example to make it stick.", criteria },
      ai_score: 82,
      ai_model: "claude-haiku-5-5",
      ai_reviewed_at: new Date().toISOString(),
    },
  ]);
  return row.id;
}
