import { expect, test } from "@playwright/test";
import { createLearner } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";
import {
  QUIZ_QUESTIONS,
  deleteSkill,
  deleteSkillBySlug,
  makePublic,
  mapRoadmap,
  mintRoadmapCompleted,
  seedSkill,
  setRole,
  signIn,
} from "./skills-seed";

/**
 * Verified skills (issue #165): earned through a matching path, a quiz or a
 * reviewed portfolio, never handed out. Runs against the LOCAL stack.
 */

const cleanup: (() => Promise<void>)[] = [];
test.afterEach(async () => {
  for (const fn of cleanup.splice(0).reverse()) await fn().catch(() => undefined);
});

test("an admin builds a skill with a quiz, and only a correct learner earns the badge", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  const suffix = `${testInfo.project.name}-${crypto.randomUUID().slice(0, 6)}`;
  const roadmap: SeededRoadmap = await seedRoadmap();
  cleanup.push(() => deleteRoadmap(roadmap.id));
  const slug = `e2e-ledger-${suffix}`;
  cleanup.push(() => deleteSkillBySlug(slug));

  const founder = await createLearner("Abdul-Rahman Iddrisu");
  await setRole(founder.id, "admin");
  await signIn(page, founder.email);

  await test.step("create the skill and map it to a roadmap", async () => {
    await page.goto("/admin/skills");
    await page.getByLabel("Name").fill(`Shop ledgers ${suffix}`);
    await page.getByLabel("Slug").fill(slug);
    await page.getByLabel("Summary").fill("Keeping a daily record of sales and stock for a small shop.");
    await page.getByRole("button", { name: "Create skill" }).click();
    await expect(page.getByRole("heading", { level: 1, name: `Shop ledgers ${suffix}` })).toBeVisible();
    await page.getByLabel("Add a roadmap").selectOption(roadmap.slug);
    await page.getByRole("button", { name: "Add roadmap" }).click();
    await expect(page.getByRole("button", { name: `Remove ${roadmap.title}` })).toBeVisible();
  });

  await test.step("write a quiz with a hidden answer key and publish", async () => {
    await page.getByLabel("Kind").selectOption("quiz");
    await page.getByRole("button", { name: "Create and edit" }).click();
    await expect(page.getByRole("heading", { name: "Questions and answers" })).toBeVisible();

    const q1 = page.getByRole("group", { name: "Question 1" });
    await q1.getByLabel("Question", { exact: true }).fill(QUIZ_QUESTIONS[0].prompt);
    for (const [j, option] of QUIZ_QUESTIONS[0].options.entries()) await q1.getByLabel(`Option ${j + 1}`, { exact: true }).fill(option);
    await q1.getByLabel("Option 2 is the right answer").check();
    await page.getByRole("button", { name: "Add a question" }).click();
    const q2 = page.getByRole("group", { name: "Question 2" });
    await q2.getByLabel("Question", { exact: true }).fill(QUIZ_QUESTIONS[1].prompt);
    await q2.getByLabel("Option 1", { exact: true }).fill(QUIZ_QUESTIONS[1].options[0]);
    await q2.getByLabel("Option 2", { exact: true }).fill(QUIZ_QUESTIONS[1].options[1]);
    await q2.getByLabel("Option 1 is the right answer").check();
    await page.getByRole("button", { name: "Save questions and answers" }).click();
    await expect(page.getByText("Questions and answers saved.")).toBeVisible();

    await page.getByLabel("Pass mark (%)").fill("100");
    await page.getByRole("button", { name: "Save settings" }).click();
    await expect(page.getByText("Saved.")).toBeVisible();
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await expect(page.getByRole("button", { name: "Unpublish" })).toBeVisible();

    await page.getByRole("link", { name: /^Back to / }).click();
    await page.getByRole("button", { name: "Publish", exact: true }).click();
    await expect(page.getByRole("link", { name: "View the public page" })).toBeVisible();
  });

  await test.step("the public page explains the ways to earn it", async () => {
    await page.context().clearCookies();
    await page.goto(`/skills/${slug}`);
    await expect(page.getByRole("heading", { level: 1, name: `Shop ledgers ${suffix}` })).toBeVisible();
    await expect(page.getByRole("link", { name: roadmap.title })).toBeVisible();
    await expect(page.getByRole("link", { name: "Take the assessment" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Create an account" })).toBeVisible();
  });

  await test.step("a wrong answer fails and starts the wait, without revealing answers", async () => {
    const hawa = await createLearner("Hawa Seidu");
    await signIn(page, hawa.email);
    await page.goto(`/skills/${slug}/quiz`);
    await page.getByLabel(QUIZ_QUESTIONS[0].options[0]).check();
    await page.getByLabel(QUIZ_QUESTIONS[1].options[0]).check();
    await page.getByRole("button", { name: "Submit my answers" }).click();
    await expect(page.getByText("You scored 50%")).toBeVisible();
    await expect(page.getByText(/You can try again from/)).toBeVisible();
    await expect(page.getByText("Correct")).toHaveCount(0);
    await page.goto(`/skills/${slug}/quiz`);
    await expect(page.getByText(/You can try again from/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit my answers" })).toHaveCount(0);
  });

  await test.step("right answers pass, and the badge shows on the public profile", async () => {
    const wumpini = await createLearner("Wumpini Abukari");
    const profileSlug = `wumpini-${suffix}`.toLowerCase();
    await makePublic(wumpini.id, profileSlug);
    await signIn(page, wumpini.email);
    await page.goto(`/skills/${slug}/quiz`);
    await page.getByLabel(QUIZ_QUESTIONS[0].options[1]).check();
    await page.getByLabel(QUIZ_QUESTIONS[1].options[0]).check();
    await page.getByRole("button", { name: "Submit my answers" }).click();
    await expect(page.getByText("You passed with 100%")).toBeVisible();

    await page.context().clearCookies();
    await page.goto(`/u/${profileSlug}`);
    const verified = page.getByRole("list", { name: "Verified skills" });
    await expect(verified.getByText(`Shop ledgers ${suffix}`)).toBeVisible();
    await expect(verified.getByText(/Passed the assessment/)).toBeVisible();
  });
});

test("a mentor approves a portfolio, and nobody reviews their own work", async ({ page }) => {
  test.setTimeout(90_000);
  const skill = await seedSkill({ portfolio: true });
  cleanup.push(() => deleteSkill(skill.id));
  const amina = await createLearner("Amina Mahama");
  const mentor = await createLearner("Sumaila Fuseini");
  await setRole(mentor.id, "mentor");

  await test.step("a learner who is not a reviewer gets a 404 on the queue", async () => {
    await signIn(page, amina.email);
    await page.goto("/skills/reviews");
    await expect(page.getByRole("heading", { name: "Portfolio reviews" })).toHaveCount(0);
  });

  await test.step("the learner sends a link to their work", async () => {
    await page.goto(`/skills/${skill.slug}/portfolio`);
    await page.getByLabel("Link to your work").fill("http://example.com/amina");
    await page.getByRole("button", { name: "Send for review" }).click();
    await expect(page.getByText("Use a full link that starts with https://")).toBeVisible();
    await page.getByLabel("Link to your work").fill("https://example.com/amina-stock-sheet");
    await page.getByLabel("Note for the reviewer (optional)").fill("A week of stock for my aunt's provisions shop in Wa.");
    await page.getByRole("button", { name: "Send for review" }).click();
    await expect(page.getByText("Your work is waiting for review")).toBeVisible();
  });

  await test.step("the mentor must say what to improve to send it back, then approves", async () => {
    await signIn(page, mentor.email);
    await page.goto("/skills/reviews");
    const item = page.getByRole("listitem").filter({ hasText: "amina-stock-sheet" });
    await expect(item.getByText(skill.name)).toBeVisible();
    await item.getByRole("button", { name: "Send back" }).click();
    await expect(item.getByText("Say what to improve before you send the work back.")).toBeVisible();
    await item.getByRole("button", { name: "Approve and verify" }).click();
    // The queue refreshes: the submission leaves "Waiting" and shows as approved.
    await expect(item).toHaveCount(0);
    const table = page.getByRole("table", { name: "Recently reviewed portfolios" });
    await expect(table.getByRole("row").filter({ hasText: skill.name }).getByText("Approved")).toBeVisible();
  });

  await test.step("the learner sees the badge on their profile", async () => {
    await signIn(page, amina.email);
    await page.goto("/profile");
    const mine = page.getByRole("list", { name: "Your verified skills" });
    await expect(mine.getByText(skill.name)).toBeVisible();
    await expect(mine.getByText(/Portfolio reviewed/)).toBeVisible();
  });

  await test.step("a mentor's own submission cannot be reviewed by them", async () => {
    await signIn(page, mentor.email);
    await page.goto(`/skills/${skill.slug}/portfolio`);
    await page.getByLabel("Link to your work").fill("https://example.com/sumaila");
    await page.getByRole("button", { name: "Send for review" }).click();
    await expect(page.getByText("Your work is waiting for review")).toBeVisible();
    await page.goto("/skills/reviews");
    const own = page.getByRole("listitem").filter({ hasText: "example.com/sumaila" });
    await expect(own.getByText("This is your own submission. Another reviewer will check it.")).toBeVisible();
    await expect(own.getByRole("button", { name: "Approve and verify" })).toHaveCount(0);
  });
});

test("a learner claims a skill mapped after they finished its path", async ({ page }) => {
  const roadmap = await seedRoadmap();
  cleanup.push(() => deleteRoadmap(roadmap.id));
  const skill = await seedSkill();
  cleanup.push(() => deleteSkill(skill.id));
  const issahaku = await createLearner("Issahaku Alhassan");

  // Finished before the skill was mapped, so the completion trigger had nothing to issue.
  await mintRoadmapCompleted(issahaku.id, roadmap.id);
  await mapRoadmap(skill.id, roadmap.slug);

  await signIn(page, issahaku.email);
  await page.goto("/profile");
  await expect(page.getByText("No verified skills yet.")).toBeVisible();
  await page.getByRole("button", { name: "Claim skills from paths you've completed" }).click();
  await expect(page.getByText("One new skill added to your profile.")).toBeVisible();
  await expect(page.getByRole("list", { name: "Your verified skills" }).getByText(skill.name)).toBeVisible();

  await page.getByRole("button", { name: "Claim skills from paths you've completed" }).click();
  await expect(page.getByText("Nothing new to claim.", { exact: false })).toBeVisible();
});
