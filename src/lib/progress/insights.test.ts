import { describe, expect, it } from "vitest";
import {
  BAND_MESSAGES,
  activeDaysIn,
  durationLabel,
  finishEstimate,
  nextSteps,
  quizTrend,
  readinessParts,
  studyTimePhrase,
  suggestions,
  topicsPerWeek,
  type ReadinessRow,
  type SuggestionInput,
} from "./insights";

const today = "2026-11-13";

describe("rhythm", () => {
  it("counts distinct days in the last 30, today included", () => {
    expect(activeDaysIn(["2026-11-13", "2026-11-13", "2026-10-15", "2026-10-14"], today)).toBe(2);
    expect(activeDaysIn([], today)).toBe(0);
  });

  it("measures topics per week over the last four weeks", () => {
    const days = ["2026-11-13", "2026-11-12", "2026-11-01", "2026-10-17", "2026-10-16"];
    // 2026-10-17 is the first day of the 28 day window; 10-16 is outside it.
    expect(topicsPerWeek(days, today)).toBe(1);
    expect(topicsPerWeek([], today)).toBe(0);
  });

  it("estimates the time to finish at the current pace", () => {
    expect(finishEstimate(10, 2)).toEqual({ weeks: 5, label: "about 5 weeks" });
    expect(finishEstimate(1, 3)).toEqual({ weeks: 1, label: "about a week" });
    expect(finishEstimate(30, 1)).toEqual({ weeks: 30, label: "about 7 months" });
    expect(finishEstimate(5, 0)).toBeNull();
    expect(finishEstimate(0, 2)).toBeNull();
  });

  it("labels durations in words", () => {
    expect(durationLabel(8)).toBe("about 8 weeks");
    expect(durationLabel(9)).toBe("about 2 months");
    expect(durationLabel(4)).toBe("about 4 weeks");
  });

  it("phrases the usual study time, or nothing when unknown", () => {
    expect(studyTimePhrase("evening")).toBe("in the evening");
    expect(studyTimePhrase(null)).toBeNull();
    expect(studyTimePhrase("teatime")).toBeNull();
  });
});

describe("quiz trend", () => {
  it("says nothing until there are enough scores", () => {
    expect(quizTrend([60, 70, 80])).toBeNull();
  });

  it("compares the latest three with the ones before", () => {
    expect(quizTrend([60, 60, 80, 80, 80])).toEqual({ direction: "up", recent: 80, earlier: 60 });
    expect(quizTrend([90, 70, 70, 70])).toEqual({ direction: "down", recent: 70, earlier: 90 });
    expect(quizTrend([80, 82, 78, 80])).toMatchObject({ direction: "steady" });
  });
});

const row = (over: Partial<ReadinessRow> = {}): ReadinessRow => ({
  roadmap_slug: "data-analyst",
  score: 2,
  band: "getting_started",
  skills_points: 0,
  progress_points: 0,
  portfolio_points: 0,
  activity_points: 1.3,
  profile_points: 0,
  points_available: 100,
  skills_verified: 0,
  skills_total: 4,
  topics_done: 0,
  topics_total: 20,
  portfolio_pieces: 0,
  active_days_30: 1,
  about_complete: false,
  profile_public: false,
  ...over,
});

