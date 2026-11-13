import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  auditByOpportunity,
  computeMatch,
  employerReasons,
  improveFit,
  listWords,
  MATCH_RATE_GAP,
  MATCH_WEIGHTS,
  matchFairness,
  parseSharedReadiness,
  rankForLearner,
  requiredSkills,
  trackReadiness,
  whyItFits,
  type CatalogueSkill,
  type FunnelRow,
  type LearnerContext,
  type TrackReadiness,
} from "./match";

/** The body of a SQL function, from the newest migration that defines it. */
function latestFunction(name: string): string {
  const dir = join(process.cwd(), "supabase/migrations");
  const marker = `function ${name}(`;
  const latest = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .filter((f) => readFileSync(join(dir, f), "utf8").includes(marker))
    .at(-1);
  expect(latest, `a migration defines ${name}`).toBeDefined();
  const sql = readFileSync(join(dir, latest!), "utf8");
  const start = sql.indexOf(marker);
  return sql.slice(start, sql.indexOf("$$;", start));
}

const catalogue: CatalogueSkill[] = [
  { id: "s1", slug: "spreadsheets", name: "Spreadsheets", tracks: ["data", "data-analyst"] },
  { id: "s2", slug: "sql-basics", name: "SQL basics", tracks: ["data", "data-analyst"] },
  { id: "s3", slug: "figma", name: "Figma", tracks: ["ui-ux"] },
];

const row = (over: Partial<TrackReadiness> = {}): TrackReadiness => ({
  roadmap_slug: "data-analyst",
  roadmap_title: "Data Analyst",
  track: "data",
  score: 50,
  band: "building",
  topics_done: 3,
  topics_total: 8,
  ...over,
});

const ctx = (readiness: TrackReadiness[], verified: string[] = []): LearnerContext => ({ readiness, verifiedSkillIds: new Set(verified) });
const listing = (over: { id?: string; skills?: string[]; tracks?: string[] } = {}) => ({ id: "o1", skills: [], tracks: ["data"], ...over });
const label = (t: string) => ({ data: "Data", "ui-ux": "UI and UX design" })[t] ?? null;

describe("weights", () => {
  it("match private.match_weights() in the newest migration", () => {
    const literal = latestFunction("private.match_weights").match(/'(\{[^']+\})'::jsonb/);
    expect(literal, "the weights are one jsonb literal").not.toBeNull();
    expect(JSON.parse(literal![1])).toEqual(MATCH_WEIGHTS);
  });

  it("never read a Never attribute in the match", () => {
    const sql = [latestFunction("private.opportunity_match"), latestFunction("private.opportunity_required_skills")]
      .join("\n")
      .replace(/--.*$/gm, "");
    for (const name of ["region", "device", "internet", "education", "date_of_birth", "min_pay_band", "languages", "usual_hour_band"]) {
      expect(new RegExp(`\\b${name}\\b`).test(sql), `the match reads ${name}`).toBe(false);
    }
  });
});

describe("requiredSkills", () => {
  it("are the catalogue skills the listing names, ignoring case, by name or slug", () => {
    expect(requiredSkills(listing({ skills: ["sql BASICS", "Teamwork", "figma"] }), catalogue)).toEqual({
      skills: [catalogue[2], catalogue[1]],
      source: "listing",
    });
  });

  it("fall back to the skills mapped to its tracks when it names none", () => {
    const r = requiredSkills(listing({ skills: ["Driving"] }), catalogue);
    expect(r.source).toBe("track");
    expect(r.skills.map((s) => s.name)).toEqual(["Spreadsheets", "SQL basics"]);
  });

  it("are none when neither exists, so the match is track readiness only", () => {
    expect(requiredSkills(listing({ tracks: ["cybersecurity"] }), catalogue)).toEqual({ skills: [], source: "none" });
  });
});

describe("computeMatch", () => {
  it("is the best readiness for the opportunity's tracks plus the bonus per required skill verified", () => {
    const m = computeMatch(listing({ skills: ["SQL basics", "Spreadsheets"] }), ctx([row({ score: 50 }), row({ roadmap_slug: "data-2", score: 61 })], ["s2"]), catalogue);
    expect(m.readiness?.roadmap_slug).toBe("data-2");
    expect(m.score).toBe(61 + MATCH_WEIGHTS.skill_bonus);
    expect(m.band).toBe("building");
    expect(m.verified.map((s) => s.name)).toEqual(["SQL basics"]);
    expect(m.missing.map((s) => s.name)).toEqual(["Spreadsheets"]);
  });

  it("counts a roadmap slug used as an opportunity track too, ignores other tracks and caps at 100", () => {
    expect(trackReadiness({ tracks: ["data-analyst"] }, [row({ track: null })])?.roadmap_slug).toBe("data-analyst");
    expect(trackReadiness({ tracks: ["ui-ux"] }, [row()])).toBeNull();
    expect(computeMatch(listing(), ctx([row({ score: 98 })], ["s1", "s2"]), catalogue).score).toBe(100);
  });

  it("can move a learner into the next band", () => {
    expect(computeMatch(listing(), ctx([row({ score: 66 })], ["s1"]), catalogue).band).toBe("job_ready");
  });

  it("is null with no readiness for the tracks and no required skill verified, but a verified skill alone scores", () => {
    expect(computeMatch(listing(), ctx([]), catalogue).score).toBeNull();
    expect(computeMatch(listing(), ctx([], ["s1"]), catalogue).score).toBe(MATCH_WEIGHTS.skill_bonus);
  });

  it("suggests the next skill, then the next topic, then starting the track", () => {
    expect(computeMatch(listing(), ctx([row()], ["s1"]), catalogue).next).toEqual({ kind: "skill", skill: catalogue[1] });
    expect(computeMatch(listing(), ctx([row()], ["s1", "s2"]), catalogue).next).toEqual({
      kind: "topic",
      roadmap_slug: "data-analyst",
      roadmap_title: "Data Analyst",
    });
    expect(computeMatch(listing(), ctx([row({ topics_done: 8 })], ["s1", "s2"]), catalogue).next).toBeNull();
    expect(computeMatch(listing({ tracks: ["cybersecurity"] }), ctx([]), catalogue).next).toEqual({ kind: "track", track: "cybersecurity" });
  });
});

