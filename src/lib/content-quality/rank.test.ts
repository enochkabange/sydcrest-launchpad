import { describe, expect, it } from "vitest";
import {
  analyseLesson,
  analyseQuestion,
  confidence,
  discrimination,
  rankLessons,
  rankQuestions,
  rewriteQueue,
  share,
  type LessonCounts,
  type QuestionCounts,
} from "./rank";

const question = (over: Partial<QuestionCounts> = {}): QuestionCounts => ({
  node_id: "bbbbbbbb-0000-0000-0000-000000000001",
  roadmap_slug: "data-analyst",
  topic_title: "Spreadsheets",
  question_id: "q1",
  prompt: "Which function adds up a column?",
  answers: 40,
  correct: 32,
  passed_answers: 20,
  passed_correct: 19,
  failed_answers: 20,
  failed_correct: 13,
  wrong_with_choice: 8,
  wrong_choice: 0,
  wrong_choice_count: 3,
  wrong_option: "COUNT",
  ...over,
});

const lesson = (over: Partial<LessonCounts> = {}): LessonCounts => ({
  node_id: "bbbbbbbb-0000-0000-0000-000000000001",
  roadmap_slug: "data-analyst",
  topic_title: "Spreadsheets",
  visits: 30,
  median_ms: 240000,
  median_scroll: 80,
  left_before_fail: 0,
  quiz_attempts: 20,
  quiz_fails: 4,
  clear_yes: 10,
  clear_no: 1,
  top_reason: null,
  buddy_messages: 0,
  buddy_chats: 0,
  buddy_deep: 0,
  buddy_why: 0,
  buddy_code: 0,
  buddy_long: 0,
  ...over,
});

describe("share and confidence", () => {
  it("is null below the minimum and clamped to 0..1", () => {
    expect(share(3, 9, 10)).toBeNull();
    expect(share(0, 0)).toBeNull();
    expect(share(5, 10)).toBe(0.5);
    expect(share(12, 10)).toBe(1);
  });
  it("confidence grows with the sample and caps at 1", () => {
    expect(confidence(0, 50)).toBe(0);
    expect(confidence(50, 50)).toBe(1);
    expect(confidence(200, 50)).toBe(1);
    expect(confidence(12.5, 50)).toBe(0.5);
  });
});

describe("discrimination", () => {
  it("is the share right in passed attempts minus the share right in failed ones", () => {
    expect(discrimination({ answers: 20, correct: 18 }, { answers: 10, correct: 4 })).toBe(0.5);
  });
  it("is negative when weak learners do better", () => {
    expect(discrimination({ answers: 10, correct: 4 }, { answers: 10, correct: 8 })).toBe(-0.4);
  });
  it("needs both groups to reach the minimum", () => {
    expect(discrimination({ answers: 20, correct: 18 }, { answers: 4, correct: 1 })).toBeNull();
    expect(discrimination({ answers: 4, correct: 4 }, { answers: 20, correct: 1 })).toBeNull();
  });
});

describe("analyseQuestion", () => {
  it("a healthy question gets no flags and a low score", () => {
    const a = analyseQuestion(question());
    expect(a.difficulty).toBe(0.8);
    expect(a.discrimination).toBe(0.3);
    expect(a.flags).toEqual([]);
    expect(a.score).toBeLessThan(0.3);
  });

  it("flags a question that confuses learners who passed", () => {
    const a = analyseQuestion(
      question({ correct: 18, passed_answers: 20, passed_correct: 8, failed_answers: 20, failed_correct: 10, wrong_with_choice: 22, wrong_choice_count: 18 }),
    );
    expect(a.strongCorrect).toBe(0.4);
    expect(a.flags).toEqual(["confuses_strong", "no_separation", "misconception"]);
    expect(a.evidence.join(" ")).toContain("Learners who passed the quiz get it right only 40%");
    expect(a.evidence.join(" ")).toContain('Most chosen wrong answer: "COUNT" (18 of 22 wrong answers)');
  });

  it("does not judge a question with too few answers", () => {
    const a = analyseQuestion(question({ answers: 6, correct: 0, passed_answers: 0, passed_correct: 0, failed_answers: 6, failed_correct: 0 }));
    expect(a.difficulty).toBeNull();
    expect(a.flags).toEqual([]);
    expect(a.score).toBe(0);
    expect(a.evidence[0]).toContain("too few to judge");
  });

  it("old answers without a choice or a pass flag only count toward difficulty", () => {
    const a = analyseQuestion(
      question({ answers: 30, correct: 9, passed_answers: 0, passed_correct: 0, failed_answers: 0, failed_correct: 0, wrong_with_choice: 0, wrong_choice: null, wrong_choice_count: null, wrong_option: null }),
    );
    expect(a.discrimination).toBeNull();
    expect(a.wrongShare).toBeNull();
    expect(a.flags).toEqual(["hard"]);
  });
});

