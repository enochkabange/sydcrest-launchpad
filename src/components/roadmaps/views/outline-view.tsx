import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { formatEstimate } from "@/lib/roadmaps/estimates";
import { nodePath } from "@/lib/roadmaps/seo";
import type { ViewNode } from "@/lib/roadmaps/view-model";
import { ViewNodeMark } from "../progress";
import { choiceLabel, Minutes, NodeBadges, SectionMeta } from "./node-meta";
import { RoadmapTree, SectionToggle, SectionTreeItem, TreeGroup } from "./tree";
import type { RoadmapViewProps } from "./types";

const OPTIONAL_HIDE = "group-data-[hide-optional]/roadmap:hidden";

/**
 * The "List" view: the structured outline. Top level sections as cards, their
 * topics (then checkpoints) as a numbered list beneath. One column on phones,
 * two from lg. A WAI-ARIA tree like the map (tree.tsx). Progress marks are
 * request time holes; the rest is prerendered.
 */
export function OutlineView({ slug, view }: RoadmapViewProps) {
  return (
    <RoadmapTree label="Roadmap outline" className="grid items-start gap-4 lg:grid-cols-2">
      {view.sections.map((section, i) => {
        const items = [...section.topics, ...section.checkpoints];
        const groupId = `outline-group-${section.node.id}`;
        const time = formatEstimate(section.estimate);
        return (
          <li
            key={section.node.id}
            role="none"
            className={`flex flex-col rounded-lg border border-line bg-surface ${section.node.optional ? OPTIONAL_HIDE : ""}`}
          >
            <div className="flex items-start">
              <SectionTreeItem
                id={section.node.id}
                href={nodePath(slug, section.node.slug)}
                groupId={items.length ? groupId : undefined}
                label={section.node.title}
                first={i === 0}
                className="flex min-h-11 flex-1 items-center gap-3 rounded-tl-lg px-4 pt-3 pb-2 hover:bg-surface-sunken"
              >
                <span className="w-8 shrink-0 text-sm text-content-3 tabular-nums">{section.node.number}</span>
                <span className="flex flex-1 flex-col" data-node-id={section.node.id}>
                  <span className="text-lg font-bold text-content">
                    {section.node.title}
                    {section.node.optional && <OptionalTag />}
                  </span>
                  <SectionMeta section={section} className="text-content-2" />
                  {time && <span className="text-sm text-content-2">{time}</span>}
                </span>
                <Suspense fallback={null}>
                  <ViewNodeMark view={view} nodeId={section.node.id} />
                </Suspense>
              </SectionTreeItem>
              {items.length > 0 && <SectionToggle id={section.node.id} title={section.node.title} className="mt-1 mr-1" />}
            </div>
            {section.node.summary && <p className="px-4 pb-3 text-sm text-content-2">{section.node.summary}</p>}
            {items.length > 0 && (
              <TreeGroup sectionId={section.node.id} id={groupId} label={`Section ${section.number} topics`} className="border-t border-line py-1">
                <Topics slug={slug} view={view} nodes={items} level={2} />
              </TreeGroup>
            )}
          </li>
        );
      })}
    </RoadmapTree>
  );
}

function Topics({ slug, view, nodes, level }: RoadmapViewProps & { nodes: ViewNode[]; level: number }) {
  return nodes.map((node) => {
    const choice = choiceLabel(view, node);
    return (
      <li key={node.id} role="none" className={node.optional ? OPTIONAL_HIDE : ""}>
        <Link
          href={nodePath(slug, node.slug)}
          role="treeitem"
          aria-level={level}
          tabIndex={-1}
          data-label={node.title}
          data-node-id={node.id}
          className="flex min-h-11 items-center gap-3 px-4 py-2 hover:bg-surface-sunken has-[[data-up-next]]:bg-surface-sunken"
        >
          <span className="w-8 shrink-0 text-sm text-content-3 tabular-nums">{node.number}</span>
          <span className="flex-1 text-content">
            {node.title}
            {node.optional && <OptionalTag />}
            {choice && <span className="ml-2 inline-block rounded-full border border-roadmap-choice px-2 py-0.5 align-middle text-xs font-medium text-content-2">{choice}</span>}
          </span>
          <NodeBadges node={node} className="text-content-2" />
          <Minutes minutes={node.minutes} className="text-sm text-content-3" />
          <Suspense fallback={null}>
            <ViewNodeMark view={view} nodeId={node.id} />
          </Suspense>
          <ChevronRight aria-hidden className="size-4 shrink-0 text-content-3" />
        </Link>
        {node.children.length > 0 && (
          <ol role="none" className="ml-6 border-l border-line">
            <Topics slug={slug} view={view} nodes={node.children} level={level + 1} />
          </ol>
        )}
      </li>
    );
  });
}

function OptionalTag() {
  return (
    <span className="ml-2 inline-block rounded-full border border-line px-2 py-0.5 align-middle text-xs font-medium text-content-2">
      Optional
    </span>
  );
}
