import { describe, expect, it } from "vitest";
import { mapLimit, sameContent } from "./content-import";
import { toQuizRows, type GeneratedContent } from "@/lib/content-generation/schema";

const content: GeneratedContent = {
  explanation_md: "Explanation",
  practice_task_md: "Task",
  quiz: {
    pass_threshold: 75,
    questions: [{ prompt: "Q1", options: ["a", "b", "c", "d"], answer_index: 2, explanation: "Because c" }],
  },
};
const rows = toQuizRows(content.quiz);
const stored = { explanation_md: "Explanation", practice_task_md: "Task" };
const storedQuiz = { questions: rows.questions, pass_threshold: 75 };

describe("sameContent", () => {
  it("treats identical content, quiz and key as unchanged", () => {
    expect(sameContent(stored, storedQuiz, rows.answerKey, content)).toBe(true);
  });

  it("detects a missing row, edited text, a moved answer or a new threshold", () => {
    expect(sameContent(null, storedQuiz, rows.answerKey, content)).toBe(false);
    expect(sameContent({ ...stored, explanation_md: "Edited" }, storedQuiz, rows.answerKey, content)).toBe(false);
    expect(sameContent(stored, storedQuiz, { q1: 1 }, content)).toBe(false);
    expect(sameContent(stored, { ...storedQuiz, pass_threshold: 80 }, rows.answerKey, content)).toBe(false);
  });
});

describe("mapLimit", () => {
  it("keeps input order and never runs more than the limit at once", async () => {
    let inFlight = 0;
    let peak = 0;
    const out = await mapLimit([5, 1, 4, 2, 3], 2, async (n) => {
      inFlight++;
      peak = Math.max(peak, inFlight);
      await new Promise((r) => setTimeout(r, n));
      inFlight--;
      return n * 10;
    });
    expect(out).toEqual([50, 10, 40, 20, 30]);
    expect(peak).toBe(2);
  });

  it("handles an empty list", async () => {
    expect(await mapLimit([], 4, async () => 1)).toEqual([]);
  });
});
