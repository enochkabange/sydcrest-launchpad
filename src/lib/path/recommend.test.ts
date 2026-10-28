import { describe, expect, it } from "vitest";
import { ROADMAP_DRAFTS } from "@/content/roadmaps";
import { TRACK_CONTENT } from "@/content/roadmaps/content";
import type { RoadmapTrack } from "@/content/roadmaps/types";
import { answersKey, CONFIDENCE, DATA, DEVICES, EXPERIENCE, GOALS, HOURS, INTERESTS, parseAnswers, type PathAnswers } from "./quiz";
import {
  buildPath,
  chooseTrack,
  COHORT_ONLY_TRACKS,
  FULL_LESSON_TRACKS,
  startingIndex,
  starterFor,
  weeklyPlan,
  type PublishedRoadmap,
} from "./recommend";
import { signValue, verifyValue } from "./signing";

const DASHES = /[‐‑‒–—―−]|\s-\s/;

function answers(over: Partial<PathAnswers> = {}): PathAnswers {
  return {
    v: 1,
    interests: ["web"],
    confidence: "some",
    experience: "none",
    goal: "first-job",
    hours: "3-6",
    device: "own-computer",
    data: "okay",
    ...over,
  };
}

describe("parseAnswers", () => {
  it("accepts valid answers and orders interests by question order", () => {
    const parsed = parseAnswers({ ...answers(), interests: ["design", "web"] });
    expect(parsed?.interests).toEqual(["web", "design"]);
  });

  it("rejects unknown values, duplicates, empty interests and old versions", () => {
    expect(parseAnswers({ ...answers(), goal: "fame" })).toBeNull();
    expect(parseAnswers({ ...answers(), interests: [] })).toBeNull();
    expect(parseAnswers({ ...answers(), interests: ["web", "web"] })).toBeNull();
    expect(parseAnswers({ ...answers(), interests: ["web", "astrology"] })).toBeNull();
    expect(parseAnswers({ ...answers(), v: 0 })).toBeNull();
    expect(parseAnswers(null)).toBeNull();
    expect(parseAnswers("web")).toBeNull();
  });

  it("gives the same key regardless of interest order", () => {
    const a = parseAnswers({ ...answers(), interests: ["data", "web"] })!;
    const b = parseAnswers({ ...answers(), interests: ["web", "data"] })!;
    expect(answersKey(a)).toBe(answersKey(b));
  });
});

describe("chooseTrack", () => {
  it("sends beginners with low digital confidence to the bridge, whatever they picked", () => {
    expect(chooseTrack(answers({ confidence: "low", experience: "none", interests: ["apps"] })).track).toBe(
      "digital-skills-bridge",
    );
  });

  it("does not send low confidence learners with experience to the bridge", () => {
    expect(chooseTrack(answers({ confidence: "low", experience: "tried", interests: ["apps"] })).track).toBe("backend");
  });

  it.each([
    ["web", "frontend"],
    ["apps", "backend"],
    ["data", "data"],
    ["marketing", "digital-marketing"],
    ["design", "ui-ux"],
    ["product", "product"],
  ] as const)("maps a single interest %s to %s", (interest, track) => {
    expect(chooseTrack(answers({ interests: [interest] })).track).toBe(track);
  });

  it("breaks ties between interests by goal fit", () => {
    expect(chooseTrack(answers({ interests: ["web", "marketing"], goal: "business" })).track).toBe(
      "digital-marketing",
    );
    expect(chooseTrack(answers({ interests: ["web", "data"], goal: "switch" })).track).toBe("data");
  });

  it("prefers a phone friendly track for phone only learners when goal fit is equal", () => {
    expect(chooseTrack(answers({ interests: ["apps", "design"], goal: "explore", device: "phone" })).track).toBe(
      "ui-ux",
    );
  });

  it("falls back to question order when nothing else separates interests", () => {
    expect(chooseTrack(answers({ interests: ["apps", "design"], goal: "explore" })).track).toBe("backend");
  });

  it("picks from the goal and device when the learner is unsure", () => {
    expect(chooseTrack(answers({ interests: ["unsure"], goal: "business" })).track).toBe("digital-marketing");
    expect(chooseTrack(answers({ interests: ["unsure"], goal: "freelance", device: "own-computer" })).track).toBe(
      "frontend",
    );
    expect(chooseTrack(answers({ interests: ["unsure"], goal: "first-job", device: "phone" })).track).toBe(
      "digital-marketing",
    );
    expect(chooseTrack(answers({ interests: ["unsure"], goal: "switch", device: "shared-computer" })).track).toBe(
      "data",
    );
  });

  it("ignores unsure when a real interest is also picked", () => {
    expect(chooseTrack(answers({ interests: ["data", "unsure"] })).track).toBe("data");
  });
});

