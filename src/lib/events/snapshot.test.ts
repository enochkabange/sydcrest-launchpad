import { describe, expect, it } from "vitest";
import { snapshotRows } from "./snapshot";

describe("snapshotRows", () => {
  it("shows real averages and leaves out measures nobody answered", () => {
    const rows = snapshotRows({
      rsvps_going: 40,
      checked_in: 26,
      responses: 13,
      avg_confidence: 4.23,
      avg_usefulness: 4.5,
      avg_clarity: null,
      avg_logistics: 2.35,
      avg_recommend: 8.92,
      attend_again_rate: 0.92,
    });
    expect(rows).toEqual([
      { label: "Confidence", value: "4.2 out of 5" },
      { label: "Usefulness", value: "4.5 out of 5" },
      { label: "Logistics", value: "2.4 out of 5" },
      { label: "Would recommend", value: "8.9 out of 10" },
      { label: "Would come again", value: "92 percent" },
      { label: "Response rate", value: "13 of 26 checked in" },
    ]);
  });
});
