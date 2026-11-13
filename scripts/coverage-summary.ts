/**
 * Usage: pnpm tsx scripts/coverage-summary.ts [coverage/coverage-summary.json]
 * Prints the unit test coverage as Markdown: the totals, then the folders
 * with the least covered lines. CI appends it to the job summary, so every
 * PR shows which areas only the end to end and database tests reach.
 */
import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { coverageMarkdown, type Summary } from "./coverage-report";

const file = process.argv[2] ?? "coverage/coverage-summary.json";
const summary = JSON.parse(readFileSync(file, "utf8")) as Summary;
const rel: Summary = {};
for (const [key, value] of Object.entries(summary)) rel[key === "total" ? key : relative(process.cwd(), key)] = value;
console.log(coverageMarkdown(rel));
