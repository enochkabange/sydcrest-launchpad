/**
 * A deliberately small markdown parser for node content. It turns text into a
 * tree of plain data that `<Markdown>` renders as React elements, so nothing
 * is ever injected as HTML: a `<script>` in the source stays visible text.
 *
 * Supported: headings (#, ##, ###), paragraphs, bullet and numbered lists,
 * fenced code blocks, block quotes, **bold**, *italic*, `code` and
 * [links](https://...). Links that are not http or https render as text.
 */

export type Inline =
  | { type: "text"; text: string }
  | { type: "strong"; children: Inline[] }
  | { type: "em"; children: Inline[] }
  | { type: "code"; text: string }
  | { type: "link"; href: string; children: Inline[] };

export type Block =
  | { type: "heading"; level: 1 | 2 | 3; children: Inline[] }
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; ordered: boolean; items: Inline[][] }
  | { type: "code"; text: string }
  | { type: "quote"; children: Inline[] };

const SAFE_HREF = /^https?:\/\/[^\s]+$/i;

export function safeHref(href: string): string | null {
  const trimmed = href.trim();
  return SAFE_HREF.test(trimmed) ? trimmed : null;
}

// Order matters: code first so its contents are never read as emphasis.
const INLINE = /`([^`]+)`|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\*([^*\s](?:[^*]*?[^*\s])?)\*/;

export function parseInline(source: string): Inline[] {
  const out: Inline[] = [];
  let rest = source;
  while (rest.length) {
    const match = INLINE.exec(rest);
    if (!match) {
      out.push({ type: "text", text: rest });
      break;
    }
    if (match.index > 0) out.push({ type: "text", text: rest.slice(0, match.index) });
    const [whole, code, strong, linkText, linkHref, em] = match;
    if (code !== undefined) out.push({ type: "code", text: code });
    else if (strong !== undefined) out.push({ type: "strong", children: parseInline(strong) });
    else if (linkText !== undefined) {
      const href = safeHref(linkHref);
      const children = parseInline(linkText);
      if (href) out.push({ type: "link", href, children });
      else out.push(...children);
    } else if (em !== undefined) out.push({ type: "em", children: parseInline(em) });
    rest = rest.slice(match.index + whole.length);
  }
  // Merge neighbouring text runs so the tree stays tidy.
  return out.reduce<Inline[]>((acc, node) => {
    const last = acc[acc.length - 1];
    if (node.type === "text" && last?.type === "text") last.text += node.text;
    else acc.push(node);
    return acc;
  }, []);
}

const HEADING = /^(#{1,3})\s+(.*)$/;
const BULLET = /^\s*[-*+]\s+(.*)$/;
const NUMBERED = /^\s*\d+[.)]\s+(.*)$/;
const FENCE = /^\s*```/;
const QUOTE = /^\s*>\s?(.*)$/;

export function parseMarkdown(source: string | null | undefined): Block[] {
  if (!source) return [];
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (FENCE.test(line)) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !FENCE.test(lines[i])) body.push(lines[i++]);
      i++; // closing fence (or end of input)
      blocks.push({ type: "code", text: body.join("\n") });
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length as 1 | 2 | 3,
        children: parseInline(heading[2].trim()),
      });
      i++;
      continue;
    }

    if (BULLET.test(line) || NUMBERED.test(line)) {
      const ordered = !BULLET.test(line);
      const pattern = ordered ? NUMBERED : BULLET;
      const items: Inline[][] = [];
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(parseInline(pattern.exec(lines[i])![1].trim()));
        i++;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    if (QUOTE.test(line)) {
      const body: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) body.push(QUOTE.exec(lines[i++])![1]);
      blocks.push({ type: "quote", children: parseInline(body.join(" ").trim()) });
      continue;
    }

    const body: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !FENCE.test(lines[i]) &&
      !HEADING.test(lines[i]) &&
      !BULLET.test(lines[i]) &&
      !NUMBERED.test(lines[i]) &&
      !QUOTE.test(lines[i])
    ) {
      body.push(lines[i++].trim());
    }
    blocks.push({ type: "paragraph", children: parseInline(body.join(" ")) });
  }

  return blocks;
}
