import { isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { ReplyMarkdown } from "./reply-markdown";

/**
 * Serialises the element tree the way React would, without react-dom (whose
 * server renderer refuses to load while react and react-dom differ by a patch
 * version). Text is escaped, matching what React does on render, and any
 * dangerouslySetInnerHTML fails the test outright.
 */
function toHtml(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return escape(String(node));
  if (Array.isArray(node)) return node.map(toHtml).join("");
  if (isValidElement<Record<string, unknown> & { children?: ReactNode }>(node)) {
    if (typeof node.type !== "string") throw new Error("Unexpected component in reply tree");
    const { children, ...props } = node.props;
    if ("dangerouslySetInnerHTML" in props) throw new Error("Raw HTML injection in reply tree");
    const attrs = Object.entries(props)
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => ` ${k === "className" ? "class" : k}="${escape(v as string)}"`)
      .join("");
    return `<${node.type}${attrs}>${toHtml(children)}</${node.type}>`;
  }
  throw new Error("Unexpected node in reply tree");
}

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

const render = (source: string) => toHtml(ReplyMarkdown({ source }));

describe("ReplyMarkdown", () => {
  it("renders headings below the panel heading", () => {
    const html = render("# Steps\n## Detail\n### Small");
    expect(html).toContain(">Steps</h3>");
    expect(html).toContain(">Detail</h4>");
    expect(html).toContain(">Small</h4>");
    expect(html).not.toMatch(/<h[12]/);
  });

  it("renders bullet and numbered lists", () => {
    const html = render("- Wumpini\n- Mariama\n\n1. Open Sheets\n2. Add a row");
    expect(html).toMatch(/<ul[^>]*><li>Wumpini<\/li><li>Mariama<\/li><\/ul>/);
    expect(html).toMatch(/<ol[^>]*><li>Open Sheets<\/li><li>Add a row<\/li><\/ol>/);
  });

  it("renders bold, italic and inline code", () => {
    const html = render("Use **SUM** with *care* and `=SUM(B2:B9)`");
    expect(html).toMatch(/<strong[^>]*>SUM<\/strong>/);
    expect(html).toContain("<em>care</em>");
    expect(html).toMatch(/<code[^>]*>=SUM\(B2:B9\)<\/code>/);
  });

  it("keeps fenced code verbatim and escaped", () => {
    const html = render("```js\nif (a < b && c) console.log('**hi**');\n```");
    expect(html).toContain("<pre");
    expect(html).toContain("if (a &lt; b &amp;&amp; c) console.log(&#x27;**hi**&#x27;);");
    expect(html).not.toContain("<strong");
  });

  it("closes an unfinished fence while a reply streams", () => {
    expect(render("Try this:\n```\nSELECT *")).toMatch(/<pre[^>]*><code>SELECT \*<\/code><\/pre>/);
  });

  it("never renders raw HTML from the reply", () => {
    const html = render('<script>alert(1)</script>\n\n<img src=x onerror="alert(1)">\n\n**<b>bold</b>**');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<b>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("opens external links safely in a new tab", () => {
    const html = render("See [LearnFree](https://www.learnfree.org/series/google-sheets)");
    expect(html).toContain('href="https://www.learnfree.org/series/google-sheets"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer nofollow"');
  });

  it("drops unsafe link targets but keeps the label", () => {
    const html = render("[click](javascript:alert(1)) and [data](data:text/html,hi) and [x](//evil.example)");
    expect(html).not.toContain("<a");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("click");
  });

  it("keeps site links in the same tab", () => {
    const html = render("Back to [the roadmap](/roadmaps/data)");
    expect(html).toContain('href="/roadmaps/data"');
    expect(html).not.toContain("target=");
  });
});
