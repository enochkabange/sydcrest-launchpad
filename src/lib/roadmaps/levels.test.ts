import { describe, expect, it } from "vitest";
import { careerLevels } from "@/components/roadmaps/roadmap-career-levels";
import { asCareerLevel, asComplexity, asDifficulty, asJobs, complexityText } from "./levels";
import { buildNodeTree, type FlatNode } from "./tree";
import { buildRoadmapView } from "./view-model";

describe("guards", () => {
  it("accept only known values", () => {
    expect(asDifficulty("advanced")).toBe("advanced");
    expect(asDifficulty("expert")).toBeNull();
    expect(asComplexity(3)).toBe(3);
    expect(asComplexity(6)).toBeNull();
    expect(asComplexity(2.5)).toBeNull();
    expect(asCareerLevel("mid")).toBe("mid");
    expect(asCareerLevel("senior")).toBeNull();
    expect(asJobs([" Data Analyst ", "", "Data Analyst", 4])).toEqual(["Data Analyst"]);
    expect(asJobs(null)).toEqual([]);
    expect(complexityText(4)).toBe("Complexity 4 of 5");
  });
});

const node = (id: string, parent: string | null, position: number, extra: Partial<FlatNode> = {}): FlatNode => ({
  id,
  parent_id: parent,
  slug: id,
  title: id.toUpperCase(),
  summary: null,
  position,
  is_optional: false,
  ...extra,
});

describe("view model and career levels", () => {
  const view = buildRoadmapView(
    buildNodeTree([
      node("basics", null, 0, { career_level: "foundation", jobs: [], difficulty: "beginner", complexity: 1 }),
      node("sheets", "basics", 0, { difficulty: "beginner", complexity: 2 }),
      node("reports", null, 1, { career_level: "junior", jobs: ["Data Analyst", "Data Entry Clerk"] }),
      node("dashboards", null, 2, { career_level: "junior", jobs: ["Data Analyst", "MIS Officer"] }),
      node("unrated", null, 3),
    ]),
  );

  it("carries the metadata into the optional view slots", () => {
    const [basics, reports] = view.sections;
    expect(basics.node).toMatchObject({ careerLevel: "foundation", difficulty: "beginner", complexity: 1 });
    expect(basics.node.jobs).toBeUndefined();
    expect(basics.topics[0]).toMatchObject({ difficulty: "beginner", complexity: 2 });
    expect(reports.node.jobs).toEqual(["Data Analyst", "Data Entry Clerk"]);
    expect(view.sections[3].node.careerLevel).toBeUndefined();
  });

  it("groups sections by level in order and merges their jobs once each", () => {
    expect(careerLevels(view.sections)).toEqual([
      { level: "foundation", sections: [{ number: 1, title: "BASICS" }], jobs: [] },
      {
        level: "junior",
        sections: [
          { number: 2, title: "REPORTS" },
          { number: 3, title: "DASHBOARDS" },
        ],
        jobs: ["Data Analyst", "Data Entry Clerk", "MIS Officer"],
      },
    ]);
  });
});
