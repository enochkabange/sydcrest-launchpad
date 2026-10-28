import type { ReactNode } from "react";
import { parseMarkdown, type Block, type Inline } from "@/lib/roadmaps/markdown";

/**
 * Renders reviewed node content. Everything goes through React elements, so
 * text is escaped and there is no raw HTML injection anywhere on this path.
 */
export function Markdown({ source }: { source: string }) {
  return <div className="flex flex-col gap-4 text-base leading-relaxed text-content-2">{parseMarkdown(source).map(renderBlock)}</div>;
}

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level}` as const;
      const size = block.level === 2 ? "text-xl" : block.level === 3 ? "text-lg" : "text-base";
      return (
        <Tag key={key} className={`${size} mt-2 text-content`}>
          {renderInlines(block.children)}
        </Tag>
      );
    }
    case "paragraph":
      return <p key={key}>{renderInlines(block.children)}</p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag key={key} className={`flex flex-col gap-1.5 pl-6 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, i) => (
            <li key={i}>{renderInlines(item)}</li>
          ))}
        </Tag>
      );
    }
    case "code":
      return (
        <pre key={key} tabIndex={0} className="overflow-x-auto rounded-md border border-line bg-surface-sunken p-3 text-sm text-content">
          <code>{block.text}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote key={key} className="border-l-4 border-line-strong pl-4 text-content">
          {renderInlines(block.children)}
        </blockquote>
      );
    case "rule":
      return <hr key={key} className="border-line" />;
  }
}

function renderInlines(nodes: Inline[]): ReactNode[] {
  return nodes.map((node, i) => {
    switch (node.type) {
      case "text":
        return node.text;
      case "strong":
        return (
          <strong key={i} className="font-semibold text-content">
            {renderInlines(node.children)}
          </strong>
        );
      case "em":
        return <em key={i}>{renderInlines(node.children)}</em>;
      case "code":
        return (
          <code key={i} className="rounded bg-surface-sunken px-1 py-0.5 text-[0.9em] text-content">
            {node.text}
          </code>
        );
      case "link": {
        const external = /^https?:/i.test(node.href);
        return (
          <a
            key={i}
            href={node.href}
            className="text-content-link underline underline-offset-2"
            {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
          >
            {renderInlines(node.children)}
          </a>
        );
      }
    }
  });
}
