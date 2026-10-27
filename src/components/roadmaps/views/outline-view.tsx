import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { nodePath } from "@/lib/roadmaps/seo";
import type { ViewNode } from "@/lib/roadmaps/view-model";
import { ViewNodeMark } from "../progress";
import type { RoadmapViewProps } from "./types";

/**
 * The "List" view: the structured outline. Top level sections as cards, their
 * topics (then checkpoints) as a numbered list beneath. One column on phones,
 * two from lg. Progress marks are request time holes; the rest is prerendered.
 */
export function OutlineView({ slug, view }: RoadmapViewProps) {
  return (
    <ol className="grid gap-4 lg:grid-cols-2" aria-label="Roadmap outline">
      {view.sections.map((section) => {
        const items = [...section.topics, ...section.checkpoints];
        return (
          <li key={section.node.id} className="flex flex-col rounded-lg border border-line bg-surface">
            <NodeRow slug={slug} view={view} node={section.node} heading />
            {section.node.summary && <p className="px-4 pb-3 text-sm text-content-2">{section.node.summary}</p>}
            {items.length > 0 && (
              <ol className="border-t border-line py-1">
                <Topics slug={slug} view={view} nodes={items} />
              </ol>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Topics({ slug, view, nodes }: RoadmapViewProps & { nodes: ViewNode[] }) {
  return nodes.map((node) => (
    <li key={node.id}>
      <NodeRow slug={slug} view={view} node={node} />
      {node.children.length > 0 && (
        <ol className="ml-6 border-l border-line">
          <Topics slug={slug} view={view} nodes={node.children} />
        </ol>
      )}
    </li>
  ));
}

function NodeRow({ slug, view, node, heading = false }: RoadmapViewProps & { node: ViewNode; heading?: boolean }) {
  return (
    <Link
      href={nodePath(slug, node.slug)}
      className={`flex min-h-11 items-center gap-3 px-4 py-2 hover:bg-surface-sunken ${heading ? "rounded-t-lg pt-3" : ""}`}
    >
      <span className="w-8 shrink-0 text-sm text-content-3 tabular-nums">{node.number}</span>
      <span className={`flex-1 ${heading ? "text-lg font-bold text-content" : "text-content"}`}>
        {node.title}
        {node.optional && (
          <span className="ml-2 inline-block rounded-full border border-line px-2 py-0.5 align-middle text-xs font-medium text-content-2">
            Optional
          </span>
        )}
      </span>
      <Suspense fallback={null}>
        <ViewNodeMark view={view} nodeId={node.id} />
      </Suspense>
      <ChevronRight aria-hidden className="size-4 shrink-0 text-content-3" />
    </Link>
  );
}
