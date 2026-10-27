import { describe, expect, it } from "vitest";
import {
  NO_FILTERS,
  RANK_SIGNALS,
  facets,
  featuredExperts,
  filtersHref,
  isFiltered,
  matches,
  parseFilters,
  rankExperts,
  ratingLabel,
  responseTimeLabel,
  score,
  sessionsLabel,
  toDirectoryExpert,
  weightedRating,
  type DirectoryExpert,
  type PublicExpertRow,
} from "./directory";

function row(overrides: Partial<PublicExpertRow> = {}): PublicExpertRow {
  return {
    profile_id: "00000000-0000-0000-0000-000000000001",
    slug: "wumpini-abukari",
    display_name: "Wumpini Abukari",
    avatar_url: null,
    headline: "Data analyst at a Tamale NGO",
    bio: "I clean survey data for field teams.",
    skills: ["Excel", "SQL"],
    categories: ["data"],
    links: [],
    languages: ["English", "Dagbani"],
    region: "northern",
    availability_note: null,
    accepting_requests: true,
    offers_free_intro: false,
    is_verified: false,
    is_featured: false,
    approved_at: "2026-10-01T09:00:00Z",
    completed_bookings: 0,
    review_count: 0,
    average_rating: null,
    median_response_hours: null,
    ...overrides,
  };
}

function expert(overrides: Partial<PublicExpertRow> = {}, extra: Partial<DirectoryExpert> = {}): DirectoryExpert {
  return { ...toDirectoryExpert(row(overrides))!, ...extra };
}

describe("toDirectoryExpert", () => {
  it("normalises nulls and collects the kinds of active offers", () => {
    const e = toDirectoryExpert(
      row({ skills: null, display_name: null, average_rating: 4.5 as never }),
      [
        { expert_id: "00000000-0000-0000-0000-000000000001", kind: "gig", title: "Clean your survey sheet" },
        { expert_id: "00000000-0000-0000-0000-000000000001", kind: "gig", title: "Second gig" },
        { expert_id: "someone-else", kind: "group", title: "Not theirs" },
        { expert_id: "00000000-0000-0000-0000-000000000001", kind: "unknown", title: "Ignored kind" },
      ],
    )!;
    expect(e.skills).toEqual([]);
    expect(e.name).toBe("SydCrest expert");
    expect(e.offerKinds).toEqual(["gig"]);
    expect(e.offerTitles).toHaveLength(3);
    expect(e.averageRating).toBe(4.5);
    expect(e.verifiedSkills).toEqual([]);
  });

  it("fills verified skills from the view's verified_skills column (#165)", () => {
    const e = toDirectoryExpert(
      row({
        verified_skills: [
          { slug: "spreadsheets", name: "Spreadsheets", source: "assessment", issued_at: "2026-10-01T09:00:00Z" },
          { slug: "sql", name: "SQL", source: "path_completion", issued_at: "2026-09-01T09:00:00Z" },
          { slug: "bad", name: "Bad", source: "bought", issued_at: "2026-09-01T09:00:00Z" },
        ],
      }),
    )!;
    expect(e.verifiedSkills).toEqual(["Spreadsheets", "SQL"]);
    expect(e.verifiedSkillBadges.map((b) => b.source)).toEqual(["assessment", "path_completion"]);
  });

  it("matches a skill filter and search on verified skills too", () => {
    const e = expert({ skills: [] }, { verifiedSkills: ["SQL"] });
    expect(matches(e, { ...NO_FILTERS, skill: "sql" })).toBe(true);
    expect(matches(e, { ...NO_FILTERS, q: "sql" })).toBe(true);
  });

  it("drops a row without a slug", () => {
    expect(toDirectoryExpert(row({ slug: null }))).toBeNull();
  });
});

