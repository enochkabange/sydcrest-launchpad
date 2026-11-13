import { describe, expect, it } from "vitest";
import { BUCKETS, assign, bucket, describeSplit, parseVariantList, parseVariants, pickVariant } from "./assign";

const HOLDOUT = [
  { code: "nudge", weight: 90 },
  { code: "holdout", weight: 10 },
];

function subjects(n: number) {
  // Deterministic uuid shaped ids, like profile and visitor ids.
  return Array.from({ length: n }, (_, i) => `00000000-0000-4000-8000-${i.toString(16).padStart(12, "0")}`);
}

describe("bucket", () => {
  it("is stable for the same key and person", () => {
    const id = "11111111-1111-1111-1111-111111111111";
    expect(bucket("reengage_holdout", id)).toBe(bucket("reengage_holdout", id));
    expect(assign("reengage_holdout", id, HOLDOUT)).toBe(assign("reengage_holdout", id, HOLDOUT));
  });

  it("pins known values, so a change to the hash cannot move people silently", () => {
    const ids = subjects(5);
    expect(ids.map((id) => bucket("reengage_holdout", id))).toEqual([4028, 4398, 7384, 9989, 1959]);
  });

  it("stays within 0 to 9999", () => {
    for (const id of subjects(2000)) {
      const b = bucket("new_welcome", id);
      expect(b).toBeGreaterThanOrEqual(0);
      expect(b).toBeLessThan(BUCKETS);
      expect(Number.isInteger(b)).toBe(true);
    }
  });

  it("gives a person unrelated buckets in different experiments", () => {
    const ids = subjects(1000);
    const same = ids.filter((id) => assign("a_test", id, HOLDOUT) === "holdout" && assign("b_test", id, HOLDOUT) === "holdout").length;
    // Independent 10% holdouts overlap on about 1% of people, not 10%.
    expect(same).toBeLessThan(30);
  });
});

describe("distribution", () => {
  it("splits 10,000 people within about 2 points of the weights", () => {
    const counts = new Map<string, number>();
    for (const id of subjects(10_000)) {
      const v = assign("reengage_holdout", id, HOLDOUT);
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    expect(Math.abs((counts.get("holdout") ?? 0) / 10_000 - 0.1)).toBeLessThan(0.02);
    expect(Math.abs((counts.get("nudge") ?? 0) / 10_000 - 0.9)).toBeLessThan(0.02);
  });

  it("splits three ways by weight", () => {
    const variants = [
      { code: "control", weight: 50 },
      { code: "short", weight: 25 },
      { code: "long", weight: 25 },
    ];
    const counts = new Map<string, number>();
    for (const id of subjects(10_000)) {
      const v = assign("lesson_intro", id, variants);
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    expect(Math.abs((counts.get("control") ?? 0) / 10_000 - 0.5)).toBeLessThan(0.02);
    expect(Math.abs((counts.get("short") ?? 0) / 10_000 - 0.25)).toBeLessThan(0.02);
    expect(Math.abs((counts.get("long") ?? 0) / 10_000 - 0.25)).toBeLessThan(0.02);
  });
});

describe("pickVariant", () => {
  it("walks the weights in order", () => {
    expect(pickVariant(HOLDOUT, 0)).toBe("nudge");
    expect(pickVariant(HOLDOUT, 8999)).toBe("nudge");
    expect(pickVariant(HOLDOUT, 9000)).toBe("holdout");
    expect(pickVariant(HOLDOUT, 9999)).toBe("holdout");
  });

  it("never picks a variant with weight 0 (a flag at 0% or 100%)", () => {
    const off = [
      { code: "off", weight: 100 },
      { code: "on", weight: 0 },
    ];
    const on = [
      { code: "off", weight: 0 },
      { code: "on", weight: 100 },
    ];
    for (const b of [0, 1234, 9999]) {
      expect(pickVariant(off, b)).toBe("off");
      expect(pickVariant(on, b)).toBe("on");
    }
  });

  it("keeps people who were on as the rollout widens", () => {
    const at = (pct: number) => [
      { code: "off", weight: 100 - pct },
      { code: "on", weight: pct },
    ];
    for (const id of subjects(500)) {
      if (assign("new_feed", id, at(10)) === "on") expect(assign("new_feed", id, at(50))).toBe("on");
    }
  });
});

describe("parseVariants", () => {
  it("accepts what the database accepts", () => {
    expect(parseVariants(HOLDOUT)).toEqual(HOLDOUT);
  });

  it("refuses bad lists", () => {
    expect(parseVariants(null)).toBeNull();
    expect(parseVariants([{ code: "only", weight: 1 }])).toBeNull();
    expect(parseVariants([{ code: "a", weight: 1 }, { code: "a", weight: 1 }])).toBeNull();
    expect(parseVariants([{ code: "A", weight: 1 }, { code: "b", weight: 1 }])).toBeNull();
    expect(parseVariants([{ code: "a", weight: 1.5 }, { code: "b", weight: 1 }])).toBeNull();
    expect(parseVariants([{ code: "a", weight: 0 }, { code: "b", weight: 0 }])).toBeNull();
    expect(parseVariants([{ code: "a", weight: 6000 }, { code: "b", weight: 6000 }])).toBeNull();
  });
});

describe("parseVariantList", () => {
  it("reads the admin form", () => {
    expect(parseVariantList("control:50, change:50")).toEqual({
      variants: [
        { code: "control", weight: 50 },
        { code: "change", weight: 50 },
      ],
    });
    expect(parseVariantList("off = 90\non = 10")).toEqual({
      variants: [
        { code: "off", weight: 90 },
        { code: "on", weight: 10 },
      ],
    });
  });

  it("explains what is wrong", () => {
    expect(parseVariantList("Control 50")).toHaveProperty("error");
    expect(parseVariantList("control:50")).toHaveProperty("error");
  });
});

it("describes a split as shares", () => {
  expect(describeSplit(HOLDOUT)).toBe("nudge 90%, holdout 10%");
});
