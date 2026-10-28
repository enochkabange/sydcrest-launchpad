import { describe, expect, it } from "vitest";
import {
  accraToday,
  addDays,
  deadlineLabel,
  filterOpportunities,
  filtersQuery,
  jobPostingJsonLd,
  jsonLdScript,
  locationLabel,
  parseFilters,
  secondsToAccraMidnight,
  suggestFor,
  type Opportunity,
} from "./model";

const TODAY = "2026-10-27";

function opp(over: Partial<Opportunity> = {}): Opportunity {
  return {
    id: over.slug ?? "id",
    slug: "data-intern-tamale",
    kind: "internship",
    title: "Data intern",
    summary: null,
    description: "Clean survey data for an NGO in Tamale.",
    organisation_name: "Savannah Data Hub",
    apply_url: "https://example.org/apply",
    apply_instructions: null,
    location: "Tamale",
    region: "northern",
    is_remote: false,
    deadline: null,
    eligibility: null,
    fields: ["data"],
    skills: [],
    tracks: ["data"],
    compensation_note: null,
    published_at: "2026-10-20T10:00:00Z",
    updated_at: "2026-10-20T10:00:00Z",
    ...over,
  };
}

describe("Accra dates", () => {
  it("uses the Accra calendar day", () => {
    expect(accraToday(new Date("2026-10-27T23:59:59Z"))).toBe("2026-10-27");
    expect(accraToday(new Date("2026-10-28T00:00:01Z"))).toBe("2026-10-28");
  });

  it("counts seconds to the next Accra midnight", () => {
    expect(secondsToAccraMidnight(new Date("2026-10-27T23:00:00Z"))).toBe(3600);
    expect(secondsToAccraMidnight(new Date("2026-10-27T00:00:00Z"))).toBe(86_400);
  });

  it("adds days across month ends", () => {
    expect(addDays("2026-10-30", 3)).toBe("2026-11-02");
  });

  it("labels deadlines", () => {
    expect(deadlineLabel(null, TODAY)).toBe("No fixed deadline");
    expect(deadlineLabel(TODAY, TODAY)).toBe("Closes today");
    expect(deadlineLabel("2026-10-28", TODAY)).toBe("Closes tomorrow");
    expect(deadlineLabel("2026-11-14", TODAY)).toBe("Closes 14 Nov 2026");
  });
});

describe("locationLabel", () => {
  it("joins town and region, and says remote", () => {
    expect(locationLabel(opp())).toBe("Tamale, Northern");
    expect(locationLabel(opp({ is_remote: true, location: null, region: null }))).toBe("Remote");
    expect(locationLabel(opp({ is_remote: true, location: null }))).toBe("Northern or remote");
    expect(locationLabel(opp({ location: null, region: null }))).toBe("Location not given");
  });
});

describe("parseFilters", () => {
  it("keeps known values and drops the rest", () => {
    expect(parseFilters({ type: "grant", field: "data", location: "upper_west", deadline: "week", view: "table" })).toEqual({
      kind: "grant",
      field: "data",
      location: "upper_west",
      deadline: "week",
      view: "table",
    });
    expect(parseFilters({ type: "loan", field: "x", location: "lagos", deadline: "soon", view: "list" })).toEqual({
      kind: null,
      field: null,
      location: null,
      deadline: null,
      view: "cards",
    });
  });

  it("round trips through the query string", () => {
    const f = parseFilters({ type: "job", location: "remote" });
    expect(filtersQuery(f)).toBe("?type=job&location=remote");
    expect(filtersQuery(parseFilters({}))).toBe("");
  });
});

describe("filterOpportunities", () => {
  const list = [
    opp({ slug: "a", kind: "job", deadline: "2026-10-26" }), // past
    opp({ slug: "b", kind: "job", deadline: "2026-10-30", is_remote: true, region: null }),
    opp({ slug: "c", kind: "scholarship", deadline: "2026-11-20", fields: ["software"], region: "upper_east" }),
    opp({ slug: "d", kind: "gig", deadline: null }),
    opp({ slug: "e", kind: "internship", deadline: TODAY }),
  ];
  const all = parseFilters({});

  it("hides anything past its deadline and sorts soonest first", () => {
    expect(filterOpportunities(list, all, TODAY).map((o) => o.slug)).toEqual(["e", "b", "c", "d"]);
  });

  it("filters by type, field, remote, region and deadline", () => {
    const slugs = (p: Record<string, string>) => filterOpportunities(list, parseFilters(p), TODAY).map((o) => o.slug);
    expect(slugs({ type: "job" })).toEqual(["b"]);
    expect(slugs({ field: "software" })).toEqual(["c"]);
    expect(slugs({ location: "remote" })).toEqual(["b"]);
    expect(slugs({ location: "upper_east" })).toEqual(["c"]);
    expect(slugs({ deadline: "week" })).toEqual(["e", "b"]);
    expect(slugs({ deadline: "month" })).toEqual(["e", "b", "c"]);
    expect(slugs({ deadline: "open-ended" })).toEqual(["d"]);
  });
});

describe("suggestFor", () => {
  const list = [
    opp({ id: "1", slug: "s1", tracks: ["frontend"], deadline: "2026-11-01" }),
    opp({ id: "2", slug: "s2", tracks: ["data"], deadline: "2026-12-01" }),
    opp({ id: "3", slug: "s3", tracks: ["data", "frontend"], deadline: "2026-10-29" }),
    opp({ id: "4", slug: "s4", tracks: ["data"], deadline: "2026-10-01" }), // past
    opp({ id: "5", slug: "s5", tracks: [] }),
  ];

  it("matches the main track first, then the starter track", () => {
    expect(suggestFor(list, ["data", "frontend"], { today: TODAY }).map((o) => o.id)).toEqual(["3", "2", "1"]);
  });

  it("skips saved posts and respects the limit", () => {
    expect(suggestFor(list, ["data"], { today: TODAY, exclude: ["3"], limit: 1 }).map((o) => o.id)).toEqual(["2"]);
  });

  it("suggests nothing without a track", () => {
    expect(suggestFor(list, [], { today: TODAY })).toEqual([]);
  });
});

describe("jobPostingJsonLd", () => {
  it("describes jobs and internships with only facts we hold", () => {
    const ld = jobPostingJsonLd(opp({ deadline: "2026-11-30", is_remote: true }), "https://example.test/opportunities/x");
    expect(ld).toMatchObject({
      "@type": "JobPosting",
      title: "Data intern",
      datePosted: "2026-10-20",
      validThrough: "2026-11-30T23:59:59+00:00",
      employmentType: "INTERN",
      hiringOrganization: { name: "Savannah Data Hub" },
      jobLocation: { address: { addressLocality: "Tamale", addressRegion: "Northern", addressCountry: "GH" } },
      jobLocationType: "TELECOMMUTE",
      directApply: false,
    });
    expect(ld).not.toHaveProperty("baseSalary");
    expect(jobPostingJsonLd(opp({ kind: "job" }), "u")).not.toHaveProperty("employmentType");
  });

  it("gives scholarships, grants and gigs none", () => {
    for (const kind of ["scholarship", "grant", "gig"]) expect(jobPostingJsonLd(opp({ kind }), "u")).toBeNull();
  });

  it("escapes a closing script tag", () => {
    expect(jsonLdScript({ description: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});
