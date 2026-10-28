import { expect, test } from "@playwright/test";
import { signIn } from "../earn-business";
import { createLearner } from "../learners";
import { deleteRoadmap, seedRoadmap } from "../seed";
import { admin } from "../supabase-admin";
import { screensSetup, shoot } from "./shoot";

test("learning loop screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo);
  const roadmap = await seedRoadmap();
  const learner = await createLearner("Amina Sumaila");
  try {
    await signIn(page, learner);
    await shoot(page, testInfo, "home-set-goal", "/dashboard");

    await page.getByRole("button", { name: "3 topics", exact: true }).click();
    await expect(page.getByText("3 topics to go")).toBeVisible();
    await page.goto(`/learn/${roadmap.slug}/${roadmap.quizNode.slug}`);
    await page.getByRole("group", { name: /Which function adds up a column/ }).getByLabel("SUM").check();
    await page.getByRole("group", { name: /Which way does a row run/ }).getByLabel("Across the sheet").check();
    await page.getByRole("button", { name: "Check my answers" }).click();
    await expect(page.getByText("You passed with 100%")).toBeVisible();

    await shoot(page, testInfo, "home-this-week", "/dashboard");
    await shoot(page, testInfo, "review", "/review");
  } finally {
    await deleteRoadmap(roadmap.id);
    await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => {});
  }
});
