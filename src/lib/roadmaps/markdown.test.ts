import { describe, expect, it } from "vitest";
import { markdownToText, parseInline, parseMarkdown, practiceOutcome, safeHref } from "./markdown";

describe("parseMarkdown", () => {
  it("parses headings one level below the page title", () => {
    expect(parseMarkdown("# Why it matters\n### Detail")).toEqual([
      { type: "heading", level: 2, children: [{ type: "text", text: "Why it matters" }] },
      { type: "heading", level: 4, children: [{ type: "text", text: "Detail" }] },
    ]);
  });

  it("joins wrapped lines into one paragraph and splits on blank lines", () => {
    const blocks = parseMarkdown("Mariama keeps her\nshop records in Sheets.\n\nSecond paragraph.");
    expect(blocks).toEqual([
      { type: "paragraph", children: [{ type: "text", text: "Mariama keeps her shop records in Sheets." }] },
      { type: "paragraph", children: [{ type: "text", text: "Second paragraph." }] },
    ]);
  });

  it("parses bullet and numbered lists", () => {
    const blocks = parseMarkdown("- one\n- two\n\n1. first\n2. second");
    expect(blocks).toEqual([
      { type: "list", ordered: false, items: [[{ type: "text", text: "one" }], [{ type: "text", text: "two" }]] },
      { type: "list", ordered: true, items: [[{ type: "text", text: "first" }], [{ type: "text", text: "second" }]] },
    ]);
  });

  it("keeps fenced code verbatim", () => {
    expect(parseMarkdown("```sql\nSELECT * FROM sales;\n**not bold**\n```")).toEqual([
      { type: "code", text: "SELECT * FROM sales;\n**not bold**" },
    ]);
  });

  it("parses quotes and rules", () => {
    expect(parseMarkdown("> Ask why\n> twice\n\n---")).toEqual([
      { type: "quote", children: [{ type: "text", text: "Ask why twice" }] },
      { type: "rule" },
    ]);
  });

  it("treats raw HTML as text, never markup", () => {
    const blocks = parseMarkdown('<script>alert(1)</script>\n<img src=x onerror="alert(1)">');
    expect(blocks).toEqual([
      {
        type: "paragraph",
        children: [{ type: "text", text: '<script>alert(1)</script> <img src=x onerror="alert(1)">' }],
      },
    ]);
  });
});

describe("parseInline", () => {
  it("parses bold, italic and code", () => {
    expect(parseInline("a **bold** and *soft* `code` end")).toEqual([
      { type: "text", text: "a " },
      { type: "strong", children: [{ type: "text", text: "bold" }] },
      { type: "text", text: " and " },
      { type: "em", children: [{ type: "text", text: "soft" }] },
      { type: "text", text: " " },
      { type: "code", text: "code" },
      { type: "text", text: " end" },
    ]);
  });

  it("does not treat underscores inside words as emphasis", () => {
    expect(parseInline("use snake_case_names")).toEqual([{ type: "text", text: "use snake_case_names" }]);
  });

  it("keeps safe links and drops unsafe ones to their label", () => {
    expect(parseInline("[Docs](https://developer.mozilla.org/en-US/)")).toEqual([
      { type: "link", href: "https://developer.mozilla.org/en-US/", children: [{ type: "text", text: "Docs" }] },
    ]);
    expect(parseInline("[click](javascript:void)")).toEqual([{ type: "text", text: "click" }]);
  });
});

describe("safeHref", () => {
  it("allows http(s) and site paths only", () => {
    expect(safeHref("https://example.org/a")).toBe("https://example.org/a");
    expect(safeHref("/roadmaps")).toBe("/roadmaps");
    expect(safeHref("//evil.example")).toBeNull();
    expect(safeHref("data:text/html,hi")).toBeNull();
    expect(safeHref("JavaScript:alert(1)")).toBeNull();
  });
});

describe("markdownToText", () => {
  it("strips formatting for descriptions", () => {
    expect(markdownToText("# Title\n\nUse **pivot** tables.\n\n- one\n- two")).toBe("Title Use pivot tables. one two");
  });
});

describe("practiceOutcome", () => {
  it("returns the Done looks like line as plain text", () => {
    expect(practiceOutcome("1. Do it.\n\n**Done looks like:** your page opens in the browser, and you have a **plan**.")).toBe(
      "Your page opens in the browser, and you have a plan.",
    );
    expect(practiceOutcome("**Done looks like:** a sheet.\n\nMore text.")).toBe("A sheet.");
    expect(practiceOutcome("No outcome here.")).toBeNull();
    expect(practiceOutcome(null)).toBeNull();
  });
});
