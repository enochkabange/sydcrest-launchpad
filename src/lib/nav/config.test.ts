import { describe, expect, it } from "vitest";
import {
  FOOTER_NAV,
  HOME,
  NAV_GROUPS,
  NO_ROLES,
  PHONE_TABS,
  PUBLIC_NAV,
  activeHref,
  activeTab,
  groupById,
  matchesPath,
  visibleItems,
  type NavRoles,
} from "./config";
import { isSignedInPath } from "@/lib/supabase/protected-paths";

const ALL: NavRoles = { admin: true, staff: true, expert: true, business: true, reviewer: true };
const labels = (id: Parameters<typeof groupById>[0], roles: NavRoles) => visibleItems(groupById(id), roles).map((i) => i.label);

describe("nav config", () => {
  it("has the founder's five phone tabs, the market named Experts (D5)", () => {
    expect(PHONE_TABS.map((t) => t.label)).toEqual(["Home", "Learn", "Experts", "Community", "Earn"]);
    expect(PHONE_TABS.map((t) => t.href)).toEqual(["/dashboard", "/learn", "/mentors", "/community", "/earn"]);
  });

  it("lists the hub contents from the #190 decision", () => {
    expect(labels("learn", NO_ROLES)).toEqual(["Roadmaps", "Your path", "Cohort", "Skills", "Certificates", "5 minute review", "Study Buddy"]);
    expect(labels("experts", NO_ROLES)).toEqual(["Find an expert", "Bookings", "Briefs", "Become an expert"]);
    expect(labels("community", NO_ROLES)).toEqual(["Feed", "Events", "Chapters", "Leaderboards"]);
    expect(labels("earn", NO_ROLES)).toEqual(["Opportunities", "Outcomes", "Talent profile"]);
    expect(labels("you", NO_ROLES)).toEqual(["Profile", "Notifications", "Settings"]);
  });

  it("shows role items only to that role", () => {
    expect(labels("experts", { ...NO_ROLES, staff: true })).toContain("Mentor console");
    expect(labels("experts", { ...NO_ROLES, admin: true })).toContain("Mentor console");
    expect(labels("experts", { ...NO_ROLES, expert: true })).toEqual(["Find an expert", "Bookings", "Briefs", "Expert dashboard"]);
    expect(labels("learn", { ...NO_ROLES, reviewer: true })).toContain("Portfolio reviews");
    expect(labels("learn", { ...NO_ROLES, admin: true })).toContain("Portfolio reviews");
    for (const role of ["staff", "expert", "business"] as const) {
      expect(labels("learn", { ...NO_ROLES, [role]: true })).not.toContain("Portfolio reviews");
    }
    expect(labels("earn", { ...NO_ROLES, business: true })).toContain("Organisation");
    expect(labels("you", { ...NO_ROLES, admin: true })).toContain("Admin");
    for (const role of ["staff", "expert", "business", "reviewer"] as const) {
      expect(labels("you", { ...NO_ROLES, [role]: true })).not.toContain("Admin");
    }
    expect(labels("experts", ALL)).not.toContain("Become an expert");
  });

  it("uses Mentor only for the programme's volunteer mentor (D5)", () => {
    const all = NAV_GROUPS.flatMap((g) => [g.label, ...g.items.map((i) => i.label)]);
    expect(all.filter((label) => /mentor/i.test(label))).toEqual(["Mentor console"]);
  });

  it("has unique hrefs within each group and no dashes in copy", () => {
    for (const g of NAV_GROUPS) {
      const hrefs = g.items.map((i) => i.href);
      expect(new Set(hrefs).size).toBe(hrefs.length);
      for (const text of [g.label, g.description, ...g.items.flatMap((i) => [i.label, i.description])]) {
        expect(text).not.toMatch(/[–—]| - /);
      }
    }
  });

  it("protects every signed in destination and leaves the public ones open", () => {
    const signedIn = [HOME, ...NAV_GROUPS.flatMap((g) => g.items)]
      .map((i) => i.href.split("#")[0])
      .filter((href) => !PUBLIC_NAV.some((p) => p.href === href))
      // The path quiz result sends visitors to sign up instead (proxy.ts).
      .filter((href) => href !== "/path")
      // Display settings work for visitors too (#204): they are per device.
      .filter((href) => href !== "/settings");
    for (const href of signedIn) expect(isSignedInPath(href), href).toBe(true);
    for (const g of NAV_GROUPS) if (g.hub) expect(isSignedInPath(g.hub)).toBe(true);
    for (const { href } of FOOTER_NAV) expect(isSignedInPath(href), href).toBe(false);
    expect(isSignedInPath("/settings")).toBe(false);
  });

  it("lists the public areas in the header and footer", () => {
    expect(PUBLIC_NAV.map((l) => l.label)).toEqual([
      "Roadmaps",
      "Programme",
      "Experts",
      "Opportunities",
      "Events",
      "Chapters",
      "Skills",
      "Impact",
      "For business",
    ]);
    expect(FOOTER_NAV.map((l) => l.label)).toEqual(expect.arrayContaining(["About", "Partners", "Find your path"]));
  });
});

