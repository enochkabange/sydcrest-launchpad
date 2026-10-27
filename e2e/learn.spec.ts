import { expect, test } from "@playwright/test";
import { signUpAndConfirm } from "./auth";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";

let roadmap: SeededRoadmap | undefined;

test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  roadmap = undefined;
});

test("a learner studies a node, fails the quiz, passes it and sees progress", async ({ page }, testInfo) => {
  roadmap = await seedRoadmap();
  const { slug, title, quizNode, plainNode } = roadmap;
  const quizUrl = `/learn/${slug}/${quizNode.slug}`;

  await test.step("a new learner sees an honest empty state", async () => {
    await signUpAndConfirm(page, testInfo, "Abdul-Rahman Mahama");
    await expect(page.getByRole("heading", { name: "Start a roadmap" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse roadmaps" })).toHaveAttribute("href", "/roadmaps");
  });

  await test.step("open the node", async () => {
    await page.goto(quizUrl);
    await expect(page.getByRole("heading", { name: quizNode.title, level: 1 })).toBeVisible();
    await expect(page.getByText("Topic 1 of 2")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why it matters" })).toBeVisible();
    await expect(page.getByText("Most offices in Tamale keep their records in spreadsheets.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Practice task" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Spreadsheet practice sheet/ })).toHaveAttribute(
      "href",
      "https://example.com/practice",
    );
  });

  const q1 = page.getByRole("group", { name: /Which function adds up a column/ });
  const q2 = page.getByRole("group", { name: /Which way does a row run/ });

  await test.step("fail the quiz", async () => {
    await q1.getByLabel("COUNT").check();
    await q2.getByLabel("Across the sheet").check();
    await page.getByRole("button", { name: "Check my answers" }).click();
    await expect(page.getByText("You scored 50%. You need 100% to pass.")).toBeVisible();
    await expect(q1.getByText("Not quite")).toBeVisible();
    await expect(q2.getByText("Correct")).toBeVisible();
    // A failed attempt keeps the learner's choices.
    await expect(q2.getByLabel("Across the sheet")).toBeChecked();
  });

  await test.step("pass the quiz and see what was earned", async () => {
    await q1.getByLabel("SUM").check();
    await page.getByRole("button", { name: "Check again" }).click();
    await expect(page.getByText("You passed with 100%")).toBeVisible();
    // Read back from the achievements table after the database minted it.
    await expect(page.getByText("This topic is now in your achievements.")).toBeVisible();
    await expect(page.getByRole("link", { name: `Next topic: ${plainNode.title}` })).toHaveAttribute(
      "href",
      `/learn/${slug}/${plainNode.slug}`,
    );
  });

  await test.step("reopening a passed node keeps it complete", async () => {
    await page.reload();
    await expect(page.getByText("You passed this checkpoint with 100%")).toBeVisible();
    await expect(page.getByText("Completed", { exact: true })).toBeVisible();
  });

  await test.step("the dashboard shows progress and the next node", async () => {
    await page.goto("/dashboard");
    const card = page.getByRole("listitem").filter({ hasText: title });
    await expect(card.getByText("1 of 2 required topics done")).toBeVisible();
    await card.getByRole("link", { name: `Next: ${plainNode.title}` }).click();
    await expect(page).toHaveURL(new RegExp(`/learn/${slug}/${plainNode.slug}$`));
  });

  await test.step("mark the node that has no quiz as done, for personal tracking only", async () => {
    await expect(page.getByRole("heading", { name: plainNode.title, level: 1 })).toBeVisible();
    await page.getByRole("button", { name: "Mark as done" }).click();
    await expect(page.getByText("Marked as done")).toBeVisible();
    // Self marked topics are not certified (issue #128): no achievement, no roadmap milestone.
    await expect(page.getByText(/count topics you pass with a checkpoint quiz/)).toBeVisible();
    await expect(page.getByText(`You have completed every required topic in ${title}.`)).toHaveCount(0);
    await page.getByRole("link", { name: "Back to your dashboard" }).click();
    const card = page.getByRole("listitem").filter({ hasText: title });
    await expect(card.getByText("Roadmap complete. 2 of 2 required topics done")).toBeVisible();
  });
});

test("signed out visitors are sent to login from a node", async ({ page }) => {
  await page.goto("/learn/data-analyst/spreadsheets");
  await expect(page).toHaveURL(/\/login$/);
});
