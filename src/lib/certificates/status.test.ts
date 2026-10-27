import { describe, expect, it } from "vitest";
import { checklistItems, listWeeks, parseCertificationStatus } from "./status";

const RAW = {
  eligible: false,
  specialization: "seo",
  weeks_required: 12,
  weeks_passed: 10,
  missing_weeks: [7, 12],
  capstone_passed: false,
  peer_reviews_given: 0,
  peer_reviews_required: 1,
  pass_score: 60,
};

describe("parseCertificationStatus", () => {
  it("reads the certification_status jsonb", () => {
    expect(parseCertificationStatus(RAW)).toEqual({
      eligible: false,
      specialization: "seo",
      weeksRequired: 12,
      weeksPassed: 10,
      missingWeeks: [7, 12],
      capstonePassed: false,
      peerReviewsGiven: 0,
      peerReviewsRequired: 1,
      passScore: 60,
    });
  });
  it("never reads anything unexpected as eligible", () => {
    expect(parseCertificationStatus(null)).toBeNull();
    expect(parseCertificationStatus([RAW])).toBeNull();
    expect(parseCertificationStatus({ ...RAW, eligible: "true" })?.eligible).toBe(false);
  });
});

describe("listWeeks", () => {
  it("joins week numbers in plain words", () => {
    expect(listWeeks([])).toBe("");
    expect(listWeeks([3])).toBe("week 3");
    expect(listWeeks([3, 4])).toBe("weeks 3 and 4");
    expect(listWeeks([3, 4, 7])).toBe("weeks 3, 4 and 7");
  });
});

describe("checklistItems", () => {
  it("lists the four steps with what is left", () => {
    const items = checklistItems(parseCertificationStatus(RAW)!);
    expect(items.map((i) => [i.id, i.done])).toEqual([
      ["weeks", false],
      ["capstone", false],
      ["peer", false],
      ["mentor", false],
    ]);
    expect(items[0].detail).toContain("10 of 12 passed");
    expect(items[0].detail).toContain("weeks 7 and 12");
    expect(items[2].detail).toContain("cannot be skipped");
  });

  it("marks everything done once eligible and issued", () => {
    const status = parseCertificationStatus({ ...RAW, eligible: true, weeks_passed: 12, missing_weeks: [], capstone_passed: true, peer_reviews_given: 2 })!;
    expect(checklistItems(status).map((i) => i.done)).toEqual([true, true, true, false]);
    expect(checklistItems(status)[3].detail).toMatch(/final review/);
    expect(checklistItems(status, { issued: true }).every((i) => i.done)).toBe(true);
    expect(checklistItems(status, { audience: "staff" })[3].detail).toBe("Every criterion is met. Ready to issue.");
  });

  it("does not count an empty path as passed", () => {
    const status = parseCertificationStatus({ ...RAW, weeks_required: 0, weeks_passed: 0, missing_weeks: [], capstone_passed: true })!;
    expect(checklistItems(status)[0].done).toBe(false);
    expect(checklistItems(status)[1].done).toBe(false);
  });

  it("keeps learner copy free of dashes", () => {
    for (const audience of ["learner", "staff"] as const) {
      for (const item of checklistItems(parseCertificationStatus(RAW)!, { audience })) {
        expect(`${item.label} ${item.detail}`).not.toMatch(/[–—]| - /);
      }
    }
  });
});
