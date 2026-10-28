import { describe, expect, it } from "vitest";
import { reminderPayload, reminderWindow, runEventReminders, type ReminderStore } from "./reminders";

const now = new Date("2026-12-03T08:00:00Z");
const skillshop = { id: "e1", slug: "tamale-skillshop", title: "Tamale Skillshop", starts_at: "2026-12-04T10:00:00Z", format: "in_person" };
const webinar = { id: "e2", slug: "blueprint-data", title: "How to become a data analyst", starts_at: "2026-12-04T18:00:00Z", format: "online" };

function fakeStore(): ReminderStore & { notified: string[]; window?: { from: Date; to: Date } } {
  const store = {
    notified: [] as string[],
    window: undefined as { from: Date; to: Date } | undefined,
    async eventsStartingBetween(from: Date, to: Date) {
      store.window = { from, to };
      return [skillshop, webinar];
    },
    async goingAttendees(eventId: string) {
      return eventId === "e1"
        ? [
            { profileId: "wumpini", displayName: "Wumpini Abukari" },
            { profileId: "hawa", displayName: "Hawa Iddrisu" },
          ]
        : [{ profileId: "fuseini", displayName: "Fuseini Alhassan" }];
    },
    async whatsappNumbers() {
      return new Map([["wumpini", "+233241234567"]]);
    },
    async notify(profileId: string) {
      if (profileId === "hawa") throw new Error("down");
      store.notified.push(profileId);
    },
  };
  return store;
}

describe("reminderWindow", () => {
  it("covers events starting 24 to 48 hours from the run", () => {
    expect(reminderWindow(now)).toEqual({ from: new Date("2026-12-04T08:00:00Z"), to: new Date("2026-12-05T08:00:00Z") });
  });
});

describe("reminderPayload", () => {
  it("points at the event page and mentions the joining link only for online events", () => {
    expect(reminderPayload(skillshop, "on Fri 4 Dec 2026 at 10:00 GMT")).toEqual({
      title: "Reminder: Tamale Skillshop",
      body: "Starts on Fri 4 Dec 2026 at 10:00 GMT.",
      href: "/events/tamale-skillshop",
      event_id: "e1",
      event_slug: "tamale-skillshop",
    });
    expect(reminderPayload(webinar, "soon").body).toContain("joining link");
  });
});

describe("runEventReminders", () => {
  it("notifies everyone going and messages only people with WhatsApp consent", async () => {
    const store = fakeStore();
    const sent: string[] = [];
    const summary = await runEventReminders({
      store,
      now,
      formatWhen: () => "tomorrow",
      sendWhatsApp: async (phone, attendee) => {
        sent.push(`${attendee.profileId}:${phone}`);
        return { status: "skipped", reason: "not_configured" };
      },
    });
    expect(store.window?.from).toEqual(new Date("2026-12-04T08:00:00Z"));
    expect(store.notified).toEqual(["wumpini", "fuseini"]);
    expect(sent).toEqual(["wumpini:+233241234567"]);
    expect(summary).toEqual({ events: 2, notified: 2, whatsapp: 0, skipped: 1, failed: 1 });
  });
});
