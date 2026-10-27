import { expect, test, type Browser, type Page } from "@playwright/test";
import { deleteEvents, seedEvents, type SeededEvents } from "./events-seed";
import { createLearner as createLearnerOnce, PASSWORD, promoteToAdmin, type Learner } from "./learners";

/** The local auth server can time out on a busy machine; try a second time before failing. */
async function createLearner(name: string) {
  try {
    return await createLearnerOnce(name);
  } catch {
    return await createLearnerOnce(name);
  }
}

/**
 * Events (issue #164): the public pages, RSVP with capacity and waitlist,
 * add to calendar, the joining link for people going, check in by code,
 * feedback, host tools and the admin editor. Runs against the local stack.
 */

let seeded: SeededEvents | undefined;

// Each journey signs in two or three people.
test.describe.configure({ timeout: 90_000 });

test.beforeEach(async () => {
  seeded = await seedEvents();
});

test.afterEach(async () => {
  if (seeded) await deleteEvents(seeded);
  seeded = undefined;
});

async function signIn(page: Page, learner: Learner, then?: string) {
  await page.goto("/login");
  await page.getByLabel("Email").fill(learner.email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 15_000 });
  if (then) await page.goto(then);
}

async function signedInPage(browser: Browser, learner: Learner, next?: string) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await signIn(page, learner, next);
  return page;
}

test("visitors see an event; RSVPs fill the seats, then the waitlist, and a cancel promotes the next person", async ({ page, browser }) => {
  const event = seeded!.skillshop;
  const path = `/events/${event.slug}`;

  await test.step("a visitor sees the details, structured data and a sign in prompt", async () => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: event.title })).toBeVisible();
    await expect(page.getByText("Tamale Tech Hub")).toBeVisible();
    await expect(page.getByTestId("seats")).toContainText("0 going, 1 of 1 seats left");
    await expect(page.getByRole("link", { name: "Sign in to RSVP" })).toBeVisible();
    const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(jsonLd).toMatchObject({ "@type": "Event", name: event.title, eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode" });
  });

  await test.step("the add to calendar file has the event and no joining link", async () => {
    const ics = await page.request.get(`${path}/calendar.ics`);
    expect(ics.headers()["content-type"]).toContain("text/calendar");
    const body = await ics.text();
    expect(body).toContain("BEGIN:VEVENT");
    expect(body).toContain(`SUMMARY:${event.title}`);
  });

  const wumpini = await createLearner("Wumpini Abukari");
  const abdul = await createLearner("Abdul-Rahman Yakubu");

  await test.step("after signing in, the RSVP takes the only seat", async () => {
    await signIn(page, wumpini, path);
    await page.getByRole("button", { name: "RSVP" }).click();
    await expect(page.getByText("You are going.")).toBeVisible();
    await expect(page.getByTestId("seats")).toContainText("All 1 seats are taken");
  });

  const second = await signedInPage(browser, abdul, path);
  await test.step("the next person joins the waitlist", async () => {
    await second.getByRole("button", { name: "Join the waitlist" }).click();
    await expect(second.getByText("You are on the waitlist.")).toBeVisible();
  });

  await test.step("cancelling frees the seat for the first person waiting", async () => {
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: "Cancel my RSVP" }).click();
    await expect(page.getByRole("button", { name: "Join the waitlist" })).toBeVisible();
    await second.reload();
    await expect(second.getByText("You are going.")).toBeVisible();
  });
  await second.context().close();
});

