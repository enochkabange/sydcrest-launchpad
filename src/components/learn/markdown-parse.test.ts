import { describe, expect, it } from "vitest";
import { parseInline, parseMarkdown, safeHref, splitRow, type Block, type ListBlock, type TableBlock } from "./markdown-parse";

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
    expect(blocks[2]).toMatchObject({ ordered: false, items: [{ children: [{ text: "Rows" }] }, { children: [{ text: "Columns" }] }] });
    expect(blocks[3]).toMatchObject({ ordered: true });
    expect(blocks[3]).not.toHaveProperty("start");
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

const text = (t: string) => [{ type: "text", text: t }];
const only = <T extends Block>(source: string): T => {
  const blocks = parseMarkdown(source);
  expect(blocks).toHaveLength(1);
  return blocks[0] as T;
};
const labels = (list: ListBlock) => list.items.map((item) => (item.children[0] as { text: string }).text);

describe("parseMarkdown lists (#267)", () => {
  it("nests bullets under bullets two spaces in", () => {
    const list = only<ListBlock>("- Stock\n  - Rice\n  - Oil\n- Sales");
    expect(labels(list)).toEqual(["Stock", "Sales"]);
    expect(list.items[0].sublist).toMatchObject({ ordered: false });
    expect(labels(list.items[0].sublist!)).toEqual(["Rice", "Oil"]);
    expect(list.items[1].sublist).toBeUndefined();
  });

  it("nests numbers under numbers", () => {
    const list = only<ListBlock>("1. Open the sheet\n   1. Click File\n   2. Click New\n2. Name it");
    expect(list.ordered).toBe(true);
    expect(labels(list)).toEqual(["Open the sheet", "Name it"]);
    expect(list.items[0].sublist).toMatchObject({ ordered: true });
    expect(list.items[0].sublist).not.toHaveProperty("start");
  });

  it("mixes bullets inside numbers and numbers inside bullets", () => {
    const ol = only<ListBlock>("1. Count the shelf\n   - Rice\n   - Sugar\n2. Compare");
    expect(ol.ordered).toBe(true);
    expect(ol.items[0].sublist).toMatchObject({ ordered: false });
    expect(labels(ol.items[0].sublist!)).toEqual(["Rice", "Sugar"]);

    const ul = only<ListBlock>("- Morning\n  1. Open\n  2. Sweep\n- Evening\n  1. Count\n  2. Lock");
    expect(ul.ordered).toBe(false);
    expect(labels(ul.items[0].sublist!)).toEqual(["Open", "Sweep"]);
    expect(labels(ul.items[1].sublist!)).toEqual(["Count", "Lock"]);
  });

  it("accepts a tab as the nesting indent", () => {
    const list = only<ListBlock>("- Stock\n\t- Rice");
    expect(labels(list.items[0].sublist!)).toEqual(["Rice"]);
  });

  it("folds a third level into the second", () => {
    const list = only<ListBlock>("- A\n  - B\n    - C\n- D");
    expect(labels(list)).toEqual(["A", "D"]);
    expect(labels(list.items[0].sublist!)).toEqual(["B", "C"]);
    expect(list.items[0].sublist!.items.every((item) => item.sublist === undefined)).toBe(true);
  });

  it("treats a one space indent as the same level", () => {
    expect(labels(only<ListBlock>("- A\n - B"))).toEqual(["A", "B"]);
  });

  it("parses inline formatting in nested items", () => {
    const list = only<ListBlock>("- Tools\n  - **Sheets** at [Google](https://sheets.google.com)");
    expect(list.items[0].sublist!.items[0].children).toEqual([
      { type: "strong", children: text("Sheets") },
      { type: "text", text: " at " },
      { type: "link", href: "https://sheets.google.com", children: text("Google") },
    ]);
  });

  it("starts a numbered list at its first number", () => {
    expect(only<ListBlock>("3. Save\n4. Share")).toMatchObject({ ordered: true, start: 3 });
    expect(only<ListBlock>("1. Save\n5. Share")).not.toHaveProperty("start");
    expect(only<ListBlock>("0. Zero")).toMatchObject({ start: 0 });
  });

  it("continues numbering after a paragraph or code block", () => {
    const blocks = parseMarkdown("1. Open\n2. Type\n\nNow check the total.\n\n3. Save\n\n```\n=SUM(B2:B9)\n```\n\n4) Share");
    expect(blocks.map((b) => b.type)).toEqual(["list", "paragraph", "list", "code", "list"]);
    expect(blocks[0]).not.toHaveProperty("start");
    expect(blocks[2]).toMatchObject({ start: 3 });
    expect(blocks[4]).toMatchObject({ start: 4 });
  });

  it("keeps a nested list's own start number", () => {
    const list = only<ListBlock>("- Steps\n  4. Four\n  5. Five");
    expect(list.items[0].sublist).toMatchObject({ ordered: true, start: 4 });
  });

  it("starts a new list when the top level marker changes", () => {
    const blocks = parseMarkdown("1. One\n2. Two\n- Note");
    expect(blocks).toHaveLength(2);
    expect(blocks[0]).toMatchObject({ ordered: true });
    expect(blocks[1]).toMatchObject({ ordered: false });
  });
});

