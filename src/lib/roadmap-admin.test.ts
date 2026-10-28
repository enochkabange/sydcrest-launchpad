import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "@/content/roadmaps";
import {
  descendantIds,
  draftNodeRowsWithParents,
  flattenTree,
  moveAmongSiblings,
  parseNodeForm,
  parseResourceForm,
  parseRoadmapForm,
  planResources,
  SLUG_PATTERN,
  slugify,
  uniqueSlug,
} from "./roadmap-admin";

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};

describe("slugs", () => {
  it("makes a valid slug from a title", () => {
    expect(slugify("Mobile Money APIs!")).toBe("mobile-money-apis");
    expect(slugify("  Café   à Tamale ")).toBe("cafe-a-tamale");
    expect(SLUG_PATTERN.test(slugify("x".repeat(200)))).toBe(true);
  });

  it("avoids slugs already taken", () => {
    expect(uniqueSlug("Git basics", ["git-basics"])).toBe("git-basics-2");
    expect(uniqueSlug("Git basics", ["git-basics", "git-basics-2"])).toBe("git-basics-3");
    expect(SLUG_PATTERN.test(uniqueSlug("!", []))).toBe(true);
    expect(SLUG_PATTERN.test(uniqueSlug("a", []))).toBe(true);
  });
});

describe("parseRoadmapForm", () => {
  it("derives the slug from the title and defaults the locale", () => {
    const { data, errors } = parseRoadmapForm(form({ title: "Data Analyst", track: "data", display_order: "3" }));
    expect(errors).toEqual({});
    expect(data).toMatchObject({ slug: "data-analyst", locale: "en-GH", track: "data", display_order: 3, description: null });
  });

  it("rejects bad slugs, unknown tracks and non numbers", () => {
    const { errors } = parseRoadmapForm(form({ title: "", slug: "Bad Slug", track: "astrology", display_order: "1.5" }));
    expect(Object.keys(errors).sort()).toEqual(["display_order", "slug", "title", "track"]);
  });
});

describe("parseNodeForm", () => {
  it("stores an empty kind and choice group as null, so the kind is derived from the tree", () => {
    const { data, errors } = parseNodeForm(form({ title: "Git and GitHub", kind: "", choice_group: "" }));
    expect(errors).toEqual({});
    expect(data).toMatchObject({ kind: null, choice_group: null });
  });

  it("keeps a valid kind and choice group", () => {
    const { data, errors } = parseNodeForm(form({ title: "Excel", kind: "checkpoint", choice_group: "spreadsheet-tool" }));
    expect(errors).toEqual({});
    expect(data).toMatchObject({ kind: "checkpoint", choice_group: "spreadsheet-tool" });
  });

  it("rejects an unknown kind and a choice group the database would refuse", () => {
    const { errors } = parseNodeForm(form({ title: "Excel", kind: "quiz", choice_group: "Pick One" }));
    expect(Object.keys(errors).sort()).toEqual(["choice_group", "kind"]);
  });
});

describe("parseResourceForm", () => {
  it("needs a full http link and a known kind", () => {
    expect(parseResourceForm(form({ label: "MDN", url: "developer.mozilla.org", kind: "article" })).errors.url).toBeDefined();
    expect(parseResourceForm(form({ label: "MDN", url: "javascript:alert(1)", kind: "article" })).errors.url).toBeDefined();
    expect(parseResourceForm(form({ label: "MDN", url: "https://developer.mozilla.org", kind: "podcast" })).errors.kind).toBeDefined();
    const ok = parseResourceForm(form({ label: "MDN", url: "https://developer.mozilla.org", kind: "video", is_active: "on" }));
    expect(ok.errors).toEqual({});
    expect(ok.data.is_active).toBe(true);
  });
});

const tree = [
  { id: "a", parent_id: null, position: 0 },
  { id: "b", parent_id: null, position: 1 },
  { id: "a1", parent_id: "a", position: 0 },
  { id: "a2", parent_id: "a", position: 1 },
  { id: "a1x", parent_id: "a1", position: 0 },
];

describe("tree helpers", () => {
  it("flattens depth first in position order", () => {
    expect(flattenTree(tree).map(({ node, depth }) => `${node.id}:${depth}`)).toEqual(["a:0", "a1:1", "a1x:2", "a2:1", "b:0"]);
  });

  it("finds a node's descendants so it cannot become its own parent", () => {
    expect([...descendantIds(tree, "a")].sort()).toEqual(["a", "a1", "a1x", "a2"]);
  });

  it("moves a node among siblings and renumbers ties", () => {
    expect(moveAmongSiblings(tree.slice(0, 2), "b", "up")).toEqual([
      { id: "b", position: 0 },
      { id: "a", position: 1 },
    ]);
    expect(moveAmongSiblings(tree.slice(0, 2), "a", "up")).toEqual([]);
    const tied = [
      { id: "x", parent_id: null, position: 0, created_at: "2026-10-01" },
      { id: "y", parent_id: null, position: 0, created_at: "2026-10-02" },
    ];
    // y already sits at 0, so only x needs writing.
    expect(moveAmongSiblings(tied, "x", "down")).toEqual([{ id: "x", position: 1 }]);
  });
});

