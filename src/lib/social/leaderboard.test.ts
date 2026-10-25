import { describe, expect, it } from "vitest";
import { parseBoardParams, rank } from "./leaderboard";

describe("parseBoardParams", () => {
  it("defaults to the nodes board and the viewer's region", () => {
    expect(parseBoardParams({}, "northern")).toEqual({ board: "nodes", region: "northern" });
  });
  it("ignores unknown boards and regions", () => {
    expect(parseBoardParams({ board: "money", region: "atlantis" }, null)).toEqual({ board: "nodes", region: null });
  });
  it("reads a chosen board and region", () => {
    expect(parseBoardParams({ board: "region", region: ["upper_west"] }, "northern")).toEqual({
      board: "region",
      region: "upper_west",
    });
  });
});

describe("rank", () => {
  it("gives equal scores the same rank", () => {
    const rows = [{ n: 9 }, { n: 5 }, { n: 5 }, { n: 1 }];
    expect(rank(rows, (r) => r.n).map((r) => r.rank)).toEqual([1, 2, 2, 4]);
  });
});