describe("parseFilters", () => {
  it("keeps known values and drops unknown ones", () => {
    expect(
      parseFilters({ q: "  excel ", type: "gig", availability: "free_intro", rating: "4", sort: "rating", category: "data" }),
    ).toEqual({
      q: "excel",
      skill: "",
      category: "data",
      kind: "gig",
      availability: "free_intro",
      minRating: 4,
      sort: "rating",
    });
    expect(parseFilters({ type: "drop table", rating: "2", sort: "random", category: "astrology", availability: "x" })).toEqual(
      NO_FILTERS,
    );
  });

  it("takes the first of repeated params", () => {
    expect(parseFilters({ skill: ["SQL", "Excel"] }).skill).toBe("SQL");
  });

  it("round trips through filtersHref", () => {
    const f = parseFilters({ q: "power bi", type: "one_to_one", rating: "4.5" });
    const href = filtersHref(f);
    expect(href).toBe("/experts?q=power+bi&type=one_to_one&rating=4.5");
    expect(parseFilters(Object.fromEntries(new URL(href, "http://x").searchParams))).toEqual(f);
    expect(filtersHref(NO_FILTERS)).toBe("/experts");
  });

  it("treats sort alone as unfiltered", () => {
    expect(isFiltered({ ...NO_FILTERS, sort: "newest" })).toBe(false);
    expect(isFiltered({ ...NO_FILTERS, minRating: 3 })).toBe(true);
  });
});

describe("rankExperts filters", () => {
  const data = expert({ slug: "data-person" }, { offerKinds: ["one_to_one"] });
  const designer = expert(
    {
      slug: "mariama-design",
      display_name: "Mariama Seidu",
      headline: "Product designer",
      bio: null,
      skills: ["Figma"],
      categories: ["design"],
      accepting_requests: false,
      average_rating: 4.2,
      review_count: 5,
    },
    { offerKinds: ["gig"], offerTitles: ["Logo for your chop bar"] },
  );
  const all = [data, designer];

  it("searches name, skills, offers and category labels, every word must match", () => {
    expect(rankExperts(all, { ...NO_FILTERS, q: "chop bar" }).map((e) => e.slug)).toEqual(["mariama-design"]);
    expect(rankExperts(all, { ...NO_FILTERS, q: "analytics" }).map((e) => e.slug)).toEqual(["data-person"]);
    expect(rankExperts(all, { ...NO_FILTERS, q: "figma excel" })).toEqual([]);
  });

  it("filters by skill case insensitively, service type, category and availability", () => {
    expect(rankExperts(all, { ...NO_FILTERS, skill: "figma" }).map((e) => e.slug)).toEqual(["mariama-design"]);
    expect(rankExperts(all, { ...NO_FILTERS, kind: "gig" }).map((e) => e.slug)).toEqual(["mariama-design"]);
    expect(rankExperts(all, { ...NO_FILTERS, category: "data" }).map((e) => e.slug)).toEqual(["data-person"]);
    expect(rankExperts(all, { ...NO_FILTERS, availability: "accepting" }).map((e) => e.slug)).toEqual(["data-person"]);
  });

  it("leaves unreviewed experts out of a rating filter", () => {
    expect(rankExperts(all, { ...NO_FILTERS, minRating: 4 }).map((e) => e.slug)).toEqual(["mariama-design"]);
    expect(rankExperts(all, { ...NO_FILTERS, minRating: 4.5 })).toEqual([]);
  });
});

