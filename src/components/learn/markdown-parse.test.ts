import { describe, expect, it } from "vitest";
import { parseInline, parseMarkdown, safeHref } from "./markdown-parse";

describe("safeHref", () => {
  it("allows http and https", () => {
    expect(safeHref("https://example.com/a")).toBe("https://example.com/a");
    expect(safeHref("http://example.com")).toBe("http://example.com");
  });

  it("refuses script, data and relative links", () => {
    expect(safeHref("javascript:alert(1)")).toBeNull();
    expect(safeHref("JavaScript:alert(1)")).toBeNull();
    expect(safeHref("data:text/html,<script>alert(1)</script>")).toBeNull();
    expect(safeHref("/dashboard")).toBeNull();
  });
});

describe("parseInline", () => {
  it("parses bold, italic, code and links", () => {
    expect(parseInline("Use **SUM** and *AVERAGE* in `B2` from [Sheets](https://support.google.com)")).toEqual([
      { type: "text", text: "Use " },
      { type: "strong", children: [{ type: "text", text: "SUM" }] },
      { type: "text", text: " and " },
      { type: "em", children: [{ type: "text", text: "AVERAGE" }] },
      { type: "text", text: " in " },
      { type: "code", text: "B2" },
      { type: "text", text: " from " },
      { type: "link", href: "https://support.google.com", children: [{ type: "text", text: "Sheets" }] },
    ]);
  });

  it("renders unsafe links as plain text", () => {
    expect(parseInline("[click](javascript:alert(1))")).toEqual([{ type: "text", text: "click)" }]);
    expect(parseInline("[click](javascript:void)")).toEqual([{ type: "text", text: "click" }]);
  });

  it("keeps HTML as text, never markup", () => {
    expect(parseInline("<script>alert(1)</script>")).toEqual([{ type: "text", text: "<script>alert(1)</script>" }]);
  });

  it("does not read emphasis inside code", () => {
    expect(parseInline("`a * b * c`")).toEqual([{ type: "code", text: "a * b * c" }]);
  });

  it("leaves a lone asterisk alone", () => {
    expect(parseInline("2 * 3 = 6")).toEqual([{ type: "text", text: "2 * 3 = 6" }]);
  });
});

describe("parseMarkdown", () => {
  it("returns nothing for empty input", () => {
    expect(parseMarkdown(null)).toEqual([]);
    expect(parseMarkdown("  \n\n")).toEqual([]);
  });

  it("splits headings, paragraphs and lists", () => {
    const blocks = parseMarkdown(
      "# Why it matters\n\nMost offices in Tamale\nrun on spreadsheets.\n\n- Rows\n- Columns\n\n1. Open a sheet\n2. Type a number",
    );
    expect(blocks.map((b) => b.type)).toEqual(["heading", "paragraph", "list", "list"]);
    expect(blocks[1]).toEqual({
      type: "paragraph",
      children: [{ type: "text", text: "Most offices in Tamale run on spreadsheets." }],
    });
    expect(blocks[2]).toMatchObject({ ordered: false, items: [[{ text: "Rows" }], [{ text: "Columns" }]] });
    expect(blocks[3]).toMatchObject({ ordered: true });
  });

  it("keeps fenced code verbatim", () => {
    expect(parseMarkdown("```\nSELECT * FROM sales;\n**not bold**\n```")).toEqual([
      { type: "code", text: "SELECT * FROM sales;\n**not bold**" },
    ]);
  });

  it("parses block quotes", () => {
    expect(parseMarkdown("> Practice daily\n> even ten minutes")).toEqual([
      { type: "quote", children: [{ type: "text", text: "Practice daily even ten minutes" }] },
    ]);
  });

  it("treats raw HTML blocks as paragraph text", () => {
    expect(parseMarkdown('<img src=x onerror="alert(1)">')).toEqual([
      { type: "paragraph", children: [{ type: "text", text: '<img src=x onerror="alert(1)">' }] },
    ]);
  });
});
