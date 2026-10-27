import { DAILY_MESSAGE_LIMIT } from "./config";

/**
 * Daily allowance logic. The database counts (record_ai_usage only adds);
 * this decides. Kept free of I/O so it is easy to test.
 */

/**
 * Today's date in Africa/Accra as YYYY-MM-DD. Accra is UTC all year with no
 * daylight saving, which matches record_ai_usage's
 * `(now() at time zone 'Africa/Accra')::date`.
 */
export function accraDay(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export type CapStatus = {
  used: number;
  limit: number;
  remaining: number;
  allowed: boolean;
};

export function capStatus(used: number | null | undefined, limit = DAILY_MESSAGE_LIMIT): CapStatus {
  const safeUsed = Math.max(0, Math.floor(used ?? 0));
  const remaining = Math.max(0, limit - safeUsed);
  return { used: safeUsed, limit, remaining, allowed: remaining > 0 };
}

/**
 * Decides a reserved turn. The route reserves with record_ai_usage(0, 0)
 * before calling the model; that upsert serialises on the learner's row, so
 * each parallel request gets a distinct count back. Only counts up to the
 * limit are allowed, so the cap is exact however many requests race.
 */
export function reservationStatus(messagesAfterReserve: number | null | undefined, limit = DAILY_MESSAGE_LIMIT): CapStatus {
  // The reservation counted this turn, so it is "used" once allowed.
  const used = Math.max(0, Math.floor(messagesAfterReserve ?? 0));
  const allowed = used >= 1 && used <= limit;
  return { used, limit, remaining: Math.max(0, limit - used), allowed };
}

export const LIMIT_MESSAGE =
  "You have used all of today's Study Buddy messages. Great work today! Your messages refresh at midnight, Ghana time. Meanwhile, try the practice task or write down what you learnt in your own words.";
