/**
 * Page weight budget (issue #331): the JavaScript a key page makes a browser
 * download on first load, against a checked in budget (perf-budget.json).
 * Learners on 2G and 3G with costly data pay for every kilobyte.
 *
 * `next build` (16.x) writes .next/diagnostics/route-bundle-stats.json: one
 * entry per route with the chunks its first load needs
 * (firstLoadChunkPaths, relative to the project) and their raw size. We
 * gzip each chunk and add them up, because gzip is closer to what goes over
 * the wire than the raw size. Pure functions here; the CLI reads the files.
 */
import { gzipSync } from "node:zlib";

export type RouteBundleStat = { route: string; firstLoadUncompressedJsBytes?: number; firstLoadChunkPaths: string[] };

export type Budget = {
  /** What the numbers measure. Only gzip bytes of first load JavaScript today. */
  unit: "gzip_bytes";
  /** Route pattern (as `next build` prints it) to its largest allowed first load. */
  routes: Record<string, number>;
};

export type RouteCheck = { route: string; budget: number; measured: number | null; ok: boolean };
export type BudgetResult = { ok: boolean; checks: RouteCheck[] };

/** Gzipped size of a chunk; level 9 so the figure is the same on every machine. */
export function gzipSize(content: Buffer | string): number {
  return gzipSync(content, { level: 9 }).length;
}

/** First load gzip bytes per route, reading each chunk once through `sizeOf`. */
export function measureRoutes(stats: RouteBundleStat[], sizeOf: (path: string) => number): Record<string, number> {
  const cache = new Map<string, number>();
  const out: Record<string, number> = {};
  for (const stat of stats) {
    let total = 0;
    for (const path of new Set(stat.firstLoadChunkPaths)) {
      if (!cache.has(path)) cache.set(path, sizeOf(path));
      total += cache.get(path)!;
    }
    out[stat.route] = total;
  }
  return out;
}

/**
 * Every budgeted route must exist in the build and stay within its budget.
 * A missing route fails too: a renamed page must bring its budget along.
 */
export function compareBudget(measured: Record<string, number>, budget: Budget): BudgetResult {
  const checks = Object.entries(budget.routes).map(([route, limit]) => {
    const value = Object.hasOwn(measured, route) ? measured[route] : null;
    return { route, budget: limit, measured: value, ok: value !== null && value <= limit };
  });
  return { ok: checks.every((c) => c.ok), checks };
}

export function kb(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

/** One line per route for the CI log. */
export function report(result: BudgetResult): string[] {
  return result.checks.map((c) => {
    if (c.measured === null) return `✗ ${c.route}: not in this build (renamed or removed? update perf-budget.json)`;
    const share = Math.round((c.measured / c.budget) * 100);
    return `${c.ok ? "✓" : "✗"} ${c.route}: ${kb(c.measured)} of ${kb(c.budget)} (${share}%)`;
  });
}

/** A budget set `headroom` above today's sizes, rounded up to the next KB. */
export function suggestBudget(measured: Record<string, number>, routes: string[], headroom = 0.1): Budget {
  const out: Record<string, number> = {};
  for (const route of routes) {
    if (Object.hasOwn(measured, route)) out[route] = Math.ceil((measured[route] * (1 + headroom)) / 1024) * 1024;
  }
  return { unit: "gzip_bytes", routes: out };
}
