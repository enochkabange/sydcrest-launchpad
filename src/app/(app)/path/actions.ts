"use server";

import { requireUser } from "@/lib/auth";
import { clearAnswersCookie, readAnswersCookie } from "@/lib/path/cookie";
import { parseAnswers } from "@/lib/path/quiz";
import type { PathResult } from "@/lib/path/recommend";
import { savePath } from "@/lib/path/server";

export type SaveState =
  | { status: "saved" }
  | { status: "none" }
  | { status: "unsaved"; result: PathResult; reason: "unavailable" | "error" };

/**
 * Saves answers carried through sign up: the signed cookie first, then the
 * copy the browser kept. Identity comes from the session, never the input.
 */
export async function savePendingPath(localAnswers: unknown): Promise<SaveState> {
  const user = await requireUser();
  const answers = (await readAnswersCookie()) ?? parseAnswers(localAnswers);
  if (!answers) {
    await clearAnswersCookie();
    return { status: "none" };
  }
  const outcome = await savePath(user.id, answers);
  if (!outcome.saved) return { status: "unsaved", result: outcome.result, reason: outcome.reason };
  await clearAnswersCookie();
  return { status: "saved" };
}
