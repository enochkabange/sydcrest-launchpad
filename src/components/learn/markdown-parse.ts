/**
 * A deliberately small markdown parser for node content. It turns text into a
 * tree of plain data that `<Markdown>` renders as React elements, so nothing
 * is ever injected as HTML: a `<script>` in the source stays visible text.
 *
 * Supported: headings (#, ##, ###), paragraphs, bullet and numbered lists
 * (two levels, mixed, numbered lists keep their start number), GFM tables
 * (issue #267), fenced code blocks, block quotes, **bold**, *italic*, `code`
 * and [links](https://...). Links that are not http or https render as text.
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
  | ListBlock
  | TableBlock
  | { type: "code"; text: string }
  | { type: "quote"; children: Inline[] };

/** `start` is set only when a numbered list does not begin at 1. */
export type ListBlock = { type: "list"; ordered: boolean; start?: number; items: ListItem[] };

/** An item's own text, then at most one nested list (lists go two levels deep). */
export type ListItem = { children: Inline[]; sublist?: ListBlock };

export type Align = "left" | "center" | "right" | null;

export type TableBlock = {
  type: "table";
  caption?: Inline[];
  align: Align[];
  header: Inline[][];
  rows: Inline[][][];
};

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
const BULLET = /^(\s*)[-*+]\s+(.*)$/;
const NUMBERED = /^(\s*)(\d{1,9})[.)]\s+(.*)$/;
const FENCE = /^\s*```/;
const QUOTE = /^\s*>\s?(.*)$/;
const CAPTION = /^\s*Table:\s+(.+)$/;
const DELIMITER_CELL = /^:?-+:?$/;

type ListLine = { indent: number; ordered: boolean; number: number; text: string };

/** Leading whitespace as columns, a tab counting as four. */
function indentOf(ws: string): number {
  return ws.replace(/\t/g, "    ").length;
}

function listLine(line: string): ListLine | null {
  const bullet = BULLET.exec(line);
  if (bullet) return { indent: indentOf(bullet[1]), ordered: false, number: 1, text: bullet[2].trim() };
  const numbered = NUMBERED.exec(line);
  if (numbered) return { indent: indentOf(numbered[1]), ordered: true, number: Number(numbered[2]), text: numbered[3].trim() };
  return null;
}

function newList(first: ListLine): ListBlock {
  const list: ListBlock = { type: "list", ordered: first.ordered, items: [] };
  if (first.ordered && first.number !== 1) list.start = first.number;
  return list;
}

/** Splits a table row on unescaped pipes; `\|` stays a literal pipe. */
export function splitRow(line: string): string[] {
  let row = line.trim();
  if (row.startsWith("|")) row = row.slice(1);
  if (row.endsWith("|") && !row.endsWith("\\|")) row = row.slice(0, -1);
  return row.split(/(?<!\\)\|/).map((cell) => cell.replace(/\\\|/g, "|").trim());
}

function delimiterAlign(line: string | undefined): Align[] | null {
  if (line === undefined || !line.includes("|")) return null;
  const cells = splitRow(line);
  if (!cells.every((c) => DELIMITER_CELL.test(c))) return null;
  return cells.map((c) => {
    const left = c.startsWith(":");
    const right = c.endsWith(":");
    return left && right ? "center" : right ? "right" : left ? "left" : null;
  });
}

/**
 * A table starts at a header row with a pipe, followed by a delimiter row
 * with the same number of cells. Anything else is not a table.
 */
function tableAt(lines: string[], i: number): Align[] | null {
  const header = lines[i];
  if (!header?.includes("|") || HEADING.test(header) || FENCE.test(header) || QUOTE.test(header) || listLine(header)) {
    return null;
  }
  const align = delimiterAlign(lines[i + 1]);
  return align && align.length === splitRow(header).length ? align : null;
}

/** True when line `i` starts any block other than a paragraph. */
function startsBlock(lines: string[], i: number): boolean {
  const line = lines[i];
  return (
    FENCE.test(line) ||
    HEADING.test(line) ||
    listLine(line) !== null ||
    QUOTE.test(line) ||
    tableAt(lines, i) !== null ||
    (CAPTION.test(line) && tableAt(lines, i + 1) !== null)
  );
}

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

    const first = listLine(line);
    if (first) {
      // Items at the first item's indent (give or take one space) are the
      // top level; anything indented two or more columns further nests
      // under the item above it. Deeper levels fold into the second level.
      const list = newList(first);
      let next: ListLine | null = first;
      while (next) {
        if (next.indent >= first.indent + 2 && list.items.length) {
          const parent = list.items[list.items.length - 1];
          // The first nested line decides the sublist's marker and start;
          // later nested lines under the same item join that sublist.
          parent.sublist ??= newList(next);
          parent.sublist.items.push({ children: parseInline(next.text) });
        } else if (next.ordered === first.ordered) {
          list.items.push({ children: parseInline(next.text) });
        } else {
          break; // a different marker at the top level starts a new list
        }
        i++;
        next = i < lines.length ? listLine(lines[i]) : null;
      }
      blocks.push(list);
      continue;
    }

    if (QUOTE.test(line)) {
      const body: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) body.push(QUOTE.exec(lines[i++])![1]);
      blocks.push({ type: "quote", children: parseInline(body.join(" ").trim()) });
      continue;
    }

    const caption = CAPTION.exec(line);
    const tableStart = caption ? i + 1 : i;
    const align = tableAt(lines, tableStart);
    if (align) {
      const width = align.length;
      const cells = (row: string) => {
        const raw = splitRow(row).slice(0, width);
        while (raw.length < width) raw.push("");
        return raw.map((cell) => parseInline(cell));
      };
      const table: TableBlock = { type: "table", align, header: cells(lines[tableStart]), rows: [] };
      if (caption) table.caption = parseInline(caption[1].trim());
      i = tableStart + 2;
      while (i < lines.length && lines[i].trim() && lines[i].includes("|") && !startsBlock(lines, i)) {
        table.rows.push(cells(lines[i++]));
      }
      blocks.push(table);
      continue;
    }

    const body: string[] = [];
    while (i < lines.length && lines[i].trim() && (body.length === 0 || !startsBlock(lines, i))) {
      body.push(lines[i++].trim());
    }
    blocks.push({ type: "paragraph", children: parseInline(body.join(" ")) });
  }

  return blocks;
}
