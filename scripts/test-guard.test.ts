import { describe, expect, it } from "vitest";
import { SKIP_LABEL, checkTests, isBehaviour, isTest } from "./test-guard";

describe("isTest and isBehaviour", () => {
  it.each([
    ["src/lib/analytics/attribution.test.ts", true, false],
    ["src/components/x.test.tsx", true, false],
    ["e2e/analytics.spec.ts", true, false],
    ["supabase/tests/database/attribution.test.sql", true, false],
    ["src/lib/analytics/attribution.ts", false, true],
    ["src/app/(app)/learn/page.tsx", false, true],
    ["supabase/migrations/20261113100000_attribution.sql", false, true],
    ["src/content/roadmaps/content/frontend.content.ts", false, false],
    ["src/lib/supabase/database.types.ts", false, false],
    ["docs/analytics.md", false, false],
    ["package.json", false, false],
    [".github/workflows/ci.yml", false, false],
  ])("%s: test %s, behaviour %s", (path, test, behaviour) => {
    expect(isTest(path)).toBe(test);
    expect(isBehaviour(path)).toBe(behaviour);
  });
});

describe("checkTests", () => {
  it("passes when code changes with a test", () => {
    expect(checkTests(["src/lib/a.ts", "src/lib/a.test.ts"], []).ok).toBe(true);
    expect(checkTests(["supabase/migrations/1_x.sql", "supabase/tests/database/x.test.sql"], []).ok).toBe(true);
    expect(checkTests(["src/app/page.tsx", "e2e/home.spec.ts"], []).ok).toBe(true);
  });

  it("passes when no code changes", () => {
    expect(checkTests(["docs/a.md", "package.json", "src/content/x.content.ts"], []).ok).toBe(true);
    expect(checkTests([], []).ok).toBe(true);
  });

  it("fails when code changes without a test, and lists the files", () => {
    const result = checkTests(["src/lib/a.ts", "docs/a.md"], ["feature"]);
    expect(result.ok).toBe(false);
    expect(result.behaviour).toEqual(["src/lib/a.ts"]);
    expect(result.message).toContain(SKIP_LABEL);
  });

  it("the label lets a PR through", () => {
    expect(checkTests(["src/app/page.tsx"], [SKIP_LABEL]).ok).toBe(true);
  });
});
