import { expect, test } from "@playwright/test";
import { signIn } from "./certificates-fixtures";
import { createLearner } from "./learners";
import { notify, seedNotifications } from "./notifications-seed";

/**
 * The notification centre (#166) at phone and desktop widths: read state,
 * opening one, mark all read and delete. Rows come from notify_user, as
 * they do from server code.
 */

test("a learner reads, opens, marks and deletes notifications", async ({ page }) => {
  const learner = await createLearner("Abdul-Rahman Iddrisu");
  await seedNotifications(learner.id);
  await signIn(page, learner.email);

  await page.goto("/notifications");
  await expect(page.getByRole("heading", { name: "Notifications", level: 1 })).toBeVisible();
  const rows = page.getByTestId("notification");
  await expect(rows).toHaveCount(5);
  await expect(page.getByRole("heading", { name: "5 unread" })).toBeVisible();
  // Newest first; a payload with no copy still shows a sensible line.
  await expect(rows.first()).toContainText("Someone replied to your post");
  await expect(page.getByText("News from your cohort")).toBeVisible();
  await expect(page.getByText("Bolgatanga learners meetup is cancelled")).toBeVisible();

  // Opening one marks it read and goes to its target.
  await page.getByRole("button", { name: /^Unread: Reminder: Spreadsheet skillshop in Tamale/ }).click();
  await expect(page).toHaveURL(/\/roadmaps$/);
  await page.goto("/notifications");
  await expect(page.getByRole("heading", { name: "4 unread" })).toBeVisible();
  await expect(rows.filter({ hasText: "Reminder: Spreadsheet skillshop" })).toHaveAttribute("data-read", "true");

  // Mark one read without leaving.
  await page.getByRole("button", { name: "Mark as read: You earned a verified skill: Excel basics" }).click();
  await expect(page.getByRole("heading", { name: "3 unread" })).toBeVisible();

  // Delete one.
  await page.getByRole("button", { name: "Delete: News from your cohort" }).click();
  await expect(rows).toHaveCount(4);
  await expect(page.getByText("News from your cohort")).toHaveCount(0);

  // Mark everything read.
  await page.getByRole("button", { name: "Mark all as read" }).click();
  await expect(page.getByRole("heading", { name: "All caught up" })).toBeVisible();
  await expect(page.locator("[data-testid='notification'][data-read='false']")).toHaveCount(0);
});

test("a learner only sees their own notifications, and an empty centre says so", async ({ page }) => {
  const mariama = await createLearner("Mariama Seidu");
  const fuseini = await createLearner("Fuseini Alhassan");
  await notify(fuseini.id, "system", { title: "Only for Fuseini", href: "/path" });

  await signIn(page, mariama.email);
  await page.goto("/notifications");
  await expect(page.getByRole("heading", { name: "Nothing here yet" })).toBeVisible();
  await expect(page.getByText("Only for Fuseini")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Go to your path" })).toBeVisible();
});

test("signed out visitors are sent to sign in", async ({ page }) => {
  await page.goto("/notifications");
  await expect(page).toHaveURL(/\/login/);
});

test("the companion chat shows its resting notice without a model key", async ({ page }) => {
  const learner = await createLearner("Wumpini Abukari");
  await signIn(page, learner.email);
  await page.goto("/study-buddy");
  await expect(page.getByRole("heading", { name: "Study Buddy", level: 1 })).toBeVisible();
  const panel = page.getByRole("region", { name: "Study Buddy" });
  const chat = panel.getByLabel("Your message to Study Buddy");
  const resting = panel.getByText(/Study Buddy is resting right now/);
  await expect(chat.or(resting)).toBeVisible();
  if (await resting.isVisible()) await expect(chat).toHaveCount(0);
  else await expect(panel.getByRole("button", { name: "What should I do next?" })).toBeVisible();
});

test("signed out visitors cannot use the companion chat API", async ({ request }) => {
  const response = await request.post("/api/study-buddy", { data: { messages: [{ role: "user", content: "Who could mentor me?" }] } });
  expect(response.status()).toBe(401);
});
