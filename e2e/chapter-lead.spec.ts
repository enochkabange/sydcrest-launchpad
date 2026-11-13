import { expect as baseExpect, test } from "@playwright/test";
import { signIn } from "./certificates-fixtures";
import { deleteChapter, seedChapter } from "./chapters-seed";
import { createLearner } from "./learners";

/**
 * The chapter lead toolkit (#335) and the audience composer (#334) at phone
 * and desktop widths: a lead builds a tagged chapter link and poster, checks
 * the audience size and sends an in app message to their chapter, sees the
 * result; the member gets it; someone who is not a lead gets a 404.
 */

const expect = baseExpect.configure({ timeout: 15_000 });

const cleanup: string[] = [];

test.afterEach(async () => {
  while (cleanup.length) await deleteChapter(cleanup.pop()!);
});

test("a chapter lead builds a tagged link and messages their chapter", async ({ page }) => {
  const lead = await createLearner("Fuseini Mahama");
  const member = await createLearner("Wumpini Abukari");
  const chapter = await seedChapter({ status: "active", leads: [lead.id], members: [member.id] });
  cleanup.push(chapter.id);
  const title = `Skillshop this Saturday ${chapter.slug.slice(-8)}`;

  await signIn(page, lead.email);
  await page.goto(`/chapters/${chapter.slug}`);
  await page.getByRole("link", { name: "Lead tools" }).click();
  await expect(page).toHaveURL(new RegExp(`/chapters/${chapter.slug}/lead$`));
  await expect(page.getByRole("heading", { name: `Lead tools: ${chapter.name}`, level: 1 })).toBeVisible();

  // The tagged link: WhatsApp, chapter medium, the chapter slug as campaign, and a label.
  await page.getByLabel("Label for this link (optional)").fill("Library Notice Board");
  const link = new URL(await page.getByLabel("Your chapter link").inputValue());
  expect(link.pathname).toBe(`/chapters/${chapter.slug}`);
  expect(link.searchParams.get("utm_source")).toBe("whatsapp");
  expect(link.searchParams.get("utm_medium")).toBe("chapter");
  expect(link.searchParams.get("utm_campaign")).toBe(chapter.slug);
  expect(link.searchParams.get("utm_content")).toBe("library-notice-board");
  await expect(page.getByRole("img", { name: /^QR code for / })).toBeVisible();

  // The printable poster carries the same tags.
  await page.getByRole("link", { name: "Make a poster" }).click();
  await expect(page.getByRole("button", { name: "Print this poster" })).toBeVisible();
  await expect(page.getByRole("img", { name: `QR code for ${chapter.name}` })).toBeVisible();
  await page.goBack();

  // Compose: everyone in the chapter, no holdout, in the app.
  await page.getByLabel("Hold out (percent)").fill("0");
  await page.getByLabel("Title", { exact: true }).fill(title);
  await page.getByLabel("Message", { exact: true }).fill("Bring a friend. We meet at the library at 10.");
  await page.getByLabel("Link to a page (optional)").fill("/events");
  await expect(page.getByTestId("in-app-preview")).toContainText(title);
  await page.getByRole("button", { name: "Check audience size" }).click();
  await expect(page.getByTestId("audience-size")).toContainText("1 person matches");
  await page.getByLabel(/Send to 1 person/).check();
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText(/^Sent\. 1 person matched/)).toBeVisible();

  await page.getByRole("link", { name: "See the results" }).click();
  await expect(page.getByRole("heading", { name: "Message results", level: 1 })).toBeVisible();
  await expect(page.getByTestId("message-results")).toContainText("Got the message");
  await expect(page.getByText(title)).toBeVisible();

  // The member gets it in the app.
  await signIn(page, member.email);
  await page.goto("/notifications");
  await expect(page.getByTestId("notification").filter({ hasText: title })).toBeVisible();

  // Members have no lead tools.
  await page.goto(`/chapters/${chapter.slug}/lead`);
  await expect(page.getByText("This page could not be found.")).toBeVisible();
});
