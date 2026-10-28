import { describe, expect, it } from "vitest";
import {
  checkInOpen,
  checkInOpensAt,
  eventPhase,
  feedbackOpen,
  formatDuration,
  formatEventDay,
  formatEventTimes,
  fromDateTimeInput,
  rsvpOpen,
  toDateTimeInput,
} from "./time";

const skillshop = { status: "published", starts_at: "2026-12-05T10:00:00Z", ends_at: "2026-12-05T15:00:00Z" };
const at = (iso: string) => new Date(iso);

describe("eventPhase", () => {
  it("follows the clock for published events", () => {
    expect(eventPhase(skillshop, at("2026-12-04T10:00:00Z"))).toBe("upcoming");
    expect(eventPhase(skillshop, at("2026-12-05T12:00:00Z"))).toBe("live");
    expect(eventPhase(skillshop, at("2026-12-05T15:00:00Z"))).toBe("past");
  });

  it("keeps cancelled, draft and completed events in their state", () => {
    expect(eventPhase({ ...skillshop, status: "cancelled" }, at("2026-12-01T00:00:00Z"))).toBe("cancelled");
    expect(eventPhase({ ...skillshop, status: "draft" }, at("2026-12-01T00:00:00Z"))).toBe("draft");
    expect(eventPhase({ ...skillshop, status: "completed" }, at("2026-12-01T00:00:00Z"))).toBe("past");
  });
});

describe("rsvpOpen", () => {
  it("is open for published events until they end", () => {
    expect(rsvpOpen(skillshop, at("2026-12-05T14:59:00Z"))).toBe(true);
    expect(rsvpOpen(skillshop, at("2026-12-05T15:00:00Z"))).toBe(false);
    expect(rsvpOpen({ ...skillshop, status: "cancelled" }, at("2026-12-01T00:00:00Z"))).toBe(false);
  });
});

describe("checkInOpen", () => {
  it("opens two hours before the start and closes two hours after the end, like check_in_event", () => {
    expect(checkInOpen(skillshop, at("2026-12-05T07:59:00Z"))).toBe(false);
    expect(checkInOpen(skillshop, at("2026-12-05T08:00:00Z"))).toBe(true);
    expect(checkInOpen(skillshop, at("2026-12-05T17:00:00Z"))).toBe(true);
    expect(checkInOpen(skillshop, at("2026-12-05T17:01:00Z"))).toBe(false);
    expect(checkInOpensAt(skillshop)).toBe("2026-12-05T08:00:00.000Z");
  });

  it("is closed for events that are not published", () => {
    expect(checkInOpen({ ...skillshop, status: "completed" }, at("2026-12-05T12:00:00Z"))).toBe(false);
  });
});

describe("feedbackOpen", () => {
  it("opens at the start, like the event_feedback insert policy", () => {
    expect(feedbackOpen(skillshop, at("2026-12-05T09:59:00Z"))).toBe(false);
    expect(feedbackOpen(skillshop, at("2026-12-05T10:00:00Z"))).toBe(true);
    expect(feedbackOpen({ ...skillshop, status: "completed" }, at("2027-01-01T00:00:00Z"))).toBe(true);
  });
});

describe("formatting", () => {
  it("shows Ghana time with words between times, never a dash", () => {
    expect(formatEventDay(skillshop.starts_at)).toBe("Saturday 5 December 2026");
    expect(formatEventTimes(skillshop.starts_at, skillshop.ends_at)).toBe("10:00 to 15:00 GMT");
    const twoDays = formatEventTimes("2026-12-05T10:00:00Z", "2026-12-06T16:00:00Z");
    expect(twoDays).toBe("Sat 5 Dec 2026 10:00 to Sun 6 Dec 2026 16:00 GMT");
    expect(twoDays).not.toMatch(/[-–—]/);
  });

  it("formats durations in words", () => {
    expect(formatDuration(95)).toBe("1 hour 35 minutes");
    expect(formatDuration(60)).toBe("1 hour");
    expect(formatDuration(null)).toBeNull();
  });
});

describe("datetime-local inputs", () => {
  it("round trips Accra time (UTC)", () => {
    expect(toDateTimeInput("2026-12-05T10:00:00Z")).toBe("2026-12-05T10:00");
    expect(fromDateTimeInput("2026-12-05T10:00")).toBe("2026-12-05T10:00:00.000Z");
    expect(toDateTimeInput(null)).toBe("");
  });

  it("rejects anything that is not a datetime-local value", () => {
    expect(fromDateTimeInput("")).toBeNull();
    expect(fromDateTimeInput("5 December")).toBeNull();
    expect(fromDateTimeInput("2026-13-45T10:00")).toBeNull();
  });
});
