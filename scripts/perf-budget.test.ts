import { describe, expect, it } from "vitest";
import { compareBudget, gzipSize, measureRoutes, report, suggestBudget, type Budget } from "./perf-budget";

const budget: Budget = { unit: "gzip_bytes", routes: { "/": 1000, "/learn/[slug]/[node]": 2000 } };

describe("measureRoutes", () => {
  it("adds up each route's chunks, reading a shared chunk once", () => {
    const sizes: Record<string, number> = { "a.js": 100, "b.js": 50, "c.js": 7 };
    const reads: string[] = [];
    const measured = measureRoutes(
      [
        { route: "/", firstLoadChunkPaths: ["a.js", "b.js"] },
        { route: "/learn", firstLoadChunkPaths: ["a.js", "c.js", "c.js"] },
      ],
      (path) => {
        reads.push(path);
        return sizes[path];
      },
    );
    expect(measured).toEqual({ "/": 150, "/learn": 107 });
    expect(reads.sort()).toEqual(["a.js", "b.js", "c.js"]);
  });
});

describe("compareBudget", () => {
  it("passes when every page is at or under its budget", () => {
    const result = compareBudget({ "/": 1000, "/learn/[slug]/[node]": 1500, "/other": 99999 }, budget);
    expect(result.ok).toBe(true);
    expect(result.checks.map((c) => c.ok)).toEqual([true, true]);
  });

  it("fails a page one byte over", () => {
    const result = compareBudget({ "/": 1001, "/learn/[slug]/[node]": 1500 }, budget);
    expect(result.ok).toBe(false);
    expect(result.checks.find((c) => c.route === "/")).toEqual({ route: "/", budget: 1000, measured: 1001, ok: false });
  });

  it("fails a budgeted page missing from the build", () => {
    const result = compareBudget({ "/": 10 }, budget);
    expect(result.ok).toBe(false);
    expect(report(result)[1]).toMatch(/not in this build/);
  });

  it("reports each page in KB with its share of the budget", () => {
    expect(report(compareBudget({ "/": 512, "/learn/[slug]/[node]": 2048 }, budget))).toEqual([
      "✓ /: 0.5 KB of 1.0 KB (51%)",
      "✗ /learn/[slug]/[node]: 2.0 KB of 2.0 KB (102%)",
    ]);
  });
});

describe("suggestBudget", () => {
  it("sets each page 10% above today's size, rounded up to a whole KB", () => {
    expect(suggestBudget({ "/": 100_000, "/x": 1 }, ["/", "/missing"])).toEqual({ unit: "gzip_bytes", routes: { "/": 110_592 } });
  });
});

describe("gzipSize", () => {
  it("is smaller than the raw size for repetitive code and stable", () => {
    const code = "function f(){return 1}\n".repeat(200);
    expect(gzipSize(code)).toBeLessThan(code.length);
    expect(gzipSize(code)).toBe(gzipSize(Buffer.from(code)));
  });
});
