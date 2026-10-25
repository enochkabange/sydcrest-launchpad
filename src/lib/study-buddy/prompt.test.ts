import { describe, expect, it } from "vitest";
import { buildNodeContext, buildSystemPrompt, quizPromptsFrom, TUTOR_PROMPT, type NodeContext } from "./prompt";

const node: NodeContext = {
  roadmapTitle: "Data Analyst",
  title: "Averages",
  summary: "Mean, median and mode.",
  explanationMd: "The mean adds every value and divides by how many there are.",
  practiceTaskMd: "Find the median trotro fare in this list.",
  quizPrompts: ["Which average ignores extreme values?"],
};

describe("buildSystemPrompt", () => {
  it("puts the stable tutor prompt first and the node context second, both cached", () => {
    const blocks = buildSystemPrompt(node);
    expect(blocks).toHaveLength(2);
    expect(blocks[0]).toEqual({ type: "text", text: TUTOR_PROMPT, cache_control: { type: "ephemeral" } });
    expect(blocks[1].cache_control).toEqual({ type: "ephemeral" });
    expect(blocks[1].text).toContain("Current topic: Averages");
  });

  it("is byte identical for the same node, so the cache hits", () => {
    expect(JSON.stringify(buildSystemPrompt(node))).toBe(JSON.stringify(buildSystemPrompt({ ...node })));
  });

  it("keeps the tutor prompt identical across nodes", () => {
    expect(buildSystemPrompt({ ...node, title: "Charts" })[0]).toEqual(buildSystemPrompt(node)[0]);
  });

  it("sets the tutor style and refuses to hand over quiz answers", () => {
    expect(TUTOR_PROMPT).toMatch(/Socratic/);
    expect(TUTOR_PROMPT).toMatch(/Do not hand over quiz answers/);
    expect(TUTOR_PROMPT).toMatch(/Ghana/);
    expect(TUTOR_PROMPT).toMatch(/Never use dashes/);
    expect(TUTOR_PROMPT).not.toMatch(/[–—]/);
  });
});

describe("buildNodeContext", () => {
  it("includes the lesson, practice task and quiz prompts", () => {
    const text = buildNodeContext(node);
    expect(text).toContain("Roadmap: Data Analyst");
    expect(text).toContain("The mean adds every value");
    expect(text).toContain("Find the median trotro fare");
    expect(text).toContain("Which average ignores extreme values?");
  });

  it("says honestly when there is no lesson yet", () => {
    const text = buildNodeContext({ ...node, explanationMd: null, practiceTaskMd: null, quizPrompts: [] });
    expect(text).toMatch(/no written lesson yet/);
    expect(text).not.toMatch(/quiz/i);
  });
});

describe("quizPromptsFrom", () => {
  it("keeps prompts and drops options, ids and anything that looks like an answer", () => {
    const questions = [
      { id: "q1", prompt: "What is the median of 1, 3, 9?", options: ["1", "3", "9"], answer: 1 },
      { id: "q2", options: ["a"] },
      "junk",
    ];
    const prompts = quizPromptsFrom(questions);
    expect(prompts).toEqual(["What is the median of 1, 3, 9?"]);
    const context = buildNodeContext({ ...node, quizPrompts: prompts });
    expect(context).not.toContain('"answer"');
    expect(context).not.toContain("options");
  });

  it("handles a missing quiz", () => {
    expect(quizPromptsFrom(null)).toEqual([]);
  });
});
