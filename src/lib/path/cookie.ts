import "server-only";
import { cookies } from "next/headers";
import { parseAnswers, type PathAnswers } from "./quiz";
import { signValue, verifyValue } from "./signing";

/**
 * Short lived, signed, httpOnly copy of the quiz answers: the fallback when
 * browser storage is unavailable. Long enough to cover an email confirmation
 * link (valid for a day), short enough not to linger.
 */
const COOKIE = "sc_path_answers";
const TTL_SECONDS = 24 * 60 * 60;

function secret() {
  return process.env.PATH_COOKIE_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? null;
}

/** Server Functions only (cookies cannot be set while rendering). No op without a secret. */
export async function setAnswersCookie(answers: PathAnswers) {
  const key = secret();
  if (!key) return;
  (await cookies()).set(COOKIE, signValue(answers, key, TTL_SECONDS), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: TTL_SECONDS,
  });
}

export async function readAnswersCookie(): Promise<PathAnswers | null> {
  const key = secret();
  if (!key) return null;
  const token = (await cookies()).get(COOKIE)?.value;
  return parseAnswers(verifyValue(token, key));
}

/** Server Functions only. */
export async function clearAnswersCookie() {
  (await cookies()).delete(COOKIE);
}
