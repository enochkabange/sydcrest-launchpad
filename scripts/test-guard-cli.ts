/**
 * Usage: pnpm tsx scripts/test-guard-cli.ts <base-ref> [labels as JSON array]
 * Exits 1 when the PR changes app code or migrations without a test (./test-guard.ts).
 */
import { execFileSync } from "node:child_process";
import { checkTests } from "./test-guard";

const base = process.argv[2];
if (!base) {
  console.error("usage: test-guard-cli <base-ref> [labels-json]");
  process.exit(2);
}
let labels: string[] = [];
try {
  const parsed: unknown = JSON.parse(process.argv[3] ?? "[]");
  if (Array.isArray(parsed)) labels = parsed.filter((l): l is string => typeof l === "string");
} catch {
  labels = [];
}

const paths = execFileSync("git", ["diff", "--name-only", "--diff-filter=AMR", `${base}...HEAD`], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

const result = checkTests(paths, labels);
if (!result.ok) {
  console.error(`✗ ${result.message}`);
  for (const p of result.behaviour) console.error(`  ${p}`);
  process.exit(1);
}
console.log(result.message);