describe("rankForLearner", () => {
  it("orders by match, keeps ties and unmatched listings in their order, and never drops one", () => {
    const list = [
      listing({ id: "a", tracks: ["ui-ux"] }),
      listing({ id: "b" }),
      listing({ id: "c", tracks: ["cybersecurity"] }),
      listing({ id: "d", skills: ["SQL basics"] }),
    ];
    const ranked = rankForLearner(list, ctx([row({ score: 40 })], ["s2"]), catalogue);
    expect(ranked.map((r) => r.o.id)).toEqual(["b", "d", "a", "c"]);
    expect(ranked.map((r) => r.match.score)).toEqual([45, 45, null, null]);
    expect(ranked).toHaveLength(list.length);
  });
});

describe("plain words", () => {
  it("lists like a person would", () => {
    expect(listWords([])).toBe("");
    expect(listWords(["Excel"])).toBe("Excel");
    expect(listWords(["Excel", "SQL"])).toBe("Excel and SQL");
    expect(listWords(["Excel", "SQL", "Python"])).toBe("Excel, SQL and Python");
  });

  it("say why it fits with skills and a band, never a number", () => {
    const m = computeMatch(listing({ skills: ["SQL basics", "Spreadsheets"] }), ctx([row({ score: 57 })], ["s2"]), catalogue);
    const lines = whyItFits(m, label);
    expect(lines).toEqual(["You have verified SQL basics (1 of the 2 it needs).", "Your readiness for Data Analyst (Data): Building."]);
    for (const line of lines) expect(line).not.toMatch(/\d{2}|[–—]/);
    expect(improveFit(m, label)).toEqual({ text: "Verify Spreadsheets: take its quiz or send a portfolio piece.", href: "/skills/spreadsheets" });
  });

  it("give employers a band and evidence only", () => {
    expect(employerReasons({ band: "job_ready", roadmap_title: "Data Analyst", verified_skills: ["SQL basics"], portfolio_pieces: 2 })).toEqual([
      "Job ready in Data Analyst.",
      "Verified the skills this role needs: SQL basics.",
      "2 approved portfolio pieces for Data Analyst.",
    ]);
    expect(employerReasons({ band: null, roadmap_title: null, verified_skills: [], portfolio_pieces: 0 })).toEqual([
      "No readiness band for this track yet.",
    ]);
  });

  it("read the directory column defensively", () => {
    expect(parseSharedReadiness(null)).toEqual([]);
    expect(parseSharedReadiness([{ roadmap_slug: "data-analyst", band: "building" }, { score: 80 }, "x"])).toEqual([
      { roadmap_slug: "data-analyst", roadmap_title: "data-analyst", band: "building", portfolio_pieces: 0 },
    ]);
  });
});

describe("matchFairness", () => {
  const rows: FunnelRow[] = [
    { dimension: "region", grp: "northern", shown: 20, applied: 10, shortlisted: 5, hired: 1 },
    { dimension: "region", grp: "greater_accra", shown: 20, applied: 10, shortlisted: 1, hired: 0 },
    { dimension: "region", grp: "volta", shown: 3, applied: 2, shortlisted: 2, hired: 2 },
  ];

  it("rates each group against its dimension and flags gaps beyond the limit", () => {
    const region = matchFairness(rows).find((d) => d.dimension === "region")!;
    expect(region.overall.shortlistRate).toBeCloseTo(8 / 22);
    const north = region.groups.find((g) => g.grp === "northern")!;
    const accra = region.groups.find((g) => g.grp === "greater_accra")!;
    expect(north.shortlistRate).toBe(0.5);
    expect(north.flagged).toBe(true);
    expect(accra.flagged).toBe(true);
    expect(Math.abs(accra.gaps.shortlistRate!)).toBeGreaterThan(MATCH_RATE_GAP);
  });

  it("hides rates for small groups and never flags them", () => {
    const volta = matchFairness(rows).find((d) => d.dimension === "region")!.groups.find((g) => g.grp === "volta")!;
    expect(volta.applyRate).toBeNull();
    expect(volta.shortlistRate).toBeNull();
    expect(volta.flagged).toBe(false);
  });

  it("covers the readiness fairness groups and band", () => {
    expect(matchFairness([]).map((d) => d.dimension)).toEqual(["band", "region", "device", "internet", "age", "education"]);
  });
});

describe("auditByOpportunity", () => {
  it("groups bands per opportunity, totals them and orders bands and opportunities", () => {
    const base = { title: "Data assistant", organisation_name: "Tamale Data Services", applied: 0, shortlisted: 0, hired: 0 };
    const out = auditByOpportunity([
      { ...base, opportunity_id: "o1", band: "none", shown: 1 },
      { ...base, opportunity_id: "o1", band: "job_ready", shown: 2, applied: 2, shortlisted: 1 },
      { ...base, opportunity_id: "o2", title: "Driver", band: "building", shown: 9 },
    ]);
    expect(out.map((o) => o.id)).toEqual(["o2", "o1"]);
    expect(out[1].bands.map((b) => b.band)).toEqual(["job_ready", "none"]);
    expect(out[1].totals).toEqual({ shown: 3, applied: 2, shortlisted: 1, hired: 0 });
  });
});
