import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { deleteDmpCohort, seedDmpCohort, type SeededDmpCohort } from "./cohort-seed";
import { deleteOrganisation, signIn, verifiedOrganisation } from "./earn-business";
import { createLearner, promoteToAdmin, type Learner } from "./learners";
import { deleteMentorCohort, seedMentorCohort, type MentorSeed } from "./mentor-seed";
import { seedNotifications } from "./notifications-seed";
import { deleteRoadmap, seedRoadmap, type SeededRoadmap } from "./seed";
import { seedSharer } from "./sharing-seed";
import { admin } from "./supabase-admin";

/**
 * Accessibility sweep (issue #193): every signed out page and the signed in
 * screens, including admin, the mentor console, organisation pages, cohort
 * work, notifications and settings, pass axe in light and dark at both
 * project widths (phone 390, desktop 1440). Fails on serious or critical
 * violations and on the structural rules below at any impact.
 */

const KEY = "sydcrest.display";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
// Moderate rules that still break navigation for screen reader and keyboard users.
const STRUCTURAL = new Set([
  "heading-order",
  "landmark-one-main",
  "landmark-unique",
  "landmark-no-duplicate-banner",
  "landmark-no-duplicate-contentinfo",
  "landmark-no-duplicate-main",
  "page-has-heading-one",
  "region",
  "target-size",
]);

async function sweep(page: Page, paths: string[], failures: string[], label: string) {
  for (const theme of ["light", "dark"] as const) {
    await page.evaluate(([k, t]) => localStorage.setItem(k, JSON.stringify({ theme: t, updatedAt: Date.now() })), [KEY, theme]);
    for (const path of paths) {
      await page.goto(path);
      await page.waitForLoadState("load");
      await expect(page.locator("[aria-busy='true'], .animate-skeleton")).toHaveCount(0, { timeout: 15_000 });
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      for (const v of violations) {
        if (v.impact !== "serious" && v.impact !== "critical" && !STRUCTURAL.has(v.id)) continue;
        const where = v.nodes.map((n) => n.target.join(" ")).slice(0, 4).join(", ");
        failures.push(`${label} ${theme} ${path}: ${v.id} (${v.impact}) ${where}`);
      }
    }
  }
}

test.describe("axe sweep", () => {
  test.describe.configure({ timeout: 300_000 });
  const cleanup: (() => Promise<unknown>)[] = [];
  test.afterEach(async () => {
    while (cleanup.length) await cleanup.pop()!().catch(() => {});
  });
  const removeUser = (l: Learner) => cleanup.push(() => admin(`/auth/v1/admin/users/${l.id}`, { method: "DELETE" }));

  test("signed out pages", async ({ page }) => {
    const roadmap: SeededRoadmap = await seedRoadmap();
    cleanup.push(() => deleteRoadmap(roadmap.id));
    const paths = [
      "/",
      "/about",
      "/accessibility",
      "/business",
      "/programme",
      "/programme/curriculum",
      "/start",
      "/roadmaps",
      `/roadmaps/${roadmap.slug}`,
      `/roadmaps/${roadmap.slug}/${roadmap.quizNode.slug}`,
      "/opportunities",
      "/events",
      "/chapters",
      "/experts",
      "/impact",
      "/partners",
      "/privacy",
      "/terms",
      "/settings",
      "/login",
      "/signup",
      "/forgot-password",
      "/reset-password",
    ];
    const failures: string[] = [];
    await page.goto("/");
    await sweep(page, paths, failures, "visitor");
    expect(failures, failures.join("\n")).toEqual([]);
  });

  test("learner, cohort, notifications and settings", async ({ page }) => {
    const roadmap = await seedRoadmap();
    cleanup.push(() => deleteRoadmap(roadmap.id));
    const learner = await createLearner("Wumpini Abukari");
    removeUser(learner);
    const cohort: SeededDmpCohort = await seedDmpCohort(learner.id);
    cleanup.push(() => deleteDmpCohort(cohort));
    for (const p of cohort.people) removeUser(p);
    await seedNotifications(learner.id);

    await signIn(page, learner);
    const failures: string[] = [];
    await sweep(
      page,
      [
        "/dashboard",
        "/learn",
        `/learn/${roadmap.slug}/${roadmap.quizNode.slug}`,
        "/path",
        "/cohort",
        "/cohort/work",
        "/cohort/week/1",
        "/cohort/reviews",
        "/notifications",
        "/settings",
        "/profile",
        "/community",
        "/mentors",
        "/opportunities",
        "/opportunities/saved",
        "/events",
        "/skills",
        "/certificates",
        "/leaderboards",
        "/earn",
        "/bookings",
        "/briefs",
        "/outcomes",
        "/study-buddy",
        "/review",
        "/talent/me",
      ],
      failures,
      "learner",
    );
    expect(failures, failures.join("\n")).toEqual([]);
  });

  test("sharing: milestones, share panel and achievement page", async ({ page }) => {
    const sharer = await seedSharer("Fuseini Mahama");
    removeUser(sharer.learner);
    cleanup.push(() => deleteRoadmap(sharer.roadmap.id));

    await signIn(page, sharer.learner);
    const failures: string[] = [];
    await sweep(page, ["/profile", "/certificates", `/a/${sharer.roadmapAchievementId}`], failures, "sharer");
    // The share panel, open.
    await page.goto("/profile#milestones");
    // Retried: a click that lands before hydration does nothing.
    await expect(async () => {
      await page.locator("#milestones").getByRole("button", { name: "Share card" }).first().click();
      await expect(page.getByRole("radio", { name: /Status size/ })).toBeChecked({ timeout: 1_000 });
    }).toPass();
    const { violations } = await new AxeBuilder({ page }).include("#milestones").withTags(TAGS).analyze();
    for (const v of violations) {
      if (v.impact !== "serious" && v.impact !== "critical" && !STRUCTURAL.has(v.id)) continue;
      failures.push(`sharer share panel: ${v.id} (${v.impact}) ${v.nodes.map((n) => n.target.join(" ")).slice(0, 4).join(", ")}`);
    }
    expect(failures, failures.join("\n")).toEqual([]);
  });

  test("mentor console", async ({ page }) => {
    const seed: MentorSeed = await seedMentorCohort();
    cleanup.push(() => deleteMentorCohort(seed));
    await signIn(page, seed.mentor);
    const failures: string[] = [];
    await sweep(
      page,
      ["/mentor", `/mentor/learners/${seed.learners.wumpini.memberId}`, `/mentor/submissions/${seed.queuedSubmissionId}`],
      failures,
      "mentor",
    );
    expect(failures, failures.join("\n")).toEqual([]);
  });

  test("organisation pages and admin", async ({ page }) => {
    const owner = await createLearner("Mariama Seidu");
    removeUser(owner);
    await promoteToAdmin(owner.id);
    const org = await verifiedOrganisation(owner, "Tamale Shea Collective");
    cleanup.push(() => deleteOrganisation(org.slug));
    const roadmap = await seedRoadmap();
    cleanup.push(() => deleteRoadmap(roadmap.id));

    await signIn(page, owner);
    const failures: string[] = [];
    await sweep(
      page,
      [
        "/org",
        `/org/${org.slug}`,
        `/org/${org.slug}/manage`,
        `/org/${org.slug}/team`,
        `/org/${org.slug}/opportunities`,
        `/org/${org.slug}/opportunities/new`,
        `/org/${org.slug}/requests`,
        "/admin",
        "/admin/applications",
        "/admin/certificates",
        "/admin/chapters",
        "/admin/chapters/new",
        "/admin/cohorts",
        "/admin/content",
        "/admin/events",
        "/admin/events/new",
        "/admin/experts",
        "/admin/funnel",
        "/admin/impact",
        "/admin/opportunities",
        "/admin/opportunities/new",
        "/admin/organisations",
        "/admin/outcomes",
        "/admin/reports",
        "/admin/roadmaps",
        `/admin/roadmaps/${roadmap.id}`,
        "/admin/roadmaps/new",
        "/admin/roadmaps/links",
        "/admin/skills",
      ],
      failures,
      "admin",
    );
    expect(failures, failures.join("\n")).toEqual([]);
  });
});

