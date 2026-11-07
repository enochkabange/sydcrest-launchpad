import { describe, expect, it } from "vitest";
import { addDays, filterQuery, parseFilters, spanDays, toRpcArgs } from "./filters";
import { toCsv, csvFileName } from "./csv";
import { DASHBOARDS, TABLES } from "./dashboards";

const TODAY = "2026-10-28";
const UUID = "c0000000-0000-4000-8000-00000000000a";

describe("date range", () => {
  it("defaults to the last 30 days ending today", () => {
    const f = parseFilters({}, TODAY);
    expect(f).toMatchObject({ from: "2026-09-29", to: TODAY, days: 30, preset: 30 });
  });

  it("takes the 7 and 90 day presets", () => {
    expect(parseFilters({ range: "7" }, TODAY)).toMatchObject({ from: "2026-10-22", days: 7, preset: 7 });
    expect(parseFilters({ range: "90" }, TODAY)).toMatchObject({ from: "2026-07-31", days: 90, preset: 90 });
  });

  it("uses custom dates only when they are valid", () => {
    expect(parseFilters({ range: "custom", from: "2026-10-01", to: "2026-10-10" }, TODAY)).toMatchObject({
      from: "2026-10-01",
      to: "2026-10-10",
      days: 10,
      preset: null,
    });
    // A preset wins over stray dates from the form.
    expect(parseFilters({ range: "7", from: "2026-10-01", to: "2026-10-10" }, TODAY).preset).toBe(7);
    for (const bad of [
      { from: "2026-10-10", to: "2026-10-01" },
      { from: "2026-02-30", to: "2026-03-01" },
      { from: "2026-10-01", to: "2026-11-01" },
      { from: "2024-01-01", to: "2026-10-01" },
      { from: "yesterday", to: TODAY },
    ]) {
      expect(parseFilters({ range: "custom", ...bad }, TODAY).preset).toBe(30);
    }
  });

  it("counts days with both ends included", () => {
    expect(spanDays("2026-10-01", "2026-10-01")).toBe(1);
    expect(addDays("2026-10-28", -6)).toBe("2026-10-22");
  });
});

describe("filters", () => {
  it("keeps valid values the dashboard supports and drops the rest", () => {
    const f = parseFilters({ track: "data-analyst", region: "northern", cohort: UUID, device: "mobile", chapter: "not-a-uuid" }, TODAY);
    expect(f).toMatchObject({ track: "data-analyst", region: "northern", cohort: UUID, device: "mobile", chapter: null });
    expect(parseFilters({ region: "atlantis", device: "fridge", track: "DROP TABLE" }, TODAY)).toMatchObject({ region: null, device: null, track: null });
    expect(parseFilters({ device: "mobile", region: "northern" }, TODAY, ["device"])).toMatchObject({ device: "mobile", region: null });
  });

  it("maps to the report function arguments", () => {
    const f = parseFilters({ region: "upper_east" }, TODAY);
    expect(toRpcArgs(f)).toEqual({ p_from: "2026-09-29", p_to: TODAY, p_track: undefined, p_region: "upper_east", p_chapter: undefined, p_cohort: undefined, p_device: undefined });
  });

  it("writes them back as a link", () => {
    expect(filterQuery(parseFilters({}, TODAY))).toBe("");
    expect(filterQuery(parseFilters({ range: "7", region: "northern" }, TODAY))).toBe("?range=7&region=northern");
    expect(filterQuery(parseFilters({ range: "custom", from: "2026-10-01", to: "2026-10-10" }, TODAY))).toBe("?from=2026-10-01&to=2026-10-10");
    expect(filterQuery(parseFilters({ region: "northern" }, TODAY), { region: null })).toBe("");
  });
});

describe("csv", () => {
  it("quotes, neutralises formulas and starts with a byte order mark", () => {
    const csv = toCsv(
      [
        ["name", "Learner"],
        ["n", "Count"],
        ["h", "Hours"],
      ],
      [
        { name: 'Wumpini "Wumi" Alhassan, Tamale', n: 3, h: 12.345 },
        { name: "=HYPERLINK(1)", n: 0, h: null },
      ],
    );
    expect(csv.startsWith("﻿")).toBe(true);
    expect(csv.slice(1).split("\r\n")).toEqual(["Learner,Count,Hours", '"Wumpini ""Wumi"" Alhassan, Tamale",3,12.35', "'=HYPERLINK(1),0,", ""]);
  });

  it("names files safely", () => {
    expect(csvFileName("at_risk", "2026-10-01", "2026-10-28")).toBe("sydcrest-at_risk-2026-10-01-to-2026-10-28.csv");
    expect(csvFileName("../x", "a", "b")).toBe("sydcrest-x-a-to-b.csv");
  });
});

describe("dashboard registry", () => {
  it("has nine dashboards, each table belonging to one", () => {
    expect(DASHBOARDS).toHaveLength(9);
    const slugs = new Set(DASHBOARDS.map((d) => d.slug));
    for (const t of Object.values(TABLES)) expect(slugs.has(t.dashboard)).toBe(true);
  });

  it("exports no contact details", () => {
    const keys = Object.values(TABLES).flatMap((t) => t.columns.map(([k]) => k));
    for (const k of keys) expect(k).not.toMatch(/email|phone|profile_id|slug_of_person/);
  });
});
