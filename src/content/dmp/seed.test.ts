import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "../roadmaps";
import { buildWeeks, MAX_WEEK_RESOURCES, TRACK_LABELS, TRACKS, type DmpWeek } from "./curriculum";
import { SHARED_WEEK_LINKS, SHARED_WEEKS, SPECIALISATION_ROADMAP, SPECIALISATION_WEEKS, weekNodeLinks } from "./week-lessons";

/**
 * The DMP is seeded by a data migration (production needs it too), from a
 * static JSON literal derived from curriculum.ts. This keeps the two in step
 * and checks every week's roadmap links point at real topics.
 */

type SeedWeek = Omit<DmpWeek, "resources"> & {
  /** Added by the week links and resources migration (#239); absent in the original seed. */
  resources?: DmpWeek["resources"];
  specialization: string | null;
  is_capstone: boolean;
  roadmap_nodes: { roadmap_slug: string; node_slug: string }[];
};
type Seed = {
  program: { slug: string; title: string; specializations: { slug: string; label: string }[] };
  weeks: SeedWeek[];
};

const migrations = path.resolve(__dirname, "../../../supabase/migrations");
const files = readdirSync(migrations).sort();
const seedFile = files.find((f) => f.endsWith("_phase2_dmp_seed.sql"));

function jsonLiteral(file: string): unknown {
  const sql = readFileSync(path.join(migrations, file), "utf8");
  const match = sql.match(/\$json\$([\s\S]*?)\$json\$/);
  if (!match) throw new Error(`no $json$ literal in ${file}`);
  return JSON.parse(match[1]);
}

/**
 * The seed, then every later `_dmp_` migration in order. A follow up carries
 * {"weeks": [{week_number, specialization, ...fields}]} and overwrites those
 * fields on the matching week, as its SQL does: resource_name, resource_url,
 * resources (#239) and roadmap_nodes (replaced only when present).
 */
function loadSeed(): Seed {
  if (!seedFile) throw new Error("phase2_dmp_seed migration not found");
  const seed = jsonLiteral(seedFile) as Seed;
  for (const file of files.filter((f) => f > seedFile && f.includes("_dmp_"))) {
    const patch = jsonLiteral(file) as { weeks: Partial<SeedWeek>[] };
    for (const update of patch.weeks) {
      const week = seed.weeks.find(
        (w) => w.week_number === update.week_number && w.specialization === update.specialization,
      );
      if (!week) throw new Error(`${file} updates a week the seed does not have`);
      Object.assign(week, update);
    }
  }
  return seed;
}

const seed = loadSeed();

function asCurriculum(w: SeedWeek): DmpWeek {
  return {
    week_number: w.week_number,
    theme: w.theme,
    objectives: w.objectives,
    resource_name: w.resource_name,
    resource_url: w.resource_url,
    resources: w.resources ?? [],
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

  it("links every week to topics that exist in the bridge, marketing and specialisation roadmaps", () => {
    const allowed = new Set(["digital-skills-bridge", "digital-marketer", SPECIALISATION_ROADMAP]);
    for (const w of seed.weeks) {
      expect(w.roadmap_nodes.length, `week ${w.week_number} ${w.specialization ?? ""}`).toBeGreaterThan(0);
      for (const link of w.roadmap_nodes) {
        expect(allowed.has(link.roadmap_slug)).toBe(true);
        const roadmap = ROADMAP_DRAFTS.find((r) => r.slug === link.roadmap_slug);
        expect(roadmap?.nodes.some((n) => n.slug === link.node_slug), `${link.roadmap_slug}/${link.node_slug}`).toBe(true);
      }
    }
  });

  it("gives every week one to three https resources, the first mirrored in resource_name and resource_url", () => {
    for (const w of seed.weeks) {
      const label = `week ${w.week_number} ${w.specialization ?? ""}`;
      const resources = w.resources ?? [];
      expect(resources.length, label).toBeGreaterThanOrEqual(1);
      expect(resources.length, label).toBeLessThanOrEqual(MAX_WEEK_RESOURCES);
      for (const r of resources) {
        expect(r.url, label).toMatch(/^https:\/\//);
        expect(r.url, label).not.toMatch(/roadmap\.sh/);
        expect(r.name, label).not.toMatch(/[—–]/);
      }
      expect(new Set(resources.map((r) => r.url)).size, label).toBe(resources.length);
      expect([w.resource_name, w.resource_url], label).toEqual([resources[0].name, resources[0].url]);
    }
  });

  it("links the shared weeks to SHARED_WEEK_LINKS, 2 to 5 SydCrest lessons each", () => {
    for (const n of SHARED_WEEKS) {
      const week = seed.weeks.find((w) => w.week_number === n && w.specialization === null);
      expect(week?.roadmap_nodes, `week ${n}`).toEqual(SHARED_WEEK_LINKS[n]);
      expect(week?.roadmap_nodes.length).toBeGreaterThanOrEqual(2);
      expect(week?.roadmap_nodes.length).toBeLessThanOrEqual(5);
      const keys = week?.roadmap_nodes.map((l) => `${l.roadmap_slug}/${l.node_slug}`) ?? [];
      expect(new Set(keys).size, `week ${n}`).toBe(keys.length);
    }
  });

  it("links weeks 7 to 9 to the specialisation lessons in week-lessons.ts", () => {
    for (const track of TRACKS) {
      for (const n of SPECIALISATION_WEEKS) {
        const week = seed.weeks.find((w) => w.week_number === n && w.specialization === track);
        expect(week?.roadmap_nodes, `${track} week ${n}`).toEqual(weekNodeLinks(track, n));
      }
    }
  });
});
