/**
 * One person per navigation role (issue #190), seeded through the LOCAL
 * stack's secret key only (see supabase-admin.ts). Test data only: every row
 * is created here and removed by deleteNavPeople.
 */
import { expect, type Page } from "@playwright/test";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { admin, insert } from "./supabase-admin";

export type NavPeople = {
  learner: Learner;
  mentor: Learner;
  expert: Learner;
  business: Learner;
  admin: Learner;
  cohortId: string;
  orgSlug: string;
};

export async function seedNavPeople(): Promise<NavPeople> {
  const suffix = crypto.randomUUID().slice(0, 6);
  const [learner, mentor, expert, business, boss] = await Promise.all([
    createLearner("Wumpini Alhassan"),
    createLearner("Salifu Iddrisu"),
    createLearner("Fuseini Iddrisu"),
    createLearner("Mariama Seidu"),
    createLearner("Abdul-Rahman Yakubu"),
  ]);

  const [program] = await admin<{ id: string }[]>("/rest/v1/programs?slug=eq.dmp&select=id");
  if (!program) throw new Error("The DMP programme is missing: run supabase db reset to apply the seed migration.");
  const [cohort] = await insert("cohorts", [
    { program_id: program.id, name: `Nav e2e ${suffix}`, starts_on: new Date().toISOString().slice(0, 10), max_size: 20, status: "enrolling" },
  ]);
  await insert("cohort_members", [{ cohort_id: cohort.id, profile_id: mentor.id, role: "mentor" }]);

  await insert("expert_profiles", [
    {
      profile_id: expert.id,
      slug: `fuseini-nav-${suffix}`,
      headline: "Data analyst helping NGOs in Tamale",
      status: "approved",
      approved_at: new Date().toISOString(),
    },
  ]);

  // The organisation trigger adds the creator as its active owner.
  const orgSlug = `tamale-nav-${suffix}`;
  await insert("organisations", [
    { slug: orgSlug, name: `Tamale Nav ${suffix}`, kind: "business", region: "northern", created_by: business.id },
  ]);

  await promoteToAdmin(boss.id);
  return { learner, mentor, expert, business, admin: boss, cohortId: cohort.id, orgSlug };
}

export async function deleteNavPeople(people: NavPeople | undefined) {
  if (!people) return;
  await admin(`/rest/v1/organisations?slug=eq.${people.orgSlug}`, { method: "DELETE" }).catch(() => undefined);
  await admin(`/rest/v1/cohorts?id=eq.${people.cohortId}`, { method: "DELETE" }).catch(() => undefined);
  const all = [people.learner, people.mentor, people.expert, people.business, people.admin];
  // Best effort: a slow local Auth must not fail a journey that already passed.
  await Promise.all(all.map((p) => admin(`/auth/v1/admin/users/${p.id}`, { method: "DELETE" }).catch(() => undefined)));
}

export async function signInAs(page: Page, person: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(person.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}
