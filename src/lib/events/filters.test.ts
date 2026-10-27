import { describe, expect, it } from "vitest";
import { hasFilters, matchesFilters, parseEventFilters, splitByTime } from "./filters";

const tamale = { slug: "tamale", name: "Tamale", city: "Tamale" };

describe("parseEventFilters", () => {
  it("keeps known values and drops the rest", () => {
    expect(parseEventFilters({ kind: "skillshop", format: "online", chapter: "tamale" }, ["tamale"])).toEqual({
      kind: "skillshop",
      format: "online",
      chapter: "tamale",
    });
    expect(parseEventFilters({ kind: "party", format: ["in_person", "online"], chapter: "accra" }, ["tamale"])).toEqual({
      kind: null,
      format: "in_person",
      chapter: null,
    });
    expect(hasFilters(parseEventFilters({}, []))).toBe(false);
  });
});

describe("matchesFilters", () => {
  const skillshop = { kind: "skillshop", format: "in_person", chapter: tamale };
  const webinar = { kind: "webinar", format: "online", chapter: null };
  const hybrid = { kind: "flagship", format: "hybrid", chapter: null };

  it("filters by kind and chapter", () => {
    expect(matchesFilters(skillshop, { kind: "skillshop", format: null, chapter: "tamale" })).toBe(true);
    expect(matchesFilters(webinar, { kind: "skillshop", format: null, chapter: null })).toBe(false);
    expect(matchesFilters(webinar, { kind: null, format: null, chapter: "tamale" })).toBe(false);
  });

  it("counts hybrid events as both in person and online", () => {
    expect(matchesFilters(hybrid, { kind: null, format: "online", chapter: null })).toBe(true);
    expect(matchesFilters(hybrid, { kind: null, format: "in_person", chapter: null })).toBe(true);
    expect(matchesFilters(skillshop, { kind: null, format: "online", chapter: null })).toBe(false);
  });
});

describe("splitByTime", () => {
  it("puts live and future events in upcoming, soonest first, and the rest in past, latest first", () => {
    const events = [
      { id: "a", status: "published", starts_at: "2026-12-10T10:00:00Z", ends_at: "2026-12-10T12:00:00Z" },
      { id: "b", status: "published", starts_at: "2026-11-01T10:00:00Z", ends_at: "2026-11-01T12:00:00Z" },
      { id: "c", status: "published", starts_at: "2026-11-20T09:00:00Z", ends_at: "2026-11-20T18:00:00Z" },
      { id: "d", status: "completed", starts_at: "2026-11-25T10:00:00Z", ends_at: "2026-11-25T12:00:00Z" },
      { id: "e", status: "cancelled", starts_at: "2026-10-01T10:00:00Z", ends_at: "2026-10-01T12:00:00Z" },
    ];
    const { upcoming, past } = splitByTime(events, new Date("2026-11-20T12:00:00Z"));
    expect(upcoming.map((e) => e.id)).toEqual(["c", "a"]);
    expect(past.map((e) => e.id)).toEqual(["d", "b", "e"]);
  });
});
