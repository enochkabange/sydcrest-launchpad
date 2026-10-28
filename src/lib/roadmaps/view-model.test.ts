import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "@/content/roadmaps";
import { buildNodeTree, locateNode, progressSummary, type FlatNode, type ProgressStatus } from "./tree";
import { buildRoadmapView, locateInView, roadmapViewOf, searchItemsOf, sectionOf, withProgress } from "./view-model";

function node(id: string, parent: string | null, position: number, extra: Partial<FlatNode> = {}): FlatNode {
  return { id, parent_id: parent, slug: id, title: id, summary: null, position, is_optional: false, ...extra };
}

// A shop records roadmap: two sections, one optional topic, one choice group.
const NODES = [
  node("foundations", null, 0),
  node("notebook", "foundations", 0),
  node("excel", "foundations", 1, { choice_group: "sheet-tool" }),
  node("sheets", "foundations", 2, { choice_group: "sheet-tool" }),
  node("sharing", null, 1),
  node("whatsapp", "sharing", 0, { is_optional: true }),
  node("reports", "sharing", 1),
];
const tree = () => buildNodeTree(NODES);
const progress = (entries: Record<string, ProgressStatus>) => new Map(Object.entries(entries));

describe("buildRoadmapView", () => {
  it("returns sections with their topics in order, numbered like the outline", () => {
    const view = buildRoadmapView(tree());
    expect(view.sections.map((s) => [s.number, s.node.slug, s.node.kind])).toEqual([
      [1, "foundations", "section"],
      [2, "sharing", "section"],
    ]);
    expect(view.sections[0].topics.map((t) => [t.slug, t.number, t.kind, t.place])).toEqual([
      ["notebook", "1.1", "topic", { n: 1, of: 3 }],
      ["excel", "1.2", "topic", { n: 2, of: 3 }],
      ["sheets", "1.3", "topic", { n: 3, of: 3 }],
    ]);
    expect(view.sections[0].checkpoints).toEqual([]);
    expect(view.sections[1].topics.map((t) => [t.slug, t.optional, t.sectionId])).toEqual([
      ["whatsapp", true, "sharing"],
      ["reports", false, "sharing"],
    ]);
  });

  it("follows the topic page's reading order for previous and next", () => {
    const view = buildRoadmapView(tree());
    expect(view.order).toEqual(["foundations", "notebook", "excel", "sheets", "sharing", "whatsapp", "reports"]);
    for (const slug of view.order) {
      const fromPage = locateNode(tree(), slug)!;
      const fromView = locateInView(view, slug)!;
      expect(fromView.previous?.slug ?? null).toBe(fromPage.previous?.slug ?? null);
      expect(fromView.next?.slug ?? null).toBe(fromPage.next?.slug ?? null);
    }
    expect(view.byId.foundations.previousId).toBeNull();
    expect(view.byId.reports.nextId).toBeNull();
    expect(view.byId.sheets.index).toBe(3);
  });

  it("has no statuses and zero done without progress, and the required totals", () => {
    const view = buildRoadmapView(tree());
    expect(view.hasProgress).toBe(false);
    expect(Object.values(view.byId).every((n) => n.status === null)).toBe(true);
    expect(view.counts).toEqual({ done: 0, total: 6, started: false, complete: false, percent: 0 });
    expect(view.sections.map((s) => s.counts.total)).toEqual([4, 2]);
  });

  it("counts required nodes done with the same rule as progressSummary", () => {
    const statuses = progress({ foundations: "done", notebook: "done", excel: "in_progress", whatsapp: "done" });
    const view = buildRoadmapView(tree(), statuses);
    expect(view.hasProgress).toBe(true);
    expect(view.byId.excel.status).toBe("in_progress");
    expect(view.byId.reports.status).toBe("not_started");
    const summary = progressSummary(NODES, statuses);
    expect(view.counts).toMatchObject({ done: summary.done, total: summary.total, started: summary.started });
    expect(view.counts).toEqual({ done: 2, total: 6, started: true, complete: false, percent: 33 });
    // The optional topic being done does not count; the sections add up to the whole.
    expect(view.sections[1].counts).toEqual({ done: 0, total: 2, started: true, complete: false, percent: 0 });
    expect(view.sections.reduce((sum, s) => sum + s.counts.done, 0)).toBe(view.counts.done);
  });

  it("marks a section complete when every required node in it is done", () => {
    const view = buildRoadmapView(tree(), progress({ sharing: "done", reports: "done" }));
    expect(view.sections[1].counts).toMatchObject({ done: 2, total: 2, complete: true, percent: 100 });
    expect(view.sections[0].counts.complete).toBe(false);
  });

  it("keeps sections, topics and lookups consistent after progress is applied", () => {
    const base = buildRoadmapView(tree());
    const live = withProgress(base, progress({ notebook: "done" }));
    expect(live.sections[0].topics[0]).toBe(live.byId.notebook);
    expect(live.byId.notebook.status).toBe("done");
    expect(base.byId.notebook.status).toBeNull();
    expect(withProgress(live, null).byId.notebook.status).toBeNull();
  });

  it("lists choice groups among siblings in reading order, per section", () => {
    const view = buildRoadmapView(tree());
    expect(view.choiceGroups).toEqual([{ key: "sheet-tool", parentId: "foundations", nodeIds: ["excel", "sheets"] }]);
    expect(view.sections[0].choiceGroups).toHaveLength(1);
    expect(view.sections[1].choiceGroups).toEqual([]);
    expect(view.byId.excel.choiceGroup).toBe("sheet-tool");
  });

  it("does not join same keyed nodes under different parents into one group", () => {
    const view = buildRoadmapView(
      buildNodeTree([node("a", null, 0), node("a1", "a", 0, { choice_group: "pick" }), node("b", null, 1), node("b1", "b", 0, { choice_group: "pick" })]),
    );
    expect(view.choiceGroups.map((g) => g.nodeIds)).toEqual([["a1"], ["b1"]]);
  });

  it("puts checkpoints after a section's topics and counts them", () => {
    const view = buildRoadmapView(
      buildNodeTree([
        node("html", null, 0),
        node("check", "html", 0, { kind: "checkpoint" }),
        node("tags", "html", 1),
        node("forms", "html", 2),
      ]),
      progress({ check: "done" }),
    );
    const [section] = view.sections;
    expect(section.topics.map((t) => [t.slug, t.place])).toEqual([
      ["tags", { n: 1, of: 2 }],
      ["forms", { n: 2, of: 2 }],
    ]);
    expect(section.checkpoints.map((c) => [c.slug, c.kind, c.place])).toEqual([["check", "checkpoint", null]]);
    expect(section.counts).toMatchObject({ done: 1, total: 4 });
  });

  it("closes the previous section with a top level checkpoint, or shows a leading one as a section", () => {
    const view = buildRoadmapView(
      buildNodeTree([
        node("intro-check", null, 0, { kind: "checkpoint" }),
        node("html", null, 1),
        node("tags", "html", 0),
        node("html-check", null, 2, { kind: "checkpoint" }),
        node("css", null, 3),
      ]),
    );
    expect(view.sections.map((s) => [s.node.slug, s.node.kind, s.number])).toEqual([
      ["intro-check", "section", 1],
      ["html", "section", 2],
      ["css", "section", 3],
    ]);
    expect(view.sections[1].checkpoints.map((c) => c.slug)).toEqual(["html-check"]);
    expect(view.byId["html-check"].sectionId).toBe("html");
    expect(sectionOf(view, "html-check")?.node.slug).toBe("html");
  });

  it("derives kind from depth when the row has none, and treats a nested section as a topic", () => {
    const view = buildRoadmapView(
      buildNodeTree([node("a", null, 0, { kind: "topic" }), node("a1", "a", 0, { kind: "section" }), node("a1x", "a1", 0)]),
    );
    expect(view.byId.a.kind).toBe("section");
    expect(view.byId.a1.kind).toBe("topic");
    expect(view.byId.a1x.kind).toBe("topic");
  });

  it("nests deeper nodes under their topic and counts them in the section", () => {
    const view = buildRoadmapView(
      buildNodeTree([node("a", null, 0), node("a1", "a", 0), node("a1x", "a1", 0), node("a1y", "a1", 1, { kind: "checkpoint" })]),
      progress({ a1x: "done" }),
    );
    expect(view.sections[0].topics[0].children.map((c) => [c.slug, c.kind, c.sectionId])).toEqual([
      ["a1x", "topic", "a"],
      ["a1y", "checkpoint", "a"],
    ]);
    expect(view.sections[0].counts).toMatchObject({ done: 1, total: 4 });
  });

  it("keeps a node whose parent is missing, as its own section", () => {
    const view = buildRoadmapView(buildNodeTree([node("a", null, 0), node("a1", "a", 0), node("orphan", "gone", 1)]));
    expect(view.sections.map((s) => s.node.slug)).toEqual(["a", "orphan"]);
    expect(view.order).toHaveLength(3);
  });

  it("renders an empty roadmap as nothing", () => {
    const view = buildRoadmapView([]);
    expect(view.sections).toEqual([]);
    expect(view.counts).toEqual({ done: 0, total: 0, started: false, complete: false, percent: 0 });
    expect(locateInView(view, "nope")).toBeNull();
  });

  it("places every node of every draft roadmap exactly once", () => {
    for (const draft of ROADMAP_DRAFTS) {
      const nodes = draft.nodes.map((n, i) =>
        node(n.slug, n.parent, i, { title: n.title, is_optional: n.optional, kind: n.kind, choice_group: n.choice_group }),
      );
      const view = buildRoadmapView(buildNodeTree(nodes));
      const placed = view.sections.flatMap((s) => [s.node, ...s.topics, ...s.checkpoints].flatMap(function all(n): string[] {
        return [n.id, ...n.children.flatMap(all)];
      }));
      expect(placed.sort(), draft.slug).toEqual(nodes.map((n) => n.id).sort());
      expect(view.counts.total, draft.slug).toBe(nodes.filter((n) => !n.is_optional).length);
    }
  });
});

