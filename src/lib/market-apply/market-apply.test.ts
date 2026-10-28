import { describe, expect, it } from "vitest";
import {
  applicationStage,
  describeResponseTime,
  isSafeUrl,
  parseApplication,
  parseExpertProfile,
  parseLinks,
  suggestSlug,
} from "./expert";
import { formatIndicativePrice, offerFacts, parseOffer } from "./offers";

function form(values: Record<string, string | string[]>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) for (const item of Array.isArray(v) ? v : [v]) f.append(k, item);
  return f;
}

const APPLICATION = {
  slug: "hawa-iddrisu",
  headline: "Data analyst helping beginners in Tamale",
  skills: "Excel, Power BI, excel, SQL",
  categories: ["data", "careers", "data"],
  links: "hawa.dev",
  evidence_links: "https://github.com/hawa/sales-dashboard\nhttps://hawa.dev/report",
  experience: "Two years at an NGO in Tamale.",
  motivation: "I want more young people in the north to get data jobs.",
};

describe("links", () => {
  it("adds https to bare addresses and drops repeats", () => {
    expect(parseLinks("hawa.dev\n https://hawa.dev , https://x.com/hawa")).toEqual(["https://hawa.dev", "https://x.com/hawa"]);
  });
  it("keeps only plain web addresses", () => {
    expect(isSafeUrl("https://example.com/a?b=1")).toBe(true);
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("https://example.com/a b")).toBe(false);
  });
});

describe("parseApplication", () => {
  it("accepts a complete application and splits profile from review fields", () => {
    const { data, errors } = parseApplication(form(APPLICATION));
    expect(errors).toEqual({});
    expect(data.profile).toEqual({
      slug: "hawa-iddrisu",
      headline: "Data analyst helping beginners in Tamale",
      skills: ["Excel", "Power BI", "SQL"],
      categories: ["data", "careers"],
      links: ["https://hawa.dev"],
    });
    expect(data.application.evidence_links).toHaveLength(2);
    expect(data.application.experience).toBe("Two years at an NGO in Tamale.");
  });

  it("requires a headline, skills, sample work and a reason", () => {
    const { errors } = parseApplication(form({ ...APPLICATION, headline: "", skills: "", evidence_links: "", motivation: "" }));
    expect(Object.keys(errors).sort()).toEqual(["evidence_links", "headline", "motivation", "skills"]);
  });

  it("needs one to five categories from the browse list", () => {
    expect(parseApplication(form({ ...APPLICATION, categories: [] })).errors.categories).toMatch(/at least one/);
    expect(parseApplication(form({ ...APPLICATION, categories: ["data", "astrology"] })).errors.categories).toMatch(/from the list/);
    const six = ["software", "data", "design", "marketing", "it-cloud", "careers"];
    expect(parseApplication(form({ ...APPLICATION, categories: six })).errors.categories).toMatch(/up to 5/);
  });

  it("rejects unsafe links and bad link names", () => {
    const { errors } = parseApplication(form({ ...APPLICATION, slug: "Hawa!", evidence_links: "javascript:alert(1)" }));
    expect(errors.slug).toBeDefined();
    expect(errors.evidence_links).toMatch(/http/);
  });

  it("caps the number of links like the database does", () => {
    const many = Array.from({ length: 11 }, (_, i) => `https://e.com/${i}`).join("\n");
    expect(parseApplication(form({ ...APPLICATION, links: many })).errors.links).toMatch(/up to 10/);
  });
});

describe("parseExpertProfile", () => {
  it("reads the editable fields and checkboxes", () => {
    const { data, errors } = parseExpertProfile(
      form({
        ...APPLICATION,
        bio: "",
        languages: "English, Dagbani",
        region: "northern",
        availability_note: "Weekday evenings",
        accepting_requests: "on",
      }),
    );
    expect(errors).toEqual({});
    expect(data).toMatchObject({
      bio: null,
      languages: ["English", "Dagbani"],
      region: "northern",
      categories: ["data", "careers"],
      availability_note: "Weekday evenings",
      accepting_requests: true,
      offers_free_intro: false,
    });
  });

  it("rejects an unknown region and a long availability note", () => {
    const { errors } = parseExpertProfile(form({ ...APPLICATION, region: "lagos", availability_note: "x".repeat(301) }));
    expect(errors.region).toBeDefined();
    expect(errors.availability_note).toBeDefined();
  });
});

