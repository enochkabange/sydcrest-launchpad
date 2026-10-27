import { expect, test } from "@playwright/test";
import { createLearner, PASSWORD } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";

/**
 * Study Buddy (issues #48, #124). No test here calls the model: the local
 * stack and CI run without ANTHROPIC_API_KEY, so the signed in panel shows its
 * friendly unavailable notice, and the API refuses signed out visitors first.
 */

let roadmap: SeededRoadmap | undefined;

test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  roadmap = undefined;
});

test("signed out visitors get 401 from Study Buddy", async ({ request }) => {
  const response = await request.post("/api/study-buddy", {
    data: { nodeId: "8f14e45f-ceea-467a-9575-0a1b2c3d4e5f", messages: [{ role: "user", content: "What is a variable?" }] },
  });
  expect(response.status()).toBe(401);
  expect(await response.json()).toMatchObject({ error: "signed_out" });
});

test("a signed in learner sees Study Buddy on the lesson page", async ({ page }) => {
  roadmap = await seedRoadmap();
  const learner = await createLearner("Mariama Seidu");
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto(`/learn/${roadmap.slug}/${roadmap.quizNode.slug}`);
  await expect(page.getByRole("heading", { name: roadmap.quizNode.title, level: 1 })).toBeVisible();
  const panel = page.getByRole("region", { name: "Study Buddy" });
  await expect(panel).toBeVisible();
  await expect(panel.getByRole("link", { name: /Sign up/ })).toHaveCount(0);

  const chat = panel.getByLabel("Your message to Study Buddy");
  const resting = panel.getByText(/Study Buddy is resting right now/);
  await expect(chat.or(resting)).toBeVisible();
  if (await resting.isVisible()) {
    // Unkeyed: no chat box to type into, and the lesson around it still works.
    await expect(chat).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Check my answers" })).toBeVisible();
  } else {
    await expect(panel.getByText(/of 30 left today/)).toBeVisible();
  }
});

test("visitors see a prompt to sign up for Study Buddy on the public topic page", async ({ page }) => {
  roadmap = await seedRoadmap();
  const { slug, quizNode } = roadmap;
  await page.goto(`/roadmaps/${slug}/${quizNode.slug}`);
  await expect(page.getByRole("heading", { name: quizNode.title, level: 1 })).toBeVisible();

  const panel = page.getByRole("region", { name: "Study Buddy" });
  await expect(panel).toBeVisible();
  const next = encodeURIComponent(`/learn/${slug}/${quizNode.slug}`);
  await expect(panel.getByRole("link", { name: "Sign up to use Study Buddy" })).toHaveAttribute("href", `/signup?next=${next}`);
  await expect(panel.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", `/login?next=${next}`);
  await expect(panel.getByRole("textbox")).toHaveCount(0);
});
