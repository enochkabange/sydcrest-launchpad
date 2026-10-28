/**
 * A deliberately small Markdown parser for reviewed node content.
 *
 * It produces a plain data tree that React renders as elements, so text is
 * always escaped by React and raw HTML in the source shows up as literal
 * text, never as markup. Links are kept only for http(s) URLs and site paths;
 * anything else (javascript:, data:) is rendered as its label alone.
 *
 * Supported: headings, paragraphs, bullet and numbered lists, fenced code,
 * block quotes, horizontal rules, and inline bold, italic, code and links.
 */

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "code"; text: string }
  | { type: "link"; href: string; children: Inline[] };

export type Block =
  | { type: "heading"; level: 2 | 3 | 4; children: Inline[] }
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "code"; text: string }
  | { type: "quote"; children: Inline[] }
  | { type: "rule" };

const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const BULLET = /^\s*[-*+]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;
const FENCE = /^\s*(```|~~~)/;
const QUOTE = /^\s*>\s?(.*)$/;
const RULE = /^\s*([-*_])(\s*\1){2,}\s*$/;

export function safeHref(raw: string): string | null {
  const href = raw.trim();
  if (/^https?:\/\//i.test(href)) {
    try {
      return new URL(href).toString();
    } catch {
      return null;
    }
  }
  // Site relative paths only; "//host" would leave the site.
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  return null;
}

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const isBlockStart = (line: string) =>
    HEADING.test(line) || BULLET.test(line) || NUMBERED.test(line) || FENCE.test(line) || QUOTE.test(line) || RULE.test(line);

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const fence = line.match(FENCE);
    if (fence) {
      const marker = fence[1];
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(marker)) body.push(lines[i++]);
      i++; // closing fence (or end of input)
      blocks.push({ type: "code", text: body.join("\n") });
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      const level = Math.min(heading[1].length + 1, 4) as 2 | 3 | 4;
      blocks.push({ type: "heading", level, children: parseInline(heading[2]) });
      i++;
      continue;
    }

    if (RULE.test(line)) {
      blocks.push({ type: "rule" });
      i++;
      continue;
    }

    if (BULLET.test(line) || NUMBERED.test(line)) {
      const ordered = !BULLET.test(line);
      const pattern = ordered ? NUMBERED : BULLET;
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(pattern);
        if (m) {
          items.push(m[1]);
        } else if (lines[i].trim() && /^\s+/.test(lines[i]) && items.length && !isBlockStart(lines[i])) {
          items[items.length - 1] += ` ${lines[i].trim()}`; // wrapped continuation line
        } else {
          break;
        }
        i++;
      }
      blocks.push({ type: "list", ordered, items: items.map(parseInline) });
      continue;
    }

    if (QUOTE.test(line)) {
      const body: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) body.push(lines[i++].match(QUOTE)![1]);
      blocks.push({ type: "quote", children: parseInline(body.join(" ").trim()) });
      continue;
    }

    const body: string[] = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) body.push(lines[i++].trim());
    blocks.push({ type: "paragraph", children: parseInline(body.join(" ")) });
  }

  return blocks;
}

// Earliest match wins; order breaks ties (code before emphasis so `**` inside code stays literal).
const INLINE_TOKENS: { type: "code" | "link" | "strong" | "em"; re: RegExp }[] = [
  { type: "code", re: /`([^`]+)`/ },
  { type: "link", re: /\[([^\]]+)\]\(([^)\s]+)\)/ },
  { type: "strong", re: /\*\*(.+?)\*\*|__(.+?)__/ },
  { type: "em", re: /\*([^*]+)\*|(?<![\w])_([^_]+)_(?![\w])/ },
];

export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let rest = text;

  while (rest) {
    let best: { type: (typeof INLINE_TOKENS)[number]["type"]; match: RegExpMatchArray } | null = null;
    for (const token of INLINE_TOKENS) {
      const match = rest.match(token.re);
      if (match && match.index !== undefined && (!best || match.index < best.match.index!)) {
        best = { type: token.type, match };
      }
    }
    if (!best) {
      pushText(out, rest);
      break;
    }

    const { type, match } = best;
    if (match.index! > 0) pushText(out, rest.slice(0, match.index));
    if (type === "code") {
      out.push({ type: "code", text: match[1] });
    } else if (type === "link") {
      const href = safeHref(match[2]);
      const children = parseInline(match[1]);
      if (href) out.push({ type: "link", href, children });
      else out.push(...children);
    } else {
      out.push({ type, children: parseInline(match[1] ?? match[2]) });
    }
    rest = rest.slice(match.index! + match[0].length);
  }

  return out;
}

function pushText(out: Inline[], text: string) {
  const last = out[out.length - 1];
  if (last?.type === "text") last.text += text;
  else out.push({ type: "text", text });
}

/** Plain text of a Markdown string, for meta descriptions. */
export function markdownToText(source: string): string {
  const flatten = (nodes: Inline[]): string =>
    nodes.map((n) => (n.type === "text" || n.type === "code" ? n.text : flatten(n.children))).join("");
  return parseMarkdown(source)
    .map((b) => {
      if (b.type === "list") return b.items.map(flatten).join(" ");
      if (b.type === "code") return b.text;
      if (b.type === "rule") return "";
      return flatten(b.children);
    })
    .filter(Boolean)
    .join(" ");
}

/**
 * The outcome a practice task states, from its "**Done looks like:**" line
 * (every lesson has one), as plain text. Null when the task has none, so the
 * topic panel never invents an outcome.
 */
export function practiceOutcome(practiceMd: string | null | undefined): string | null {
  if (!practiceMd) return null;
  const match = /\*\*Done looks like:?\*\*:?\s*([\s\S]*?)(?:\n\s*\n|$)/i.exec(practiceMd);
  const text = match ? markdownToText(match[1]).trim() : "";
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : null;
}
