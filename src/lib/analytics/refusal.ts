/**
 * Turns a failed write into a refusal type and a short code for the
 * action_failed event. Pure.
 */
import { RATE_LIMITED_CODE } from "@/lib/rate-limit";
import type { Refusal } from "./events";

export type ErrorLike = { code?: string | null; message?: string | null } | null | undefined;

const CODE = /^[A-Za-z0-9_.:-]{1,60}$/;

/**
 * Postgres codes: 54000 is the rate limiter; 42501 and PGRST301 a refused
 * permission (RLS, a role check); 22xxx and 23xxx bad or conflicting input;
 * P0002 a row the caller cannot see. Anything else is a server error.
 */
export function classifyError(error: ErrorLike): Refusal {
  const code = error?.code ?? "";
  if (code === RATE_LIMITED_CODE) return "rate_limited";
  if (code === "42501" || code === "PGRST301" || code === "P0002" || code === "401" || code === "403") return "forbidden";
  if (/^2[23]/.test(code) || code === "P0001" || code === "PGRST116" || code === "PGRST204") return "validation";
  return "server_error";
}

/** The code to store: the Postgres or PostgREST code if it is one, never the message. */
export function errorCode(error: ErrorLike): string | undefined {
  const code = error?.code ?? undefined;
  return code && CODE.test(code) ? code : undefined;
}
