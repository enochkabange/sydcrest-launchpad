import { describe, expect, it } from "vitest";
import { biggestMilestone, sectionIdOf } from "./milestones";

const nodes = [
  { id: "s1", parent_id: null, kind: null },
  { id: "t1", parent_id: "s1", kind: null },
  { id: "deep", parent_id: "t1", kind: null },
  { id: "cp", parent_id: null, kind: "checkpoint" },
  { id: "loop", parent_id: "loop2", kind: null },
  { id: "loop2", parent_id: "loop", kind: null },
];

describe("sectionIdOf", () => {
  it("finds the top level ancestor", () => {
    expect(sectionIdOf(nodes, "s1")).toBe("s1");
    expect(sectionIdOf(nodes, "t1")).toBe("s1");
    expect(sectionIdOf(nodes, "deep")).toBe("s1");
  });
  it("is null for a top level checkpoint, an unknown node or a broken tree", () => {
    expect(sectionIdOf(nodes, "cp")).toBeNull();
    expect(sectionIdOf(nodes, "nope")).toBeNull();
    expect(sectionIdOf(nodes, "loop")).toBeNull();
  });
});

describe("biggestMilestone", () => {
  const row = (type: string, ref_id: string) => ({ id: `${type}:${ref_id}`, type, ref_id, created_at: "2026-10-28T10:00:00Z" });
  const refs = { nodeId: "t1", sectionId: "s1", roadmapId: "r1" };
  it("prefers the roadmap, then the section, then the topic", () => {
    expect(biggestMilestone([row("roadmap_node_completed", "t1")], refs)?.type).toBe("roadmap_node_completed");
    expect(biggestMilestone([row("roadmap_node_completed", "t1"), row("section_completed", "s1")], refs)?.type).toBe("section_completed");
    expect(
      biggestMilestone([row("roadmap_node_completed", "t1"), row("section_completed", "s1"), row("roadmap_completed", "r1")], refs)?.type,
    ).toBe("roadmap_completed");
  });
  it("ignores milestones for other nodes and is null with none", () => {
    expect(biggestMilestone([row("section_completed", "s2")], refs)).toBeNull();
    expect(biggestMilestone([], { nodeId: "t1", sectionId: null, roadmapId: null })).toBeNull();
  });
});
