import type { ReactNode } from "react";
import { parseMarkdown, type Block, type Inline } from "@/lib/roadmaps/markdown";

/**
 * Renders a Study Buddy reply as Markdown, safely. It reuses the reviewed
 * content parser, which builds a plain data tree that React renders, so text
 * is always escaped and raw HTML from the model shows as literal text. Links
 * are kept only for http(s) URLs and site paths, and external ones open in a
 * new tab with rel="noopener noreferrer nofollow".
 *
 * Sized for the chat panel: headings sit below the panel's h2 and code
 * blocks scroll sideways instead of widening the page. Works on partial
 * text while a reply streams (an unclosed fence runs to the end).
 */
export function ReplyMarkdown({ source }: { source: string }) {
  return <div className="flex min-w-0 flex-col gap-2 break-words">{parseMarkdown(source).map(renderBlock)}</div>;
}

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.type) {
    case "heading": {
      const Tag = block.level === 2 ? "h3" : "h4";
      return (
        <Tag key={key} className={`${block.level === 2 ? "text-base" : "text-sm"} mt-1 font-semibold text-content`}>
          {renderInlines(block.children)}
        </Tag>
      );
    }
    case "paragraph":
      return <p key={key}>{renderInlines(block.children)}</p>;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag key={key} className={`flex flex-col gap-1 pl-5 ${block.ordered ? "list-decimal" : "list-disc"}`}>
          {block.items.map((item, i) => (
            <li key={i}>{renderInlines(item)}</li>
          ))}
        </Tag>
      );
    }
    case "code":
      return (
        <pre
          key={key}
          className="max-w-full overflow-x-auto rounded-md border border-line bg-surface-sunken p-3 text-sm text-content"
        >
          <code>{block.text}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote key={key} className="border-l-4 border-line-strong pl-3">
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
          <strong key={i} className="font-semibold">
            {renderInlines(node.children)}
          </strong>
        );
      case "em":
        return <em key={i}>{renderInlines(node.children)}</em>;
      case "code":
        return (
          <code key={i} className="rounded bg-surface-sunken px-1 py-0.5 text-[0.9em]">
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
