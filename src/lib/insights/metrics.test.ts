import { describe, expect, it } from "vitest";
import {
  MIN_SAMPLE,
  NOT_ENOUGH,
  enough,
  featureOf,
  formatChange,
  formatHours,
  formatRate,
  formatShare,
  formatVital,
  groupFeatures,
  rate,
  retentionAverage,
  retentionMatrix,
  vitalRating,
  weekly,
} from "./metrics";

describe("small number guard", () => {
  it("needs at least MIN_SAMPLE cases for a rate", () => {
    expect(MIN_SAMPLE).toBe(5);
    expect(enough(4)).toBe(false);
    expect(enough(5)).toBe(true);
    expect(enough(null)).toBe(false);
    expect(rate(2, 4)).toBeNull();
    expect(rate(2, 5)).toBe(0.4);
  });

  it("says so in words instead of showing a number", () => {
    expect(formatRate(1, 3)).toBe(NOT_ENOUGH);
    expect(formatRate(0, 0)).toBe(NOT_ENOUGH);
    expect(formatHours(3, 2)).toBe(NOT_ENOUGH);
    expect(formatVital("LCP", 1800, 4)).toBe(NOT_ENOUGH);
    expect(NOT_ENOUGH).toBe("Not enough data yet");
  });
});

describe("rates", () => {
  it("rounds to whole percents, one decimal under ten", () => {
    expect(formatRate(9, 20)).toBe("45%");
    expect(formatRate(1, 40)).toBe("2.5%");
    expect(formatRate(5, 5)).toBe("100%");
    expect(formatRate(0, 12)).toBe("0%");
    expect(formatShare(0.05)).toBe("5%");
  });

  it("describes change against the previous period, or nothing with too little", () => {
    expect(formatChange(12, 10)).toBe("Up 20%");
    expect(formatChange(8, 10)).toBe("Down 20%");
    expect(formatChange(10, 10)).toBe("No change");
    expect(formatChange(6, 0)).toBe("New");
    expect(formatChange(2, 0)).toBeNull();
    expect(formatChange(3, 2)).toBeNull();
    expect(formatChange(0, 0)).toBeNull();
  });

  it("formats durations readably", () => {
    expect(formatHours(0.5, 9)).toBe("30 minutes");
    expect(formatHours(6.54, 9)).toBe("6.5 hours");
    expect(formatHours(30, 9)).toBe("30 hours");
    expect(formatHours(72, 9)).toBe("3 days");
    expect(formatHours(null, 9)).toBe(NOT_ENOUGH);
  });
});

describe("percentiles", () => {
  it("formats Web Vitals in their units", () => {
    expect(formatVital("LCP", 2412, 30)).toBe("2.4 s");
    expect(formatVital("INP", 183.6, 30)).toBe("184 ms");
    expect(formatVital("CLS", 0.123, 30)).toBe("0.12");
  });

  it("rates a p75 against the Core Web Vitals thresholds", () => {
    expect(vitalRating("LCP", 2500)).toBe("good");
    expect(vitalRating("LCP", 3000)).toBe("needs_improvement");
    expect(vitalRating("LCP", 4001)).toBe("poor");
    expect(vitalRating("CLS", 0.3)).toBe("poor");
    expect(vitalRating("XYZ", 1)).toBeNull();
    expect(vitalRating("INP", null)).toBeNull();
  });
});

describe("retention matrix", () => {
  const cohorts = [
    { cohort_week: "2026-09-07", cohort_size: 10 },
    { cohort_week: "2026-09-14", cohort_size: 3 },
    { cohort_week: "2026-10-19", cohort_size: 6 },
  ];
  const rows = [
    { cohort_week: "2026-09-07", cohort_size: 10, week_offset: 1, active: 6 },
    { cohort_week: "2026-09-07", cohort_size: 10, week_offset: 2, active: 0 },
    { cohort_week: "2026-09-14", cohort_size: 3, week_offset: 1, active: 2 },
  ];
  const lines = retentionMatrix(rows, cohorts);

  it("orders cohorts newest first with eight weeks each", () => {
    expect(lines.map((l) => l.week)).toEqual(["2026-10-19", "2026-09-14", "2026-09-07"]);
    expect(lines.every((l) => l.cells.length === 8)).toBe(true);
  });

  it("keeps a week that has not ended as null, never zero", () => {
    const oldest = lines[2];
    expect(oldest.cells[0]).toEqual({ active: 6, rate: 0.6 });
    expect(oldest.cells[1]).toEqual({ active: 0, rate: 0 });
    expect(oldest.cells[2]).toBeNull();
    expect(lines[0].cells.every((c) => c === null)).toBe(true);
  });

  it("shows counts without a rate for cohorts under the sample floor", () => {
    expect(lines[1].cells[0]).toEqual({ active: 2, rate: null });
  });

  it("averages by people across cohorts that reached the week", () => {
    const avg = retentionAverage(lines);
    expect(avg[0]).toBeCloseTo(8 / 13);
    expect(avg[1]).toBe(0);
    expect(avg[2]).toBeNull();
  });

  it("returns nothing for no cohorts", () => {
    expect(retentionMatrix([], [])).toEqual([]);
    expect(retentionAverage([])).toEqual(Array(8).fill(null));
  });
});

describe("feature grouping", () => {
  it("groups actions by the taxonomy's feature and leaves out failures", () => {
    expect(featureOf("booking_requested")).toBe("bookings");
    const features = groupFeatures([
      { name: "booking_requested", events: 10, previous_events: 5, users: 6, active_days: 4 },
      { name: "booking_reviewed", events: 2, previous_events: 0, users: 2, active_days: 2 },
      { name: "post_created", events: 30, previous_events: 30, users: 3, active_days: 7 },
      { name: "action_failed", events: 99, previous_events: 0, users: 9, active_days: 7 },
    ]);
    expect(features.map((f) => f.feature)).toEqual(["community", "bookings"]);
    const bookings = features[1];
    expect(bookings).toMatchObject({ label: "Bookings", events: 12, previous: 5, users: 6, activeDays: 4 });
    expect(bookings.perUser).toBe(2);
    expect(features[0].perUser).toBeNull();
  });
});

describe("weekly totals", () => {
  it("adds days into Monday weeks without padding", () => {
    expect(
      weekly([
        { x: "2026-10-18", y: 1 }, // Sunday
        { x: "2026-10-19", y: 2 }, // Monday
        { x: "2026-10-25", y: 3 }, // Sunday
        { x: "2026-10-26", y: 4 },
      ]),
    ).toEqual([
      { x: "2026-10-12", y: 1 },
      { x: "2026-10-19", y: 5 },
      { x: "2026-10-26", y: 4 },
    ]);
  });
});
