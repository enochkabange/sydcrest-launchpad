/**
 * The roadmap view model: what a roadmap means, ready to draw.
 *
 * Every roadmap renderer (src/components/roadmaps/views) consumes only this.
 * It is pure: no React, no I/O, so it is cheap to unit test and safe to build
 * at prerender time (without progress) and again in a request time island
 * (with the learner's progress). See docs/roadmap-views.md for the contract.
 */
import { flattenTree, type ProgressStatus, type TreeNode } from "./tree";

export type NodeKind = "section" | "topic" | "checkpoint";

export type ViewNode = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  /** Outline number such as "2.3", the same as the outline view shows. */
  number: string;
  depth: number;
  /** What the node means on the roadmap; derived from depth when the row has no kind. */
  kind: NodeKind;
  optional: boolean;
  /** Siblings sharing a key are "pick one of these" alternatives. */
  choiceGroup: string | null;
  /** The learner's status, or null when unknown (a visitor, or the prerendered shell). */
  status: ProgressStatus | null;
  /** Id of the section this node belongs to (a section belongs to itself). */
  sectionId: string;
  /** Position in reading order, 0 based. */
  index: number;
  /** Neighbours in reading order: the same order as the topic page's previous and next. */
  previousId: string | null;
  nextId: string | null;
  /** "Topic 2 of 4" within the section, for topics; null for sections and checkpoints. */
  place: { n: number; of: number } | null;
  /** Nodes nested under a topic (deeper than the shallow section and topic tree). Empty on sections. */
  children: ViewNode[];
};

export type Counts = {
  /** Required (non optional) nodes done, the same rule as roadmap completion. */
  done: number;
  /** Required nodes. */
  total: number;
  /** Any node, optional or not, in progress or done. */
  started: boolean;
  /** Every required node is done (and there is at least one). */
  complete: boolean;
  /** done / total as a whole percentage, 0 when there is nothing to do. */
  percent: number;
};

export type ChoiceGroup = {
  key: string;
  /** The shared parent, or null for top level nodes. */
  parentId: string | null;
  /** Members in reading order. */
  nodeIds: string[];
};

export type ViewSection = {
  node: ViewNode;
  /** 1 based. */
  number: number;
  /** Direct children that are not checkpoints, in order, each with its nested children. */
  topics: ViewNode[];
  /** Checkpoints that close the section, in order. */
  checkpoints: ViewNode[];
  /** Choice groups among this section's nodes. */
  choiceGroups: ChoiceGroup[];
  /** The section node, its topics (and nested nodes) and its checkpoints. */
  counts: Counts;
};

export type RoadmapView = {
  sections: ViewSection[];
  /** Every node by id. */
  byId: Record<string, ViewNode>;
  /** Node id by slug. */
  idBySlug: Record<string, string>;
  /** Every node id in reading order. */
  order: string[];
  /** Every node in the roadmap; the sum of the section counts. */
  counts: Counts;
  choiceGroups: ChoiceGroup[];
  /** True when built with a learner's progress (signed in). */
  hasProgress: boolean;
};

/**
 * Builds the view from the node tree (`buildNodeTree`). Pass the learner's
 * progress to fill statuses and counts; leave it out for the shared, cacheable
 * structure.
 *
 * Structure rules:
 * - A top level node is a section. A top level checkpoint closes the section
 *   before it; one that comes before any section is shown as a section.
 * - A section's direct children are its topics, except checkpoints, which
 *   close the section in order.
 * - Anything deeper nests under its topic (`children`), whatever its kind.
 * - A node whose parent is missing was already promoted to the top level by
 *   `buildNodeTree`, so it becomes a section and is never dropped.
 */
