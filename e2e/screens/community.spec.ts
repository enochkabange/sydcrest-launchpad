import { expect, test, type Page } from "@playwright/test";
import { deleteChapter, seedChapter } from "../community-seed";
import { deleteDmpCohort, seedDmpCohort } from "../cohort-seed";
import { createLearner, PASSWORD, type Learner } from "../learners";
import { insert } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

async function signIn(page: Page, who: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

/** Community feed screens (#162): a learner in a chapter and a cohort, then the chapter lead's queue. */
test("community screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const learner = await createLearner("Wumpini Abukari");
  const cohort = await seedDmpCohort(learner.id);
  const chapter = await seedChapter([learner], 4);
  try {
    await insert("cohort_channels", [{ cohort_id: cohort.cohortId, whatsapp_url: "https://chat.whatsapp.com/E2eTamalePilot" }]);
    await insert("community_replies", [
      { post_id: chapter.pinnedId, author_id: learner.id, body: "Thanks. I will bring my laptop and the market stall sheet." },
    ]);
    await insert("reports", [
      {
        reporter_id: learner.id,
        target_type: "community_post",
        target_id: chapter.postIds[0],
        reason: "Spam or scam: posted the same link twice",
      },
    ]);

    await signIn(page, learner);
    await shoot(page, testInfo, "community", "/community");
    await shoot(page, testInfo, "community-chapter", `/community?scope=chapter&id=${chapter.chapterId}`);
    await shoot(page, testInfo, "community-cohort", `/community?scope=cohort&id=${cohort.cohortId}`);
    await shoot(page, testInfo, "community-thread", `/community/post/${chapter.pinnedId}`);
    await signIn(page, chapter.lead);
    await shoot(page, testInfo, "community-moderation", "/community/moderation");
  } finally {
    await deleteChapter(chapter);
    await deleteDmpCohort(cohort);
  }
});
