import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "@/content/roadmaps";
import { crossLinks, type LinkableRoadmap } from "./links";

const r = (slug: string, track: string, leads_to: string[]): LinkableRoadmap => ({ slug, title: slug, track, leads_to });

describe("crossLinks", () => {
  const ALL = [
    r("data-analyst", "data", ["data-science", "ai-ml", "missing"]),
    r("data-scientist", "data-science", ["ai-ml"]),
    r("ai-machine-learning", "ai-ml", []),
    r("bridge", "digital-skills-bridge", ["data"]),
  ];

  it("resolves leads to in the author's order, skipping unpublished tracks", () => {
    expect(crossLinks(ALL[0], ALL).leadsTo.map((l) => l.slug)).toEqual(["data-scientist", "ai-machine-learning"]);
  });

  it("derives builds on as the inverse", () => {
    expect(crossLinks(ALL[2], ALL).buildsOn.map((l) => l.slug)).toEqual(["data-analyst", "data-scientist"]);
    expect(crossLinks(ALL[0], ALL).buildsOn.map((l) => l.slug)).toEqual(["bridge"]);
  });

  it("never links a roadmap to itself or twice", () => {
    const self = r("loop", "loop", ["loop", "data", "data"]);
    const links = crossLinks(self, [...ALL, self]);
    expect(links.leadsTo.map((l) => l.slug)).toEqual(["data-analyst"]);
    expect(links.buildsOn).toEqual([]);
  });
});

describe("the draft roadmaps' links", () => {
  const tracks = new Set(ROADMAP_DRAFTS.map((d) => d.track));

  it("point at real tracks, never themselves, never twice", () => {
    for (const d of ROADMAP_DRAFTS) {
      for (const t of d.leads_to) expect(tracks.has(t), `${d.track} → ${t}`).toBe(true);
      expect(d.leads_to, d.track).not.toContain(d.track);
      expect(new Set(d.leads_to).size, d.track).toBe(d.leads_to.length);
    }
  });

  it("connect every one of the 27 tracks", () => {
    expect(tracks.size).toBe(27);
    const linked = new Set(ROADMAP_DRAFTS.flatMap((d) => (d.leads_to.length ? [d.track, ...d.leads_to] : [...d.leads_to])));
    expect([...tracks].filter((t) => !linked.has(t))).toEqual([]);
  });

  it("agree with the path quiz: advanced tracks build on the one they start from", () => {
    const leadsTo = (from: string, to: string) => ROADMAP_DRAFTS.find((d) => d.track === from)!.leads_to.includes(to as never);
    expect(leadsTo("data", "ai-ml")).toBe(true);
    expect(leadsTo("data", "data-science")).toBe(true);
    expect(leadsTo("it-support", "cloud-devops")).toBe(true);
    expect(leadsTo("it-support", "cybersecurity")).toBe(true);
    expect(leadsTo("frontend", "backend")).toBe(true);
    expect(ROADMAP_DRAFTS.find((d) => d.track === "digital-skills-bridge")!.leads_to.length).toBeGreaterThan(5);
  });

  it("set a level, with the bridge as first steps", () => {
    for (const d of ROADMAP_DRAFTS) expect(["first-steps", "beginner", "next-step"]).toContain(d.level);
    expect(ROADMAP_DRAFTS.find((d) => d.track === "digital-skills-bridge")!.level).toBe("first-steps");
  });
});
