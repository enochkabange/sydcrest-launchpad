import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  EMPTY_PROFILE,
  MULTI,
  PROFILE_FIELDS,
  SINGLE,
  answeredCount,
  changedFields,
  fromRow,
  parseLearnerProfile,
} from "./learner-profile";

function form(entries: [string, string][]) {
  const f = new FormData();
  for (const [k, v] of entries) f.append(k, v);
  return f;
}

/** The allowed values for a column, read from the migration that creates public.learner_profiles. */
function sqlValues(column: string): string[] {
  const dir = join(process.cwd(), "supabase/migrations");
  const file = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .filter((f) => readFileSync(join(dir, f), "utf8").includes("create table public.learner_profiles"))
    .at(-1)!;
  const sql = readFileSync(join(dir, file), "utf8");
  const line = sql.split("\n").find((l) => new RegExp(`^\\s+${column}\\s`).test(l))!;
  expect(line, column).toBeDefined();
  const array = line.slice(line.indexOf("array["), line.lastIndexOf("]"));
  return [...array.matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

describe("the database allows exactly the form's values", () => {
  it.each([...Object.entries(SINGLE), ...Object.entries(MULTI)])("%s", (column, options) => {
    expect(sqlValues(column)).toEqual(options.map((o) => o.value));
  });
});

describe("parseLearnerProfile", () => {
  it("keeps known answers", () => {
    const p = parseLearnerProfile(
      form([
        ["main_goal", "job"],
        ["education", "tvet"],
        ["study_times", "evening"],
        ["study_times", "weekend"],
        ["languages", "dagbani"],
        ["languages", "english"],
        ["tracks", "data-analyst"],
        ["work_regions", "northern"],
        ["willing_to_relocate", "yes"],
      ]),
    );
    expect(p.main_goal).toBe("job");
    expect(p.education).toBe("tvet");
    expect(p.study_times).toEqual(["evening", "weekend"]);
    // Lists come back in the option order, whatever order the form sent.
    expect(p.languages).toEqual(["english", "dagbani"]);
    expect(p.tracks).toEqual(["data-analyst"]);
    expect(p.work_regions).toEqual(["northern"]);
    expect(p.willing_to_relocate).toBe(true);
    expect(p.min_pay_band).toBeNull();
  });

  it("drops unknown values instead of refusing the form", () => {
    const p = parseLearnerProfile(
      form([
        ["main_goal", "world-domination"],
        ["languages", "klingon"],
        ["tracks", "Not A Slug!"],
        ["tracks", "data-analyst"],
        ["tracks", "data-analyst"],
        ["willing_to_relocate", "maybe"],
        ["gender", "female"],
      ]),
    );
    expect(p.main_goal).toBeNull();
    expect(p.languages).toEqual([]);
    expect(p.tracks).toEqual(["data-analyst"]);
    expect(p.willing_to_relocate).toBeNull();
    expect(Object.keys(p)).not.toContain("gender");
  });

  it("caps the tracks of interest at ten", () => {
    const p = parseLearnerProfile(form(Array.from({ length: 15 }, (_, i) => ["tracks", `track-${i}`] as [string, string])));
    expect(p.tracks).toHaveLength(10);
  });

  it("an empty form clears everything", () => {
    expect(parseLearnerProfile(new FormData())).toEqual(EMPTY_PROFILE);
  });
});

describe("answers and changes", () => {
  it("counts answered questions", () => {
    expect(answeredCount(EMPTY_PROFILE)).toBe(0);
    expect(answeredCount({ ...EMPTY_PROFILE, main_goal: "job", languages: ["english"], willing_to_relocate: false })).toBe(3);
    expect(PROFILE_FIELDS).toHaveLength(Object.keys(SINGLE).length + Object.keys(MULTI).length + 2);
  });

  it("names the fields that changed, never the answers", () => {
    const before = { ...EMPTY_PROFILE, main_goal: "job", languages: ["english"] };
    const after = { ...before, main_goal: "freelance", languages: ["english"], study_hours: "3_5" };
    expect(changedFields(before, after).sort()).toEqual(["main_goal", "study_hours"]);
  });

  it("reads a saved row, treating missing lists as empty", () => {
    expect(fromRow(null)).toEqual(EMPTY_PROFILE);
    expect(fromRow({ main_goal: "job", languages: null, willing_to_relocate: true }).languages).toEqual([]);
    expect(fromRow({ main_goal: "job" }).main_goal).toBe("job");
  });
});

describe("never collected", () => {
  it("has no question about protected traits", () => {
    for (const field of PROFILE_FIELDS) expect(field).not.toMatch(/(^|_)(gender|sex|ethnicity|religion|health|disability|marital|age|birth|dob)(_|$)/);
  });
});
