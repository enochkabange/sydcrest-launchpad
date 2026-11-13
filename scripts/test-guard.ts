/**
 * The test guard: a PR that changes behaviour must change a test too, so the
 * work of every contributor (people and agents alike) arrives with its own
 * check. Behaviour is app and library code under src/ and new migrations.
 * Content, generated types, docs and config do not count.
 *
 * A PR where no test change makes sense (copy, styling, a dependency bump)
 * carries the `no-tests-needed` label, which a reviewer sees.
 */

export const SKIP_LABEL = "no-tests-needed";

const TEST = [
  /\.test\.tsx?$/,
  /^e2e\//,
  /^supabase\/tests\//,
];

const BEHAVIOUR = [/^src\/.*\.(ts|tsx)$/, /^supabase\/migrations\/.*\.sql$/];

const NOT_BEHAVIOUR = [
  /^src\/content\//, // lessons and roadmap content, checked by the content validator
  /^src\/lib\/supabase\/database\.types\.ts$/, // generated; the Migrations job diffs it
  /\.d\.ts$/,
];

export function isTest(path: string): boolean {
  return TEST.some((re) => re.test(path));
}

export function isBehaviour(path: string): boolean {
  return !isTest(path) && BEHAVIOUR.some((re) => re.test(path)) && !NOT_BEHAVIOUR.some((re) => re.test(path));
}

export type GuardResult = { ok: boolean; message: string; behaviour: string[] };

/** `paths` are the files the PR adds or changes (not deletions). */
export function checkTests(paths: string[], labels: string[]): GuardResult {
  const behaviour = paths.filter(isBehaviour);
  const tests = paths.filter(isTest);
  if (!behaviour.length) return { ok: true, behaviour, message: "Test guard: no app code or migrations changed." };
  if (tests.length) {
    return { ok: true, behaviour, message: `Test guard: ${behaviour.length} code file(s) changed with ${tests.length} test file(s).` };
  }
  if (labels.includes(SKIP_LABEL)) {
    return { ok: true, behaviour, message: `Test guard: ${behaviour.length} code file(s) changed with no test, allowed by the "${SKIP_LABEL}" label.` };
  }
  return {
    ok: false,
    behaviour,
    message:
      `Test guard: ${behaviour.length} code file(s) changed and no test did. Add or update a unit test (*.test.ts), ` +
      `a database test (supabase/tests/database) or an end to end test (e2e/), or, if no test makes sense, ` +
      `add the "${SKIP_LABEL}" label and say why in the PR.`,
  };
}
