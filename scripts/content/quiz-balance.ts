/**
 * Report how guessable each track's quizzes are (issue #214).
 *
 *   pnpm tsx scripts/content/quiz-balance.ts [track ...] [--detail]
 *
 * For every src/content/roadmaps/content/*.content.ts (or only the named
 * tracks) prints: question count, share where the correct option is strictly
 * the longest, share where it is strictly the shortest, and how correct
 * answers spread over positions A to D. --detail also lists each question
 * whose correct option is strictly the longest. Exits 1 if any reported track
 * is above QUIZ_BALANCE_MAX on longest share or on a single position.
 */
import { readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { isCorrectStrictlyLongest, QUIZ_BALANCE_MAX, quizBalance } from "../../src/lib/content-generation/quiz-balance";
import type { GeneratedQuestion } from "../../src/lib/content-generation/schema";
import type { TrackContent } from "../../src/content/roadmaps/content/types";

const dir = path.resolve(__dirname, "../../src/content/roadmaps/content");
const args = process.argv.slice(2);
const detail = args.includes("--detail");
const only = args.filter((a) => !a.startsWith("--"));

const pct = (x: number) => `${Math.round(x * 100)}%`.padStart(5);

async function main() {
  const stems = readdirSync(dir)
    .filter((f) => f.endsWith(".content.ts"))
    .map((f) => f.replace(/\.content\.ts$/, ""))
    .filter((s) => only.length === 0 || only.includes(s))
    .sort();

  let failed = false;
  console.log(`${"track".padEnd(36)} ${"qs".padStart(4)} ${"long".padStart(5)} ${"short".padStart(5)}  A/B/C/D        max  status`);
  for (const stem of stems) {
    const mod = (await import(pathToFileURL(path.join(dir, `${stem}.content.ts`)).href)) as { default: TrackContent };
    const entries: { slug: string; q: GeneratedQuestion }[] = [];
    for (const [slug, node] of Object.entries(mod.default.nodes)) {
      for (const q of node.quiz.questions) entries.push({ slug, q });
    }
    const b = quizBalance(entries.map((e) => e.q));
    const ok = b.longestShare <= QUIZ_BALANCE_MAX && b.maxPositionShare <= QUIZ_BALANCE_MAX;
    if (!ok) failed = true;
    console.log(
      `${stem.padEnd(36)} ${String(b.questions).padStart(4)} ${pct(b.longestShare)} ${pct(b.shortestShare)}  ${b.positions.join("/").padEnd(14)} ${pct(b.maxPositionShare)}  ${ok ? "ok" : "FAIL"}`,
    );
    if (detail) {
      for (const { slug, q } of entries) {
        if (isCorrectStrictlyLongest(q)) console.log(`    ${slug}: ${q.prompt}`);
      }
    }
  }
  process.exit(failed ? 1 : 0);
}

void main();
