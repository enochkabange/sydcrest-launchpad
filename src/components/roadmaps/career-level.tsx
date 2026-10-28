import { CAREER_LEVEL_LABEL } from "@/lib/roadmaps/levels";
import type { ViewNode } from "@/lib/roadmaps/view-model";

/**
 * The career level of a roadmap section (issue #255), as a short suffix any
 * view can slot into its section header: " · Junior". Renders nothing when a
 * section has no level, so views stay unchanged for unrated roadmaps.
 */
export function CareerLevelSuffix({ node }: { node: Pick<ViewNode, "careerLevel"> }) {
  if (!node.careerLevel) return null;
  return <span data-testid="section-level"> · {CAREER_LEVEL_LABEL[node.careerLevel]}</span>;
}

/** The same level as a small tag line, for views whose header is a row. */
export function CareerLevelTag({ node, className = "" }: { node: Pick<ViewNode, "careerLevel">; className?: string }) {
  if (!node.careerLevel) return null;
  return (
    <p className={`text-xs font-semibold tracking-wide text-content-3 uppercase ${className}`} data-testid="section-level">
      Level: {CAREER_LEVEL_LABEL[node.careerLevel]}
    </p>
  );
}
