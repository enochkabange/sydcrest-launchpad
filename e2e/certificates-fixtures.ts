import { expect, type Page } from "@playwright/test";
import { admin as adminRequest, insert as insertRows } from "./supabase-admin";
import { createLearner as createLearnerOnce, PASSWORD, promoteToAdmin } from "./learners";

/**
 * E2E FIXTURES ONLY for certificates (issue #147): a cohort of the seeded
 * programme where Wumpini has passed every week and reviewed a classmate's
 * capstone, created in the LOCAL stack with the secret key. Never seeded
 * anywhere else; no fake certificates exist outside these tests.
 */

/** The local stack can answer 502 to 504 under load; setup calls retry those a few times. */
async function retry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= 4 || !/\b50[234]\b/.test(String(error))) throw error;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }
}
const admin = <T,>(path: string, init?: Parameters<typeof adminRequest>[1]) => retry(() => adminRequest<T>(path, init));
const insert = (table: string, rows: Record<string, unknown>[]) => retry(() => insertRows(table, rows));
const createLearner = (name: string) => retry(() => createLearnerOnce(name));

type Week = { id: string; week_number: number; specialization: string | null; is_capstone: boolean };

export async function signIn(page: Page, email: string) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

/** A cohort of the seeded programme where Wumpini has passed every week and reviewed a classmate's capstone. */
export async function seedEligibleCohort(tag: string) {
  const [program] = await admin<{ id: string; slug: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id,slug");
  const weeks = await admin<Week[]>(`/rest/v1/program_weeks?program_id=eq.${program.id}&select=id,week_number,specialization,is_capstone`);
  const spec = "seo";
  const path = new Map<number, Week>();
  for (const w of weeks) {
    if (w.specialization && w.specialization !== spec) continue;
    if (!path.has(w.week_number) || w.specialization === spec) path.set(w.week_number, w);
  }

  // One at a time: a burst of sign ups can time out the local auth server.
  const learner = await createLearner("Wumpini Alhassan");
  const classmate = await createLearner("Abdul-Rahman Issah");
  const mentor = await createLearner("Mariama Seidu");
  const adminUser = await createLearner("Fuseini Mahama");
  await promoteToAdmin(adminUser.id);
  const slug = `wumpini-${tag}`.toLowerCase().slice(0, 40);
  await admin(`/rest/v1/profiles?id=eq.${learner.id}`, { method: "PATCH", body: { is_public: true, public_slug: slug } });

  const [cohort] = await insert("cohorts", [
    { program_id: program.id, name: `E2E certificates ${tag}`, starts_on: "2026-07-06", status: "running" },
  ]);
  const [learnerMember] = await insert("cohort_members", [
    { cohort_id: cohort.id, profile_id: learner.id, role: "learner", specialization: spec },
    { cohort_id: cohort.id, profile_id: classmate.id, role: "learner", specialization: spec },
    { cohort_id: cohort.id, profile_id: mentor.id, role: "mentor" },
  ]);

  const now = new Date().toISOString();
  await insert(
    "submissions",
    [...path.values()].map((w) => ({
      profile_id: learner.id,
      program_id: program.id,
      program_week_id: w.id,
      cohort_id: cohort.id,
      status: "graded",
      body_text: `Week ${w.week_number} work`,
      submitted_at: now,
      final_score: 80,
      graded_at: now,
    })),
  );
  const capstone = [...path.values()].find((w) => w.is_capstone)!;
  const [classmateCapstone] = await insert("submissions", [
    {
      profile_id: classmate.id,
      program_id: program.id,
      program_week_id: capstone.id,
      cohort_id: cohort.id,
      status: "submitted",
      body_text: "Capstone campaign",
      submitted_at: now,
    },
  ]);
  await insert("peer_reviews", [
    { submission_id: classmateCapstone.id, reviewer_id: learner.id, status: "submitted", comment: "Clear plan.", submitted_at: now },
  ]);

  return { cohortId: cohort.id, memberId: learnerMember.id, learner, mentor, admin: adminUser, slug };
}

/**
 * E2E FIXTURE ONLY: writes a certificate straight into the local stack (the
 * app only issues through issue_certificate) so screenshot runs can show a
 * valid certificate without clicking through the mentor flow.
 */
export async function insertFixtureCertificate(seeded: Awaited<ReturnType<typeof seedEligibleCohort>>) {
  const [program] = await admin<{ id: string; title: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id,title");
  const [cert] = await insert("certificates", [
    {
      profile_id: seeded.learner.id,
      program_id: program.id,
      cohort_id: seeded.cohortId,
      recipient_name: seeded.learner.name,
      program_title: program.title,
      specialization: "seo",
      specialization_label: "SEO & Content Marketing",
      issued_by: seeded.mentor.id,
    },
  ]);
  return (cert as unknown as { verification_id: string }).verification_id;
}
