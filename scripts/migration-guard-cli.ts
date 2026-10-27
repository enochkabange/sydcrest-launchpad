/**
 * Usage: pnpm tsx scripts/migration-guard-cli.ts <base-ref>
 * Compares HEAD with <base-ref> (for example origin/main or the previous
 * commit on main) and exits 1 when a migration rule is broken.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { destructiveStatements, shippedMigrationEdits, type ChangedFile } from "./migration-guard";

const base = process.argv[2];
if (!base) {
  console.error("usage: migration-guard-cli <base-ref>");
  process.exit(2);
}

const diff = execFileSync("git", ["diff", "--name-status", `${base}...HEAD`, "--", "supabase/migrations"], { encoding: "utf8" });
const changes: ChangedFile[] = diff
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [status, ...rest] = line.split("\t");
    return { status, path: rest[rest.length - 1] };
  });

const problems = [
  ...shippedMigrationEdits(changes),
  ...changes
    .filter((c) => c.status.startsWith("A") && c.path.endsWith(".sql"))
    .flatMap((c) => destructiveStatements(c.path, readFileSync(c.path, "utf8"))),
];

if (problems.length) {
  for (const p of problems) console.error(`✗ ${p}`);
  process.exit(1);
}
console.log(`Migration guard: ${changes.length} migration change(s) checked, all safe.`);
