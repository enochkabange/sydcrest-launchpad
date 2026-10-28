import { expect, test } from "@playwright/test";
import { signIn } from "./certificates-fixtures";
import { deleteExperts, seedExperts, type SeededExperts } from "./experts-seed";
import { createLearner, type Learner } from "./learners";
import { admin } from "./supabase-admin";

/**
 * Booking requests (#151): Wumpini requests a session from Fuseini, Fuseini
 * accepts, they agree a time in the thread, Wumpini marks it completed and
 * reviews it, and the review shows on Fuseini's public page. Runs at phone
 * and desktop widths (playwright projects) against the local stack.
 */
// Seeding creates several accounts; give slow local stacks room.
test.describe.configure({ timeout: 180_000 });

let seeded: SeededExperts | undefined;
let wumpini: Learner | undefined;

test.beforeEach(async () => {
  seeded = await seedExperts();
  wumpini = await createLearner("Wumpini Abukari");
});

test.afterEach(async () => {
  await deleteExperts(seeded);
  if (wumpini) await admin(`/auth/v1/admin/users/${wumpini.id}`, { method: "DELETE" });
  seeded = undefined;
  wumpini = undefined;
});

type Notification = { kind: string; payload: { event: string; booking_id: string; href: string } };

async function notificationsFor(profileId: string) {
  return admin<Notification[]>(`/rest/v1/notifications?recipient_id=eq.${profileId}&select=kind,payload&order=created_at`);
}

