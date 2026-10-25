import { describe, expect, it } from "vitest";
import { describeAchievement, inviteLink, parsePublicProfile, parseSkills } from "./public-profile";

function form(values: Record<string, string>) {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
}

describe("parseSkills", () => {
  it("splits on commas and new lines, trims and drops repeats", () => {
    expect(parseSkills(" Excel, SQL\nexcel ,, Power  BI ")).toEqual(["Excel", "SQL", "Power BI"]);
  });
});

describe("parsePublicProfile", () => {
  it("accepts a valid public profile and lowercases the slug", () => {
    const { data, errors } = parsePublicProfile(
      form({ public_slug: "Wumpini-A", is_public: "on", headline: "Data learner", skills: "SQL", goals: "" }),
    );
    expect(errors).toEqual({});
    expect(data).toEqual({ public_slug: "wumpini-a", is_public: true, headline: "Data learner", skills: ["SQL"], goals: null });
  });

  it("refuses a public profile without a slug", () => {
    expect(parsePublicProfile(form({ is_public: "on" })).errors.is_public).toBeDefined();
  });

  it("refuses slugs the database would reject", () => {
    for (const slug of ["ab", "-wumpini", "wumpini-", "wum pini", "a".repeat(41)]) {
      expect(parsePublicProfile(form({ public_slug: slug })).errors.public_slug).toBeDefined();
    }
  });

  it("limits headline, goals and skills", () => {
    const { errors } = parsePublicProfile(
      form({
        headline: "x".repeat(121),
        goals: "x".repeat(501),
        skills: Array.from({ length: 31 }, (_, i) => `s${i}`).join(","),
      }),
    );
    expect(Object.keys(errors).sort()).toEqual(["goals", "headline", "skills"]);
  });

  it("stays private when the box is unticked", () => {
    expect(parsePublicProfile(form({ public_slug: "mariama" })).data.is_public).toBe(false);
  });
});

describe("describeAchievement", () => {
  it("uses titles and streak lengths when known", () => {
    expect(describeAchievement("roadmap_node_completed", "x", "SQL basics")).toBe("Completed SQL basics");
    expect(describeAchievement("roadmap_completed", "x", "Data Analyst")).toBe("Completed the Data Analyst roadmap");
    expect(describeAchievement("streak", "7")).toBe("7 day learning streak");
    expect(describeAchievement("track_chosen", null)).toBe("Chose a track");
  });
});

describe("inviteLink", () => {
  it("carries the inviter's slug as ref", () => {
    expect(inviteLink("https://launchpad.example", "fuseini")).toBe("https://launchpad.example/signup?ref=fuseini");
    expect(inviteLink("https://launchpad.example", null)).toBe("https://launchpad.example/signup");
  });
});
