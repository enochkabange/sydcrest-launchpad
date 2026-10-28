import { expect, test } from "@playwright/test";
import { createLearner, PASSWORD } from "./learners";
import { deleteCohort, seedCohort, type SeededCohort } from "./cohort-seed";

/**
 * Issue #239: a cohort week shows SydCrest's own lessons first, then up to
 * three free official resources as "Extra practice", each opening in a new tab.
 */

let seeded: SeededCohort | undefined;

test.afterEach(async () => {
  if (seeded) await deleteCohort(seeded);
  seeded = undefined;
});

test("a week lists SydCrest lessons, then extra practice that opens in a new tab", async ({ page }) => {
  const learner = await createLearner("Hawa Sulemana");
  seeded = await seedCohort(learner.id);

  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/cohort/week/1");
  const lessons = page.getByRole("region", { name: "SydCrest lessons" });
  const practice = page.getByRole("region", { name: "Extra practice" });
  await expect(lessons).toBeVisible();
  await expect(practice).toBeVisible();

  // Lessons come first in reading order.
  const order = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("section[id]")].map((s) => s.id);
    return [ids.indexOf("lessons"), ids.indexOf("extra-practice")];
  });
  expect(order[0]).toBeGreaterThanOrEqual(0);
  expect(order[0]).toBeLessThan(order[1]);

  const links = practice.getByRole("link");
  await expect(links).toHaveCount(2);
  const first = practice.getByRole("link", { name: "Free spreadsheet course (opens in a new tab)" });
  await expect(first).toHaveAttribute("href", "https://example.com/sheets");
  await expect(first).toHaveAttribute("target", "_blank");
  await expect(first).toHaveAttribute("rel", /noreferrer/);
  await expect(practice.getByRole("link", { name: /Free guide to formulas/ })).toHaveAttribute(
    "href",
    "https://example.com/formulas",
  );

  // A week without resources has no extra practice section.
  await page.goto("/cohort/week/2");
  await expect(page.getByRole("heading", { name: "Writing for customers", level: 1 })).toBeVisible();
  await expect(page.getByRole("region", { name: "Extra practice" })).toHaveCount(0);
});
