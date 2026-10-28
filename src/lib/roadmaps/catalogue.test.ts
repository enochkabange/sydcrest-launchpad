import { describe, expect, it } from "vitest";
import { facetsFor, filterOptions, matchesFilters, NO_FILTERS } from "./catalogue";

const phone = new Set(["digital-marketing"]);
const marketing = facetsFor({ field_category: "marketing", required_minutes: 9 * 60, track: "digital-marketing", level: "beginner" }, phone);
const data = facetsFor({ field_category: "data", required_minutes: 13 * 60, track: "data-science", level: "next-step" }, phone);
const fresh = facetsFor({ field_category: null, required_minutes: 0, track: null, level: "nonsense" }, phone);

describe("roadmap index filters", () => {
  it("derives facets: band from minutes, phone from the track, a known level only", () => {
    expect(marketing).toEqual({ field: "marketing", band: "short", phone: true, level: "beginner" });
    expect(data).toEqual({ field: "data", band: "long", phone: false, level: "next-step" });
    expect(fresh).toEqual({ field: null, band: null, phone: false, level: null });
  });

  it("matches every filter at once; empty filters match all", () => {
    expect([marketing, data, fresh].filter((f) => matchesFilters(f, NO_FILTERS))).toHaveLength(3);
    expect(matchesFilters(marketing, { ...NO_FILTERS, phone: true })).toBe(true);
    expect(matchesFilters(data, { ...NO_FILTERS, phone: true })).toBe(false);
    expect(matchesFilters(data, { ...NO_FILTERS, field: "data", band: "long", level: "next-step" })).toBe(true);
    expect(matchesFilters(data, { ...NO_FILTERS, field: "data", band: "short" })).toBe(false);
    expect(matchesFilters(fresh, { ...NO_FILTERS, band: "short" })).toBe(false);
  });

  it("offers only options some roadmap has", () => {
    const options = filterOptions([marketing, data, fresh]);
    expect(options.fields.map((f) => f.id)).toEqual(["data", "marketing"]);
    expect(options.bands.map((b) => b.id)).toEqual(["short", "long"]);
    expect(options.levels.map((l) => l.id)).toEqual(["beginner", "next-step"]);
    expect(options.phone).toBe(true);
  });
});
