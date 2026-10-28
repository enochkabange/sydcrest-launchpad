export type NodeRow = { id: string; slug: string; title: string; parent_id: string | null; position: number };

/** Roadmap nodes in reading order: each top level section, then its topics, depth first. */
export function readingOrder(nodes: NodeRow[]): NodeRow[] {
  const children = new Map<string | null, NodeRow[]>();
  for (const n of nodes) children.set(n.parent_id, [...(children.get(n.parent_id) ?? []), n]);
  for (const list of children.values()) list.sort((a, b) => a.position - b.position);
  const out: NodeRow[] = [];
  const visit = (parent: string | null) => {
    for (const n of children.get(parent) ?? []) {
      out.push(n);
      visit(n.id);
    }
  };
  visit(null);
  return out;
}
