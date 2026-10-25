import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import type { TreeNode } from "@/lib/roadmaps/tree";
import { NodeMark } from "./progress";

/**
 * The structured outline of a roadmap: top level sections as cards, their
 * topics as a numbered list beneath. One column on phones, two from lg.
 * Progress marks are request time holes; the rest is prerendered.
 */
export function RoadmapOutline({ slug, tree }: { slug: string; tree: TreeNode[] }) {
  return (
    <ol className="grid gap-4 lg:grid-cols-2" aria-label="Roadmap outline">
      {tree.map((section) => (
        <li key={section.id} className="flex flex-col rounded-lg border border-line bg-surface">
          <NodeRow slug={slug} node={section} heading />
          {section.summary && <p className="px-4 pb-3 text-sm text-content-2">{section.summary}</p>}
          {section.children.length > 0 && (
            <ol className="border-t border-line py-1">
              <Topics slug={slug} nodes={section.children} />
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}

function Topics({ slug, nodes }: { slug: string; nodes: TreeNode[] }) {
  return nodes.map((node) => (
    <li key={node.id}>
      <NodeRow slug={slug} node={node} />
      {node.children.length > 0 && (
        <ol className="ml-6 border-l border-line">
          <Topics slug={slug} nodes={node.children} />
        </ol>
      )}
    </li>
  ));
}

function NodeRow({ slug, node, heading = false }: { slug: string; node: TreeNode; heading?: boolean }) {
  return (
    <Link
      href={`/roadmaps/${slug}/${node.slug}`}
      className={`flex min-h-11 items-center gap-3 px-4 py-2 hover:bg-surface-sunken ${heading ? "rounded-t-lg pt-3" : ""}`}
    >
      <span className="w-8 shrink-0 text-sm text-content-3 tabular-nums">{node.number}</span>
      <span className={`flex-1 ${heading ? "text-lg font-bold text-content" : "text-content"}`}>
        {node.title}
        {node.is_optional && (
          <span className="ml-2 inline-block rounded-full border border-line px-2 py-0.5 align-middle text-xs font-medium text-content-2">
            Optional
          </span>
        )}
      </span>
      <Suspense fallback={null}>
        <NodeMark nodeId={node.id} />
      </Suspense>
      <ChevronRight aria-hidden className="size-4 shrink-0 text-content-3" />
    </Link>
  );
}
