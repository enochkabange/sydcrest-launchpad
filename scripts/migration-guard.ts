/**
 * Migration safety rules, enforced in CI and before every production deploy:
 *  1. A migration that already exists on the base branch is never edited or
 *     deleted (it has shipped; add a new migration instead).
 *  2. New migrations are expand only. Destructive statements fail unless the
 *     same line carries `-- allow-destructive: <reason>`.
 */

export type ChangedFile = { status: string; path: string };

const DESTRUCTIVE = [
  /\bdrop\s+(table|column|schema|view|materialized\s+view|type|function|policy|index|trigger)\b/i,
  /\balter\s+table\b[^;]*\brename\b/i,
  /\balter\s+(table\b[^;]*\balter\s+column\b[^;]*\btype|column\b[^;]*\btype)\b/i,
  /\btruncate\b/i,
  /\bdelete\s+from\b/i,
];

const OVERRIDE = /--\s*allow-destructive:\s*\S/i;

export function shippedMigrationEdits(changes: ChangedFile[]): string[] {
  return changes
    .filter((c) => c.path.startsWith("supabase/migrations/") && c.path.endsWith(".sql"))
    .filter((c) => !c.status.startsWith("A"))
    .map((c) => `${c.path} was ${c.status.startsWith("D") ? "deleted" : "modified"}; shipped migrations are immutable, add a new one`);
}

export function destructiveStatements(path: string, sql: string): string[] {
  const problems: string[] = [];
  sql.split("\n").forEach((raw, i) => {
    const line = raw.replace(/--(?!\s*allow-destructive).*$/i, "");
    if (OVERRIDE.test(raw)) return;
    if (DESTRUCTIVE.some((re) => re.test(line))) {
      problems.push(`${path}:${i + 1} looks destructive: "${raw.trim()}". Expand only, or add "-- allow-destructive: <reason>" to that line`);
    }
  });
  return problems;
}