describe("startingIndex", () => {
  it("skips opening sections by experience but never starts on the last one", () => {
    expect(startingIndex(answers({ experience: "none" }), "frontend", 7)).toBe(0);
    expect(startingIndex(answers({ experience: "tried" }), "frontend", 7)).toBe(1);
    expect(startingIndex(answers({ experience: "built" }), "frontend", 7)).toBe(2);
    expect(startingIndex(answers({ experience: "built" }), "frontend", 3)).toBe(1);
    expect(startingIndex(answers({ experience: "built" }), "frontend", 1)).toBe(0);
  });

  it("always starts the bridge at the beginning", () => {
    expect(startingIndex(answers({ experience: "built" }), "digital-skills-bridge", 6)).toBe(0);
  });
});

describe("weeklyPlan", () => {
  it.each([
    ["under-3", 3, 40],
    ["3-6", 4, 75],
    ["7-12", 5, 110],
    ["over-12", 6, 140],
  ] as const)("sizes %s to %i sessions of %i minutes", (hours, count, minutes) => {
    const plan = weeklyPlan(answers({ hours }), "frontend");
    expect(plan.sessions).toHaveLength(count);
    expect(plan.sessions.every((s) => s.minutes === minutes)).toBe(true);
  });

  it("adds data and device tips that match the constraints", () => {
    const plan = weeklyPlan(answers({ data: "tight", device: "phone" }), "backend");
    expect(plan.tips.join(" ")).toMatch(/offline/);
    expect(plan.tips.join(" ")).toMatch(/needs a computer/);
    expect(weeklyPlan(answers({ data: "steady", device: "phone" }), "digital-marketing").tips).toEqual([]);
  });
});

const PUBLISHED: PublishedRoadmap = {
  id: "00000000-0000-0000-0000-000000000001",
  slug: "frontend-developer",
  title: "Frontend Developer",
  sections: [
    { slug: "start-here", title: "Start here" },
    { slug: "html-and-css", title: "HTML and CSS" },
    { slug: "getting-hired", title: "Getting hired" },
  ],
};

describe("buildPath", () => {
  it("links the starting node of a published roadmap", () => {
    const result = buildPath(answers({ experience: "tried" }), PUBLISHED);
    expect(result.roadmap?.slug).toBe("frontend-developer");
    expect(result.start).toEqual({ title: "HTML and CSS", href: "/roadmaps/frontend-developer/html-and-css" });
    expect(result.skillGap.map((s) => s.status)).toEqual(["review", "start", "learn"]);
    expect(result.nextAction.href).toBe("/roadmaps/frontend-developer/html-and-css");
  });

  it("still gives a plan from the draft outline when nothing is published", () => {
    const result = buildPath(answers(), null);
    expect(result.roadmap).toBeNull();
    expect(result.start.href).toBeNull();
    expect(result.skillGap.length).toBeGreaterThan(2);
    expect(result.skillGap[0].status).toBe("start");
    expect(result.nextAction.href).toBeNull();
    expect(result.nextAction.detail).toMatch(/opens here soon/);
  });

  it("points bridge learners at the Delta Mentoring Program until the bridge is published", () => {
    const result = buildPath(answers({ confidence: "low", experience: "none" }), null);
    expect(result.track).toBe("digital-skills-bridge");
    expect(result.nextAction.href).toBe("/programme");
  });

  it("is deterministic and dash free in every combination", () => {
    const tracks = new Set<string>();
    for (const interest of ["web", "apps", "data", "marketing", "design", "product", "unsure"] as const)
      for (const confidence of ["low", "some", "high"] as const)
        for (const experience of ["none", "tried", "built"] as const)
          for (const goal of ["first-job", "freelance", "switch", "business", "explore"] as const)
            for (const hours of ["under-3", "3-6", "7-12", "over-12"] as const)
              for (const device of ["phone", "shared-computer", "own-computer"] as const)
                for (const data of ["tight", "okay", "steady"] as const) {
                  const a = answers({ interests: [interest], confidence, experience, goal, hours, device, data });
                  const result = buildPath(a, null);
                  expect(buildPath(a, null)).toEqual(result);
                  tracks.add(result.track);
                  const copy = [
                    ...result.reasons,
                    result.nextAction.label,
                    result.nextAction.detail,
                    result.plan.summary,
                    ...result.plan.tips,
                    ...result.plan.sessions.flatMap((s) => [s.title, s.detail]),
                  ].join(" ");
                  expect(copy).not.toMatch(DASHES);
                }
    expect(tracks.size).toBe(7);
  });
});

