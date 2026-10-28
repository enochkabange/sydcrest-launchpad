import { expect, test, type APIRequestContext, type Page } from "@playwright/test";
import { certify, deleteUser, signIn } from "./earn-business";
import { createLearner } from "./learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";
import { makePublic, mint, nodeId } from "./sharing-seed";
import { admin } from "./supabase-admin";

/**
 * Sharing loop (issue #233): story and square cards for milestones, the share
 * panel, and milestone posts (off by default, one post per milestone).
 */

/** Width and height from a PNG's IHDR chunk. */
async function pngSize(request: APIRequestContext, path: string) {
  const res = await request.get(path);
  expect(res.status(), path).toBe(200);
  expect(res.headers()["content-type"]).toBe("image/png");
  const bytes = await res.body();
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

async function passQuiz(page: Page, roadmap: SeededRoadmap) {
  await page.goto(`/learn/${roadmap.slug}/${roadmap.quizNode.slug}`);
  await page.getByRole("group", { name: /Which function adds up a column/ }).getByLabel("SUM").check();
  await page.getByRole("group", { name: /Which way does a row run/ }).getByLabel("Across the sheet").check();
  await page.getByRole("button", { name: "Check my answers" }).click();
  await expect(page.getByText("You passed with 100%")).toBeVisible();
}

test.describe("sharing loop", () => {
  const cleanup: (() => Promise<unknown>)[] = [];
  test.afterEach(async () => {
    while (cleanup.length) await cleanup.pop()!().catch(() => {});
  });

  test("a learner shares a topic card after passing a quiz", async ({ page, browser }) => {
    const roadmap = await seedRoadmap();
    cleanup.push(() => deleteRoadmap(roadmap.id));
    const learner = await createLearner("Wumpini Alhassan");
    cleanup.push(() => deleteUser(learner.id));

    await signIn(page, learner);

    await test.step("a private profile is asked to go public first, never shown a card", async () => {
      await passQuiz(page, roadmap);
      await expect(page.getByRole("link", { name: "Make your profile public" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Share a card" })).toHaveCount(0);
      const [row] = await admin<{ id: string }[]>(
        `/rest/v1/achievements?select=id&profile_id=eq.${learner.id}&type=eq.roadmap_node_completed`,
      );
      expect((await page.request.get(`/og/achievements/${row.id}/story`)).status()).toBe(404);
    });

    await makePublic(learner);

    await test.step("with a public profile the celebration offers a card", async () => {
      await passQuiz(page, roadmap);
      await page.getByRole("button", { name: "Share a card" }).click();
      await expect(page.getByRole("radio", { name: /Status size/ })).toBeChecked();
      await expect(page.getByRole("img", { name: `Your card: ${roadmap.quizNode.title}` })).toBeVisible();
      await expect(page.getByText(/your name as your public profile shows it/)).toBeVisible();
      const download = page.getByRole("link", { name: "Download image" });
      const story = (await download.getAttribute("href"))!;
      expect(await pngSize(page.request, story)).toEqual({ width: 1080, height: 1920 });
      await page.getByRole("radio", { name: /Square/ }).check();
      const square = (await download.getAttribute("href"))!;
      expect(square).toMatch(/\/square$/);
      expect(await pngSize(page.request, square)).toEqual({ width: 1080, height: 1080 });
      await expect(page.getByRole("button", { name: "Copy link" })).toBeVisible();
    });

    await test.step("the link opens the public achievement page for anyone", async () => {
      const id = (await page.getByRole("link", { name: "Download image" }).getAttribute("href"))!.split("/")[3];
      const visitor = await (await browser.newContext()).newPage();
      await visitor.goto(`/a/${id}`);
      await expect(visitor.getByRole("heading", { name: `Completed ${roadmap.quizNode.title}` })).toBeVisible();
      await expect(visitor.getByText(learner.email)).toHaveCount(0);
      await visitor.context().close();
    });
  });

  test("milestone posts are off by default and post each milestone once when on", async ({ page }) => {
    const roadmap = await seedRoadmap();
    cleanup.push(() => deleteRoadmap(roadmap.id));
    const learner = await createLearner("Mariama Seidu");
    cleanup.push(() => deleteUser(learner.id));
    await makePublic(learner);
    await signIn(page, learner);

    await test.step("off by default: a finished roadmap is not posted", async () => {
      await page.goto("/profile#milestones");
      await expect(page.getByLabel(/Post in the community when I finish a section or a roadmap/)).not.toBeChecked();
      await mint(learner, "section_completed", await nodeId(roadmap, roadmap.quizNode.slug));
      await page.goto("/community");
      await expect(page.getByText(`I finished the ${roadmap.quizNode.title} section of the ${roadmap.title}`, { exact: false })).toHaveCount(0);
    });

    await test.step("the learner turns it on in plain words", async () => {
      await page.goto("/profile#milestones");
      await expect(page.getByText("Off unless you turn it on.")).toBeVisible();
      await page.getByLabel(/Post in the community when I finish a section or a roadmap/).check();
      await page.getByRole("button", { name: "Save milestone choice" }).click();
      await expect(page.getByText("Milestone posts are on.")).toBeVisible();
    });

    await test.step("a finished roadmap and a certificate each post once", async () => {
      await mint(learner, "roadmap_completed", roadmap.id);
      await mint(learner, "roadmap_completed", roadmap.id);
      const programme = await certify(learner);
      await page.goto("/community");
      await expect(page.getByText(`I finished the ${roadmap.title} roadmap`, { exact: false })).toHaveCount(1);
      const posts = await admin<{ body: string }[]>(`/rest/v1/community_posts?select=body&author_id=eq.${learner.id}`);
      expect(posts.map((p) => p.body.split("\n")[0]).sort()).toEqual([
        `I earned my ${programme} certificate.`,
        `I finished the ${roadmap.title} roadmap, passing the checkpoint quiz for every required topic.`,
      ]);
      expect(posts.every((p) => p.body.endsWith("Shared automatically because I turned on milestone posts."))).toBe(true);
    });

    await test.step("the profile lists milestones with a card to share", async () => {
      await page.goto("/profile#milestones");
      const list = page.locator("#milestones");
      await expect(list.getByText(`Completed the ${roadmap.title} roadmap`)).toBeVisible();
      await expect(list.getByRole("button", { name: "Share card" }).first()).toBeVisible();
    });
  });

  test("certificate cards follow the verification page and stop when revoked", async ({ request }) => {
    const learner = await createLearner("Abdul-Rahman Iddrisu");
    cleanup.push(() => deleteUser(learner.id));
    await certify(learner);
    const [cert] = await admin<{ id: string; verification_id: string }[]>(
      `/rest/v1/certificates?select=id,verification_id&profile_id=eq.${learner.id}`,
    );
    expect(await pngSize(request, `/og/certificates/${cert.verification_id}/story`)).toEqual({ width: 1080, height: 1920 });
    expect(await pngSize(request, `/og/certificates/${cert.verification_id}/square`)).toEqual({ width: 1080, height: 1080 });
    expect((await request.get(`/og/certificates/${cert.verification_id}/wide`)).status()).toBe(404);
    expect((await request.get(`/og/certificates/${"0".repeat(32)}/story`)).status()).toBe(404);
    await admin(`/rest/v1/certificates?id=eq.${cert.id}`, {
      method: "PATCH",
      body: { revoked_at: new Date().toISOString(), revoked_by: learner.id, revocation_reason: "Test" },
    });
    expect((await request.get(`/og/certificates/${cert.verification_id}/story?after=revoke`)).status()).toBe(404);
  });
});