describe("ranking", () => {
  it("shrinks a single perfect review towards the prior", () => {
    expect(weightedRating({ averageRating: null, reviewCount: 0 })).toBe(3.5);
    const one = weightedRating({ averageRating: 5, reviewCount: 1 });
    const many = weightedRating({ averageRating: 4.6, reviewCount: 40 });
    expect(one).toBeLessThan(many);
  });

  it("puts experts taking requests, with good reviews and sessions, first", () => {
    const fresh = expert({ slug: "fresh", approved_at: "2026-10-20T00:00:00Z" });
    const proven = expert({ slug: "proven", completed_bookings: 20, review_count: 12, average_rating: 4.8, median_response_hours: 3 });
    const paused = expert({ slug: "paused", accepting_requests: false, completed_bookings: 20, review_count: 12, average_rating: 4.8 });
    expect(rankExperts([paused, fresh, proven], NO_FILTERS).map((e) => e.slug)).toEqual(["proven", "fresh", "paused"]);
  });

  it("is stable on ties: earliest listed, then slug", () => {
    const a = expert({ slug: "b-expert", approved_at: "2026-10-02T00:00:00Z" });
    const b = expert({ slug: "a-expert", approved_at: "2026-10-02T00:00:00Z" });
    const c = expert({ slug: "c-expert", approved_at: "2026-09-01T00:00:00Z" });
    expect(rankExperts([a, b, c], NO_FILTERS).map((e) => e.slug)).toEqual(["c-expert", "a-expert", "b-expert"]);
  });

  it("sorts by rating, sessions and newest", () => {
    const x = expert({ slug: "x", completed_bookings: 3, review_count: 10, average_rating: 4.9, approved_at: "2026-01-01T00:00:00Z" });
    const y = expert({ slug: "y", completed_bookings: 9, review_count: 2, average_rating: 4.0, approved_at: "2026-06-01T00:00:00Z" });
    expect(rankExperts([y, x], { ...NO_FILTERS, sort: "rating" }).map((e) => e.slug)).toEqual(["x", "y"]);
    expect(rankExperts([x, y], { ...NO_FILTERS, sort: "sessions" }).map((e) => e.slug)).toEqual(["y", "x"]);
    expect(rankExperts([x, y], { ...NO_FILTERS, sort: "newest" }).map((e) => e.slug)).toEqual(["y", "x"]);
  });

  it("has a verified skill signal that boosts a match", () => {
    expect(RANK_SIGNALS.map((s) => s.id)).toContain("verifiedSkill");
    const plain = expert({ slug: "plain" });
    const verified = expert({ slug: "verified" }, { verifiedSkills: ["SQL"] });
    const f = { ...NO_FILTERS, skill: "SQL" };
    expect(score(verified, f)).toBeGreaterThan(score(verified, NO_FILTERS));
    expect(score(verified, NO_FILTERS)).toBeGreaterThan(score(plain, NO_FILTERS));
    expect(rankExperts([plain, verified], f).map((e) => e.slug)).toEqual(["verified", "plain"]);
  });

  it("accepts extra signals", () => {
    const a = expert({ slug: "a" });
    const b = expert({ slug: "b" });
    const preferB = [...RANK_SIGNALS, { id: "test", weight: 10, value: (e: DirectoryExpert) => (e.slug === "b" ? 1 : 0) }];
    expect(rankExperts([a, b], NO_FILTERS, preferB).map((e) => e.slug)).toEqual(["b", "a"]);
  });
});

describe("featuredExperts and facets", () => {
  it("features only flagged experts taking requests", () => {
    const list = [
      expert({ slug: "f1", is_featured: true }),
      expert({ slug: "f2", is_featured: true, accepting_requests: false }),
      expert({ slug: "n1" }),
    ];
    expect(featuredExperts(list).map((e) => e.slug)).toEqual(["f1"]);
  });

  it("collects distinct skills, known categories with counts, and offer kinds", () => {
    const list = [
      expert({ skills: ["SQL", "Excel"], categories: ["data", "retired-category"] }, { offerKinds: ["gig"] }),
      expert({ slug: "two", skills: ["sql", "Power BI"], categories: ["data"] }, { offerKinds: ["group"] }),
    ];
    const f = facets(list);
    expect(f.skills).toEqual(["Excel", "Power BI", "SQL"]);
    expect(f.categories.get("data")).toBe(2);
    expect(f.categories.has("retired-category")).toBe(false);
    expect([...f.kinds].sort()).toEqual(["gig", "group"]);
  });
});

describe("trust signal labels", () => {
  it("describes response time only when known", () => {
    expect(responseTimeLabel(null)).toBeNull();
    expect(responseTimeLabel(0.4)).toBe("Usually replies within an hour");
    expect(responseTimeLabel(5)).toBe("Usually replies within a few hours");
    expect(responseTimeLabel(20.5)).toBe("Usually replies within a day");
    expect(responseTimeLabel(50)).toBe("Usually replies within 3 days");
  });

  it("shows ratings and sessions only from real counts", () => {
    expect(ratingLabel(null, 0)).toBeNull();
    expect(ratingLabel(4.75, 1)).toBe("4.8 out of 5 from 1 review");
    expect(sessionsLabel(0)).toBeNull();
    expect(sessionsLabel(1)).toBe("1 completed session");
    expect(sessionsLabel(12)).toBe("12 completed sessions");
  });
});