describe("every track", () => {
  // Cohort companions are reached through their program, never the path quiz.
  const ALL_TRACKS = ROADMAP_DRAFTS.map((r) => r.track).filter((t) => !COHORT_ONLY_TRACKS.has(t));

  it("keeps the full lesson list in step with the lesson content", () => {
    const fromContent = TRACK_CONTENT.map((c) => ROADMAP_DRAFTS.find((r) => r.slug === c.roadmap)?.track);
    expect(new Set(fromContent)).toEqual(new Set(FULL_LESSON_TRACKS));
  });

  // One intended route to each track. Defaults: some confidence, tried, own computer.
  it.each<[RoadmapTrack, Partial<PathAnswers>]>([
    ["digital-skills-bridge", { interests: ["web"], confidence: "low", experience: "none" }],
    ["frontend", { interests: ["web"] }],
    ["backend", { interests: ["apps"] }],
    ["mobile-app-developer", { interests: ["mobile"] }],
    ["it-support", { interests: ["it"], goal: "first-job" }],
    ["cloud-devops", { interests: ["it"], goal: "switch" }],
    ["cybersecurity", { interests: ["security"], goal: "first-job" }],
    ["software-testing", { interests: ["security"], goal: "freelance" }],
    ["data", { interests: ["data"] }],
    ["ai-tools-for-work", { interests: ["ai-work"], goal: "first-job" }],
    ["no-code", { interests: ["ai-work"], goal: "business" }],
    ["ai-ml", { interests: ["ai-build"], goal: "freelance" }],
    ["data-science", { interests: ["ai-build"], goal: "first-job" }],
    ["digital-marketing", { interests: ["marketing"] }],
    ["digital-business", { interests: ["business"], goal: "business" }],
    ["freelancing", { interests: ["business"], goal: "freelance" }],
    ["customer-service", { interests: ["customers"], goal: "first-job" }],
    ["digital-sales", { interests: ["customers"], goal: "business" }],
    ["virtual-assistant", { interests: ["office"], goal: "freelance" }],
    ["excel-power-bi", { interests: ["office"], goal: "first-job" }],
    ["project-management", { interests: ["office"], goal: "switch" }],
    ["ui-ux", { interests: ["design"] }],
    ["graphic-design", { interests: ["creative"], goal: "freelance" }],
    ["content-creation", { interests: ["creative"], goal: "business" }],
    ["social-media-management", { interests: ["creative"], goal: "first-job" }],
    ["product", { interests: ["product"] }],
  ])("reaches %s", (track, over) => {
    const result = buildPath(answers({ experience: "tried", ...over }), null);
    expect(result.track).toBe(track);
    expect(result.lessonsReady).toBe(FULL_LESSON_TRACKS.has(track));
  });

  it("is reachable for all tracks from single interests, deterministic and dash free", () => {
    const reached = new Set<string>();
    for (const { value: interest } of INTERESTS)
      for (const { value: confidence } of CONFIDENCE)
        for (const { value: experience } of EXPERIENCE)
          for (const { value: goal } of GOALS)
            for (const { value: hours } of HOURS)
              for (const { value: device } of DEVICES)
                for (const { value: data } of DATA) {
                  const a = answers({ interests: [interest], confidence, experience, goal, hours, device, data });
                  const result = buildPath(a, null);
                  expect(buildPath(a, null)).toEqual(result);
                  reached.add(result.track);
                  expect(result.lessonsReady).toBe(FULL_LESSON_TRACKS.has(result.track));
                  if (result.lessonsReady) expect(result.alsoStart).toBeNull();
                  else expect(FULL_LESSON_TRACKS.has(result.alsoStart!.track)).toBe(true);
                  const copy = [...result.reasons, result.alsoStart?.why ?? "", result.nextAction.detail].join(" ");
                  expect(copy).not.toMatch(DASHES);
                }
    expect([...reached].sort()).toEqual([...ALL_TRACKS].sort());
  });

  it("has dash free interest options", () => {
    for (const o of INTERESTS) expect(`${o.label} ${"hint" in o ? o.hint : ""}`).not.toMatch(DASHES);
  });
});