describe("time estimates in the view", () => {
  const minutes = new Map<string, number | null>([
    ["foundations", 10],
    ["notebook", 25],
    ["excel", 20],
    ["sheets", null],
    ["sharing", 5],
    ["whatsapp", 30],
    ["reports", 15],
  ]);

  it("carries each node's minutes and sums sections and the roadmap", () => {
    const view = buildRoadmapView(tree(), null, minutes);
    expect(view.byId.notebook.minutes).toBe(25);
    expect(view.byId.sheets.minutes).toBeNull();
    expect(view.sections[0].estimate).toEqual({ minutes: 55, missing: 1 });
    expect(view.sections[1].estimate).toEqual({ minutes: 50, missing: 0 });
    expect(view.sections[1].requiredEstimate).toEqual({ minutes: 20, missing: 0 });
    expect(view.estimate).toEqual({ minutes: 105, missing: 1 });
    expect(view.requiredEstimate).toEqual({ minutes: 75, missing: 1 });
  });

  it("has no estimate without minutes", () => {
    const view = buildRoadmapView(tree());
    expect(view.byId.notebook.minutes).toBeNull();
    expect(view.estimate).toEqual({ minutes: 0, missing: 7 });
  });

  it("keeps minutes through withProgress and counts the required minutes left", () => {
    const view = withProgress(buildRoadmapView(tree(), null, minutes), progress({ foundations: "done", notebook: "done" }));
    expect(view.byId.excel.minutes).toBe(20);
    // excel 20 + sheets ? + sharing 5 + reports 15; whatsapp is optional
    expect(view.minutesLeft).toBe(40);
  });

  it("builds from a published roadmap's nodes and minutes", () => {
    const view = roadmapViewOf({ nodes: NODES, minutes: { notebook: 25 } });
    expect(view.byId.notebook.minutes).toBe(25);
    expect(view.byId.excel.minutes).toBeNull();
    expect(view.hasProgress).toBe(false);
  });
});

