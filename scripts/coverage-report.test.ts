import { describe, expect, it } from "vitest";
import { coverageMarkdown, folderOf, type Summary } from "./coverage-report";

const metric = (covered: number, total: number) => ({ covered, total, pct: total ? (covered / total) * 100 : 0 });
const file = (covered: number, total: number) => ({
  lines: metric(covered, total),
  statements: metric(covered, total),
  functions: metric(1, 2),
  branches: metric(1, 4),
});

describe("folderOf", () => {
  it("groups by area", () => {
    expect(folderOf("src/lib/analytics/attribution.ts")).toBe("src/lib/analytics");
    expect(folderOf("src/app/(admin)/admin/insights/funnel/page.tsx")).toBe("src/app/(admin)");
    expect(folderOf("src/proxy.ts")).toBe("src");
    expect(folderOf("scripts/test-guard.ts")).toBe("scripts");
  });
});

describe("coverageMarkdown", () => {
  const summary: Summary = {
    total: file(70, 165),
    "src/lib/analytics/a.ts": file(50, 50),
    "src/lib/analytics/b.ts": file(10, 10),
    "src/lib/sitemap/s.ts": file(5, 25),
    "src/app/(app)/learn/page.tsx": file(0, 75),
    "src/lib/tiny/x.ts": file(5, 5),
  };
  const md = coverageMarkdown(summary);

  it("shows library code and the overall total", () => {
    expect(md).toContain("| Library code | 77.8% (70 of 90) |");
    expect(md).toContain("| Everything | 42.4% (70 of 165) |");
  });

  it("lists the least covered library folders first, without pages or tiny folders", () => {
    const sitemap = md.indexOf("`src/lib/sitemap`");
    const analytics = md.indexOf("`src/lib/analytics`");
    expect(sitemap).toBeGreaterThan(0);
    expect(sitemap).toBeLessThan(analytics);
    expect(md).toContain("| `src/lib/analytics` | 2 | 100.0% (60 of 60) |");
    expect(md).not.toContain("src/app/(app)");
    expect(md).not.toContain("src/lib/tiny");
  });
});
