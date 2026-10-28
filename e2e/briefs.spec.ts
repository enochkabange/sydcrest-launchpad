import { expect, test } from "@playwright/test";
import { deleteBriefsSeed, notificationsFor, seedBriefs, type BriefsSeed } from "./briefs-seed";
import { signIn } from "./certificates-fixtures";

/**
 * Briefs and pitches (#152): a person posts an advice brief, matching experts
 * are notified, an expert pitches with a gig offer, the poster accepts and
 * lands on the booking; a verified organisation's owner posts a job brief.
 * Runs at phone and desktop widths. The booking page itself is #151, so the
 * accept step checks the URL only.
 */
let seed: BriefsSeed | undefined;

test.beforeEach(async () => {
  seed = await seedBriefs();
});

test.afterEach(async () => {
  await deleteBriefsSeed(seed);
  seed = undefined;
});

test("post an advice brief, pitch on it and accept the pitch", async ({ page }) => {
  test.setTimeout(120_000);
  const { tag, sheetsTag, poster, expert, otherExpert } = seed!;
  const title = `Clean my Savelugu farm survey ${tag}`;

  // The poster is not an expert: the board says who sees open briefs.
  await signIn(page, poster.email);
  await page.goto("/briefs");
  await expect(page.getByText("Open briefs are shared with approved experts")).toBeVisible();
  await page.getByRole("link", { name: "Post a brief" }).first().click();
  await expect(page).toHaveURL(/\/briefs\/new$/);

  // Job briefs need a verified organisation; this poster has none.
  await expect(page.getByRole("radio", { name: /Job/ })).toBeDisabled();

  // Validation runs on the server and keeps what was typed.
  await page.getByLabel("Title").fill(title);
  await page.getByRole("button", { name: "Post brief" }).click();
  await expect(page.getByText("Describe what you need in a few sentences.")).toBeVisible();
  await expect(page.getByLabel("Title")).toHaveValue(title);

  await page
    .getByLabel("Describe what you need")
    .fill("I collected 300 survey rows from farmers in Savelugu and need help removing duplicates before Friday.");
  await page.getByLabel("Skills it takes").fill(`${sheetsTag}, ${tag}`);
  await page.getByLabel("Indicative budget in cedis (optional)").fill("400");
  await page.getByRole("button", { name: "Post brief" }).click();

  await expect(page).toHaveURL(/\/briefs\/[0-9a-f-]{36}\?posted=1$/);
  const briefUrl = page.url().replace(/\?posted=1$/, "");
  await expect(page.getByText("Your brief is posted.")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "About this brief" }).getByText("GHS 400 (indicative)")).toBeVisible();
  await expect(page.getByRole("region", { name: "Pitches" }).getByText(/Experts whose skills match have been told/)).toBeVisible();

  // Both matching experts got an in app notification linking to the brief.
  const briefPath = new URL(briefUrl).pathname;
  await expect
    .poll(async () => (await notificationsFor(expert.id)).filter((n) => n.payload.href === briefPath).length, { timeout: 15_000 })
    .toBe(1);
  expect((await notificationsFor(otherExpert.id)).some((n) => n.kind === "opportunity" && n.payload.href === briefPath)).toBe(true);
  expect(await notificationsFor(poster.id)).toEqual([]);

  // The expert finds it on the board by skill and pitches with their gig.
  await signIn(page, expert.email);
  await page.goto(`/briefs?skill=${tag}`);
  const board = page.getByRole("region", { name: "Matching briefs" });
  await board.getByRole("link", { name: title }).click();
  await expect(page).toHaveURL(briefPath);
  await page.getByLabel("Your pitch").fill("I have cleaned survey data for three NGOs in the Northern Region and can finish this in two days.");
  await page.getByLabel("Indicative price in cedis (optional)").fill("350");
  await page.getByLabel("Link one of your offers (optional)").selectOption({ label: "Gig: Clean one survey sheet for your report" });
  await page.getByRole("button", { name: "Send pitch" }).click();
  const myPitch = page.getByRole("region", { name: "Your pitch" });
  await expect(myPitch.getByText("Waiting for a reply")).toBeVisible();
  await expect(myPitch.getByText("Clean one survey sheet for your report")).toBeVisible();

  // The poster was told, sees the pitch and accepts it.
  await expect.poll(async () => (await notificationsFor(poster.id)).length, { timeout: 15_000 }).toBe(1);
  await signIn(page, poster.email);
  await page.goto(briefPath);
  const pitch = page.getByRole("article", { name: `Pitch from ${expert.name}` });
  await expect(pitch.getByText("GHS 350 (indicative)")).toBeVisible();
  await pitch.getByRole("button", { name: "Accept pitch" }).click();
  await pitch.getByRole("button", { name: "Yes, accept and open a booking" }).click();
  await expect(page).toHaveURL(/\/bookings\/[0-9a-f-]{36}$/);
  const bookingPath = new URL(page.url()).pathname;

  // The brief is awarded and links to the booking; the expert is told.
  await page.goto(briefPath);
  await expect(page.getByText("Awarded").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the booking" })).toHaveAttribute("href", bookingPath);
  await expect
    .poll(async () => (await notificationsFor(expert.id)).some((n) => n.kind === "booking" && n.payload.href === bookingPath), { timeout: 15_000 })
    .toBe(true);

  // Both sides see it in their lists.
  await page.goto("/briefs/mine");
  const mine = page.getByRole("region", { name: "Briefs you posted" });
  await expect(mine.getByRole("link", { name: title })).toBeVisible();
  await expect(mine.getByText("Awarded")).toBeVisible();
  await signIn(page, expert.email);
  await page.goto("/briefs/mine");
  const pitches = page.getByRole("region", { name: "Your pitches" });
  await expect(pitches.getByRole("link", { name: title })).toBeVisible();
  await expect(pitches.getByRole("link", { name: "Open the booking" })).toHaveAttribute("href", bookingPath);
});