test("request a session, agree a time, complete it and leave a review", async ({ page }) => {
  const { verified } = seeded!;
  const learner = wumpini!;
  const reviewText = `Fuseini helped me plan my Tamale shop stock sheet ${crypto.randomUUID().slice(0, 6)}.`;

  // Wumpini finds the offer and requests it. Free, no payment step.
  await signIn(page, learner.email);
  await page.goto(`/experts/${verified.slug}/offers/${verified.sessionId}`);
  await page.getByRole("link", { name: "Request Review your first data cleaning project" }).first().click();
  await expect(page.getByRole("heading", { level: 1, name: "Review your first data cleaning project" })).toBeVisible();
  await expect(page.getByText("Free during the soft launch").first()).toBeVisible();

  // An empty message is caught before it reaches the database.
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText("Tell the expert what you need help with.")).toBeVisible();

  await page.getByLabel("What would you like help with?").fill("I keep my shop stock in a spreadsheet and the totals never match.");
  await page.getByLabel(/When suits you/).fill("Weekday evenings after 6pm");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page).toHaveURL(/\/bookings\/[0-9a-f-]{36}$/);
  const bookingId = page.url().split("/").pop()!;
  await expect(page.getByText("Waiting for Fuseini to reply.")).toBeVisible();
  await expect(page.getByText("Weekday evenings after 6pm")).toBeVisible();

  // One open request per expert: the form points back to it.
  await page.goto(`/experts/${verified.slug}/offers/${verified.sessionId}/request`);
  await expect(page.getByText("You already have a request waiting with Fuseini.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Open your request" })).toHaveAttribute("href", `/bookings/${bookingId}`);

  // Fuseini is told in app, then answers from the inbox.
  expect(await notificationsFor(verified.id)).toEqual([
    expect.objectContaining({ kind: "booking", payload: expect.objectContaining({ event: "requested", booking_id: bookingId, href: `/bookings/${bookingId}` }) }),
  ]);
  await signIn(page, (await emailOf(verified.id))!);
  await page.goto("/bookings?side=received&status=requested");
  await page.getByRole("link", { name: learner.name }).click();
  await expect(page).toHaveURL(new RegExp(`/bookings/${bookingId}$`));
  await page.getByRole("button", { name: "Accept request" }).click();
  await expect(page.getByText("Accepted", { exact: true }).first()).toBeVisible();
  await page.getByLabel("Message Wumpini").fill("Happy to help. Saturday at 10am on a video call?");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Saturday at 10am on a video call?")).toBeVisible();
  await expect(page.getByLabel("Message Wumpini")).toHaveValue("");

  // Wumpini replies, then marks it completed after the session.
  await signIn(page, learner.email);
  await page.goto(`/bookings?status=accepted`);
  await page.getByRole("link", { name: verified.name }).click();
  await expect(page.getByText("Fuseini accepted.")).toBeVisible();
  await expect(page.getByText("Saturday at 10am on a video call?")).toBeVisible();
  await page.getByLabel("Message Fuseini").fill("Saturday works. Thank you.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Saturday works. Thank you.")).toBeVisible();
  await page.getByRole("button", { name: "Mark as completed" }).click();
  await page.getByRole("button", { name: "Yes, it is completed" }).click();
  await expect(page.getByText("Completed", { exact: true }).first()).toBeVisible();

  // The review: a rating is required, then it posts once.
  await page.getByRole("button", { name: "Post review" }).click();
  await expect(page.getByText("Choose a rating from 1 to 5.")).toBeVisible();
  // The radios are visually hidden inside their labels; tap the label like a person would.
  await page.locator("label").filter({ has: page.getByRole("radio", { name: "5 stars" }) }).click();
  await expect(page.getByRole("radio", { name: "5 stars" })).toBeChecked();
  await page.getByLabel(/What should others know/).fill(reviewText);
  await page.getByRole("button", { name: "Post review" }).click();
  await expect(page.getByRole("heading", { name: "Your review" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Post review" })).toHaveCount(0);

  const events = (await notificationsFor(learner.id)).map((n) => n.payload.event);
  expect(events).toEqual(["accepted", "message"]);
  const expertEvents = (await notificationsFor(verified.id)).map((n) => `${n.kind}:${n.payload.event}`);
  expect(expertEvents).toEqual(["booking:requested", "booking:message", "booking:completed", "review:review"]);

  // The review is on Fuseini's public page, for anyone.
  await page.context().clearCookies();
  await page.goto(`/experts/${verified.slug}`);
  await expect(page.getByText(reviewText)).toBeVisible();
  await expect(page.getByText("2 completed sessions").first()).toBeVisible();
});

test("the expert declines with a note and the thread closes", async ({ page }) => {
  const { verified } = seeded!;
  const learner = wumpini!;
  await signIn(page, learner.email);
  await page.goto(`/experts/${verified.slug}/offers/${verified.gigId}/request`);
  await page.getByLabel("What would you like help with?").fill("Please clean my NGO field survey export.");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page).toHaveURL(/\/bookings\/[0-9a-f-]{36}$/);
  const bookingId = page.url().split("/").pop()!;

  await signIn(page, (await emailOf(verified.id))!);
  await page.goto(`/bookings/${bookingId}`);
  await page.getByRole("button", { name: "Decline" }).click();
  await page.getByLabel("A short note for them").fill("I am fully booked this month.");
  await page.getByRole("button", { name: "Yes, decline" }).click();
  await expect(page.getByText("You declined this request.")).toBeVisible();

  await signIn(page, learner.email);
  await page.goto(`/bookings/${bookingId}`);
  await expect(page.getByText("Fuseini declined this request.")).toBeVisible();
  await expect(page.getByText("I am fully booked this month.")).toBeVisible();
  await expect(page.getByText("This thread is closed")).toBeVisible();
  await expect(page.getByRole("button", { name: "Send message" })).toHaveCount(0);

  // Another person cannot open someone else's booking.
  const outsider = await createLearner("Hawa Mahama");
  try {
    await signIn(page, outsider.email);
    await page.goto(`/bookings/${bookingId}`);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
    await expect(page.getByText("Please clean my NGO field survey export.")).toHaveCount(0);
  } finally {
    await admin(`/auth/v1/admin/users/${outsider.id}`, { method: "DELETE" });
  }
});

async function emailOf(id: string) {
  const user = await admin<{ email: string }>(`/auth/v1/admin/users/${id}`);
  return user.email;
}
