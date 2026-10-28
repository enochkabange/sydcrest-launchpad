import { describe, expect, it } from "vitest";
import { accraDay, addDays, daysBetween, weekStart } from "./dates";
import { dailyStreak, goalFor, weeklyProgress } from "./streak";

// Wednesday 28 October 2026; that week runs Monday 26 October to Sunday 1 November.
const WED = "2026-10-28";

describe("dates", () => {
  it("reads the Accra day of an instant", () => {
    expect(accraDay("2026-10-28T23:59:00Z")).toBe("2026-10-28");
    expect(accraDay(new Date("2026-10-29T00:00:00Z"))).toBe("2026-10-29");
  });

  it("starts weeks on Monday", () => {
    expect(weekStart("2026-10-26")).toBe("2026-10-26");
    expect(weekStart(WED)).toBe("2026-10-26");
    expect(weekStart("2026-11-01")).toBe("2026-10-26");
    expect(weekStart("2026-11-02")).toBe("2026-11-02");
  });

  it("adds and counts days across months", () => {
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
    expect(daysBetween("2026-10-26", "2026-11-02")).toBe(7);
  });
});

describe("dailyStreak", () => {
  it("is zero with no activity", () => {
    expect(dailyStreak([], WED)).toEqual({ days: 0, restDaysLeft: 2, activeToday: false });
  });

  it("counts consecutive active days ending today", () => {
    expect(dailyStreak(["2026-10-26", "2026-10-27", WED], WED)).toMatchObject({ days: 3, activeToday: true });
  });

  it("does not break because today is not over", () => {
    expect(dailyStreak(["2026-10-26", "2026-10-27"], WED).days).toBe(2);
  });

  it("allows two rest days in a week without breaking", () => {
    // Active Thu 22, missed Fri 23 and Sat 24, active Sun 25 and today.
    const s = dailyStreak(["2026-10-22", "2026-10-25", WED], WED);
    // Mon 26 and Tue 27 are this week's two rest days; Fri and Sat last week's.
    expect(s.days).toBe(3);
    expect(s.restDaysLeft).toBe(0);
  });

  it("ends on the third missed day in one week", () => {
    // Last week: active Mon 19, missed Tue to Thu, active Fri 23 to Sun 25.
    const s = dailyStreak(["2026-10-19", "2026-10-23", "2026-10-24", "2026-10-25", "2026-10-26", "2026-10-27", WED], WED);
    expect(s.days).toBe(6);
  });

  it("gives every week its own rest days", () => {
    // Missed Sat 24 and Sun 25 (last week), then Mon 26 and Tue 27 (this week).
    const s = dailyStreak(["2026-10-23", WED], WED);
    expect(s.days).toBe(2);
  });

  it("ends when a week runs out of rest days even across the boundary", () => {
    // Missed Fri 23, Sat 24, Sun 25: three in last week.
    expect(dailyStreak(["2026-10-22", "2026-10-26", WED], WED).days).toBe(2);
  });

  it("counts a review day like a quiz day", () => {
    // The caller merges quiz pass days and review days; duplicates count once.
    expect(dailyStreak(["2026-10-27", "2026-10-27", WED], WED).days).toBe(2);
  });

  it("is zero when the last activity is too long ago", () => {
    expect(dailyStreak(["2026-10-10"], WED).days).toBe(0);
  });

  it("reports rest days left this week", () => {
    expect(dailyStreak(["2026-10-26", "2026-10-27"], WED).restDaysLeft).toBe(2);
    expect(dailyStreak(["2026-10-26"], WED).restDaysLeft).toBe(1);
    expect(dailyStreak(["2026-10-25"], "2026-10-26").restDaysLeft).toBe(2);
    expect(dailyStreak(["2026-10-21", "2026-10-26"], WED).restDaysLeft).toBe(1);
  });

  it("does not count days before the first activity as missed", () => {
    // A learner who started today has both rest days, even on a Wednesday.
    expect(dailyStreak([WED], WED)).toEqual({ days: 1, restDaysLeft: 2, activeToday: true });
  });

  it("ignores activity after today", () => {
    expect(dailyStreak([WED, "2026-10-29"], WED).days).toBe(1);
  });
});

describe("goalFor", () => {
  const goals = [
    { weekStart: "2026-10-12", target: 1 },
    { weekStart: "2026-10-26", target: 3 },
  ];

  it("carries the latest earlier goal forward", () => {
    expect(goalFor(goals, "2026-10-19")).toBe(1);
    expect(goalFor(goals, "2026-10-26")).toBe(3);
    expect(goalFor(goals, "2026-11-02")).toBe(3);
  });

  it("is null before the first goal", () => {
    expect(goalFor(goals, "2026-10-05")).toBeNull();
  });
});

describe("weeklyProgress", () => {
  it("has no target before a goal is set", () => {
    expect(weeklyProgress([], ["2026-10-27"], WED)).toEqual({ target: null, done: 1, met: false, weeksInARow: 0 });
  });

  it("counts topics passed this week only", () => {
    const p = weeklyProgress([{ weekStart: "2026-10-26", target: 3 }], ["2026-10-25", "2026-10-26", WED], WED);
    expect(p).toMatchObject({ target: 3, done: 2, met: false, weeksInARow: 0 });
  });

  it("counts this week once the goal is met", () => {
    const p = weeklyProgress([{ weekStart: "2026-10-26", target: 1 }], [WED], WED);
    expect(p).toMatchObject({ met: true, weeksInARow: 1 });
  });

  it("keeps earlier weeks while this week is still in play", () => {
    const goals = [{ weekStart: "2026-10-12", target: 1 }];
    const p = weeklyProgress(goals, ["2026-10-13", "2026-10-21"], WED);
    expect(p).toMatchObject({ target: 1, done: 0, met: false, weeksInARow: 2 });
  });

  it("stops at a week below its goal", () => {
    const goals = [
      { weekStart: "2026-10-12", target: 3 },
      { weekStart: "2026-10-19", target: 1 },
    ];
    // Week of 12 Oct had one topic against a goal of three; week of 19 Oct met its goal of one.
    const p = weeklyProgress(goals, ["2026-10-13", "2026-10-20", WED], WED);
    expect(p).toMatchObject({ met: true, weeksInARow: 2 });
  });
});
