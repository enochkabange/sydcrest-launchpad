/**
 * Ordering within a roadmap. Content is authored as a flat list with parents
 * before children, and the list order becomes `position`, so "next" is simply
 * the following position. Ties fall back to the slug so the order never
 * depends on what the database happened to return first.
 */
export type OrderedNode = {
  id: string;
  slug: string;
  title: string;
  position: number;
  is_optional: boolean;
};

export function byPosition<T extends OrderedNode>(nodes: readonly T[]): T[] {
  return [...nodes].sort((a, b) => a.position - b.position || a.slug.localeCompare(b.slug));
}

/** The node after `currentId` in roadmap order, or null at the end (or if it is not in the list). */
export function nextByPosition<T extends OrderedNode>(nodes: readonly T[], currentId: string): T | null {
  const ordered = byPosition(nodes);
  const index = ordered.findIndex((n) => n.id === currentId);
  if (index === -1) return null;
  return ordered[index + 1] ?? null;
}

/**
 * Where to pick up: the first node in roadmap order that is not done.
 * Required nodes win over optional ones, so an unfinished optional extra never
 * hides the next node that counts. Null when every node is done.
 */
export function nextUnfinished<T extends OrderedNode>(nodes: readonly T[], doneIds: ReadonlySet<string>): T | null {
  const open = byPosition(nodes).filter((n) => !doneIds.has(n.id));
  return open.find((n) => !n.is_optional) ?? open[0] ?? null;
}

/** Required nodes done out of required nodes, the same rule the database uses for roadmap_completed. */
export function requiredProgress(nodes: readonly OrderedNode[], doneIds: ReadonlySet<string>) {
  const required = nodes.filter((n) => !n.is_optional);
  const done = required.filter((n) => doneIds.has(n.id)).length;
  return { done, total: required.length, complete: required.length > 0 && done === required.length };
}
