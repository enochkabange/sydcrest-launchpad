import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "../roadmaps";
import { TRACKS } from "./curriculum";
import { DIGITAL_MARKETER_ROADMAP, SPECIALISATION_ROADMAP, SPECIALISATION_WEEKS, WEEK_LESSONS, weekNodeLinks } from "./week-lessons";

const slugsOf = (roadmap: string) => new Set(ROADMAP_DRAFTS.find((r) => r.slug === roadmap)?.nodes.map((n) => n.slug));

describe("DMP specialisation week lessons", () => {
  const specialisation = slugsOf(SPECIALISATION_ROADMAP);
  const marketer = slugsOf(DIGITAL_MARKETER_ROADMAP);

  it("points at roadmaps that exist", () => {
    expect(specialisation.size).toBeGreaterThan(0);
    expect(marketer.size).toBeGreaterThan(0);
  });

  for (const track of TRACKS) {
    for (const week of SPECIALISATION_WEEKS) {
      it(`${track} week ${week} links real lessons and refreshers`, () => {
        const { lessons, refreshers } = WEEK_LESSONS[track][week];
        expect(lessons.length).toBeGreaterThanOrEqual(3);
        for (const slug of lessons) expect(specialisation.has(slug), slug).toBe(true);
        for (const slug of refreshers) expect(marketer.has(slug), slug).toBe(true);
        const links = weekNodeLinks(track, week);
        expect(new Set(links.map((l) => `${l.roadmap_slug}/${l.node_slug}`)).size).toBe(links.length);
      });
    }
  }

  it("uses every specialisation lesson exactly once", () => {
    const used = TRACKS.flatMap((t) => SPECIALISATION_WEEKS.flatMap((w) => WEEK_LESSONS[t][w].lessons));
    expect(new Set(used).size).toBe(used.length);
    expect([...used].sort()).toEqual([...specialisation].sort());
  });
});