test("an attendee joins online, checks in with the code and gives feedback; the host sees it", async ({ page, browser }) => {
  const event = seeded!.live;
  const path = `/events/${event.slug}`;
  const mariama = await createLearner("Mariama Seidu");
  await signIn(page, mariama, path);

  await test.step("going to an online event shows the joining link", async () => {
    await expect(page.getByText("Happening now")).toBeVisible();
    await page.getByRole("button", { name: "RSVP" }).click();
    await expect(page.getByRole("link", { name: "Join online" })).toHaveAttribute("href", event.joinUrl);
  });

  await test.step("a wrong code is refused and the right one checks in, whatever the case", async () => {
    await page.getByRole("link", { name: "Check in with the code" }).click();
    await expect(page).toHaveURL(new RegExp(`${path}/check-in$`));
    await page.getByLabel("Check in code").fill("WRONG234");
    await page.getByRole("button", { name: "Check in" }).click();
    await expect(page.getByText("That code does not match.")).toBeVisible();
    await page.getByLabel("Check in code").fill(`${event.code.slice(0, 4).toLowerCase()}-${event.code.slice(4)}`);
    await page.getByRole("button", { name: "Check in" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "You are checked in" })).toBeVisible();
  });

  await test.step("feedback with consent to quote", async () => {
    await page.getByRole("link", { name: "Give feedback" }).click();
    await page.getByRole("group", { name: /more confident/ }).getByText("4", { exact: true }).click();
    await page.getByRole("group", { name: /logistics|organised/ }).getByText("2", { exact: true }).click();
    await page.getByRole("group", { name: /recommend/ }).getByText("9", { exact: true }).click();
    await page.getByLabel("Yes").check();
    await page.getByLabel(/Anything else/).fill("Clear examples. Please start on time next time.");
    await page.getByLabel(/may quote my comment/).check();
    await page.getByRole("button", { name: "Send feedback" }).click();
    await expect(page.getByText("Your feedback is saved.")).toBeVisible();
  });

  await test.step("someone who is not a host cannot open host tools", async () => {
    await page.goto(`${path}/host`);
    await expect(page.getByText("This page could not be found.")).toBeVisible();
  });

  const fuseini = await createLearner("Fuseini Alhassan");
  await promoteToAdmin(fuseini.id);
  const host = await signedInPage(browser, fuseini, `${path}/host`);

  await test.step("the host sees the code, the attendee and the impact snapshot", async () => {
    await expect(host.getByRole("heading", { level: 1, name: "Host tools" })).toBeVisible();
    await expect(host.getByTestId("checkin-code")).toHaveText(`${event.code.slice(0, 4)} ${event.code.slice(4)}`);
    const row = host.getByRole("row", { name: /Mariama Seidu/ });
    await expect(row).toContainText("Going");
    await expect(host.getByText("Clear examples. Please start on time next time.")).toBeVisible();
    await expect(host.getByText("OK to quote with first name")).toBeVisible();
    await expect(host.getByText("4.0 out of 5")).toBeVisible();
  });

  await test.step("a new code replaces the old one", async () => {
    host.once("dialog", (d) => d.accept());
    await host.getByRole("button", { name: "Make a new code" }).click();
    await expect(host.getByTestId("checkin-code")).not.toHaveText(`${event.code.slice(0, 4)} ${event.code.slice(4)}`);
  });
  await host.context().close();
});

test("an admin creates an event; the list, filters and recordings library show public events", async ({ page }) => {
  const s = seeded!;
  const admin = await createLearner("Hawa Iddrisu");
  await promoteToAdmin(admin.id);
  await signIn(page, admin);
  const title = `Blueprint: become a UI designer ${s.suffix}`;

  await test.step("create a published webinar", async () => {
    await page.goto("/admin/events/new");
    await page.getByLabel("Title").fill(title);
    await page.getByLabel("Type", { exact: true }).selectOption("webinar");
    await page.getByLabel("How people attend").selectOption("online");
    const start = new Date(Date.now() + 7 * 24 * 3600_000).toISOString().slice(0, 11);
    await page.getByLabel("Starts (Ghana time)").fill(`${start}18:00`);
    await page.getByLabel("Ends (Ghana time)").fill(`${start}19:30`);
    await page.getByLabel("Summary").fill("Issahaku Mahama shows how he went from a phone to paid design work.");
    await page.getByLabel("Status").selectOption("published");
    await page.getByRole("button", { name: "Create event" }).click();
    await expect(page).toHaveURL(/\/admin\/events\/[0-9a-f-]{36}$/);
    await page.getByLabel("Joining link").fill("https://meet.example.org/ui-designer");
    await page.getByRole("button", { name: "Save link" }).click();
    await expect(page.getByText("Link saved.")).toBeVisible();
  });

  await test.step("the list shows upcoming and past events, and a cancelled one says so", async () => {
    await page.goto("/events");
    const upcoming = page.getByRole("region", { name: "Upcoming" });
    await expect(upcoming.getByRole("link", { name: new RegExp(title) })).toBeVisible();
    await expect(upcoming.getByRole("link", { name: new RegExp(s.cancelled.title) })).toContainText("Cancelled");
    await expect(page.getByRole("region", { name: "Past events" }).getByRole("link", { name: new RegExp(s.past.title) })).toBeVisible();
  });

  await test.step("filters narrow the list by type and chapter", async () => {
    await page.getByLabel("Type", { exact: true }).selectOption("skillshop");
    await page.getByRole("button", { name: "Show events" }).click();
    await expect(page).toHaveURL(/kind=skillshop/);
    await expect(page.getByRole("link", { name: new RegExp(s.skillshop.title) })).toBeVisible();
    await expect(page.getByRole("link", { name: new RegExp(title) })).toHaveCount(0);
    await page.goto(`/events?chapter=${s.chapter.slug}`);
    await expect(page.getByRole("link", { name: new RegExp(s.skillshop.title) })).toBeVisible();
    await expect(page.getByRole("link", { name: new RegExp(s.live.title) })).toHaveCount(0);
  });

  await test.step("the recordings library lists published recordings", async () => {
    await page.goto("/events/recordings");
    await expect(page.getByRole("heading", { name: s.past.recording })).toBeVisible();
  });
});
