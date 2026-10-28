import { describe, expect, it } from "vitest";
import { headingIds, lessonToc, markdownHeadings, slugifyHeading, tocIds } from "./lesson-toc";

describe("slugifyHeading", () => {
  it("makes short, safe ids", () => {
    expect(slugifyHeading("Saving data while you learn")).toBe("saving-data-while-you-learn");
    expect(slugifyHeading("Flexbox: one direction!")).toBe("flexbox-one-direction");
    expect(slugifyHeading("Café prices in GH₵")).toBe("cafe-prices-in-gh");
    expect(slugifyHeading("???")).toBe("section");
  });
});

describe("headingIds", () => {
  it("prefixes ids and keeps repeated headings unique", () => {
    expect(headingIds(["A worked example", "Steps", "A worked example"], "explanation")).toEqual([
      "explanation-a-worked-example",
      "explanation-steps",
      "explanation-a-worked-example-2",
    ]);
  });
});

describe("markdownHeadings", () => {
  it("reads headings as they render, skipping code blocks and inline marks", () => {
    const md = "Intro.\n\n## Your **free** setup\n\nText.\n\n```\n## not a heading\n```\n\n### The `git` commands\n";
    expect(markdownHeadings(md, "explanation")).toEqual([
      { id: "explanation-your-free-setup", label: "Your free setup", children: [] },
      { id: "explanation-the-git-commands", label: "The git commands", children: [] },
    ]);
  });
});

describe("lessonToc", () => {
  it("lists only the parts a lesson has, in anatomy order, with the explanation's headings nested", () => {
    const toc = lessonToc({
      outcomes: ["One", "Two", "Three"],
      explanation_md: "## Why it matters\n\nText.",
      practice_task_md: "Do it",
      hasResources: false,
    });
    expect(toc.map((e) => e.id)).toEqual(["outcomes", "explanation", "practice", "checkpoint"]);
    expect(toc[1].children.map((c) => c.label)).toEqual(["Why it matters"]);
  });

  it("orders every optional part when present", () => {
    const toc = lessonToc({
      outcomes: ["a", "b", "c"],
      explanation_md: "Text",
      workedExample_md: "Mariama sorts her stock list.",
      keyTerms: [{ term: "Cell", definition: "One box." }],
      commonMistakes: ["Skipping the check"],
      practice_task_md: "Do it",
      hasResources: true,
      selfCheck: ["Can you explain it?"],
    });
    expect(tocIds(toc)).toEqual([
      "outcomes",
      "explanation",
      "worked-example",
      "key-terms",
      "common-mistakes",
      "practice",
      "resources",
      "self-check",
      "checkpoint",
    ]);
  });

  it("still has an explanation and a checkpoint for a lesson without content", () => {
    expect(tocIds(lessonToc({}))).toEqual(["explanation", "checkpoint"]);
  });
});
