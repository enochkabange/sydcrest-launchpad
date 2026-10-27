import { describe, expect, it } from "vitest";
import {
  boardHref,
  budgetLabel,
  matchesBoard,
  matchExperts,
  parseBoardFilters,
  parseBrief,
  parseCedis,
  parsePitch,
  parseSkills,
  skillFacets,
} from "./briefs";

function form(entries: Record<string, string | string[]>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) for (const value of [v].flat()) f.append(k, value);
  return f;
}

const NOW = new Date("2026-10-27T10:00:00Z");
const ORG = "6b1f6a4e-0000-4000-8000-000000000001";

const validBrief = {
  kind: "advice",
  title: "Help me clean a farm survey sheet",
  description: "I collected 300 survey rows from farmers in Savelugu and need help removing duplicates.",
  skills: "Excel, data cleaning",
  is_remote: "on",
};

describe("parseSkills", () => {
  it("splits on commas and new lines, trims and dedupes ignoring case", () => {
    expect(parseSkills(" Excel,excel\nPower  BI, ,Figma ")).toEqual(["Excel", "Power BI", "Figma"]);
  });
});

describe("parseCedis", () => {
  it("accepts whole cedis with separators and an optional GHS prefix", () => {
    expect(parseCedis("1,500")).toBe(1500);
    expect(parseCedis("GHS 200")).toBe(200);
    expect(parseCedis("")).toBeNull();
  });
  it("rejects decimals, negatives and amounts over the limit", () => {
    expect(parseCedis("12.5")).toBeNaN();
    expect(parseCedis("-3")).toBeNaN();
    expect(parseCedis("1000001")).toBeNaN();
  });
});

describe("parseBrief", () => {
  it("accepts an advice brief", () => {
    const { data, errors } = parseBrief(form({ ...validBrief, categories: ["data"], budget: "300" }), [], NOW);
    expect(errors).toEqual({});
    expect(data).toMatchObject({
      kind: "advice",
      organisation_id: null,
      skills: ["Excel", "data cleaning"],
      categories: ["data"],
      indicative_budget_ghs: 300,
      is_remote: true,
      location: null,
      deadline: null,
    });
  });

  it("needs a postable organisation for a job brief", () => {
    expect(parseBrief(form({ ...validBrief, kind: "job" }), [ORG], NOW).errors.organisation_id).toBeDefined();
    expect(parseBrief(form({ ...validBrief, kind: "job", organisation_id: "someone-else" }), [ORG], NOW).errors.organisation_id).toBeDefined();
    const { data } = parseBrief(form({ ...validBrief, kind: "job", organisation_id: ORG }), [ORG], NOW);
    expect(data).toMatchObject({ kind: "job", organisation_id: ORG });
  });

  it("drops the organisation from an advice brief", () => {
    expect(parseBrief(form({ ...validBrief, organisation_id: ORG }), [ORG], NOW).data?.organisation_id).toBeNull();
  });

  it("reports missing and invalid fields", () => {
    const { data, errors } = parseBrief(
      form({ kind: "gig", title: "", description: "short", skills: "", budget: "lots", deadline: "2026-10-01", categories: "astrology" }),
      [],
      NOW,
    );
    expect(data).toBeNull();
    expect(Object.keys(errors).sort()).toEqual(["budget", "categories", "deadline", "description", "kind", "location", "skills", "title"]);
  });

  it("needs a location when the work is not remote", () => {
    const inPerson: Record<string, string> = { ...validBrief };
    delete inPerson.is_remote;
    expect(parseBrief(form(inPerson), [], NOW).errors.location).toBeDefined();
    expect(parseBrief(form({ ...inPerson, location: "Tamale" }), [], NOW).data).toMatchObject({ is_remote: false, location: "Tamale" });
  });

  it("allows a deadline of today in Accra", () => {
    expect(parseBrief(form({ ...validBrief, deadline: "2026-10-27" }), [], NOW).data?.deadline).toBe("2026-10-27");
  });
});

describe("parsePitch", () => {
  it("accepts a message with an optional price, timeline and own offer", () => {
    const { data, errors } = parsePitch(
      form({ message: "I have cleaned survey data for NGOs in Tamale for three years.", price: "250", timeline: "Within a week", offer_id: "o1" }),
      ["o1"],
    );
    expect(errors).toEqual({});
    expect(data).toEqual({
      message: "I have cleaned survey data for NGOs in Tamale for three years.",
      indicative_price_ghs: 250,
      proposed_timeline: "Within a week",
      offer_id: "o1",
    });
  });

  it("rejects a short message, a bad price and someone else's offer", () => {
    const { errors } = parsePitch(form({ message: "Hi", price: "1.5", offer_id: "o2" }), ["o1"]);
    expect(Object.keys(errors).sort()).toEqual(["message", "offer_id", "price"]);
  });
});

describe("board filters", () => {
  it("parses only known kinds and keeps the skill", () => {
    expect(parseBoardFilters({ kind: "job", skill: " Excel " })).toEqual({ kind: "job", skill: "Excel" });
    expect(parseBoardFilters({ kind: "loan" })).toEqual({ kind: "", skill: "" });
  });

  it("builds shareable links", () => {
    expect(boardHref({ kind: "advice", skill: "Power BI" })).toBe("/briefs?kind=advice&skill=Power+BI");
    expect(boardHref({})).toBe("/briefs");
  });

  it("filters by kind and skill ignoring case", () => {
    const brief = { kind: "advice", skills: ["Excel", "Figma"] };
    expect(matchesBoard(brief, { kind: "", skill: "excel" })).toBe(true);
    expect(matchesBoard(brief, { kind: "job", skill: "" })).toBe(false);
    expect(matchesBoard(brief, { kind: "", skill: "Python" })).toBe(false);
  });

  it("lists skills by how often they appear", () => {
    expect(skillFacets([{ kind: "advice", skills: ["Excel", "Figma"] }, { kind: "job", skills: ["excel"] }])).toEqual(["Excel", "Figma"]);
  });
});

describe("matchExperts", () => {
  const experts = [
    { profile_id: "fuseini", skills: ["excel ", "Power BI"], categories: ["data"] },
    { profile_id: "mariama", skills: ["Figma"], categories: ["design"] },
    { profile_id: "hawa", skills: ["SQL"], categories: ["data"] },
    { profile_id: "poster", skills: ["Excel"], categories: ["data"] },
  ];

  it("matches on a shared skill first, then a shared category, never the excluded", () => {
    expect(matchExperts({ skills: ["Excel"], categories: ["data"] }, experts, ["poster"])).toEqual(["fuseini", "hawa"]);
  });

  it("finds nobody when nothing overlaps", () => {
    expect(matchExperts({ skills: ["Welding"], categories: [] }, experts, [])).toEqual([]);
  });

  it("caps the list", () => {
    expect(matchExperts({ skills: ["Excel"], categories: ["data", "design"] }, experts, [], 2)).toHaveLength(2);
  });
});

describe("budgetLabel", () => {
  it("labels budgets as indicative", () => {
    expect(budgetLabel(1500)).toBe("GHS 1,500 (indicative)");
    expect(budgetLabel(null)).toBeNull();
  });
});