test("a verified organisation posts a job brief, and a pitch can be declined", async ({ page }) => {
  test.setTimeout(120_000);
  const { tag, owner, org, otherExpert } = seed!;
  const title = `Stock records for our shea store ${tag}`;

  await signIn(page, owner.email);
  await page.goto("/briefs/new");
  await page.getByRole("radio", { name: /Job/ }).check();
  await expect(page.getByLabel("Organisation", { exact: true })).toHaveValue(org.id);
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Describe what you need").fill("We sell shea butter from Savelugu and need a simple stock sheet our staff can update each week.");
  await page.getByLabel("Skills it takes").fill(tag);
  await page.getByLabel("This can be done remotely").uncheck();
  await page.getByLabel("Where does the work happen?").fill("Savelugu");
  await page.getByRole("button", { name: "Post brief" }).click();
  await expect(page).toHaveURL(/\/briefs\/[0-9a-f-]{36}\?posted=1$/);
  const briefPath = new URL(page.url()).pathname;
  await expect(page.getByText(org.name).first()).toBeVisible();
  await expect(page.getByText("Job").first()).toBeVisible();

  // The other expert pitches; the job filter finds the brief.
  await signIn(page, otherExpert.email);
  await page.goto(`/briefs?kind=job&skill=${tag}`);
  await page.getByRole("region", { name: "Matching briefs" }).getByRole("link", { name: title }).click();
  await page.getByLabel("Your pitch").fill("I train shop staff in Tamale to keep stock in a shared sheet. I can visit Savelugu on a Saturday.");
  await page.getByRole("button", { name: "Send pitch" }).click();
  await expect(page.getByRole("region", { name: "Your pitch" }).getByText("Waiting for a reply")).toBeVisible();

  // The owner declines it; the brief stays open.
  await signIn(page, owner.email);
  await page.goto(briefPath);
  const pitch = page.getByRole("article", { name: `Pitch from ${otherExpert.name}` });
  await pitch.getByRole("button", { name: "Decline" }).click();
  await expect(pitch.getByText("Not chosen")).toBeVisible();
  await expect(page.getByText("Open").first()).toBeVisible();
});