describe("draft import plan", () => {
  it("every draft node and roadmap slug fits the database rule, and parents come first", () => {
    for (const draft of ROADMAP_DRAFTS) {
      expect(SLUG_PATTERN.test(draft.slug)).toBe(true);
      const ids = new Map(draft.nodes.map((n) => [n.slug, `id-${n.slug}`]));
      const rows = draftNodeRowsWithParents("r1", draft.nodes, ids);
      expect(rows).toHaveLength(draft.nodes.length);
      for (const row of rows) expect(SLUG_PATTERN.test(row.slug)).toBe(true);
    }
  });

  it("links parents by slug", () => {
    const nodes = [
      { slug: "foundations", title: "Foundations", summary: "s", parent: null, optional: false, resources: [] },
      { slug: "git", title: "Git", summary: "s", parent: "foundations", optional: true, resources: [] },
    ];
    const rows = draftNodeRowsWithParents("r1", nodes, new Map([["foundations", "f"], ["git", "g"]]));
    expect(rows[1]).toMatchObject({ id: "g", parent_id: "f", position: 1, is_optional: true, roadmap_id: "r1" });
    expect(rows[0].parent_id).toBeNull();
  });

  it("writes difficulty, complexity, career level and jobs, and null when a draft leaves them out (#255)", () => {
    const nodes = [
      { slug: "tools", title: "Tools", summary: "s", parent: null, optional: false, resources: [], difficulty: "beginner" as const, complexity: 1 as const, careerLevel: "foundation" as const, jobs: ["Data Analyst"] },
      { slug: "excel", title: "Excel", summary: "s", parent: "tools", optional: false, resources: [], difficulty: "intermediate" as const, complexity: 3 as const },
      { slug: "old", title: "Old", summary: "s", parent: "tools", optional: false, resources: [] },
    ];
    const rows = draftNodeRowsWithParents("r1", nodes, new Map([["tools", "t"], ["excel", "e"], ["old", "o"]]));
    expect(rows[0]).toMatchObject({ difficulty: "beginner", complexity: 1, career_level: "foundation", jobs: ["Data Analyst"] });
    expect(rows[1]).toMatchObject({ difficulty: "intermediate", complexity: 3, career_level: null, jobs: null });
    expect(rows[2]).toMatchObject({ difficulty: null, complexity: null, career_level: null, jobs: null });
  });

  it("round trips kind and choice_group, and writes null when a draft leaves them out", () => {
    const nodes = [
      { slug: "tools", title: "Tools", summary: "s", parent: null, optional: false, resources: [] },
      { slug: "excel", title: "Excel", summary: "s", parent: "tools", optional: false, choice_group: "sheet-tool", resources: [] },
      { slug: "sheets", title: "Sheets", summary: "s", parent: "tools", optional: false, choice_group: "sheet-tool", resources: [] },
      { slug: "check", title: "Check", summary: "s", parent: "tools", optional: false, kind: "checkpoint" as const, resources: [] },
    ];
    const ids = new Map(nodes.map((n) => [n.slug, n.slug]));
    const rows = draftNodeRowsWithParents("r1", nodes, ids);
    expect(rows.map((r) => [r.slug, r.kind, r.choice_group])).toEqual([
      ["tools", null, null],
      ["excel", null, "sheet-tool"],
      ["sheets", null, "sheet-tool"],
      ["check", "checkpoint", null],
    ]);
  });

  it("the existing drafts import unchanged: no kinds or choice groups yet", () => {
    for (const draft of ROADMAP_DRAFTS) {
      const ids = new Map(draft.nodes.map((n) => [n.slug, `id-${n.slug}`]));
      for (const row of draftNodeRowsWithParents("r1", draft.nodes, ids)) {
        expect(row.kind).toBeNull();
        expect(row.choice_group).toBeNull();
      }
    }
  });

  it("inserts new links once and updates existing ones by URL, so a rerun never duplicates", () => {
    const link = { label: "MDN", url: "https://developer.mozilla.org", kind: "article" as const };
    const nodes = [{ slug: "html", title: "HTML", summary: "s", parent: null, optional: false, resources: [link, link] }];
    const ids = new Map([["html", "n1"]]);

    const first = planResources(nodes, ids, []);
    expect(first.inserts).toHaveLength(1);
    expect(first.updates).toHaveLength(0);

    const second = planResources(nodes, ids, [{ id: "r1", node_id: "n1", url: link.url }]);
    expect(second.inserts).toHaveLength(0);
    expect(second.updates).toEqual([{ id: "r1", node_id: "n1", label: "MDN", url: link.url, kind: "article", position: 0 }]);
    // is_active is never part of an update, so a link marked broken stays broken.
    expect(second.updates[0]).not.toHaveProperty("is_active");
  });
});
