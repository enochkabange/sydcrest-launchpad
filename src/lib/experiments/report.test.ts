import { describe, expect, it } from "vitest";
import { NOT_ENOUGH } from "@/lib/insights/metrics";
import { experimentReports, formatPoints, pValue, type ExperimentRow } from "./report";

const row = (variant: string, order: number, weight: number, people: number, measured: number, came_back: number): ExperimentRow => ({
  experiment_key: "reengage_holdout",
  status: "running",
  metric: "active_7d",
  started_at: "2026-11-14T09:00:00Z",
  stopped_at: null,
  variant,
  variant_order: order,
  weight,
  people,
  measured,
  came_back,
});

describe("experimentReports", () => {
  it("compares each variant with the control", () => {
    const [report] = experimentReports([row("holdout", 2, 10, 300, 200, 40), row("nudge", 1, 90, 2700, 2000, 700)]);
    expect(report.key).toBe("reengage_holdout");
    expect(report.people).toBe(3000);
    expect(report.arms.map((a) => a.variant)).toEqual(["nudge", "holdout"]);
    const [nudge, holdout] = report.arms;
    expect(nudge.control).toBe(true);
    expect(nudge.rate).toBeCloseTo(0.35);
    expect(nudge.difference).toBeNull();
    expect(holdout.share).toBeCloseTo(0.1);
    expect(holdout.difference).toBeCloseTo(-0.15);
    expect(holdout.clear).toBe(true);
  });

  it("says not enough data yet below MIN_SAMPLE", () => {
    const [report] = experimentReports([row("nudge", 1, 90, 40, 30, 10), row("holdout", 2, 10, 4, 4, 0)]);
    expect(report.arms[1].rate).toBeNull();
    expect(report.arms[1].difference).toBeNull();
    expect(report.arms[1].clear).toBeNull();
    expect(NOT_ENOUGH).toBe("Not enough data yet");
  });

  it("does not call a small gap clear", () => {
    const [report] = experimentReports([row("nudge", 1, 50, 20, 20, 10), row("holdout", 2, 50, 20, 20, 9)]);
    expect(report.arms[1].clear).toBe(false);
  });

  it("lists an experiment nobody has met yet with zeros", () => {
    const [report] = experimentReports([row("control", 1, 50, 0, 0, 0), row("change", 2, 50, 0, 0, 0)]);
    expect(report.people).toBe(0);
    expect(report.arms.every((a) => a.rate === null)).toBe(true);
  });
});

describe("pValue", () => {
  it("is small for a clear gap and large for none", () => {
    expect(pValue(100, 1000, 200, 1000)!).toBeLessThan(0.001);
    expect(pValue(100, 1000, 100, 1000)!).toBeCloseTo(1, 5);
    expect(pValue(0, 0, 1, 1)).toBeNull();
    expect(pValue(0, 10, 0, 10)).toBe(1);
  });
});

it("formats percentage points", () => {
  expect(formatPoints(-0.15)).toBe("-15 points");
  expect(formatPoints(0.025)).toBe("+2.5 points");
  expect(formatPoints(0)).toBe("0 points");
});