describe("readiness explained", () => {
  it("lists the parts that count, with points and a plain detail", () => {
    const parts = readinessParts(row({ skills_verified: 1, skills_points: 10 }));
    expect(parts.map((p) => p.key)).toEqual(["skills", "progress", "portfolio", "activity", "profile"]);
    expect(parts[0]).toEqual({ key: "skills", label: "Core skills verified", points: 10, max: 40, detail: "1 of 4 skills verified" });
    expect(parts[3].detail).toBe("1 day of 8 in the last 30");
  });

  it("skips skills and progress when the track has none", () => {
    const parts = readinessParts(row({ skills_total: 0, topics_total: 0, points_available: 35 }));
    expect(parts.map((p) => p.key)).toEqual(["portfolio", "activity", "profile"]);
  });

  it("picks the one or two steps with the biggest gain", () => {
    const steps = nextSteps(row());
    expect(steps.map((s) => s.part)).toEqual(["skills", "progress"]);
    expect(steps[0]).toMatchObject({ gain: 40, href: "/skills" });
    expect(steps[1]).toMatchObject({ gain: 25, href: "/roadmaps/data-analyst", title: "Finish the 20 required topics left in this track." });
  });

  it("scales the gain by the points a track can award", () => {
    // No skills mapped: 75 points available, so 25 missing progress points is 33 score points.
    const steps = nextSteps(row({ skills_total: 0, points_available: 75 }));
    expect(steps[0]).toMatchObject({ part: "progress", gain: 33 });
    expect(steps.some((s) => s.part === "skills")).toBe(false);
  });

  it("names the profile half that is missing", () => {
    const done = { skills_points: 40, progress_points: 25, portfolio_points: 15, activity_points: 10 };
    expect(nextSteps(row({ ...done, profile_points: 0 }))[0]).toMatchObject({ part: "profile", href: "/profile/about" });
    expect(nextSteps(row({ ...done, profile_points: 5, about_complete: true }))[0]).toMatchObject({ part: "profile", href: "/profile" });
    expect(nextSteps(row({ ...done, profile_points: 10, about_complete: true, profile_public: true }))).toEqual([]);
  });

  it("keeps the copy kind: no dashes and no comparing with others", () => {
    const texts = [
      ...Object.values(BAND_MESSAGES),
      ...nextSteps(row(), 5).map((s) => s.title),
      ...readinessParts(row()).map((p) => p.detail),
    ];
    for (const t of texts) {
      expect(t).not.toMatch(/[–—]| - /);
      expect(t).not.toMatch(/other learners|most learners|ahead of|behind|average|rank/i);
    }
  });
});

describe("suggestions", () => {
  const base: SuggestionInput = {
    today,
    usualHourBand: null,
    lastActiveOn: today,
    topicsStarted: 3,
    quizRetries90: 0,
    streakDays: 0,
    activeToday: true,
    weeklyGoal: 2,
    reviewQuestions: 0,
    reviewedToday: false,
    nextTopic: { title: "SQL joins", href: "/learn/data-analyst/sql-joins" },
  };

  it("has nothing to say when all is well", () => {
    expect(suggestions(base)).toEqual([]);
  });

  it("suggests a reminder at the usual study time", () => {
    const [s] = suggestions({ ...base, usualHourBand: "evening" });
    expect(s).toMatchObject({ key: "reminder", href: "/profile#settings" });
    expect(s.text).toBe("You usually study in the evening. A reminder at that time can help you keep your rhythm.");
  });

  it("welcomes back a learner who went quiet, with their next topic", () => {
    const [s] = suggestions({ ...base, lastActiveOn: "2026-11-01" });
    expect(s).toMatchObject({ key: "welcome_back", href: "/learn/data-analyst/sql-joins" });
  });

  it("helps a learner who has not started", () => {
    expect(suggestions({ ...base, topicsStarted: 0, lastActiveOn: null })[0].key).toBe("first_topic");
  });

  it("helps keep a streak, offers a review after retries and a weekly goal; at most three", () => {
    const all = suggestions(
      { ...base, streakDays: 4, activeToday: false, usualHourBand: "morning", quizRetries90: 3, reviewQuestions: 5, weeklyGoal: null },
      10,
    );
    expect(all.map((s) => s.key)).toEqual(["keep_streak", "reminder", "review_after_retries", "weekly_goal"]);
    expect(all[0].text).toContain("your 4 day streak");
    expect(suggestions({ ...base, streakDays: 4, activeToday: false, usualHourBand: "morning", quizRetries90: 3, reviewQuestions: 5, weeklyGoal: null })).toHaveLength(3);
    for (const s of all) expect(s.text).not.toMatch(/[–—]| - /);
  });
});
