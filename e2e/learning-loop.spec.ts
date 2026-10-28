import { expect, test, type Page } from "@playwright/test";
import { signIn } from "./earn-business";
import { createLearner, type Learner } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";
import { admin } from "./supabase-admin";

/**
 * The learning loop (issue #232): set a weekly goal on home, pass a topic and
 * see the ring and streak move, then take a 5 minute review graded by the
 * database. Runs at phone and desktop widths.
 */

let roadmap: SeededRoadmap | undefined;
let learner: Learner | undefined;

test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  if (learner) await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" }).catch(() => {});
  roadmap = undefined;
  learner = undefined;
});

const thisWeek = (page: Page) => page.getByRole("region", { name: "This week" });

async function passQuiz(page: Page, seeded: SeededRoadmap) {
  await page.goto(`/learn/${seeded.slug}/${seeded.quizNode.slug}`);
  await page.getByRole("group", { name: /Which function adds up a column/ }).getByLabel("SUM").check();
  await page.getByRole("group", { name: /Which way does a row run/ }).getByLabel("Across the sheet").check();
  await page.getByRole("button", { name: "Check my answers" }).click();
  await expect(page.getByText("You passed with 100%")).toBeVisible();
}

test("a learner sets a goal, passes a topic, sees progress and takes a review", async ({ page }) => {
  roadmap = await seedRoadmap();
  learner = await createLearner("Hawa Issahaku");
  await signIn(page, learner);

  await test.step("home invites a weekly goal and explains reviews honestly", async () => {
    const card = thisWeek(page);
    await expect(card.getByRole("heading", { name: "Set a weekly goal" })).toBeVisible();
    await expect(card.getByText("0 days", { exact: true })).toBeVisible();
    await expect(card.getByRole("link", { name: "Start a 5 minute review" })).toHaveCount(0);
    await expect(card.getByRole("link", { name: "Find a topic to pass" })).toBeVisible();
  });

  await test.step("set a goal of one topic a week", async () => {
    await thisWeek(page).getByRole("button", { name: "1 topic", exact: true }).click();
    const ring = thisWeek(page).getByRole("progressbar", { name: "Weekly goal" });
    await expect(ring).toHaveAttribute("aria-valuetext", "0 of 1 topic passed this week");
    await expect(thisWeek(page).getByText("1 topic to go")).toBeVisible();
  });

  await test.step("finish a topic by passing its quiz", async () => {
    await passQuiz(page, roadmap!);
  });

  await test.step("home shows the goal met, the streak and the review", async () => {
    await page.goto("/dashboard");
    const card = thisWeek(page);
    await expect(card.getByRole("progressbar", { name: "Weekly goal" })).toHaveAttribute(
      "aria-valuetext",
      "1 of 1 topic passed this week",
    );
    await expect(card.getByText("Goal met. Well done.")).toBeVisible();
    await expect(card.getByText("1 day", { exact: true })).toBeVisible();
    await expect(card.getByText("You learned today.")).toBeVisible();
    await expect(card.getByText("Weekly goal met 1 week in a row.")).toBeVisible();
    await card.getByRole("link", { name: "Start a 5 minute review" }).click();
    await expect(page).toHaveURL(/\/review$/);
  });

  await test.step("take a review: one right, one missed", async () => {
    await expect(page.getByRole("heading", { name: "Your 5 minute review", level: 1 })).toBeVisible();
    const q1 = page.getByRole("group", { name: /Which function adds up a column/ });
    const q2 = page.getByRole("group", { name: /Which way does a row run/ });
    await expect(q1.getByText("From Spreadsheet basics")).toBeVisible();
    await q1.getByLabel("SUM").check();
    await q2.getByLabel("Down the sheet").check();
    await page.getByRole("button", { name: "Check my answers" }).click();
    await expect(page.getByRole("heading", { name: "You got 1 of 2 right" })).toBeVisible();
    await expect(q1.getByText("Correct")).toBeVisible();
    await expect(q2.getByText("Not quite")).toBeVisible();
    await expect(page.getByRole("link", { name: "Read Spreadsheet basics again" })).toHaveAttribute(
      "href",
      `/learn/${roadmap!.slug}/${roadmap!.quizNode.slug}`,
    );
  });

  await test.step("the review counts toward the streak but not the topic", async () => {
    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    const card = thisWeek(page);
    await expect(card.getByText("You reviewed today. Another one is welcome.")).toBeVisible();
    await expect(card.getByText("1 day", { exact: true })).toBeVisible();
    // Still one topic passed: a review never adds or removes verified completions.
    await expect(card.getByRole("progressbar", { name: "Weekly goal" })).toHaveAttribute(
      "aria-valuetext",
      "1 of 1 topic passed this week",
    );
    await expect(page.getByRole("listitem").filter({ hasText: roadmap!.title }).getByText("1 of 2 required topics done")).toBeVisible();
  });
});

test("a learner with nothing passed sees an honest empty review", async ({ page }) => {
  learner = await createLearner("Sumaila Fuseini");
  await signIn(page, learner);
  await page.goto("/review");
  await expect(page.getByRole("heading", { name: "Nothing to review yet" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse roadmaps" })).toHaveAttribute("href", "/roadmaps");
});
