import { expect, test } from "@playwright/test";
import { deleteExperts, seedExperts, type SeededExperts } from "./experts-seed";

/**
 * Expert discovery (#150): search and filter the directory, open an expert's
 * public page with real trust signals, then an offer with its Request link.
 * Runs at phone and desktop widths (playwright projects). Booking itself is
 * #151; this only checks the link to it.
 */
let seeded: SeededExperts | undefined;

test.beforeEach(async () => {
  seeded = await seedExperts();
});

test.afterEach(async () => {
  await deleteExperts(seeded);
  seeded = undefined;
});

test("find an expert, read their page and open an offer", async ({ page }) => {
  const { tag, verified, paused } = seeded!;

  // Search finds both of this run's experts.
  await page.goto(`/experts?q=${tag}`);
  const results = page.getByRole("region", { name: "Matching experts" });
  await expect(results.getByRole("link", { name: new RegExp(verified.name) })).toBeVisible();
  await expect(results.getByRole("link", { name: new RegExp(paused.name) })).toBeVisible();
  await expect(results.getByText("2 of", { exact: false })).toBeVisible();

  // Filters are a GET form: service type narrows to the expert with a gig.
  await page.getByLabel("Service type").selectOption("gig");
  await page.getByRole("button", { name: "Show experts" }).click();
  await expect(page).toHaveURL(/type=gig/);
  await expect(results.getByRole("link", { name: new RegExp(verified.name) })).toBeVisible();
  await expect(results.getByRole("link", { name: new RegExp(paused.name) })).toHaveCount(0);

  // Availability: the paused expert is not taking requests.
  await page.goto(`/experts?q=${tag}&availability=accepting`);
  await expect(results.getByRole("link", { name: new RegExp(paused.name) })).toHaveCount(0);

  // Rating: only reviewed experts pass a rating filter.
  await page.goto(`/experts?q=${tag}&rating=4.5`);
  await expect(results.getByRole("link")).toHaveCount(1);

  // The expert's page: trust signals from real rows, offers, reviews, structured data.
  await results.getByRole("link", { name: new RegExp(verified.name) }).click();
  await expect(page).toHaveURL(new RegExp(`/experts/${verified.slug}$`));
  await expect(page.getByRole("heading", { level: 1, name: verified.name })).toBeVisible();
  await expect(page.getByText("Identity verified").first()).toBeVisible();
  await expect(page.getByText("1 completed session").first()).toBeVisible();
  await expect(page.getByText("5.0 out of 5 from 1 review").first()).toBeVisible();
  await expect(page.getByText("Fuseini showed me how to find duplicate rows.")).toBeVisible();
  const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? "{}");
  expect(jsonLd["@type"]).toBe("ProfilePage");
  expect(jsonLd.mainEntity).toMatchObject({ "@type": "Person", name: verified.name });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`/experts/${verified.slug}$`));
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`/og/experts/${verified.slug}`));

  // An offer page, with the Request link the booking flow (#151) picks up.
  await page.getByRole("link", { name: "Details: Clean one survey sheet for your report" }).click();
  await expect(page).toHaveURL(new RegExp(`/experts/${verified.slug}/offers/${verified.gigId}$`));
  await expect(page.getByRole("heading", { level: 1, name: "Clean one survey sheet for your report" })).toBeVisible();
  await expect(page.getByText("5 days")).toBeVisible();
  await expect(page.getByText("Free during the soft launch").first()).toBeVisible();
  const request = page.getByRole("link", { name: "Request: Clean one survey sheet for your report" }).filter({ visible: true });
  await expect(request.first()).toHaveAttribute("href", `/experts/${verified.slug}/offers/${verified.gigId}/request`);
});

test("an expert who is not taking requests shows no Request button", async ({ page }) => {
  const { paused } = seeded!;
  await page.goto(`/experts/${paused.slug}`);
  await expect(page.getByText("Not taking new requests right now")).toBeVisible();
  await expect(page.getByText("No reviews yet.", { exact: false })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Request/ })).toHaveCount(0);
  await page.goto(`/experts/${paused.slug}/offers/${paused.offerId}`);
  await expect(page.getByText("is not taking new requests right now")).toBeVisible();
  await expect(page.getByRole("link", { name: /^Request/ })).toHaveCount(0);
});

test("unknown experts and offers are not found", async ({ page }) => {
  const { verified, paused } = seeded!;
  // The lookup streams inside <Suspense>, so the not found page and a noindex tag are the signal, not the status.
  for (const path of [
    "/experts/nobody-by-this-name",
    // An offer id must belong to the expert in the URL.
    `/experts/${verified.slug}/offers/${paused.offerId}`,
    `/experts/${verified.slug}/offers/not-a-uuid`,
  ]) {
    await page.goto(path);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
    await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
  }
});