describe("active state", () => {
  const all = NAV_GROUPS.flatMap((g) => g.items);

  it("matches whole segments only", () => {
    expect(matchesPath("/mentor", "/mentor")).toBe(true);
    expect(matchesPath("/mentor/learners/1", "/mentor")).toBe(true);
    expect(matchesPath("/mentors", "/mentor")).toBe(false);
    expect(matchesPath("/experts", "/expert")).toBe(false);
  });

  it("prefers the longest match", () => {
    expect(activeHref("/experts/apply", all)).toBe("/experts/apply");
    expect(activeHref("/experts/wumpini-alhassan", all)).toBe("/experts");
    expect(activeHref("/expert/offers/new", all)).toBe("/expert");
    expect(activeHref("/talent/me", all)).toBe("/talent/me");
    expect(activeHref("/talent/123", all)).toBe("/org");
    expect(activeHref("/opportunities/saved", all)).toBe("/opportunities");
    expect(activeHref("/skills/reviews", all)).toBe("/skills/reviews");
    expect(activeHref("/skills/excel", all)).toBe("/skills");
    expect(activeHref("/profile", all)).toBe("/profile");
    expect(activeHref("/learn/excel/counting-stock", all)).toBe("/roadmaps");
    expect(activeHref("/learn", all)).toBeNull();
    expect(activeHref(null, all)).toBeNull();
  });

  it("lights the right phone tab", () => {
    expect(activeTab("/dashboard")).toBe("home");
    expect(activeTab("/learn")).toBe("learn");
    expect(activeTab("/learn/excel/counting-stock")).toBe("learn");
    expect(activeTab("/cohort/week/3")).toBe("learn");
    expect(activeTab("/mentors")).toBe("experts");
    expect(activeTab("/mentor/submissions/1")).toBe("experts");
    expect(activeTab("/experts/apply")).toBe("experts");
    expect(activeTab("/skills/reviews")).toBe("learn");
    expect(activeTab("/community/post/1")).toBe("community");
    expect(activeTab("/events/tamale-meetup")).toBe("community");
    expect(activeTab("/chapters/northern")).toBe("community");
    expect(activeTab("/leaderboards")).toBe("community");
    expect(activeTab("/earn")).toBe("earn");
    expect(activeTab("/org/acme/team")).toBe("earn");
    expect(activeTab("/profile")).toBeNull();
    expect(activeTab("/notifications")).toBeNull();
    expect(activeTab("/")).toBeNull();
  });
});

describe("signed in paths", () => {
  it("covers dynamic signed in pages without catching their public neighbours", () => {
    for (const p of [
      "/org",
      "/org/acme/manage",
      "/org/acme/team",
      "/events/tamale-meetup/check-in",
      "/events/tamale-meetup/host",
      "/skills/excel/quiz",
      "/skills/excel/portfolio",
      "/skills/reviews",
      "/experts/wumpini/offers/1/request",
      "/mentor/learners/1",
      "/admin/roadmaps",
    ]) {
      expect(isSignedInPath(p), p).toBe(true);
    }
    for (const p of [
      "/",
      "/org/acme",
      "/events",
      "/events/tamale-meetup",
      "/skills/excel",
      "/experts",
      "/experts/wumpini",
      "/experts/wumpini/offers/1",
      "/opportunities/data-intern",
      "/chapters/northern",
      "/u/mariama",
      "/business",
      "/path",
    ]) {
      expect(isSignedInPath(p), p).toBe(false);
    }
  });
});
