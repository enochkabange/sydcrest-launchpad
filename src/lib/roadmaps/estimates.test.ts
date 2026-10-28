import { describe, expect, it } from "vitest";
import { estimateMinutes, formatMinutes, sumEstimates, timeBand, timeLeftCopy, weeksLeft } from "./estimates";

const lesson = (lessonWords: number, practiceWords = 0, quizQuestions = 0) => ({ hasLesson: true, lessonWords, practiceWords, quizQuestions });

describe("estimateMinutes", () => {
  it("is null without a lesson, never a guess", () => {
    expect(estimateMinutes(null)).toBeNull();
    expect(estimateMinutes({ hasLesson: false, lessonWords: 900, practiceWords: 100, quizQuestions: 5 })).toBeNull();
  });

  it("reads at 180 words a minute, rounded up to the next 5 minutes", () => {
    expect(estimateMinutes(lesson(900))).toBe(5); // 5.0
    expect(estimateMinutes(lesson(901))).toBe(10); // just over 5
    expect(estimateMinutes(lesson(1800))).toBe(10);
  });

  it("adds 15 minutes plus reading time for a practice task, and a minute a quiz question", () => {
    // 900 words = 5, practice 15 + 180/180 = 16, quiz 5: 26 → 30
    expect(estimateMinutes(lesson(900, 180, 5))).toBe(30);
    // no practice task: no practice minutes
    expect(estimateMinutes(lesson(900, 0, 4))).toBe(10);
  });

  it("is at least 5 minutes", () => {
    expect(estimateMinutes(lesson(0))).toBe(5);
  });
});

describe("totals and copy", () => {
  it("sums known estimates and counts the missing ones", () => {
    expect(sumEstimates([10, null, 25, null])).toEqual({ minutes: 35, missing: 2 });
  });

  it("formats as about minutes or hours", () => {
    expect(formatMinutes(25)).toBe("about 25 min");
    expect(formatMinutes(60)).toBe("about 1 hour");
    expect(formatMinutes(89)).toBe("about 1 hour");
    expect(formatMinutes(90)).toBe("about 2 hours");
    expect(formatMinutes(14 * 60)).toBe("about 14 hours");
  });

  it("works out weeks left at a weekly pace", () => {
    expect(weeksLeft(0, 300)).toBe(0);
    expect(weeksLeft(30, 300)).toBe(1);
    expect(weeksLeft(301, 300)).toBe(2);
    expect(timeLeftCopy(14 * 60, { minutes: 300, label: "about 5 hours a week" })).toBe(
      "About 14 hours left, roughly 3 weeks at about 5 hours a week.",
    );
    expect(timeLeftCopy(45, null)).toBe("About 45 min left.");
    expect(timeLeftCopy(0, null)).toBeNull();
  });

  it("puts roadmaps in time bands", () => {
    expect(timeBand(0)).toBeNull();
    expect(timeBand(9 * 60)).toBe("short");
    expect(timeBand(10 * 60)).toBe("medium");
    expect(timeBand(12 * 60)).toBe("long");
  });
});
