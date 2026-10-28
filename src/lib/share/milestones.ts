/**
 * Which milestone a learner just reached, for the celebration after a quiz
 * pass. Pure, so the section rule is unit tested; the database has the same
 * rule in private.section_of (supabase/migrations/20261029160000_sharing_loop.sql).
 */

export type TreeRow = { id: string; parent_id: string | null; kind: string | null };

/** The section a node belongs to: its top level ancestor (or itself), unless that is a checkpoint. */
export function sectionIdOf(nodes: TreeRow[], nodeId: string): string | null {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  let current = byId.get(nodeId);
  const seen = new Set<string>();
  while (current?.parent_id) {
    if (seen.has(current.id)) return null;
    seen.add(current.id);
    current = byId.get(current.parent_id);
  }
  if (!current || current.kind === "checkpoint") return null;
  return current.id;
}

export type MilestoneRow = { id: string; type: string; ref_id: string | null; created_at: string };

/** The biggest milestone among those held for this node: the roadmap, then the section, then the topic. */
export function biggestMilestone(
  rows: MilestoneRow[],
  refs: { nodeId: string; sectionId: string | null; roadmapId: string | null },
): MilestoneRow | null {
  const find = (type: string, ref: string | null) => (ref ? rows.find((r) => r.type === type && r.ref_id === ref) : undefined);
  return (
    find("roadmap_completed", refs.roadmapId) ??
    find("section_completed", refs.sectionId) ??
    find("roadmap_node_completed", refs.nodeId) ??
    null
  );
}