describe("up next", () => {
  it("is null for a visitor", () => {
    expect(buildRoadmapView(tree()).upNextId).toBeNull();
  });

  it("is the first node in progress, in reading order", () => {
    const view = buildRoadmapView(tree(), progress({ foundations: "done", reports: "in_progress", excel: "in_progress" }));
    expect(view.upNextId).toBe("excel");
  });

  it("is otherwise the first required node not done, skipping optional ones", () => {
    expect(buildRoadmapView(tree(), progress({})).upNextId).toBe("foundations");
    const done = { foundations: "done", notebook: "done", excel: "done", sheets: "done", sharing: "done" } as const;
    expect(buildRoadmapView(tree(), progress(done)).upNextId).toBe("reports");
  });

  it("is null once every required node is done", () => {
    const all = Object.fromEntries(NODES.filter((n) => !n.is_optional).map((n) => [n.id, "done" as const]));
    const view = buildRoadmapView(tree(), progress(all));
    expect(view.upNextId).toBeNull();
    expect(view.minutesLeft).toBe(0);
  });
});

describe("optional content slots", () => {
  it("are empty until content sets them", () => {
    const view = buildRoadmapView(tree());
    expect(view.byId.notebook.difficulty).toBeUndefined();
    expect(view.byId.notebook.complexity).toBeUndefined();
    expect(view.sections[0].node.careerLevel).toBeUndefined();
    expect(view.sections[0].node.jobs).toBeUndefined();
  });

  it("carry difficulty, complexity, career level and jobs when present", () => {
    const nodes = [
      node("foundations", null, 0, { career_level: "junior", jobs: ["Data clerk"] }),
      node("notebook", "foundations", 0, { difficulty: "beginner", complexity: 2 }),
    ];
    const view = buildRoadmapView(buildNodeTree(nodes));
    expect(view.sections[0].node.careerLevel).toBe("junior");
    expect(view.sections[0].node.jobs).toEqual(["Data clerk"]);
    expect(view.byId.notebook.difficulty).toBe("beginner");
    expect(view.byId.notebook.complexity).toBe(2);
  });
});

describe("searchItemsOf", () => {
  it("lists every node in reading order with its section title", () => {
    const items = searchItemsOf(buildRoadmapView(tree()));
    expect(items.map((i) => i.id)).toEqual(["foundations", "notebook", "excel", "sheets", "sharing", "whatsapp", "reports"]);
    expect(items[5]).toMatchObject({ slug: "whatsapp", number: "2.1", sectionTitle: "sharing", optional: true });
  });
});
