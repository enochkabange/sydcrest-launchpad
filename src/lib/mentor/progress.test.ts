import { describe, expect, it } from "vitest";
import {
  cellState,
  dueOn,
  friendlyDbError,
  learnerPath,
  parseCohortForm,
  parseCriteria,
  parseReviewForm,
  rubricForWeek,
  weekNumbers,
  type ProgramWeek,
} from "./progress";

const week = (n: number, specialization: string | null = null, capstone = false): ProgramWeek => ({
  id: `${specialization ?? "shared"}-${n}`,
  week_number: n,
  specialization,
  theme: `Week ${n}`,
  is_capstone: capstone,
});

const weeks = [
  ...[1, 2, 3, 4, 5, 6, 10, 11].map((n) => week(n)),
  week(12, null, true),
  ...[7, 8, 9].flatMap((n) => [week(n, "social"), week(n, "seo"), week(n, "content")]),
];

function form(entries: Record<string, string>) {
  return { get: (name: string) => entries[name] ?? null };
}

describe("learnerPath", () => {
  it("takes the specialization row for forked weeks and shared rows elsewhere", () => {
    const path = learnerPath(weeks, "seo");
    expect(path.map((w) => w.week_number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(path.filter((w) => w.specialization).map((w) => w.id)).toEqual(["seo-7", "seo-8", "seo-9"]);
  });

  it("leaves forked weeks out until a specialization is chosen", () => {
    expect(learnerPath(weeks, null).map((w) => w.week_number)).toEqual([1, 2, 3, 4, 5, 6, 10, 11, 12]);
  });

  it("lists every week number once for the grid", () => {
    expect(weekNumbers(weeks)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});

describe("dueOn and cellState", () => {
  const base = { passScore: 60, startsOn: "2027-01-04", graceDays: 7 };

  it("puts week n seven days times n after the start", () => {
    expect(dueOn("2027-01-04", 1)).toBe("2027-01-11");
    expect(dueOn("2027-01-04", 12)).toBe("2027-03-29");
  });

  it("marks graded work passed or below the mark", () => {
    expect(cellState({ ...base, status: "graded", finalScore: 60, weekNumber: 1, today: "2027-01-20" })).toBe("passed");
    expect(cellState({ ...base, status: "graded", finalScore: 59, weekNumber: 1, today: "2027-01-20" })).toBe("below");
  });

  it("marks sent work waiting and returned work returned", () => {
    expect(cellState({ ...base, status: "ai_reviewed", finalScore: null, weekNumber: 1, today: "2027-01-20" })).toBe("waiting");
    expect(cellState({ ...base, status: "returned", finalScore: null, weekNumber: 1, today: "2027-01-20" })).toBe("returned");
  });

  it("counts missing work as upcoming, then overdue in grace days, then late", () => {
    const missing = { ...base, status: null, finalScore: null, weekNumber: 1 };
    expect(cellState({ ...missing, today: "2027-01-11" })).toBe("upcoming");
    expect(cellState({ ...missing, today: "2027-01-12" })).toBe("overdue");
    expect(cellState({ ...missing, today: "2027-01-18" })).toBe("overdue");
    expect(cellState({ ...missing, today: "2027-01-19" })).toBe("late");
    expect(cellState({ ...missing, status: "draft", today: "2027-01-19" })).toBe("late");
  });
});

describe("rubrics", () => {
  const criteria = [
    { id: "clarity", label: "Clarity", description: "Easy to follow", max_points: 4 },
    { id: "evidence", label: "Evidence", max_points: 6 },
    { id: 3, label: "Broken" },
  ];

  it("keeps only well formed criteria", () => {
    expect(parseCriteria(criteria).map((c) => c.id)).toEqual(["clarity", "evidence"]);
    expect(parseCriteria(null)).toEqual([]);
  });

  it("prefers the week's rubric over the programme default", () => {
    const rubrics = [
      { id: "default", program_week_id: null },
      { id: "capstone", program_week_id: "w12" },
    ];
    expect(rubricForWeek(rubrics, "w12")?.id).toBe("capstone");
    expect(rubricForWeek(rubrics, "w3")?.id).toBe("default");
    expect(rubricForWeek([], "w3")).toBeNull();
  });

  it("reads a complete review with no extra keys", () => {
    const parsed = parseCriteria(criteria);
    const { data, errors } = parseReviewForm(
      form({ score_clarity: "3", score_evidence: "6", score_extra: "9", comment: "  Mariama, your plan is clear.  " }),
      parsed,
    );
    expect(errors).toEqual({});
    expect(data).toEqual({ scores: { clarity: 3, evidence: 6 }, comment: "Mariama, your plan is clear." });
  });

  it("refuses scores out of range, fractions and a missing comment", () => {
    const parsed = parseCriteria(criteria);
    const { errors } = parseReviewForm(form({ score_clarity: "5", score_evidence: "2.5", comment: " " }), parsed);
    expect(Object.keys(errors).sort()).toEqual(["comment", "score_clarity", "score_evidence"]);
  });
});

describe("parseCohortForm", () => {
  it("accepts a valid cohort", () => {
    const { data, errors } = parseCohortForm(
      form({ program_id: "p1", name: " Tamale pilot ", starts_on: "2027-01-04", max_size: "25", status: "enrolling" }),
    );
    expect(errors).toEqual({});
    expect(data).toEqual({ program_id: "p1", name: "Tamale pilot", starts_on: "2027-01-04", max_size: 25, status: "enrolling" });
  });

  it("flags every missing field", () => {
    const { errors } = parseCohortForm(form({ max_size: "0", status: "open" }));
    expect(Object.keys(errors).sort()).toEqual(["max_size", "name", "program_id", "starts_on", "status"]);
  });
});

describe("friendlyDbError", () => {
  it("maps the Phase 2 error codes", () => {
    expect(friendlyDbError({ code: "53400", message: "Cohort is full" }, "x")).toMatch(/full/);
    expect(friendlyDbError({ code: "22023", message: "Defer to a cohort that starts later" }, "x")).toBe(
      "Defer to a cohort that starts later",
    );
    expect(friendlyDbError({ code: "XX000", message: "boom" }, "Try again.")).toBe("Try again.");
    expect(friendlyDbError(null, "Try again.")).toBe("Try again.");
  });
});
