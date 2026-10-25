import type { ReactNode } from "react";
import { parseMarkdown, type Block, type Inline } from "./markdown-parse";

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

const HEADINGS = {
  1: "h3",
  2: "h4",
  3: "h5",
} as const;

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.type) {
    case "heading": {
      const Tag = HEADINGS[block.level];
      return (
        <Tag key={key} className="pt-2 text-lg font-semibold text-content">
          {renderInline(block.children)}
        </Tag>
      );
    }
    case "paragraph":
      return <p key={key}>{renderInline(block.children)}</p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag key={key} className={`flex flex-col gap-1.5 pl-5 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </Tag>
      );
    }
    case "code":
      return (
        <pre key={key} className="overflow-x-auto rounded-md border border-line bg-surface-sunken p-3 text-sm">
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

export function Markdown({ source }: { source: string | null | undefined }) {
  const blocks = parseMarkdown(source);
  if (!blocks.length) return null;
  return <div className="flex flex-col gap-4 text-base leading-relaxed text-content-2">{blocks.map(renderBlock)}</div>;
}