describe("analyseLesson", () => {
  it("flags a lesson learners call unclear, with the main reason", () => {
    const a = analyseLesson(lesson({ clear_yes: 4, clear_no: 6, top_reason: "missing_example" }));
    expect(a.unclearShare).toBe(0.6);
    expect(a.flags).toContain("unclear");
    expect(a.evidence[0]).toBe("6 of 10 learners said it was not clear (60%); most said: needs an example");
  });

  it("needs three answers before the not clear share counts", () => {
    const a = analyseLesson(lesson({ clear_yes: 0, clear_no: 2 }));
    expect(a.unclearShare).toBeNull();
    expect(a.flags).not.toContain("unclear");
  });

  it("counts fails, lessons read before fails, skimming and Study Buddy questions", () => {
    const a = analyseLesson(
      lesson({ quiz_attempts: 20, quiz_fails: 12, left_before_fail: 5, median_scroll: 30, buddy_messages: 20, buddy_why: 8, buddy_code: 2 }),
    );
    expect(a.flags).toEqual(["fails", "left_before_fail", "skimmed", "many_questions"]);
    expect(a.evidence.join(" ")).toContain("8 why or compare, 2 about code");
  });
});

describe("ranking", () => {
  it("orders questions by score, worst first", () => {
    const fine = question({ question_id: "fine" });
    const bad = question({ question_id: "bad", correct: 12, passed_answers: 20, passed_correct: 6, failed_answers: 20, failed_correct: 6 });
    const meh = question({ question_id: "meh", correct: 14 });
    expect(rankQuestions([fine, meh, bad]).map((q) => q.row.question_id)).toEqual(["bad", "meh", "fine"]);
  });

  it("a bigger sample outranks the same rates on a smaller one", () => {
    const small = question({ question_id: "small", answers: 12, correct: 3, passed_answers: 0, passed_correct: 0, failed_answers: 0, failed_correct: 0, wrong_with_choice: 0 });
    const big = question({ question_id: "big", answers: 60, correct: 15, passed_answers: 0, passed_correct: 0, failed_answers: 0, failed_correct: 0, wrong_with_choice: 0 });
    expect(rankQuestions([small, big]).map((q) => q.row.question_id)).toEqual(["big", "small"]);
  });

  it("the queue mixes lessons and questions, keeps only flagged ones and caps the length", () => {
    const qs = rankQuestions([
      question({ question_id: "fine" }),
      question({ question_id: "bad", correct: 12, passed_answers: 20, passed_correct: 6, failed_answers: 20, failed_correct: 6 }),
    ]);
    const ls = rankLessons([
      lesson({ node_id: "n-ok" }),
      lesson({ node_id: "n-unclear", clear_yes: 2, clear_no: 18, top_reason: "confusing" }),
    ]);
    const queue = rewriteQueue(qs, ls);
    // A question that confuses strong learners (score 2.01) edges out a lesson 90% call unclear (1.96).
    expect(queue.map((i) => i.key)).toEqual(["q:bbbbbbbb-0000-0000-0000-000000000001:bad", "l:n-unclear"]);
    expect(queue.map((i) => i.score)).toEqual([2.01, 1.96]);
    expect(rewriteQueue(qs, ls, 1)).toHaveLength(1);
  });
});
