import { expect, test } from "@playwright/test";
import { signUpAndConfirm } from "./auth";

/**
 * Phone first, desktop equal: screens use the width of a laptop rather than a
 * phone column stranded in the middle of it (issues #115 and #154). At 1440
 * the main content of the home page, the programme and the dashboard is wider
 * than 1000px.
 */
test("main content uses the width of a desktop screen", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Checks the desktop width only.");
  for (const path of ["/", "/programme"]) {
    await page.goto(path);
    const content = await page.locator("main [data-container]").first().boundingBox();
    expect(content?.width ?? 0, `${path} main content width`).toBeGreaterThan(1000);
  }
  await signUpAndConfirm(page, testInfo, "Mariama Seidu");
  const content = await page.locator("#main > *").first().boundingBox();
  expect(content?.width ?? 0, "dashboard main content width").toBeGreaterThan(1000);
  // The dashboard's right rail appears beside the main column on a laptop.
  await expect(page.getByRole("complementary", { name: "Your path and community" })).toBeVisible();
});

test("phones keep the bottom tab bar on signed in screens", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "phone", "Checks the phone layout only.");
  await signUpAndConfirm(page, testInfo, "Fuseini Alhassan");
  const tabs = page.getByRole("navigation", { name: "Primary" });
  await expect(tabs).toBeVisible();
  await expect(tabs.getByRole("link", { name: "Home" })).toBeVisible();

  // Privacy and Terms sit at the end of the content, clear of the fixed tab bar.
  const privacy = page.getByRole("navigation", { name: "Legal" }).getByRole("link", { name: "Privacy" });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(privacy).toBeVisible();
  const link = await privacy.boundingBox();
  const bar = await tabs.boundingBox();
  expect(link!.y + link!.height).toBeLessThanOrEqual(bar!.y);
});
