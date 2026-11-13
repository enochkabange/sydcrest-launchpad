/** Turns Vitest's json-summary into Markdown (see coverage-summary.ts). Pure, unit tested. */

type Metric = { total: number; covered: number; pct: number | "Unknown" };
export type Summary = Record<string, { lines: Metric; statements: Metric; functions: Metric; branches: Metric }>;

function pct(covered: number, total: number) {
  return total ? `${((covered / total) * 100).toFixed(1)}%` : "n/a";
}

/** The folder a file is reported under: its first three path segments under src (src/lib/analytics, src/app/(admin)). */
export function folderOf(path: string): string {
  const parts = path.split("/");
  if (parts[0] === "src" && parts.length > 3) return parts.slice(0, 3).join("/");
  return parts.slice(0, Math.max(1, parts.length - 1)).join("/");
}

/** Library code (src/lib, scripts): where unit tests belong. Pages and components are the end to end tests' job. */
export function isLibrary(folder: string): boolean {
  return folder === "src/lib" || folder.startsWith("src/lib/") || folder === "scripts" || folder.startsWith("scripts/");
}

export function coverageMarkdown(summary: Summary, worst = 15): string {
  const total = summary.total;
  const folders = new Map<string, { covered: number; total: number; files: number }>();
  for (const [path, file] of Object.entries(summary)) {
    if (path === "total") continue;
    const key = folderOf(path);
    const f = folders.get(key) ?? { covered: 0, total: 0, files: 0 };
    f.covered += file.lines.covered;
    f.total += file.lines.total;
    f.files += 1;
    folders.set(key, f);
  }
  const library = [...folders.entries()].filter(([name]) => isLibrary(name));
  const lib = library.reduce((a, [, f]) => ({ covered: a.covered + f.covered, total: a.total + f.total }), { covered: 0, total: 0 });
  const rows = library
    .filter(([, f]) => f.total >= 20)
    .sort((a, b) => a[1].covered / a[1].total - b[1].covered / b[1].total || b[1].total - a[1].total)
    .slice(0, worst);
  const lines = [
    "### Unit test coverage",
    "",
    "A report, not a gate. Unit tests belong on library code (src/lib, scripts); pages and components are covered by the end to end tests and SQL by the database tests, which this does not count.",
    "",
    "| | Lines covered |",
    "|---|---|",
    `| Library code | ${pct(lib.covered, lib.total)} (${lib.covered} of ${lib.total}) |`,
    `| Everything | ${pct(total.lines.covered, total.lines.total)} (${total.lines.covered} of ${total.lines.total}) |`,
    "",
    "#### Least covered library folders (20 lines or more)",
    "",
    "| Folder | Files | Lines covered |",
    "|---|---|---|",
    ...rows.map(([name, f]) => `| \`${name}\` | ${f.files} | ${pct(f.covered, f.total)} (${f.covered} of ${f.total}) |`),
  ];
  return lines.join("\n");
}
