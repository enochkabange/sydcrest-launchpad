import type { ViewNode, ViewSection } from "@/lib/roadmaps/view-model";
import { formatMinutes } from "@/lib/roadmaps/estimates";

/*
 * Small, optional pieces every view draws the same way. Each renders nothing
 * when its data is missing, so content can fill them later without a view
 * change: topic difficulty and complexity, a section's career level and
 * jobs (a later content PR), and time estimates.
 */

const DIFFICULTY: Record<NonNullable<ViewNode["difficulty"]>, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const CAREER_LEVEL: Record<NonNullable<ViewSection["careerLevel"]>, string> = {
  foundation: "Foundation",
  junior: "Junior level",
  mid: "Mid level",
  specialist: "Specialist",
};

/** "about 25 min", or nothing when the node has no lesson yet. */
export function Minutes({ minutes, className = "" }: { minutes: number | null; className?: string }) {
  if (minutes === null) return null;
  return <span className={`shrink-0 whitespace-nowrap tabular-nums ${className}`}>{formatMinutes(minutes)}</span>;
}

/** The topic's badge slot: difficulty (and complexity) when content sets them. */
export function NodeBadges({ node, className = "" }: { node: ViewNode; className?: string }) {
  if (!node.difficulty && node.complexity === null) return null;
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-semibold ${className}`} data-slot="node-badges">
      {node.difficulty && <span className="rounded-sm border border-current/40 px-1.5 py-0.5">{DIFFICULTY[node.difficulty]}</span>}
      {node.complexity !== null && <span className="sr-only">Complexity {node.complexity} of 5</span>}
    </span>
  );
}

/** The section header slot: career level and the jobs it prepares for, when content sets them. */
export function SectionMeta({ section, className = "" }: { section: ViewSection; className?: string }) {
  if (!section.careerLevel && section.jobs.length === 0) return null;
  return (
    <span className={`text-sm ${className}`} data-slot="section-meta">
      {section.careerLevel && <span className="font-semibold">{CAREER_LEVEL[section.careerLevel]}</span>}
      {section.careerLevel && section.jobs.length > 0 && " · "}
      {section.jobs.length > 0 && <span>Jobs: {section.jobs.join(", ")}</span>}
    </span>
  );
}

/** "Choose 1 of 3" for a topic in a pick one group, from the view's groups. */
export function choiceLabel(view: { choiceGroups: { key: string; parentId: string | null; nodeIds: string[] }[] }, node: ViewNode) {
  if (!node.choiceGroup) return null;
  const group = view.choiceGroups.find((g) => g.nodeIds.includes(node.id));
  return group ? `Choose 1 of ${group.nodeIds.length}` : "Choose one";
}
