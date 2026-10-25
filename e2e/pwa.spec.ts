import { expect, test } from "@playwright/test";

/**
 * PWA basics (issue #40). Needs only the production build, not Supabase: the
 * home page, manifest and offline page are all static.
 */

test("the manifest is served with installable icons", async ({ request }) => {
  const response = await request.get("/manifest.webmanifest");
  expect(response.ok()).toBe(true);
  const manifest = await response.json();
  expect(manifest).toMatchObject({
    name: "SydCrest Launchpad",
    short_name: "SydCrest",
    start_url: "/dashboard",
    display: "standalone",
  });
  const sizes = manifest.icons.map((icon: { sizes: string }) => icon.sizes);
  expect(sizes).toEqual(expect.arrayContaining(["192x192", "512x512"]));
  expect(manifest.icons.some((icon: { purpose?: string }) => icon.purpose === "maskable")).toBe(true);
  for (const icon of manifest.icons) {
    const file = await request.get(icon.src);
    expect(file.ok(), icon.src).toBe(true);
    expect(file.headers()["content-type"]).toBe("image/png");
  }
});

test("the page links the manifest and the service worker registers", async ({ page, request }) => {
  const sw = await request.get("/sw.js");
  expect(sw.headers()["cache-control"]).toContain("no-cache");
  expect(sw.headers()["service-worker-allowed"]).toBe("/");

  await page.goto("/");
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
  const scriptURL = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    return registration.active?.scriptURL;
  });
  expect(scriptURL).toMatch(/\/sw\.js$/);
});

test("a visited page opens offline and an unvisited one shows the offline page", async ({ page, context }) => {
  await page.goto("/");
  const heading = await page.locator("h1").first().textContent();
  await page.evaluate(() => navigator.serviceWorker.ready);
  // The worker saves the page it was registered from in the background.
  await expect
    .poll(() => page.evaluate(async () => !!(await caches.match("/", { cacheName: "sydcrest-pages-v1" }))))
    .toBe(true);

  await context.setOffline(true);
  await page.reload();
  await expect(page.locator("h1").first()).toHaveText(heading ?? "");

  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "You are offline" })).toBeVisible();
  await context.setOffline(false);
});
