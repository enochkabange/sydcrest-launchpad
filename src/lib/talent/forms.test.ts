import { describe, expect, it } from "vitest";
import {
  hasFilters,
  matchesSkill,
  parseContactMessage,
  parseDirectoryFilters,
  parseListing,
  parseSharedContact,
  parseSkills,
} from "./forms";

describe("parseSkills", () => {
  it("splits on commas and new lines, trims and de duplicates ignoring case", () => {
    expect(parseSkills("Excel, excel ,  Power BI\nSEO,,  ")).toEqual(["Excel", "Power BI", "SEO"]);
    expect(parseSkills("")).toEqual([]);
  });
});

describe("parseListing", () => {
  it("parses a full listing", () => {
    const f = new FormData();
    f.set("headline", "Junior data analyst");
    f.set("summary", "I clean survey data for NGOs in Tamale.");
    f.set("skills", "Excel, SQL");
    f.append("tracks", "data");
    f.append("tracks", "excel-power-bi");
    f.append("tracks", "not-a-track");
    f.set("region", "northern");
    f.set("availability", "open_to_internships");
    f.set("open_to_remote", "on");
    f.set("portfolio_url", "github.com/mariama");
    const { data, errors } = parseListing(f);
    expect(errors).toEqual({});
    expect(data).toEqual({
      headline: "Junior data analyst",
      summary: "I clean survey data for NGOs in Tamale.",
      skills: ["Excel", "SQL"],
      tracks: ["data", "excel-power-bi"],
      region: "northern",
      availability: "open_to_internships",
      open_to_remote: true,
      portfolio_url: "https://github.com/mariama",
      is_active: true,
    });
  });

  it("needs a headline and a valid link", () => {
    const f = new FormData();
    f.set("portfolio_url", "javascript:alert(1)");
    f.set("is_active", "off");
    const { data, errors } = parseListing(f);
    expect(errors.headline).toBeTruthy();
    expect(errors.portfolio_url).toBeTruthy();
    expect(data.is_active).toBe(false);
    expect(data.open_to_remote).toBe(false);
  });

  it("caps skills", () => {
    const f = new FormData();
    f.set("headline", "x");
    f.set("skills", Array.from({ length: 31 }, (_, i) => `skill ${i}`).join(","));
    expect(parseListing(f).errors.skills).toMatch(/30/);
  });
});

describe("directory filters", () => {
  it("keeps known tracks and regions only", () => {
    expect(parseDirectoryFilters({ skill: " Excel ", track: "data", region: "upper_west" })).toEqual({
      skill: "Excel",
      track: "data",
      region: "upper_west",
    });
    expect(parseDirectoryFilters({ track: "astrology", region: "lagos", skill: ["a", "b"] })).toEqual({
      skill: "a",
      track: "",
      region: "",
    });
    expect(hasFilters({ skill: "", track: "", region: "" })).toBe(false);
  });

  it("matches skills by part, ignoring case", () => {
    expect(matchesSkill(["Microsoft Excel", "SQL"], "excel")).toBe(true);
    expect(matchesSkill(["SQL"], "excel")).toBe(false);
    expect(matchesSkill(null, "")).toBe(true);
  });
});

describe("contact requests", () => {
  it("needs a message within the limit", () => {
    expect(parseContactMessage("  ").error).toBeTruthy();
    expect(parseContactMessage("x".repeat(2001)).error).toBeTruthy();
    expect(parseContactMessage(" Hello Fuseini ")).toEqual({ message: "Hello Fuseini" });
  });

  it("lets the learner share nothing", () => {
    expect(parseSharedContact("  ")).toEqual({ contact: null });
    expect(parseSharedContact("hawa@example.com")).toEqual({ contact: "hawa@example.com" });
    expect(parseSharedContact("x".repeat(301)).error).toBeTruthy();
  });
});
