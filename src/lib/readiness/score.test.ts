import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  bandFor,
  biggestGap,
  computeReadiness,
  fairnessReport,
  FAIRNESS_GAP,
  histogram,
  INPUTS,
  NEVER_INPUTS,
  WEIGHTS,
  type ReportRow,
} from "./score";

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

describe("weights", () => {
  it("match private.readiness_weights() in the newest migration", () => {
    const body = latestFunction("private.readiness_weights");
    const literal = body.match(/'(\{[^']+\})'::jsonb/);
    expect(literal, "the weights are one jsonb literal").not.toBeNull();
    expect(JSON.parse(literal![1])).toEqual(WEIGHTS);
  });

  it("add up to 100", () => {
    expect(WEIGHTS.skills + WEIGHTS.progress + WEIGHTS.portfolio + WEIGHTS.activity + WEIGHTS.profile).toBe(100);
  });
});

describe("inputs", () => {
  const refresh = latestFunction("private.refresh_readiness").replace(/--.*$/gm, "");

  it("never include a Never attribute", () => {
    for (const name of NEVER_INPUTS) {
      expect(INPUTS.some((i) => i.split(".")[1] === name), `${name} is listed as an input`).toBe(false);
      expect(new RegExp(`\\b${name}\\b`).test(refresh), `the refresh reads ${name}`).toBe(false);
    }
  });

  it("are all read by the refresh, and nothing else from About you is", () => {
    for (const input of INPUTS) {
      const [table, column] = input.split(".");
      expect(refresh, `the refresh reads ${table}`).toContain(`public.${table}`);
      expect(new RegExp(`\\.${column}\\b`).test(refresh), `the refresh reads ${input}`).toBe(true);
    }
    const aboutYou = [...refresh.matchAll(/\blp\.([a-z_]+)/g)].map((m) => m[1]);
    expect(new Set(aboutYou)).toEqual(new Set(["profile_id", "tracks", "main_goal", "career_stage"]));
  });
});

describe("bands", () => {
  it("are Getting started 0–39, Building 40–69, Job ready 70–100", () => {
    expect([0, 39, 40, 69, 70, 100].map(bandFor)).toEqual([
      "getting_started",
      "getting_started",
      "building",
      "building",
      "job_ready",
      "job_ready",
    ]);
  });
});

describe("computeReadiness", () => {
  const none = { skillsVerified: 0, skillsTotal: 4, topicsDone: 0, topicsTotal: 10, portfolioPieces: 0, activeDays30: 0, aboutComplete: false, profilePublic: false };

  it("is 0 with nothing done and 100 with everything", () => {
    expect(computeReadiness(none).score).toBe(0);
    expect(
      computeReadiness({ skillsVerified: 4, skillsTotal: 4, topicsDone: 10, topicsTotal: 10, portfolioPieces: 5, activeDays30: 20, aboutComplete: true, profilePublic: true }),
    ).toMatchObject({ score: 100, band: "job_ready", available: 100 });
  });

  it("adds the parts", () => {
    const r = computeReadiness({ ...none, skillsVerified: 1, topicsDone: 4, portfolioPieces: 1, activeDays30: 4, aboutComplete: true });
    expect(r.points).toEqual({ skills: 10, progress: 10, portfolio: 5, activity: 5, profile: 5 });
    expect(r).toMatchObject({ score: 35, band: "getting_started" });
  });

  it("scores a track with no mapped skills out of the points it can give", () => {
    const r = computeReadiness({ ...none, skillsTotal: 0, topicsDone: 10, portfolioPieces: 3, activeDays30: 8, aboutComplete: true, profilePublic: true });
    expect(r).toMatchObject({ available: 60, score: 100 });
  });

  it("names the part that would raise the score most", () => {
    const row = { skills_points: 40, progress_points: 5, portfolio_points: 0, activity_points: 10, profile_points: 10, skills_total: 2, topics_total: 8 };
    expect(biggestGap(row)).toBe("progress");
    expect(biggestGap({ ...row, skills_points: 0, skills_total: 0 })).toBe("progress");
    expect(biggestGap({ ...row, progress_points: 25, portfolio_points: 15 })).toBeNull();
  });
});

describe("fairnessReport", () => {
  const row = (dimension: string, grp: string, learners: number, average: number): ReportRow => ({
    dimension,
    grp,
    learners,
    score_sum: learners * average,
    getting_started: 0,
    building: learners,
    job_ready: 0,
  });

  it("flags a group beyond the gap and never a small one", () => {
    const report = fairnessReport([
      row("region", "northern", 10, 40),
      row("region", "greater_accra", 10, 64),
      row("region", "upper_east", 2, 5),
    ]);
    const region = report.find((d) => d.dimension === "region")!;
    expect(region.total).toBe(22);
    expect(region.average).toBeCloseTo(47.73, 1);
    expect(region.groups.map((g) => [g.grp, g.flagged])).toEqual([
      ["greater_accra", true],
      ["northern", false],
      ["upper_east", false],
    ]);
    expect(region.groups.find((g) => g.grp === "upper_east")!.average).toBeNull();
    expect(region.flags).toBe(1);
    expect(FAIRNESS_GAP).toBe(10);
  });

  it("shows no average for a dimension with too few learners", () => {
    const device = fairnessReport([row("device", "mobile", 3, 50)]).find((d) => d.dimension === "device")!;
    expect(device.average).toBeNull();
    expect(device.flags).toBe(0);
  });

  it("builds a ten bucket histogram", () => {
    const h = histogram([row("score", "0", 3, 5), row("score", "90", 1, 95)]);
    expect(h).toHaveLength(10);
    expect(h[0]).toEqual({ from: 0, learners: 3 });
    expect(h[9]).toEqual({ from: 90, learners: 1 });
    expect(h[5].learners).toBe(0);
  });
});
