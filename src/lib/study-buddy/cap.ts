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

export const LIMIT_MESSAGE =
  "You have used all of today's Study Buddy messages. Great work today! Your messages refresh at midnight, Ghana time. Meanwhile, try the practice task or write down what you learnt in your own words.";
