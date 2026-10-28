import { mkdirSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { createLearner, PASSWORD, type Learner } from "../learners";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "../seed";
import { admin } from "../supabase-admin";
import { screensSetup } from "./shoot";

/**
 * Display settings (issue #204): key screens in dark, at 150 percent text,
 * and with higher contrast in both themes, at 390 and 1440. Light at 100
 * percent is what every other screens spec already shows.
 */
const KEY = "sydcrest.display";
const DIR = "e2e-screenshots";
const WIDTHS = [
  { name: "390", width: 390, height: 844 },
  { name: "1440", width: 1440, height: 900 },
];
const VARIANTS: [string, Record<string, unknown>][] = [
  ["dark", { theme: "dark" }],
  ["light-150", { theme: "light", textSize: 150 }],
  ["dark-150", { theme: "dark", textSize: 150 }],
  ["light-contrast", { theme: "light", contrast: "more", underlineLinks: true }],
  ["dark-contrast", { theme: "dark", contrast: "more", underlineLinks: true }],
];

let roadmap: SeededRoadmap | undefined;
let learner: Learner | undefined;
test.afterEach(async () => {
  if (roadmap) await deleteRoadmap(roadmap.id);
  if (learner) await admin(`/auth/v1/admin/users/${learner.id}`, { method: "DELETE" });
  roadmap = learner = undefined;
});

test("display settings screenshots at 390 and 1440", async ({ page }, testInfo) => {
  screensSetup(testInfo, 480_000);
  mkdirSync(DIR, { recursive: true });
  roadmap = await seedRoadmap();
  learner = await createLearner("Amina Sumaila");

  async function shootAll(name: string, path: string) {
    for (const [variant, prefs] of VARIANTS) {
      await page.goto("/accessibility");
      await page.evaluate(([k, p]) => localStorage.setItem(k, JSON.stringify({ ...p, updatedAt: Date.now() })), [KEY, prefs] as const);
      for (const w of WIDTHS) {
        await page.setViewportSize({ width: w.width, height: w.height });
        await page.goto(path);
        await page.waitForLoadState("load");
        await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 15_000 });
        const file = `${DIR}/display-${name}-${variant}-${w.name}.png`;
        await page.screenshot({ path: file, fullPage: true });
        await testInfo.attach(`display-${name}-${variant}-${w.name}`, { path: file, contentType: "image/png" });
      }
    }
  }

  await shootAll("home", "/");
  await shootAll("roadmap", `/roadmaps/${roadmap.slug}`);
  await shootAll("settings", "/settings");
  await shootAll("accessibility", "/accessibility");

  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  await shootAll("dashboard", "/dashboard");
  await shootAll("lesson", `/learn/${roadmap.slug}/${roadmap.quizNode.slug}`);
  await shootAll("settings-signed-in", "/settings");
});
