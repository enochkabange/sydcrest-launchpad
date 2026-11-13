import { expect, test, type Page } from "@playwright/test";
import { admin } from "./supabase-admin";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";

let roadmap: SeededRoadmap | undefined;

test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  roadmap = undefined;
});

async function signIn(page: Page, who: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(who.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

// Content quality (issue #326): a learner says a lesson was not clear; the content team sees the rewrite queue.
test("a learner gives lesson feedback and an admin sees the rewrite queue", async ({ page }) => {
  test.setTimeout(120_000);
  roadmap = await seedRoadmap();
  const { slug, quizNode } = roadmap;
  const [learner, boss] = await Promise.all([createLearner("Wumpini Alhassan"), createLearner("Fuseini Mahama")]);
  await promoteToAdmin(boss.id);
  const [{ id: nodeId }] = await admin<{ id: string }[]>(
    `/rest/v1/roadmap_nodes?roadmap_id=eq.${roadmap.id}&slug=eq.${quizNode.slug}&select=id`,
  );

  await test.step("the learner fails the quiz and says the lesson was not clear", async () => {
    await signIn(page, learner);
    await page.goto(`/learn/${slug}/${quizNode.slug}`);
    await expect(page.getByRole("heading", { name: quizNode.title, level: 1 })).toBeVisible();
    await page.getByRole("group", { name: /Which function adds up a column/ }).getByLabel("COUNT").check();
    await page.getByRole("group", { name: /Which way does a row run/ }).getByLabel("Across the sheet").check();
    await page.getByRole("button", { name: "Check my answers" }).click();
    await expect(page.getByText("You scored 50%. You need 100% to pass.")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Was this lesson clear?" })).toBeVisible();
    await page.getByRole("button", { name: "Not really" }).click();
    await expect(page.getByText("Thanks for telling us. We will look at this lesson.")).toBeVisible();
    await page.getByRole("button", { name: "Needs an example" }).click();
    await expect(page.getByText("Thanks. We will use this to improve the lesson.")).toBeVisible();

    await page.reload();
    await expect(page.getByRole("button", { name: "Not really" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("button", { name: "Needs an example" })).toHaveAttribute("aria-pressed", "true");
    const rows = await admin<{ clear: boolean; reason: string }[]>(
      `/rest/v1/lesson_feedback?profile_id=eq.${learner.id}&node_id=eq.${nodeId}&select=clear,reason`,
    );
    expect(rows).toEqual([{ clear: false, reason: "missing_example" }]);
  });

  await test.step("an admin sees a question that confuses strong learners in the queue", async () => {
    // Enough answers to judge: twelve passed attempts that still picked COUNT.
    for (let i = 0; i < 12; i++) {
      await admin("/rest/v1/events", {
        method: "POST",
        body: {
          name: "quiz_question_answered",
          props: { node_id: nodeId, question_id: "q1", correct: false, choice: 0, passed: true },
          source: "server",
        },
      });
    }
    await signIn(page, boss);
    await page.goto("/admin/content/quality");
    await expect(page.getByRole("heading", { name: "Rewrite queue", level: 1 })).toBeVisible();
    const queue = page.locator("section", { has: page.getByRole("heading", { name: "Most worth fixing" }) });
    const card = queue.getByRole("listitem").filter({ hasText: quizNode.title }).filter({ hasText: slug }).first();
    await expect(card.getByRole("heading", { name: "Which function adds up a column of numbers?" })).toBeVisible();
    await expect(card.getByText("Confuses strong learners")).toBeVisible();
    await expect(card.getByText('Most chosen wrong answer: "COUNT" (13 of 13 wrong answers)')).toBeVisible();
  });
});
