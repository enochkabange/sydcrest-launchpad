import { describe, expect, it } from "vitest";
import {
  parseGoalTarget,
  parseReviewAnswers,
  parseReviewRefs,
  parseReviewResults,
  reviewAnswerField,
} from "./review-data";

const A = "bbbbbbbb-0000-0000-0000-00000000000a";
const B = "bbbbbbbb-0000-0000-0000-00000000000b";

describe("parseGoalTarget", () => {
  it("accepts 1, 3 or 5 only", () => {
    expect(parseGoalTarget("1")).toBe(1);
    expect(parseGoalTarget("5")).toBe(5);
    expect(parseGoalTarget("2")).toBeNull();
    expect(parseGoalTarget(null)).toBeNull();
  });
});

describe("parseReviewRefs", () => {
  it("reads the asked questions", () => {
    const raw = JSON.stringify([
      { nodeId: A, questionId: "q1" },
      { nodeId: B, questionId: "q1" },
    ]);
    expect(parseReviewRefs(raw)).toEqual([
      { nodeId: A, questionId: "q1" },
      { nodeId: B, questionId: "q1" },
    ]);
  });

  it("refuses malformed, empty, oversized or repeated lists", () => {
    expect(parseReviewRefs("not json")).toBeNull();
    expect(parseReviewRefs("[]")).toBeNull();
    expect(parseReviewRefs(JSON.stringify([{ nodeId: "x", questionId: "q1" }]))).toBeNull();
    expect(parseReviewRefs(JSON.stringify(Array.from({ length: 6 }, (_, i) => ({ nodeId: A, questionId: `q${i}` }))))).toBeNull();
    expect(
      parseReviewRefs(
        JSON.stringify([
          { nodeId: A, questionId: "q1" },
          { nodeId: A, questionId: "q1" },
        ]),
      ),
    ).toBeNull();
  });
});

describe("parseReviewAnswers", () => {
  const refs = [
    { nodeId: A, questionId: "q1" },
    { nodeId: B, questionId: "q2" },
  ];

  it("sends choices as numbers", () => {
    const form = new FormData();
    form.set(reviewAnswerField(refs[0]), "2");
    form.set(reviewAnswerField(refs[1]), "0");
    expect(parseReviewAnswers(form, refs)).toEqual([
      { node_id: A, question_id: "q1", choice: 2 },
      { node_id: B, question_id: "q2", choice: 0 },
    ]);
  });

  it("needs every question answered", () => {
    const form = new FormData();
    form.set(reviewAnswerField(refs[0]), "2");
    expect(parseReviewAnswers(form, refs)).toBeNull();
  });
});

describe("parseReviewResults", () => {
  it("keys results by topic and question", () => {
    expect(
      parseReviewResults([
        { node_id: A, question_id: "q1", correct: true },
        { node_id: B, question_id: "q2", correct: false },
        { node_id: B, question_id: "q3" },
      ]),
    ).toEqual({ [`${A}:q1`]: true, [`${B}:q2`]: false });
  });
});
