import { describe, expect, it } from "vitest";
import { selectReviewQuestions, type ReviewCandidate, type ReviewHistory } from "./review-select";

const NOW = new Date("2026-10-28T12:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86_400_000).toISOString();

function topic(nodeId: string, passedDaysAgo: number, questionIds: string[]): ReviewCandidate[] {
  return questionIds.map((id) => ({
    nodeId,
    nodeTitle: nodeId.toUpperCase(),
    roadmapSlug: "data-analyst",
    nodeSlug: nodeId,
    passedAt: daysAgo(passedDaysAgo),
    question: { id, prompt: `${nodeId} ${id}?`, options: ["A", "B", "C", "D"] },
  }));
}

const keys = (items: { nodeId: string; question: { id: string } }[]) => items.map((i) => `${i.nodeId}:${i.question.id}`);

describe("selectReviewQuestions", () => {
  it("returns nothing without passed quizzes", () => {
    expect(selectReviewQuestions([], [], NOW)).toEqual([]);
  });

  it("asks every question when there are five or fewer", () => {
    const c = topic("sheets", 3, ["q1", "q2", "q3"]);
    expect(selectReviewQuestions(c, [], NOW)).toHaveLength(3);
  });

  it("asks five at most", () => {
    const c = [...topic("sheets", 3, ["q1", "q2", "q3", "q4"]), ...topic("sql", 2, ["q1", "q2", "q3", "q4"])];
    expect(selectReviewQuestions(c, [], NOW)).toHaveLength(5);
  });

  it("puts older topics first", () => {
    const c = [...topic("new", 1, ["q1"]), ...topic("old", 20, ["q1"])];
    expect(keys(selectReviewQuestions(c, [], NOW, 1))).toEqual(["old:q1"]);
  });

  it("brings a question answered wrong back sooner than one answered right", () => {
    const c = topic("sheets", 30, ["q1", "q2"]);
    const history: ReviewHistory[] = [
      { nodeId: "sheets", questionId: "q1", correct: true, answeredAt: daysAgo(2) },
      { nodeId: "sheets", questionId: "q2", correct: false, answeredAt: daysAgo(2) },
    ];
    expect(keys(selectReviewQuestions(c, history, NOW, 1))).toEqual(["sheets:q2"]);
  });

  it("lets a question answered right several times rest longer", () => {
    const c = [...topic("sheets", 60, ["q1"]), ...topic("sql", 60, ["q1"])];
    const history: ReviewHistory[] = [
      // Right three times in a row, last seen 5 days ago: rests 14 days.
      { nodeId: "sheets", questionId: "q1", correct: true, answeredAt: daysAgo(20) },
      { nodeId: "sheets", questionId: "q1", correct: true, answeredAt: daysAgo(12) },
      { nodeId: "sheets", questionId: "q1", correct: true, answeredAt: daysAgo(5) },
      // Right once, last seen 4 days ago: rests 3 days, so it is due.
      { nodeId: "sql", questionId: "q1", correct: true, answeredAt: daysAgo(4) },
    ];
    expect(keys(selectReviewQuestions(c, history, NOW, 1))).toEqual(["sql:q1"]);
  });

  it("breaks ties on past mistakes", () => {
    const c = topic("sheets", 30, ["q1", "q2"]);
    const history: ReviewHistory[] = [
      { nodeId: "sheets", questionId: "q1", correct: false, answeredAt: daysAgo(3) },
      { nodeId: "sheets", questionId: "q2", correct: false, answeredAt: daysAgo(4) },
      { nodeId: "sheets", questionId: "q2", correct: false, answeredAt: daysAgo(3) },
    ];
    const [first] = selectReviewQuestions(c, history, NOW, 1);
    expect(keys([first])).toEqual(["sheets:q2"]);
    expect(first.mistakes).toBe(2);
  });

  it("spreads questions across topics, two per topic while others have questions", () => {
    const c = [...topic("old", 40, ["q1", "q2", "q3", "q4"]), ...topic("mid", 10, ["q1", "q2"]), ...topic("new", 2, ["q1"])];
    const picked = selectReviewQuestions(c, [], NOW);
    const perTopic = picked.reduce<Record<string, number>>((m, i) => ({ ...m, [i.nodeId]: (m[i.nodeId] ?? 0) + 1 }), {});
    expect(perTopic).toEqual({ old: 2, mid: 2, new: 1 });
  });

  it("fills up from one topic when it is the only one passed", () => {
    const picked = selectReviewQuestions(topic("sheets", 5, ["q1", "q2", "q3", "q4", "q5", "q6"]), [], NOW);
    expect(picked).toHaveLength(5);
  });

  it("is deterministic and never repeats a question", () => {
    const c = [...topic("a", 5, ["q1", "q2", "q3"]), ...topic("b", 5, ["q1", "q2", "q3"])];
    const one = keys(selectReviewQuestions(c, [], NOW));
    expect(keys(selectReviewQuestions([...c].reverse(), [], NOW))).toEqual(one);
    expect(new Set(one).size).toBe(one.length);
  });

  it("does not change its inputs", () => {
    const c = topic("sheets", 5, ["q1"]);
    const history: ReviewHistory[] = [
      { nodeId: "sheets", questionId: "q1", correct: true, answeredAt: daysAgo(1) },
      { nodeId: "sheets", questionId: "q1", correct: false, answeredAt: daysAgo(3) },
    ];
    const copy = JSON.parse(JSON.stringify(history));
    selectReviewQuestions(c, history, NOW);
    expect(history).toEqual(copy);
  });
});
