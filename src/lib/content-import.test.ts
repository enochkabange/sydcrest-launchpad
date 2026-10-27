import { describe, expect, it } from "vitest";
import { sameContent } from "./content-import";
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
