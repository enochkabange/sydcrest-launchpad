import { describe, expect, it } from "vitest";
import { autoSlug, isUrl, parseList, parseOpportunityForm } from "./form";

const NOW = new Date("2026-10-27T12:00:00Z");

function form(values: Record<string, string | string[]>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) for (const item of [v].flat()) f.append(k, item);
  return f;
}

const valid = {
  title: "Junior data analyst",
  kind: "job",
  status: "open",
  organisation_name: "Bolgatanga Agro Co",
  description: "Keep the sales records in order.\n\nReport weekly.",
  apply_url: "https://example.org/jobs/1",
  deadline: "2026-11-30",
  region: "upper_east",
  fields: ["data", "business"],
  tracks: ["data", "excel-power-bi"],
  skills: "Excel, Google Sheets, excel",
};

describe("parseOpportunityForm", () => {
  it("accepts a complete admin post", () => {
    const { data, errors } = parseOpportunityForm(form({ ...valid, slug: "junior-data-analyst" }), { mode: "admin", now: NOW });
    expect(errors).toEqual({});
    expect(data).toMatchObject({
      slug: "junior-data-analyst",
      kind: "job",
      status: "open",
      organisation_name: "Bolgatanga Agro Co",
      fields: ["data", "business"],
      tracks: ["data", "excel-power-bi"],
      skills: ["Excel", "Google Sheets"],
      is_remote: false,
      source_url: null,
    });
  });

  it("makes a slug from the title when none is given", () => {
    const { data } = parseOpportunityForm(form(valid), { mode: "admin", now: NOW, tail: "a1b2" });
    expect(data.slug).toBe("junior-data-analyst-a1b2");
  });

  it("needs a way to apply", () => {
    const { errors } = parseOpportunityForm(form({ ...valid, apply_url: "" }), { mode: "admin", now: NOW });
    expect(errors.apply).toMatch(/application link or instructions/);
    const ok = parseOpportunityForm(form({ ...valid, apply_url: "", apply_instructions: "Email Mariama." }), { mode: "admin", now: NOW });
    expect(ok.errors).toEqual({});
  });

  it("rejects a past deadline only for open posts", () => {
    expect(parseOpportunityForm(form({ ...valid, deadline: "2026-10-26" }), { mode: "admin", now: NOW }).errors.deadline).toBeDefined();
    expect(parseOpportunityForm(form({ ...valid, deadline: "2026-10-27" }), { mode: "admin", now: NOW }).errors.deadline).toBeUndefined();
    expect(
      parseOpportunityForm(form({ ...valid, deadline: "2026-10-26", status: "closed" }), { mode: "admin", now: NOW }).errors.deadline,
    ).toBeUndefined();
    expect(parseOpportunityForm(form({ ...valid, deadline: "2026-02-30" }), { mode: "admin", now: NOW }).errors.deadline).toBe("Enter a real date.");
  });

  it("checks lists, links, regions and reserved slugs", () => {
    const { errors } = parseOpportunityForm(
      form({
        ...valid,
        slug: "saved",
        apply_url: "javascript:alert(1)",
        region: "lagos",
        fields: ["data", "nope"],
        tracks: ["data"],
        source_url: "not a link",
      }),
      { mode: "admin", now: NOW },
    );
    expect(Object.keys(errors).sort()).toEqual(["apply_url", "fields", "region", "slug", "source_url"]);
  });

  it("limits fields to five", () => {
    const fields = ["software", "data", "marketing", "design", "product", "business"];
    expect(parseOpportunityForm(form({ ...valid, fields }), { mode: "admin", now: NOW }).errors.fields).toMatch(/up to 5/);
  });

  it("leaves the poster name and source link to organisations' own records", () => {
    const { data, errors } = parseOpportunityForm(form({ ...valid, organisation_name: "", source_url: "https://x.test" }), {
      mode: "organisation",
      now: NOW,
    });
    expect(errors).toEqual({});
    expect(data).not.toHaveProperty("organisation_name");
    expect(data).not.toHaveProperty("source_url");
  });

  it("requires the poster name from admins", () => {
    expect(parseOpportunityForm(form({ ...valid, organisation_name: "" }), { mode: "admin", now: NOW }).errors.organisation_name).toBeDefined();
  });
});

describe("helpers", () => {
  it("parses comma lists without repeats", () => {
    expect(parseList(" Canva,  canva ,\nPhotoshop ,, ")).toEqual(["Canva", "Photoshop"]);
  });

  it("accepts only http and https links", () => {
    expect(isUrl("https://example.org/a?b=1")).toBe(true);
    expect(isUrl("ftp://example.org")).toBe(false);
    expect(isUrl("https://exa mple.org")).toBe(false);
  });

  it("falls back when the title has no letters", () => {
    expect(autoSlug("!!!", "zz11")).toBe("opportunity-zz11");
  });
});
