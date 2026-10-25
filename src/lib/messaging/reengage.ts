import type { DeliveryResult } from "./send";

/**
 * The weekly nudge for learners who went quiet. Pure logic plus a small store
 * interface, so the rules are unit tested without a database or Twilio.
 */

export const INACTIVE_DAYS = 7;
export const NUDGE_INTERVAL_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Key in auth `app_metadata` (only the service role can write it) for the last nudge. */
export const LAST_NUDGE_KEY = "last_reengage_nudge_at";

export type Candidate = { profileId: string; phone: string; displayName: string | null };
export type AuthInfo = { lastSignInAt: string | null; createdAt: string | null; lastNudgeAt: string | null };

export interface ReengageStore {
  /** Learners with a live WhatsApp consent of `version` and a saved phone. */
  consentingLearners(version: string): Promise<Candidate[]>;
  /** Latest roadmap_progress.updated_at per learner. */
  lastProgressAt(profileIds: string[]): Promise<Map<string, string>>;
  authInfo(profileId: string): Promise<AuthInfo | null>;
  /** Record a nudge so the next run skips this learner for a week. */
  markNudged(profileId: string, at: Date): Promise<void>;
}

function time(value: string | null | undefined) {
  if (!value) return null;
  const t = Date.parse(value);
  return Number.isNaN(t) ? null : t;
}

/**
 * Inactive: no sign in and no roadmap progress for INACTIVE_DAYS (falling back
 * to account creation for someone who never did either). Rate limited: at most
 * one nudge per NUDGE_INTERVAL_DAYS.
 */
export function shouldNudge(
  { lastSignInAt, createdAt, lastNudgeAt, lastProgressAt }: AuthInfo & { lastProgressAt: string | null },
  now: Date,
) {
  const lastActive = Math.max(time(lastSignInAt) ?? 0, time(lastProgressAt) ?? 0, time(createdAt) ?? 0);
  if (!lastActive || now.getTime() - lastActive < INACTIVE_DAYS * DAY_MS) return false;
  const nudged = time(lastNudgeAt);
  if (nudged !== null && now.getTime() - nudged < NUDGE_INTERVAL_DAYS * DAY_MS) return false;
  return true;
}

export type ReengageSummary = { considered: number; sent: number; skipped: number; failed: number };

export async function runReengage({
  store,
  send,
  version,
  now = new Date(),
}: {
  store: ReengageStore;
  send: (candidate: Candidate) => Promise<DeliveryResult>;
  version: string;
  now?: Date;
}): Promise<ReengageSummary> {
  const candidates = await store.consentingLearners(version);
  const progress = await store.lastProgressAt(candidates.map((c) => c.profileId));
  const summary: ReengageSummary = { considered: candidates.length, sent: 0, skipped: 0, failed: 0 };

  for (const candidate of candidates) {
    const auth = await store.authInfo(candidate.profileId);
    if (!auth || !shouldNudge({ ...auth, lastProgressAt: progress.get(candidate.profileId) ?? null }, now)) {
      summary.skipped++;
      continue;
    }
    const result = await send(candidate);
    if (result.status === "sent") {
      summary.sent++;
      try {
        await store.markNudged(candidate.profileId, now);
      } catch (err) {
        // The message went out; a failed bookkeeping write must not stop the run.
        console.error(`[messaging] could not record nudge: ${err instanceof Error ? err.message : err}`);
      }
    } else if (result.status === "failed") {
      summary.failed++;
    } else {
      summary.skipped++;
      // Not configured: every later send would skip too, so stop early.
      if (result.reason === "not_configured") {
        summary.skipped += candidates.length - (summary.sent + summary.skipped + summary.failed);
        break;
      }
    }
  }
  return summary;
}
