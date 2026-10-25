import { describe, expect, it } from "vitest";
import { buildNodeTree, flattenTree, locateNode, progressSummary, type FlatNode } from "./tree";

function node(id: string, parent: string | null, position: number, extra: Partial<FlatNode> = {}): FlatNode {
  return { id, parent_id: parent, slug: id, title: id, summary: null, position, is_optional: false, ...extra };
}

describe("buildNodeTree", () => {
  it("nests children under parents and orders siblings by position", () => {
    const tree = buildNodeTree([
      node("sql", null, 1),
      node("foundations", null, 0),
      node("statistics", "foundations", 1),
      node("spreadsheets", "foundations", 0),
      node("joins", "sql", 0),
    ]);
    expect(tree.map((n) => n.slug)).toEqual(["foundations", "sql"]);
    expect(tree[0].children.map((n) => n.slug)).toEqual(["spreadsheets", "statistics"]);
    expect(tree[1].children.map((n) => n.slug)).toEqual(["joins"]);
  });

  it("numbers the outline and records depth", () => {
    const tree = buildNodeTree([node("a", null, 0), node("b", null, 1), node("b1", "b", 0), node("b1x", "b1", 0)]);
    const flat = flattenTree(tree);
    expect(flat.map((n) => [n.slug, n.number, n.depth])).toEqual([
      ["a", "1", 0],
      ["b", "2", 0],
      ["b1", "2.1", 1],
      ["b1x", "2.1.1", 2],
    ]);
  });

  it("breaks position ties by title so the order is stable", () => {
    const tree = buildNodeTree([
      node("2", null, 0, { title: "Zongo" }),
      node("1", null, 0, { title: "Bolga" }),
    ]);
    expect(tree.map((n) => n.title)).toEqual(["Bolga", "Zongo"]);
  });

  it("promotes nodes whose parent is missing instead of dropping them", () => {
    const tree = buildNodeTree([node("a", null, 0), node("orphan", "gone", 1)]);
    expect(tree.map((n) => n.slug)).toEqual(["a", "orphan"]);
  });

  it("keeps every node exactly once even with a cycle or self parent", () => {
    const tree = buildNodeTree([node("a", null, 0), node("x", "y", 0), node("y", "x", 1), node("self", "self", 2)]);
    const slugs = flattenTree(tree).map((n) => n.slug).sort();
    expect(slugs).toEqual(["a", "self", "x", "y"]);
  });

  it("returns an empty outline for no nodes", () => {
    expect(buildNodeTree([])).toEqual([]);
  });
});

describe("locateNode", () => {
  const tree = buildNodeTree([
    node("foundations", null, 0),
    node("spreadsheets", "foundations", 0),
    node("pivots", "spreadsheets", 0),
    node("sql", null, 1),
  ]);

  it("finds ancestors root first and reading order neighbours", () => {
    const found = locateNode(tree, "pivots");
    expect(found?.ancestors.map((n) => n.slug)).toEqual(["foundations", "spreadsheets"]);
    expect(found?.previous?.slug).toBe("spreadsheets");
    expect(found?.next?.slug).toBe("sql");
  });

  it("has no previous for the first node and no next for the last", () => {
    expect(locateNode(tree, "foundations")?.previous).toBeNull();
    expect(locateNode(tree, "sql")?.next).toBeNull();
  });

  it("returns null for an unknown slug", () => {
    expect(locateNode(tree, "nope")).toBeNull();
  });
});

describe("progressSummary", () => {
  it("counts required nodes only and notices any start", () => {
    const nodes = [node("a", null, 0), node("b", null, 1), node("extra", null, 2, { is_optional: true })];
    const status = new Map([
      ["a", "done" as const],
      ["extra", "done" as const],
    ]);
    expect(progressSummary(nodes, status)).toEqual({ done: 1, total: 2, started: true });
    expect(progressSummary(nodes, new Map())).toEqual({ done: 0, total: 2, started: false });
  });
});