describe("applicationStage", () => {
  it("lets new, declined, withdrawn and delisted people apply", () => {
    expect(applicationStage(null, null)).toEqual({ stage: "new", canApply: true });
    expect(applicationStage("pending", "rejected")).toEqual({ stage: "rejected", canApply: true });
    expect(applicationStage("pending", "withdrawn")).toEqual({ stage: "withdrawn", canApply: true });
    expect(applicationStage("delisted", "approved")).toEqual({ stage: "delisted", canApply: true });
  });
  it("keeps one open application at a time", () => {
    expect(applicationStage("pending", "submitted").canApply).toBe(false);
    expect(applicationStage("delisted", "submitted").stage).toBe("submitted");
    expect(applicationStage("approved", "approved")).toEqual({ stage: "approved", canApply: false });
  });
});

describe("suggestSlug and response time", () => {
  it("suggests a link name from a display name", () => {
    expect(suggestSlug("Abdul-Rahman Fuseini")).toBe("abdul-rahman-fuseini");
    expect(suggestSlug("Ỳ")).toBe("");
    expect(suggestSlug(null)).toBe("");
  });
  it("describes real response times and nothing when there is no data", () => {
    expect(describeResponseTime(null)).toBeNull();
    expect(describeResponseTime(0.4)).toBe("Usually within an hour");
    expect(describeResponseTime(5.2)).toBe("Usually within 6 hours");
    expect(describeResponseTime(30)).toBe("Usually within 2 days");
  });
});

describe("parseOffer", () => {
  const base = { title: "Review your first dashboard", description: "I review your Power BI dashboard.", is_active: "on" };

  it("requires a scope and delivery days for a gig", () => {
    const { errors } = parseOffer(form({ ...base, kind: "gig" }));
    expect(errors.scope).toBeDefined();
    expect(errors.delivery_days).toBeDefined();
    const ok = parseOffer(form({ ...base, kind: "gig", scope: "A cleaned dataset and a one page summary.", delivery_days: "5", revisions_included: "1" }));
    expect(ok.errors).toEqual({});
    expect(ok.data).toMatchObject({ kind: "gig", delivery_days: 5, revisions_included: 1, is_active: true });
  });

  it("requires a length for sessions and a size for groups", () => {
    expect(parseOffer(form({ ...base, kind: "one_to_one" })).errors.duration_minutes).toBeDefined();
    const group = parseOffer(form({ ...base, kind: "group", duration_minutes: "60" }));
    expect(group.errors.max_participants).toBeDefined();
    expect(parseOffer(form({ ...base, kind: "one_to_one", duration_minutes: "10" })).errors.duration_minutes).toMatch(/15/);
  });

  it("requires a cadence for recurring mentorship", () => {
    expect(parseOffer(form({ ...base, kind: "recurring" })).errors.cadence).toBeDefined();
    expect(parseOffer(form({ ...base, kind: "recurring", cadence: "weekly" })).data.cadence).toBe("weekly");
  });

  it("drops fields the kind does not use", () => {
    const { data, errors } = parseOffer(
      form({ ...base, kind: "one_to_one", duration_minutes: "45", scope: "stale", delivery_days: "3", max_participants: "9" }),
    );
    expect(errors).toEqual({});
    expect(data).toMatchObject({ duration_minutes: 45, scope: null, delivery_days: null, max_participants: null });
  });

  it("reads an indicative price in whole cedis and rejects decimals", () => {
    expect(parseOffer(form({ ...base, kind: "async_review", indicative_price_ghs: "GH₵ 1,500" })).data.indicative_price_ghs).toBe(1500);
    expect(parseOffer(form({ ...base, kind: "async_review", indicative_price_ghs: "" })).data.indicative_price_ghs).toBeNull();
    expect(parseOffer(form({ ...base, kind: "async_review", indicative_price_ghs: "12.50" })).errors.indicative_price_ghs).toBeDefined();
  });

  it("rejects an unknown kind and a missing title", () => {
    const { errors } = parseOffer(form({ kind: "loan", title: "", description: "x" }));
    expect(errors.kind).toBeDefined();
    expect(errors.title).toBeDefined();
  });
});

describe("offer display", () => {
  it("labels a price as indicative and lists facts", () => {
    expect(formatIndicativePrice(null)).toBeNull();
    expect(formatIndicativePrice(1500)).toBe("Indicative price GH₵ 1,500");
    expect(
      offerFacts({ duration_minutes: 60, delivery_days: 1, max_participants: 12, cadence: "weekly", revisions_included: 2 }),
    ).toEqual(["60 minutes", "Weekly", "Up to 12 learners", "Delivered in 1 day", "2 revisions"]);
  });
});
