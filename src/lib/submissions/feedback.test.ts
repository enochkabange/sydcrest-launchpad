import { describe, expect, it } from "vitest";
import { readAiFeedback, readRubricCriteria, reviewOutputSchema, scoreOutOf100, validateReview, type Rubric } from "./feedback";

const rubric: Rubric = {
  id: "r1",
  title: "Weekly rubric",
  criteria: [
    { id: "understanding", label: "Understanding", description: "Shows the idea", max_points: 4 },
    { id: "application", label: "Application", description: "Uses it", max_points: 4 },
    { id: "communication", label: "Communication", description: "Clear", max_points: 2 },
  ],
};

const good = {
  summary: "Wumpini, your plan for the shea butter seller is clear.",
  criteria: [
    { id: "communication", points: 2, comment: "Easy to follow." },
    { id: "understanding", points: 3, comment: "Good grasp of the audience." },
    { id: "application", points: 2, comment: "Add one real post." },
  ],
};

describe("validateReview", () => {
  it("accepts a complete review, returns rubric order and a score out of 100", () => {
    const result = validateReview(good, rubric);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.feedback.criteria.map((c) => c.id)).toEqual(["understanding", "application", "communication"]);
    expect(result.score).toBe(70);
  });

  it("rejects unknown, missing, duplicated and out of range criteria", () => {
    const bad = {
      summary: "ok",
      criteria: [
        { id: "understanding", points: 5, comment: "too many" },
        { id: "application", points: 1.5, comment: "fraction" },
        { id: "application", points: 1, comment: "twice" },
        { id: "made_up", points: 1, comment: "unknown" },
      ],
    };
    const result = validateReview(bad, rubric);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.join(" ")).toMatch(/understanding points/);
    expect(result.errors.join(" ")).toMatch(/Unknown criterion made_up/);
    expect(result.errors.join(" ")).toMatch(/communication not scored/);
  });

  it("requires a summary and a comment per criterion", () => {
    expect(validateReview({ ...good, summary: "  " }, rubric).ok).toBe(false);
    const noComment = { ...good, criteria: good.criteria.map((c, i) => (i === 0 ? { ...c, comment: "" } : c)) };
    expect(validateReview(noComment, rubric).ok).toBe(false);
    expect(validateReview(null, rubric).ok).toBe(false);
    expect(validateReview([], rubric).ok).toBe(false);
  });

  it("trims long text", () => {
    const long = { ...good, summary: "a ".repeat(2000) };
    const result = validateReview(long, rubric);
    expect(result.ok && result.feedback.summary.length).toBeLessThanOrEqual(1200);
  });
});

describe("scoreOutOf100", () => {
  it("rounds and handles an empty rubric", () => {
    expect(scoreOutOf100({ summary: "", criteria: [{ id: "a", points: 1, comment: "" }] }, { id: "x", title: "", criteria: [{ id: "a", label: "", description: "", max_points: 3 }] })).toBe(33);
    expect(scoreOutOf100({ summary: "", criteria: [] }, { id: "x", title: "", criteria: [] })).toBe(0);
  });
});

describe("reviewOutputSchema", () => {
  it("limits criterion ids to the rubric and forbids extra keys", () => {
    const schema = reviewOutputSchema(rubric) as { additionalProperties: boolean; properties: { criteria: { items: { properties: { id: { enum: string[] } } } } } };
    expect(schema.additionalProperties).toBe(false);
    expect(schema.properties.criteria.items.properties.id.enum).toEqual(["understanding", "application", "communication"]);
  });
});

describe("readers", () => {
  it("reads stored feedback leniently and rejects junk", () => {
    expect(readAiFeedback(good)?.criteria).toHaveLength(3);
    expect(readAiFeedback({ criteria: [] })).toBeNull();
    expect(readAiFeedback("text")).toBeNull();
    expect(readAiFeedback({ summary: "s", criteria: [{ id: 1 }, null, { id: "a", points: 2 }] })?.criteria).toEqual([{ id: "a", points: 2, comment: "" }]);
  });

  it("reads rubric criteria", () => {
    expect(readRubricCriteria([{ id: "a", label: "A", max_points: 2 }, { id: 3 }])).toEqual([{ id: "a", label: "A", description: "", max_points: 2 }]);
    expect(readRubricCriteria(null)).toEqual([]);
  });
});
