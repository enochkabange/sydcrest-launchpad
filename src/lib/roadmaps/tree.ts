/**
 * Pure helpers that turn the flat `roadmap_nodes` rows into the outline a
 * learner reads. No I/O here so it is cheap to unit test.
 */

export type FlatNode = {
  id: string;
  parent_id: string | null;
  slug: string;
  title: string;
  summary: string | null;
  position: number;
  is_optional: boolean;
};

export type TreeNode = FlatNode & {
  children: TreeNode[];
  /** Outline number such as "2.3", following sibling order. */
  number: string;
  depth: number;
};

function bySiblingOrder(a: FlatNode, b: FlatNode) {
  return a.position - b.position || a.title.localeCompare(b.title) || a.id.localeCompare(b.id);
}

/**
 * Builds the node tree. Siblings sort by `position` (title, then id, break
 * ties so the order is stable). A node whose parent is missing (for example
 * filtered out) is promoted to the top level rather than dropped, and any
 * cycle is broken so every node appears exactly once.
 */
export function buildNodeTree<T extends FlatNode>(nodes: readonly T[]): TreeNode[] {
  const ids = new Set(nodes.map((n) => n.id));
  const childrenOf = new Map<string | null, T[]>();
  for (const node of nodes) {
    const parent = node.parent_id && ids.has(node.parent_id) && node.parent_id !== node.id ? node.parent_id : null;
    const list = childrenOf.get(parent) ?? [];
    list.push(node);
    childrenOf.set(parent, list);
  }

  const placed = new Set<string>();
  const build = (parent: string | null, prefix: string, depth: number): TreeNode[] => {
    const kids = (childrenOf.get(parent) ?? []).filter((n) => !placed.has(n.id)).sort(bySiblingOrder);
    kids.forEach((n) => placed.add(n.id));
    return kids.map((node, i) => {
      const number = prefix ? `${prefix}.${i + 1}` : String(i + 1);
      return { ...node, number, depth, children: build(node.id, number, depth + 1) };
    });
  };

  const roots = build(null, "", 0);
  // Nodes only reachable through a cycle never hang off a root; surface them at the top level.
  const stranded = nodes.filter((n) => !placed.has(n.id)).sort(bySiblingOrder);
  for (const node of stranded) {
    if (placed.has(node.id)) continue;
    placed.add(node.id);
    const number = String(roots.length + 1);
    roots.push({ ...node, number, depth: 0, children: build(node.id, number, 1) });
  }
  return roots;
}

/** Depth first, reading order: a section, then its topics, then the next section. */
export function flattenTree(tree: readonly TreeNode[]): TreeNode[] {
  const out: TreeNode[] = [];
  const walk = (list: readonly TreeNode[]) => {
    for (const node of list) {
      out.push(node);
      walk(node.children);
    }
  };
  walk(tree);
  return out;
}

/** The node, its ancestors (root first) and its neighbours in reading order. */
export function locateNode(tree: readonly TreeNode[], slug: string) {
  const flat = flattenTree(tree);
  const index = flat.findIndex((n) => n.slug === slug);
  if (index === -1) return null;
  const node = flat[index];

  const byId = new Map(flat.map((n) => [n.id, n]));
  const ancestors: TreeNode[] = [];
  let cursor = node.parent_id ? byId.get(node.parent_id) : undefined;
  while (cursor && ancestors.length < flat.length) {
    ancestors.unshift(cursor);
    cursor = cursor.parent_id ? byId.get(cursor.parent_id) : undefined;
  }

  return {
    node,
    ancestors,
    previous: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

export type ProgressStatus = "not_started" | "in_progress" | "done";

/** Required (non optional) nodes done out of required nodes, the same rule as roadmap completion. */
export function progressSummary(
  nodes: readonly Pick<FlatNode, "id" | "is_optional">[],
  statusById: ReadonlyMap<string, ProgressStatus>,
) {
  const required = nodes.filter((n) => !n.is_optional);
  const done = required.filter((n) => statusById.get(n.id) === "done").length;
  const started = nodes.some((n) => {
    const s = statusById.get(n.id);
    return s === "in_progress" || s === "done";
  });
  return { done, total: required.length, started };
}
