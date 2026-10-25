import { describe, expect, it } from "vitest";
import { answerField, parseAnswers, parseQuestions, parseResults } from "./quiz-data";

const QUESTIONS = [
  { id: "q1", prompt: "Which function adds a column?", options: ["SUM", "COUNT", "MAX"] },
  { id: "q2", prompt: "What is a row?", options: ["Across", "Down"] },
];

function form(entries: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.set(k, v);
  return f;
}

describe("parseQuestions", () => {
  it("keeps well formed questions", () => {
    expect(parseQuestions(QUESTIONS)).toEqual(QUESTIONS);
  });

  it("drops malformed entries and non arrays", () => {
    expect(parseQuestions({ q1: 1 })).toEqual([]);
    expect(parseQuestions(null)).toEqual([]);
    expect(
      parseQuestions([
        { id: "q1", prompt: "One option", options: ["only"] },
        { id: 2, prompt: "Bad id", options: ["a", "b"] },
        { id: "q3", prompt: "Bad options", options: ["a", 2] },
        QUESTIONS[1],
      ]),
    ).toEqual([QUESTIONS[1]]);
  });
});

describe("parseAnswers", () => {
  it("sends options as numbers, since the grader compares JSON values", () => {
    const answers = parseAnswers(form({ [answerField("q1")]: "2", [answerField("q2")]: "0" }), QUESTIONS);
    expect(answers).toEqual({ q1: 2, q2: 0 });
    expect(typeof answers?.q1).toBe("number");
  });

  it("needs every question answered", () => {
    expect(parseAnswers(form({ [answerField("q1")]: "1" }), QUESTIONS)).toBeNull();
  });

  it("refuses options that do not exist", () => {
    expect(parseAnswers(form({ [answerField("q1")]: "3", [answerField("q2")]: "0" }), QUESTIONS)).toBeNull();
    expect(parseAnswers(form({ [answerField("q1")]: "-1", [answerField("q2")]: "0" }), QUESTIONS)).toBeNull();
    expect(parseAnswers(form({ [answerField("q1")]: "1.5", [answerField("q2")]: "0" }), QUESTIONS)).toBeNull();
  });

  it("ignores extra fields", () => {
    expect(
      parseAnswers(form({ [answerField("q1")]: "0", [answerField("q2")]: "1", [answerField("q9")]: "0" }), QUESTIONS),
    ).toEqual({ q1: 0, q2: 1 });
  });
});

describe("parseResults", () => {
  it("keeps boolean results only", () => {
    expect(parseResults({ q1: true, q2: false, q3: "yes" })).toEqual({ q1: true, q2: false });
    expect(parseResults([true])).toEqual({});
    expect(parseResults(null)).toEqual({});
  });
});