test.describe("keyboard", () => {
  let roadmap: SeededRoadmap | undefined;
  test.afterEach(async () => {
    if (roadmap) await deleteRoadmap(roadmap.id);
    roadmap = undefined;
  });

  test("the skip link comes first, focus is always visible and never trapped", async ({ page }) => {
    roadmap = await seedRoadmap();
    for (const path of ["/", "/roadmaps", `/roadmaps/${roadmap.slug}/${roadmap.quizNode.slug}`, "/settings", "/login"]) {
      await page.goto(path);
      await page.waitForLoadState("load");
      await page.keyboard.press("Tab");
      if (path !== "/login") await expect(page.locator(":focus"), path).toHaveText("Skip to content");

      const seen = new Set<string>();
      let last = "";
      let repeats = 0;
      for (let i = 0; i < 30; i++) {
        const focus = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          const ring = (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2) || s.boxShadow !== "none";
          const r = el.getBoundingClientRect();
          // A stable identity per element, so two links with the same markup are still two stops.
          const w = window as unknown as { __stops?: WeakMap<Element, number>; __n?: number };
          w.__stops ??= new WeakMap();
          w.__n ??= 0;
          if (!w.__stops.has(el)) w.__stops.set(el, w.__n++);
          const label = `${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 40)}"`;
          return { id: `${label} #${w.__stops.get(el)}`, label, ring, visible: r.width > 0 && r.height > 0 };
        });
        if (focus) {
          expect(focus.ring, `${path}: no visible focus on ${focus.id}`).toBe(true);
          seen.add(focus.id);
          repeats = focus.id === last ? repeats + 1 : 0;
          expect(repeats, `${path}: focus stuck on ${focus.id}`).toBeLessThan(2);
          last = focus.id;
        }
        await page.keyboard.press("Tab");
      }
      expect(seen.size, path).toBeGreaterThan(5);
    }
  });

  test("reduced motion stops looping animations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const css = await page.evaluate(() => {
      const el = document.createElement("div");
      el.className = "animate-pulse";
      document.body.append(el);
      const s = getComputedStyle(el);
      return { count: s.animationIterationCount, duration: s.animationDuration };
    });
    expect(css.count).toBe("1");
    expect(parseFloat(css.duration)).toBeLessThan(0.001);
  });
});
