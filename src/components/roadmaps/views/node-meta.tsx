import { formatMinutes } from "@/lib/roadmaps/estimates";
import { complexityText, DIFFICULTY_LABEL } from "@/lib/roadmaps/levels";
import type { ViewNode } from "@/lib/roadmaps/view-model";

/*
 * Small, optional pieces every view draws the same way. Each renders nothing
 * when its data is missing: time estimates and a topic's difficulty and
 * complexity (issue #255). A section's career level uses CareerLevelSuffix
 * and CareerLevelTag in src/components/roadmaps/career-level.tsx.
 */

/** "about 25 min", or nothing when the node has no lesson yet. */
export function Minutes({ minutes, className = "" }: { minutes: number | null; className?: string }) {
  if (minutes === null) return null;
  return <span className={`shrink-0 whitespace-nowrap tabular-nums ${className}`}>{formatMinutes(minutes)}</span>;
}

/** The topic's badge slot: difficulty (and complexity) when content sets them. */
export function NodeBadges({ node, className = "" }: { node: ViewNode; className?: string }) {
  if (!node.difficulty && !node.complexity) return null;
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-semibold ${className}`} data-slot="node-badges">
      {node.difficulty && <span className="rounded-sm border border-current/40 px-1.5 py-0.5">{DIFFICULTY_LABEL[node.difficulty]}</span>}
      {node.complexity && <span className="sr-only">{complexityText(node.complexity)}</span>}
    </span>
  );
}

/** "Choose 1 of 3" for a topic in a pick one group, from the view's groups. */
export function choiceLabel(view: { choiceGroups: { key: string; parentId: string | null; nodeIds: string[] }[] }, node: ViewNode) {
  if (!node.choiceGroup) return null;
  const group = view.choiceGroups.find((g) => g.nodeIds.includes(node.id));
  return group ? `Choose 1 of ${group.nodeIds.length}` : "Choose one";
}
