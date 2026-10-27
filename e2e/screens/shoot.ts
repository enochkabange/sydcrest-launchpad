import { mkdirSync } from "node:fs";
import { expect, test, type Page, type TestInfo } from "@playwright/test";

/**
 * Full page screenshots of key screens at a phone (390), a laptop (1440) and
 * a desktop (1920) width, so every PR shows what a screen looks like on each
 * (issue #154). Saved to e2e-screenshots/ (uploaded by CI as an artifact)
 * and attached to the report. No pixel assertions: the e2e width check in
 * layout.spec.ts guards the layout; these are for people to look at.
 *
 * One spec file per area in e2e/screens/ (core.spec.ts, certificates.spec.ts,
 * ...), so features add their own file instead of editing a shared one.
 */
const WIDTHS = [
  { name: "390", width: 390, height: 844 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];
const DIR = "e2e-screenshots";

/** Call first in a screenshot test: runs once (desktop project) with room for every width. */
export function screensSetup(testInfo: TestInfo, timeout = 240_000) {
  test.skip(testInfo.project.name !== "desktop", "Takes every width itself, once.");
  test.setTimeout(timeout);
  mkdirSync(DIR, { recursive: true });
}

/** Screenshots `path` at every width as e2e-screenshots/<name>-<width>.png. */
export async function shoot(page: Page, testInfo: TestInfo, name: string, path: string) {
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w.width, height: w.height });
    await page.goto(path);
    // Not networkidle: signed in screens keep a request open. Wait for streamed Suspense islands instead.
    await page.waitForLoadState("load");
    await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 15_000 });
    const file = `${DIR}/${name}-${w.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    await testInfo.attach(`${name}-${w.name}`, { path: file, contentType: "image/png" });
  }
}
