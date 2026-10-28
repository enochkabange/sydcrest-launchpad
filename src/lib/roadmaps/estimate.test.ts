import { describe, expect, it } from "vitest";
import { countWords, estimateLessonMinutes, formatMinutes } from "./estimate";

describe("countWords", () => {
  it("counts words, not markdown marks", () => {
    expect(countWords("## Saving data\n\n* **Download** at a hub in Tamale")).toBe(8);
    expect(countWords("")).toBe(0);
    expect(countWords(null)).toBe(0);
  });
});

describe("estimateLessonMinutes", () => {
  const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

  it("adds reading, a practice allowance and the quiz, rounded up to 5", () => {
    // 450 words at 180 a minute is 2.5, plus 20 for practice and 4 for the quiz: 26.5, so 30.
    expect(estimateLessonMinutes({ explanation_md: words(450), practice_task_md: "Do it", quizQuestions: 4 })).toBe(30);
  });

  it("counts a worked example as reading", () => {
    const base = estimateLessonMinutes({ explanation_md: words(900) });
    const more = estimateLessonMinutes({ explanation_md: words(900), workedExample_md: words(900) });
    expect(more).toBeGreaterThan(base!);
  });

  it("never says less than 5 minutes, and says nothing when there is nothing to read", () => {
    expect(estimateLessonMinutes({ explanation_md: "Short." })).toBe(5);
    expect(estimateLessonMinutes({})).toBeNull();
  });
});

describe("formatMinutes", () => {
  it("writes minutes and hours as an estimate", () => {
    expect(formatMinutes(35)).toBe("about 35 min");
    expect(formatMinutes(60)).toBe("about 1 hr");
    expect(formatMinutes(70)).toBe("about 1 hr 10 min");
  });
});