describe("grouped interests", () => {
  it("prefers a track with lessons ready when scores tie", () => {
    // Explore has no goal fit, so the full lesson track wins over the outline only one.
    expect(chooseTrack(answers({ interests: ["customers", "office"], goal: "explore" })).track).toBe(
      "virtual-assistant",
    );
    expect(chooseTrack(answers({ interests: ["business"], goal: "first-job" })).track).toBe("digital-business");
    expect(chooseTrack(answers({ interests: ["security"], goal: "business" })).track).toBe("cybersecurity");
  });

  it("prefers a phone friendly track for phone only learners when goal fit is equal", () => {
    expect(chooseTrack(answers({ interests: ["mobile", "creative"], goal: "explore", device: "phone" })).track).toBe(
      "graphic-design",
    );
  });

  it("starts beginners on the track an advanced one builds on", () => {
    const ml = chooseTrack(answers({ interests: ["ai-build"], goal: "freelance", experience: "none" }));
    expect(ml.track).toBe("data");
    expect(ml.reasons.join(" ")).toMatch(/AI and Machine Learning/);
    expect(chooseTrack(answers({ interests: ["it"], goal: "switch", experience: "none" })).track).toBe("it-support");
    expect(chooseTrack(answers({ interests: ["it"], goal: "switch", experience: "built" })).track).toBe(
      "cloud-devops",
    );
  });

  it("suggests a full lesson track alongside an outline only one, or the bridge for low confidence", () => {
    expect(starterFor(answers(), "frontend")).toBeNull();
    expect(starterFor(answers(), "excel-power-bi")?.track).toBe("data");
    expect(starterFor(answers({ confidence: "low", experience: "tried" }), "excel-power-bi")?.track).toBe(
      "digital-skills-bridge",
    );
  });

  it("says plainly when lessons are coming and links the starter when it is published", () => {
    const a = answers({ interests: ["office"], goal: "first-job" });
    const result = buildPath(a, null, { slug: "data-analyst", title: "Data Analyst" });
    expect(result.track).toBe("excel-power-bi");
    expect(result.lessonsReady).toBe(false);
    expect(result.alsoStart).toMatchObject({ track: "data", title: "Data Analyst", href: "/roadmaps/data-analyst" });
    expect(buildPath(a, null).alsoStart?.href).toBeNull();
  });
});

describe("signed cookie values", () => {
  const SECRET = "test-secret";

  it("round trips a value before it expires", () => {
    const token = signValue({ a: 1 }, SECRET, 60, 1_000);
    expect(verifyValue(token, SECRET, 2_000)).toEqual({ a: 1 });
  });

  it("rejects expired, tampered or wrongly signed values", () => {
    const token = signValue({ a: 1 }, SECRET, 60, 1_000);
    expect(verifyValue(token, SECRET, 1_000 + 61_000)).toBeNull();
    expect(verifyValue(token, "other", 2_000)).toBeNull();
    const [body, sig] = token.split(".");
    const forged = Buffer.from(JSON.stringify({ exp: 9e15, value: { a: 2 } })).toString("base64url");
    expect(verifyValue(`${forged}.${sig}`, SECRET, 2_000)).toBeNull();
    expect(verifyValue(`${body}.${sig}.x`, SECRET, 2_000)).toBeNull();
    expect(verifyValue(undefined, SECRET)).toBeNull();
  });
});
