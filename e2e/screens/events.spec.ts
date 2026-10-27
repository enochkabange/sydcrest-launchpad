import { expect, test, type Page } from "@playwright/test";
import { deleteEvents, seedEvents, type SeededEvents } from "../events-seed";
import { createLearner, PASSWORD, promoteToAdmin, type Learner } from "../learners";
import { screensSetup, shoot } from "./shoot";

let seeded: SeededEvents | undefined;

test.afterEach(async () => {
  if (seeded) await deleteEvents(seeded);
  seeded = undefined;
});

async function signIn(page: Page, learner: Learner) {
  await page.context().clearCookies();
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 15_000 });
}

test("event screens at 390, 1440 and 1920", async ({ page }, testInfo) => {
  screensSetup(testInfo, 360_000);
  seeded = await seedEvents();
  const live = `/events/${seeded.live.slug}`;

  // An attendee: RSVP, check in and feedback on the event that is on now.
  const wumpini = await createLearner("Wumpini Abukari");
  await signIn(page, wumpini);
  await page.goto(live);
  await page.getByRole("button", { name: "RSVP" }).click();
  await expect(page.getByRole("link", { name: "Join online" })).toBeVisible();
  await shoot(page, testInfo, "event-going", live);
  await shoot(page, testInfo, "event-check-in", `${live}/check-in`);
  await page.getByLabel("Check in code").fill(seeded.live.code);
  await page.getByRole("button", { name: "Check in" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "You are checked in" })).toBeVisible();
  await shoot(page, testInfo, "event-feedback", `${live}/feedback`);
  await page.getByRole("group", { name: /more confident/ }).getByText("4", { exact: true }).click();
  await page.getByLabel(/Anything else/).fill("Clear examples. Please start on time next time.");
  await page.getByRole("button", { name: "Send feedback" }).click();
  await expect(page.getByText("Your feedback is saved.")).toBeVisible();

  // An admin: saving an event refreshes the cached public lists.
  const hawa = await createLearner("Hawa Iddrisu");
  await promoteToAdmin(hawa.id);
  await signIn(page, hawa);
  await page.goto(`/admin/events/${seeded.skillshop.id}`);
  await page.getByRole("button", { name: "Save event" }).click();
  await expect(page.getByText("Saved.")).toBeVisible();
  await shoot(page, testInfo, "admin-events", "/admin/events");
  await shoot(page, testInfo, "admin-event", `/admin/events/${seeded.skillshop.id}`);
  await shoot(page, testInfo, "event-host", `${live}/host`);

  // Visitors.
  await page.context().clearCookies();
  await shoot(page, testInfo, "events", "/events");
  await shoot(page, testInfo, "event", `/events/${seeded.skillshop.slug}`);
  await shoot(page, testInfo, "event-past", `/events/${seeded.past.slug}`);
  await shoot(page, testInfo, "events-recordings", "/events/recordings");
});
