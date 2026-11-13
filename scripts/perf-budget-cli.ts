/**
 * Usage, after `pnpm build`:
 *   pnpm tsx scripts/perf-budget-cli.ts            check perf-budget.json, exit 1 when a page is over
 *   pnpm tsx scripts/perf-budget-cli.ts --suggest  print a budget 10% above today's sizes
 *
 * See scripts/perf-budget.ts for what is measured.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { compareBudget, gzipSize, kb, measureRoutes, report, suggestBudget, type Budget, type RouteBundleStat } from "./perf-budget";

const root = process.cwd();
const statsPath = join(root, ".next", "diagnostics", "route-bundle-stats.json");
if (!existsSync(statsPath)) {
  console.error(`Page weight budget: ${statsPath} not found. Run pnpm build first.`);
  process.exit(2);
}

const stats = JSON.parse(readFileSync(statsPath, "utf8")) as RouteBundleStat[];
const measured = measureRoutes(stats, (path) => gzipSize(readFileSync(join(root, path))));
const budget = JSON.parse(readFileSync(join(root, "perf-budget.json"), "utf8")) as Budget;

if (process.argv.includes("--suggest")) {
  console.log(JSON.stringify(suggestBudget(measured, Object.keys(budget.routes)), null, 2));
  process.exit(0);
}

const result = compareBudget(measured, budget);
for (const line of report(result)) (result.ok ? console.log : console.error)(line);
if (!result.ok) {
  console.error(
    "Page weight budget: a page is over its first load JavaScript budget. Trim what it loads, " +
      "or, if the weight is worth it, raise its number in perf-budget.json and say why in the PR.",
  );
  process.exit(1);
}
const largest = Math.max(...Object.values(measured));
console.log(`Page weight budget: ${result.checks.length} page(s) within budget (largest route in the build: ${kb(largest)} gzip).`);