describe("splitRow", () => {
  it("drops outer pipes and trims cells", () => {
    expect(splitRow("| a | b |")).toEqual(["a", "b"]);
    expect(splitRow("a | b")).toEqual(["a", "b"]);
    expect(splitRow("| a | |")).toEqual(["a", ""]);
  });

  it("keeps escaped pipes as text", () => {
    expect(splitRow("| a \\| b | c |")).toEqual(["a | b", "c"]);
    expect(splitRow("| a | b \\|")).toEqual(["a", "b |"]);
  });
});

describe("parseMarkdown tables (#267)", () => {
  const prices = "| Item | Price (GHS) | Stock |\n| :--- | ---: | :---: |\n| Rice | 45 | 12 |\n| Oil | 60 | 4 |";

  it("parses the header, alignment and rows", () => {
    expect(only<TableBlock>(prices)).toEqual({
      type: "table",
      align: ["left", "right", "center"],
      header: [text("Item"), text("Price (GHS)"), text("Stock")],
      rows: [
        [text("Rice"), text("45"), text("12")],
        [text("Oil"), text("60"), text("4")],
      ],
    });
  });

  it("leaves alignment unset without colons", () => {
    expect(only<TableBlock>("| a | b |\n|---|---|\n| 1 | 2 |").align).toEqual([null, null]);
  });

  it("works without outer pipes", () => {
    const table = only<TableBlock>("Name | Town\n--- | ---\nWumpini | Tamale");
    expect(table.header).toEqual([text("Name"), text("Town")]);
    expect(table.rows).toEqual([[text("Wumpini"), text("Tamale")]]);
  });

  it("allows a header with no body rows and a single column", () => {
    expect(only<TableBlock>("| Only |\n| --- |")).toMatchObject({ header: [text("Only")], rows: [] });
  });

  it("formats cells inline and keeps them safe", () => {
    const table = only<TableBlock>(
      "| Tool | Notes |\n| --- | --- |\n| **Sheets** | `=SUM()` at [help](https://support.google.com) |\n| <b>x</b> | [bad](javascript:alert) |",
    );
    expect(table.rows[0]).toEqual([
      [{ type: "strong", children: text("Sheets") }],
      [
        { type: "code", text: "=SUM()" },
        { type: "text", text: " at " },
        { type: "link", href: "https://support.google.com", children: text("help") },
      ],
    ]);
    expect(table.rows[1]).toEqual([text("<b>x</b>"), text("bad")]);
  });

  it("keeps escaped pipes inside a cell", () => {
    expect(only<TableBlock>("| Rule |\n| --- |\n| A \\| B |").rows).toEqual([[text("A | B")]]);
  });

  it("pads short rows and drops extra cells", () => {
    const table = only<TableBlock>("| a | b | c |\n| - | - | - |\n| 1 |\n| 1 | 2 | 3 | 4 |");
    expect(table.rows).toEqual([
      [text("1"), [], []],
      [text("1"), text("2"), text("3")],
    ]);
  });

  it("takes a caption from a Table: line just above", () => {
    const table = only<TableBlock>(`Table: Prices at the **chop bar**\n${prices}`);
    expect(table.caption).toEqual([{ type: "text", text: "Prices at the " }, { type: "strong", children: text("chop bar") }]);
    expect(table.rows).toHaveLength(2);
  });

  it("ends at a blank line, a heading or another block", () => {
    const blocks = parseMarkdown(`${prices}\n\nAfter.\n\n${prices}\n## Next\n\n${prices}\n- item`);
    expect(blocks.map((b) => b.type)).toEqual(["table", "paragraph", "table", "heading", "table", "list"]);
    expect((blocks[2] as TableBlock).rows).toHaveLength(2);
  });

  it("starts right after a paragraph line without swallowing it", () => {
    const blocks = parseMarkdown(`Here are the prices:\n${prices}`);
    expect(blocks.map((b) => b.type)).toEqual(["paragraph", "table"]);
    expect(blocks[0]).toEqual({ type: "paragraph", children: text("Here are the prices:") });
  });

  describe("malformed tables stay as text", () => {
    it("no delimiter row", () => {
      expect(parseMarkdown("| a | b |\n| 1 | 2 |")).toEqual([{ type: "paragraph", children: text("| a | b | | 1 | 2 |") }]);
    });

    it("delimiter cell count does not match the header", () => {
      expect(only<Block>("| a | b | c |\n| --- | --- |\n| 1 | 2 | 3 |").type).toBe("paragraph");
    });

    it("delimiter row with something other than dashes and colons", () => {
      expect(only<Block>("| a | b |\n| --- | x |").type).toBe("paragraph");
      expect(only<Block>("| a | b |\n| -:- | --- |").type).toBe("paragraph");
    });

    it("a delimiter row with no header", () => {
      expect(only<Block>("| --- | --- |\n| 1 | 2 |").type).toBe("paragraph");
    });

    it("a dashed underline under prose is not a one column table", () => {
      expect(only<Block>("Some text\n---")).toEqual({ type: "paragraph", children: text("Some text ---") });
    });

    it("a Table: line with no table under it", () => {
      expect(only<Block>("Table: nothing here")).toEqual({ type: "paragraph", children: text("Table: nothing here") });
    });

    it("pipes inside a code fence", () => {
      expect(only<Block>("```\n| a | b |\n| - | - |\n```")).toEqual({ type: "code", text: "| a | b |\n| - | - |" });
    });
  });
});
