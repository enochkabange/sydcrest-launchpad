import { expect, test } from "@playwright/test";
import { signUpAndConfirm } from "./auth";

/**
 * Phone first, desktop equal: signed in screens use the width of a laptop
 * rather than a phone column stranded in the middle of it (issue #115).
 */
test("the dashboard uses the width of a desktop screen", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Checks the desktop width only.");
  await signUpAndConfirm(page, testInfo, "Mariama Seidu");
  const content = await page.locator("#main > *").first().boundingBox();
  expect(content?.width ?? 0).toBeGreaterThan(900);
});

test("phones keep the bottom tab bar on signed in screens", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "Checks the phone layout only.");
  await signUpAndConfirm(page, testInfo, "Fuseini Alhassan");
  const tabs = page.getByRole("navigation", { name: "Primary" });
  await expect(tabs).toBeVisible();
  await expect(tabs.getByRole("link", { name: "Home" })).toBeVisible();
});
