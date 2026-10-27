import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "../roadmaps";
import { buildWeeks, TRACK_LABELS, TRACKS, type DmpWeek } from "./curriculum";

/**
 * The DMP is seeded by a data migration (production needs it too), from a
 * static JSON literal derived from curriculum.ts. This keeps the two in step
 * and checks every week's roadmap links point at real topics.
 */

type SeedWeek = DmpWeek & {
  specialization: string | null;
  is_capstone: boolean;
  roadmap_nodes: { roadmap_slug: string; node_slug: string }[];
};
type Seed = {
  program: { slug: string; title: string; specializations: { slug: string; label: string }[] };
  weeks: SeedWeek[];
};

const migrations = path.resolve(__dirname, "../../../supabase/migrations");
const file = readdirSync(migrations).find((f) => f.endsWith("_phase2_dmp_seed.sql"));

function loadSeed(): Seed {
  if (!file) throw new Error("phase2_dmp_seed migration not found");
  const sql = readFileSync(path.join(migrations, file), "utf8");
  const match = sql.match(/\$json\$([\s\S]*?)\$json\$/);
  if (!match) throw new Error("no $json$ literal in the DMP seed migration");
  return JSON.parse(match[1]) as Seed;
}

const seed = loadSeed();

function asCurriculum(w: SeedWeek): DmpWeek {
  return {
    week_number: w.week_number,
    theme: w.theme,
    objectives: w.objectives,
    resource_name: w.resource_name,
    resource_url: w.resource_url,
    assignment: w.assignment,
  };
}

describe("DMP seed migration", () => {
  it("names the programme and its specializations as curriculum.ts does", () => {
    expect(seed.program.slug).toBe("dmp");
    expect(seed.program.specializations).toEqual(TRACKS.map((t) => ({ slug: t, label: TRACK_LABELS[t] })));
  });

  it("gives every track exactly the weeks buildWeeks returns", () => {
    for (const track of TRACKS) {
      const path = [...seed.weeks]
        .filter((w) => w.specialization === null || w.specialization === track)
        .sort((a, b) => a.week_number - b.week_number);
      expect(path.map(asCurriculum)).toEqual(buildWeeks(track));
    }
  });

  it("has one shared row per week, except weeks 7 to 9 which fork by specialization", () => {
    for (let n = 1; n <= 12; n++) {
      const rows = seed.weeks.filter((w) => w.week_number === n);
      if (n >= 7 && n <= 9) {
        expect(rows.map((w) => w.specialization).sort()).toEqual([...TRACKS].sort());
      } else {
        expect(rows.map((w) => w.specialization)).toEqual([null]);
      }
    }
  });

  it("marks week 12 as the capstone", () => {
    expect(seed.weeks.filter((w) => w.is_capstone).map((w) => w.week_number)).toEqual([12]);
  });

  it("links every week to topics that exist in the bridge and marketing roadmaps", () => {
    const allowed = new Set(["digital-skills-bridge", "digital-marketer"]);
    for (const w of seed.weeks) {
      expect(w.roadmap_nodes.length, `week ${w.week_number} ${w.specialization ?? ""}`).toBeGreaterThan(0);
      for (const link of w.roadmap_nodes) {
        expect(allowed.has(link.roadmap_slug)).toBe(true);
        const roadmap = ROADMAP_DRAFTS.find((r) => r.slug === link.roadmap_slug);
        expect(roadmap?.nodes.some((n) => n.slug === link.node_slug), `${link.roadmap_slug}/${link.node_slug}`).toBe(true);
      }
    }
  });
});
