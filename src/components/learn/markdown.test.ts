import { isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { Markdown } from "./markdown";
import { markdownHeadings } from "./lesson-toc";

/**
 * A tiny static serialiser for the element tree. react-dom/server refuses to
 * load here (the installed react and react-dom patch versions differ; Next
 * bundles its own copy for the app), and `<Markdown>` uses only plain host
 * elements, so walking the tree is enough. Text is escaped as React would.
 */
const ATTR: Record<string, string> = { className: "class", tabIndex: "tabindex" };
const escape = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function html(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return escape(String(node));
  if (Array.isArray(node)) return node.map(html).join("");
  if (!isValidElement<Record<string, unknown>>(node) || typeof node.type !== "string") throw new Error("unexpected node");
  const { children, ...props } = node.props;
  const attrs = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== false)
    .map(([k, v]) => ` ${ATTR[k] ?? k}="${escape(String(v)).replace(/"/g, "&quot;")}"`)
    .join("");
  return `<${node.type}${attrs}>${html(children as ReactNode)}</${node.type}>`;
}
const render = (source: string) => html(Markdown({ source }));

describe("<Markdown> tables and lists (#267)", () => {
  const prices = "| Item | Price (GHS) | Stock |\n| :--- | ---: | :---: |\n| Rice | 45 | 12 |";

  it("renders a table inside a focusable, named, scrolling region", () => {
    const html = render(prices);
    expect(html).toMatch(/<div role="region" aria-label="Table: Item, Price \(GHS\), Stock" tabindex="0" class="[^"]*overflow-x-auto/);
    expect(html).toContain("<thead");
    expect(html.match(/<th scope="col"/g)).toHaveLength(3);
    expect(html).toMatch(/<th scope="col" class="[^"]*text-right[^"]*">Price \(GHS\)<\/th>/);
    expect(html).toMatch(/<td class="[^"]*text-center[^"]*">12<\/td>/);
    expect(html).not.toContain("<caption");
  });

  it("uses the caption as the table's name", () => {
    const html = render(`Table: Chop bar prices\n${prices}`);
    expect(html).toContain('aria-label="Chop bar prices"');
    expect(html).toMatch(/<caption[^>]*>Chop bar prices<\/caption>/);
  });

  it("escapes HTML in cells", () => {
    const html = render("| a |\n| - |\n| <script>alert(1)</script> |");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("renders the start number and nested lists", () => {
    const html = render("3. Save\n   - to Drive\n4. Share");
    expect(html).toMatch(/^<div[^>]*><ol start="3"/);
    expect(html).toMatch(/<li>Save<ul class="[^"]*list-\[circle\][^"]*"><li>to Drive<\/li><\/ul><\/li><li>Share<\/li>/);
    expect(render("1. One")).not.toContain("start=");
  });
});

describe("table of contents with tables and lists", () => {
  it("still lists only the headings, with the same ids", () => {
    const plain = "## Prices\n\nText.\n\n## Steps\n\nMore.";
    const rich = "## Prices\n\n| # | Item |\n| - | - |\n| 1 | Rice |\n\n## Steps\n\n1. Open\n   - Sheet\n\n3. Save";
    expect(markdownHeadings(rich, "explanation")).toEqual(markdownHeadings(plain, "explanation"));
    expect(markdownHeadings(rich, "explanation").map((h) => h.id)).toEqual(["explanation-prices", "explanation-steps"]);
  });
});
