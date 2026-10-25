"use server";

import { track } from "@/lib/analytics/track";
import { getCurrentUser } from "@/lib/auth";
import { setAnswersCookie } from "@/lib/path/cookie";
import { parseAnswers } from "@/lib/path/quiz";

/**
 * Keeps the quiz answers in a short lived signed cookie (the fallback for
 * browser storage) and tells the quiz whether to show the sign up step.
 * Nothing is written to the database until the learner has an account.
 */
export async function stashAnswers(input: unknown): Promise<{ ok: boolean; signedIn: boolean }> {
  const answers = parseAnswers(input);
  if (!answers) return { ok: false, signedIn: false };
  await setAnswersCookie(answers);
  const user = await getCurrentUser();
  await track("quiz_run", { signed_in: Boolean(user) });
  return { ok: true, signedIn: Boolean(user) };
}
