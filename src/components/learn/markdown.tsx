import type { ReactNode } from "react";
import { parseMarkdown, type Block, type Inline, type ListBlock, type TableBlock } from "./markdown-parse";
import { headingIds, inlineText } from "./lesson-toc";

/**
 * Renders node content from markdown as React elements only (no raw HTML).
 * Headings start at h3 because the page already has h1 (node) and h2 (section).
 */
function renderInline(nodes: Inline[]): ReactNode {
  return nodes.map((node, i) => {
    switch (node.type) {
      case "text":
        return node.text;
      case "strong":
        return <strong key={i} className="font-semibold text-content">{renderInline(node.children)}</strong>;
      case "em":
        return <em key={i}>{renderInline(node.children)}</em>;
      case "code":
        return (
          <code key={i} className="rounded bg-surface-sunken px-1 py-0.5 font-mono text-[0.9em] text-content">
            {node.text}
          </code>
        );
      case "link":
        return (
          <a
            key={i}
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-content-link underline underline-offset-2"
          >
            {renderInline(node.children)}
          </a>
        );
    }
  });
}

// The markdown sits under the lesson's h2 sections, and lesson content uses
// "##" for its top level, so "#" and "##" both become h3 (no skipped levels).
const HEADINGS = {
  1: "h3",
  2: "h3",
  3: "h4",
} as const;

function renderList(list: ListBlock, key: number, nested = false): ReactNode {
  const Tag = list.ordered ? "ol" : "ul";
  const marker = list.ordered ? "list-decimal" : nested ? "list-[circle]" : "list-disc";
  return (
    <Tag key={key} start={list.start} className={`flex flex-col gap-1.5 pl-5 ${marker} ${nested ? "mt-1.5" : ""}`}>
      {list.items.map((item, i) => (
        <li key={i}>
          {renderInline(item.children)}
          {item.sublist && renderList(item.sublist, 0, true)}
        </li>
      ))}
    </Tag>
  );
}

// Literal class names so Tailwind sees every one.
const ALIGN = { left: "text-left", center: "text-center", right: "text-right" } as const;

/**
 * A table in its own scrolling region (issue #267): on a phone a wide table
 * scrolls sideways inside the box, never the page. The region is focusable
 * so keyboard users can scroll it too, and named so screen readers find it.
 */
function renderTable(table: TableBlock, key: number): ReactNode {
  const caption = table.caption && inlineText(table.caption).trim();
  const columns = table.header.map((cell) => inlineText(cell).trim()).filter(Boolean);
  const label = caption || (columns.length ? `Table: ${columns.join(", ")}` : "Table");
  const align = (i: number) => ALIGN[table.align[i] ?? "left"];
  return (
    <div key={key} role="region" aria-label={label} tabIndex={0} className="max-w-full overflow-x-auto rounded-md border border-line">
      <table className="w-full border-collapse text-sm">
        {table.caption && (
          <caption className="border-b border-line px-3 py-2 text-left font-semibold text-content">
            {renderInline(table.caption)}
          </caption>
        )}
        <thead className="bg-surface-sunken">
          <tr>
            {table.header.map((cell, i) => (
              <th key={i} scope="col" className={`px-3 py-2 align-bottom font-semibold text-content ${align(i)}`}>
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line border-t border-line">
          {table.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, i) => (
                <td key={i} className={`min-w-32 px-3 py-2 align-top ${align(i)}`}>
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: Block, key: number, id?: string): ReactNode {
  switch (block.type) {
    case "heading": {
      const Tag = HEADINGS[block.level];
      return (
        <Tag key={key} id={id} className="scroll-mt-24 pt-2 text-lg font-semibold text-content">
          {renderInline(block.children)}
        </Tag>
      );
    }
    case "paragraph":
      return <p key={key}>{renderInline(block.children)}</p>;
    case "list":
      return renderList(block, key);
    case "table":
      return renderTable(block, key);
    case "code":
      return (
        <pre key={key} tabIndex={0} className="overflow-x-auto rounded-md border border-line bg-surface-sunken p-3 text-sm">
          <code className="font-mono text-content">{block.text}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote key={key} className="border-l-4 border-line-strong pl-4 italic">
          {renderInline(block.children)}
        </blockquote>
      );
  }
}

/**
 * `idPrefix` gives every heading an id (the same ones `lessonToc` links to),
 * so the lesson's table of contents can jump to it.
 */
export function Markdown({ source, idPrefix }: { source: string | null | undefined; idPrefix?: string }) {
  const blocks = parseMarkdown(source);
  if (!blocks.length) return null;
  const ids = idPrefix
    ? headingIds(
        blocks.flatMap((b) => (b.type === "heading" ? [inlineText(b.children).trim()] : [])),
        idPrefix,
      )
    : [];
  let heading = 0;
  return (
    <div className="flex flex-col gap-4 text-base leading-relaxed text-content-2">
      {blocks.map((block, i) => renderBlock(block, i, block.type === "heading" && idPrefix ? ids[heading++] : undefined))}
    </div>
  );
}
