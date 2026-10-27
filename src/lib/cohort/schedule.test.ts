import { describe, expect, it } from "vitest";
import {
  addDays,
  cohortTiming,
  dueDate,
  focusWeek,
  formatDay,
  lateAfter,
  parseSpecializations,
  pathFor,
  pathProgress,
  pickMembership,
  specializationLocked,
  todayInGhana,
  weekState,
} from "./schedule";

const START = "2026-11-02"; // a Monday

describe("dates", () => {
  it("adds days across a month and a year", () => {
    expect(addDays("2026-12-28", 7)).toBe("2027-01-04");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("puts week n due on starts_on + 7n, late after the grace days", () => {
    expect(dueDate(START, 1)).toBe("2026-11-09");
    expect(dueDate(START, 12)).toBe("2027-01-25");
    expect(lateAfter(START, 1, 7)).toBe("2026-11-16");
  });

  it("formats a day without dashes", () => {
    expect(formatDay("2026-11-09")).toBe("Mon, 9 Nov 2026");
    expect(formatDay("2026-11-09")).not.toMatch(/[-–—]/);
  });

  it("reads today in Ghana time (GMT)", () => {
    expect(todayInGhana(new Date("2026-11-02T23:30:00Z"))).toBe("2026-11-02");
  });
});

describe("cohortTiming", () => {
  it("is upcoming before the start", () => {
    expect(cohortTiming(START, 12, "2026-10-27")).toEqual({ phase: "upcoming", daysToStart: 6 });
  });
  it("counts weeks from day one", () => {
    expect(cohortTiming(START, 12, START)).toEqual({ phase: "running", week: 1 });
    expect(cohortTiming(START, 12, "2026-11-08")).toEqual({ phase: "running", week: 1 });
    expect(cohortTiming(START, 12, "2026-11-09")).toEqual({ phase: "running", week: 2 });
    expect(cohortTiming(START, 12, "2027-01-24")).toEqual({ phase: "running", week: 12 });
  });
  it("is finished after the last week", () => {
    expect(cohortTiming(START, 12, "2027-01-25")).toEqual({ phase: "finished" });
  });
  it("focuses week 1 before, the current week during and the last week after", () => {
    expect(focusWeek({ phase: "upcoming", daysToStart: 3 }, 12)).toBe(1);
    expect(focusWeek({ phase: "running", week: 5 }, 12)).toBe(5);
    expect(focusWeek({ phase: "finished" }, 12)).toBe(12);
  });
});

describe("pathFor", () => {
  const weeks = [
    { id: "w6", week_number: 6, specialization: null },
    { id: "w7-seo", week_number: 7, specialization: "seo" },
    { id: "w7-ads", week_number: 7, specialization: "google_ads" },
    { id: "w8", week_number: 8, specialization: null },
    { id: "w8-seo", week_number: 8, specialization: "seo" },
  ];

  it("takes the specialization row over the shared one", () => {
    const path = pathFor(weeks, "seo", 8);
    expect(path[6]).toMatchObject({ week_number: 7, forks: true, week: { id: "w7-seo" } });
    expect(path[7].week?.id).toBe("w8-seo");
    expect(path[5].week?.id).toBe("w6");
  });

  it("falls back to the shared row and leaves a fork with no shared row empty", () => {
    const path = pathFor(weeks, null, 8);
    expect(path[6]).toMatchObject({ week: null, forks: true });
    expect(path[7].week?.id).toBe("w8");
    expect(path[0]).toMatchObject({ week: null, forks: false });
  });
});

describe("weekState", () => {
  const base = { week: 2, hasWeek: true, submission: undefined, startsOn: START, graceDays: 7, passScore: 60 };

  it("follows the calendar when nothing is sent", () => {
    expect(weekState({ ...base, today: "2026-11-08" })).toBe("upcoming");
    expect(weekState({ ...base, today: "2026-11-09" })).toBe("current");
    expect(weekState({ ...base, today: "2026-11-16" })).toBe("due");
    expect(weekState({ ...base, today: "2026-11-17" })).toBe("grace");
    expect(weekState({ ...base, today: "2026-11-23" })).toBe("grace");
    expect(weekState({ ...base, today: "2026-11-24" })).toBe("late");
  });

  it("puts the work's state first", () => {
    const s = (status: string, final_score: number | null = null) => ({
      program_week_id: "x",
      status,
      final_score,
      submitted_at: null,
    });
    const today = "2026-12-30";
    expect(weekState({ ...base, today, submission: s("graded", 75) })).toBe("passed");
    expect(weekState({ ...base, today, submission: s("graded", 40) })).toBe("graded");
    expect(weekState({ ...base, today, submission: s("returned") })).toBe("returned");
    expect(weekState({ ...base, today, submission: s("ai_reviewed") })).toBe("sent");
    expect(weekState({ ...base, today: "2026-11-10", submission: s("draft") })).toBe("draft");
    expect(weekState({ ...base, today, submission: s("draft") })).toBe("late");
  });

  it("asks for a specialization when the path has no week", () => {
    expect(weekState({ ...base, hasWeek: false, today: "2026-11-10" })).toBe("choose");
  });
});

describe("specializationLocked", () => {
  const weeks = [
    { id: "w1", week_number: 1, specialization: null },
    { id: "w7-seo", week_number: 7, specialization: "seo" },
  ];
  const sub = (program_week_id: string, status: string) => ({ program_week_id, status, final_score: null, submitted_at: null });

  it("locks once work for a specialization week is sent", () => {
    expect(specializationLocked(weeks, [sub("w1", "graded")])).toBe(false);
    expect(specializationLocked(weeks, [sub("w7-seo", "draft")])).toBe(false);
    expect(specializationLocked(weeks, [sub("w7-seo", "submitted")])).toBe(true);
  });
});

describe("parseSpecializations", () => {
  it("keeps well formed entries only", () => {
    expect(parseSpecializations([{ slug: "seo", label: "SEO" }, { slug: 1 }, null, "x"])).toEqual([
      { slug: "seo", label: "SEO" },
    ]);
    expect(parseSpecializations({})).toEqual([]);
  });
});

describe("pickMembership", () => {
  const row = (over: Partial<{ role: string; status: string; deferred_at: string | null; created_at: string; starts_on: string; id: string }>) => ({
    id: "x",
    role: "learner",
    status: "active",
    deferred_at: null,
    created_at: "2026-10-01T00:00:00Z",
    starts_on: "2026-11-02",
    ...over,
  });

  it("prefers the active learner membership over a deferred one", () => {
    const picked = pickMembership([
      row({ id: "old", status: "deferred", deferred_at: "2026-11-20T00:00:00Z" }),
      row({ id: "new", starts_on: "2027-02-01" }),
    ]);
    expect(picked?.id).toBe("new");
  });

  it("shows the latest deferral when nothing is active", () => {
    expect(
      pickMembership([
        row({ id: "a", status: "deferred", deferred_at: "2026-11-01T00:00:00Z" }),
        row({ id: "b", status: "deferred", deferred_at: "2026-12-01T00:00:00Z" }),
      ])?.id,
    ).toBe("b");
  });

  it("ignores staff rows", () => {
    expect(pickMembership([row({ role: "mentor" })])).toBeNull();
  });
});

describe("pathProgress", () => {
  it("counts lessons, sent work and passes along the path", () => {
    const path = [
      { week: { id: "w1", lessons: [{ done: true }, { done: false }] } },
      { week: { id: "w2", lessons: [{ done: true }] } },
      { week: null },
    ];
    const subs = new Map([
      ["w1", { program_week_id: "w1", status: "graded", final_score: 80, submitted_at: "2026-11-05" }],
      ["w2", { program_week_id: "w2", status: "draft", final_score: null, submitted_at: null }],
    ]);
    expect(pathProgress(path, subs, 60)).toEqual({ lessonsDone: 2, lessonsTotal: 3, sent: 1, passed: 1, weeksTotal: 3 });
  });
});
