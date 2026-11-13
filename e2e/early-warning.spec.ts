import { expect as baseExpect, test, type Page } from "@playwright/test";
import { PASSWORD } from "./learners";
import { deleteMentorCohort, seedMentorCohort, type MentorSeed } from "./mentor-seed";
import { admin, insert } from "./supabase-admin";

/**
 * Early warning and the mentor caseload (issues #325 and #330): a mentor
 * starts from the caseload, sees why a learner is flagged and logs a call in
 * one tap. Risk is normally computed by the daily maintenance; the spec
 * writes one row with the service role so it does not depend on the clock.
 */

const expect = baseExpect.configure({ timeout: 15_000 });
test.describe.configure({ timeout: 120_000 });

async function signIn(page: Page, who: { email: string }) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

let seed: MentorSeed | undefined;

test.afterEach(async () => {
  if (seed) await deleteMentorCohort(seed);
  seed = undefined;
});

test("a mentor sees who to check in with first and logs a call from the caseload", async ({ page }) => {
  seed = await seedMentorCohort();
  const fuseini = seed.learners.fuseini;
  await insert("learner_risk", [
    {
      profile_id: fuseini.id,
      level: "at_risk",
      reasons: ["went_quiet", "slipping"],
      route: "mentor",
      cohort_id: seed.cohort.id,
      flagged_since: new Date().toISOString().slice(0, 10),
      days_quiet: 12,
      usual_gap_days: 3,
    },
  ]);

  await signIn(page, seed.mentor);
  await page.goto(`/mentor?cohort=${seed.cohort.id}`);

  const caseload = page.getByRole("region", { name: "Caseload" });
  const list = caseload.getByRole("list", { name: `Caseload for ${seed.cohort.name}` });
  // Highest risk first.
  await expect(list.getByRole("listitem").first()).toHaveAccessibleName("Fuseini Alhassan");
  const card = list.getByRole("listitem", { name: "Fuseini Alhassan", exact: true });
  await expect(card.getByText("Check in now")).toBeVisible();
  await expect(card.getByText("Quiet for 12 days, when they usually come back every 3 days.")).toBeVisible();
  await expect(card.getByText("No contact logged yet")).toBeVisible();

  // One tap.
  await card.getByRole("button", { name: "Log a call with Fuseini Alhassan" }).click();
  await expect(card.getByText("Called today. Logged.")).toBeVisible();
  await expect(card.getByText(/^Called \d{1,2} [A-Z][a-z]{2}$/)).toBeVisible();

  const rows = await admin<{ kind: string; mentor_id: string }[]>(
    `/rest/v1/mentor_contacts?learner_id=eq.${fuseini.id}&select=kind,mentor_id`,
  );
  expect(rows).toEqual([{ kind: "call", mentor_id: seed.mentor.id }]);
});