export function buildRoadmapView(tree: readonly TreeNode[], progress?: ReadonlyMap<string, ProgressStatus> | null): RoadmapView {
  const flat = flattenTree(tree);
  const indexById = new Map(flat.map((n, i) => [n.id, i]));

  const byId: Record<string, ViewNode> = {};
  const toView = (node: TreeNode, kind: NodeKind, sectionId: string, nest = true): ViewNode => {
    const index = indexById.get(node.id) ?? 0;
    const view: ViewNode = {
      id: node.id,
      slug: node.slug,
      title: node.title,
      summary: node.summary,
      number: node.number,
      depth: node.depth,
      kind,
      optional: node.is_optional,
      choiceGroup: node.choice_group ?? null,
      status: null,
      sectionId,
      index,
      previousId: index > 0 ? flat[index - 1].id : null,
      nextId: index < flat.length - 1 ? flat[index + 1].id : null,
      place: null,
      children: nest ? node.children.map((child) => toView(child, child.kind === "checkpoint" ? "checkpoint" : "topic", sectionId)) : [],
    };
    byId[view.id] = view;
    return view;
  };

  const sections: ViewSection[] = [];
  for (const root of tree) {
    const previous = sections.at(-1);
    if (root.kind === "checkpoint" && previous) {
      previous.checkpoints.push(toView(root, "checkpoint", previous.node.id));
      continue;
    }
    // A section's children are its topics and checkpoints, listed on the section instead.
    const node = toView(root, "section", root.id, false);
    const topics: ViewNode[] = [];
    const checkpoints: ViewNode[] = [];
    for (const child of root.children) {
      if (child.kind === "checkpoint") checkpoints.push(toView(child, "checkpoint", root.id));
      else topics.push(toView(child, "topic", root.id));
    }
    topics.forEach((topic, i) => (topic.place = { n: i + 1, of: topics.length }));
    sections.push({ node, number: sections.length + 1, topics, checkpoints, choiceGroups: [], counts: EMPTY });
  }

  // Choice groups: siblings (same parent) sharing a key, in reading order.
  const groups = new Map<string, ChoiceGroup>();
  for (const node of flat) {
    if (!node.choice_group) continue;
    const parentId = node.parent_id && indexById.has(node.parent_id) ? node.parent_id : null;
    const id = `${parentId ?? ""} ${node.choice_group}`;
    const group = groups.get(id) ?? { key: node.choice_group, parentId, nodeIds: [] };
    group.nodeIds.push(node.id);
    groups.set(id, group);
  }
  const choiceGroups = [...groups.values()];
  for (const section of sections) {
    section.choiceGroups = choiceGroups.filter((g) => byId[g.nodeIds[0]]?.sectionId === section.node.id);
  }

  const view: RoadmapView = {
    sections,
    byId,
    idBySlug: Object.fromEntries(flat.map((n) => [n.slug, n.id])),
    order: flat.map((n) => n.id),
    counts: EMPTY,
    choiceGroups,
    hasProgress: false,
  };
  return withProgress(view, progress ?? null);
}

const EMPTY: Counts = { done: 0, total: 0, started: false, complete: false, percent: 0 };

/** Same rule as `progressSummary`: required nodes done out of required nodes. */
export function countNodes(nodes: readonly Pick<ViewNode, "optional" | "status">[]): Counts {
  const required = nodes.filter((n) => !n.optional);
  const done = required.filter((n) => n.status === "done").length;
  const total = required.length;
  return {
    done,
    total,
    started: nodes.some((n) => n.status === "in_progress" || n.status === "done"),
    complete: total > 0 && done === total,
    percent: total ? Math.round((done / total) * 100) : 0,
  };
}

/** A node and everything nested under it, in reading order. */
function subtree(node: ViewNode): ViewNode[] {
  return [node, ...node.children.flatMap(subtree)];
}

/**
 * The same view with the learner's statuses and counts. Null progress (a
 * visitor) clears statuses to null; a node missing from the learner's
 * progress is "not_started". Pure; returns a new view.
 */
export function withProgress(view: RoadmapView, progress: ReadonlyMap<string, ProgressStatus> | null): RoadmapView {
  const byId: Record<string, ViewNode> = {};
  const apply = (node: ViewNode): ViewNode => {
    const next: ViewNode = {
      ...node,
      status: progress ? (progress.get(node.id) ?? "not_started") : null,
      children: node.children.map(apply),
    };
    byId[next.id] = next;
    return next;
  };
  const sections = view.sections.map((section) => {
    const node = apply(section.node);
    const topics = section.topics.map(apply);
    const checkpoints = section.checkpoints.map(apply);
    const members = [node, ...topics.flatMap(subtree), ...checkpoints.flatMap(subtree)];
    return { ...section, node, topics, checkpoints, counts: countNodes(members) };
  });
  return {
    ...view,
    sections,
    byId,
    counts: countNodes(Object.values(byId)),
    hasProgress: progress !== null,
  };
}

/** The section a node belongs to. */
export function sectionOf(view: RoadmapView, nodeId: string): ViewSection | undefined {
  const sectionId = view.byId[nodeId]?.sectionId;
  return view.sections.find((s) => s.node.id === sectionId);
}

/** A node by slug, with its section and reading order neighbours. */
export function locateInView(view: RoadmapView, slug: string) {
  const id = view.idBySlug[slug];
  const node = id ? view.byId[id] : undefined;
  if (!node) return null;
  return {
    node,
    section: sectionOf(view, node.id)!,
    previous: node.previousId ? view.byId[node.previousId] : null,
    next: node.nextId ? view.byId[node.nextId] : null,
  };
}
