import type { DeliveryResult } from "@/lib/messaging/send";
import {
  addDays,
  checkinPayload,
  chooseToSend,
  finishWindow,
  MIN_GAP_DAYS,
  planCheckins,
  type ExistingCheckin,
  type Finish,
  type PlannedCheckin,
} from "./checkins";

/**
 * One run of the outcome check ins, called by the daily cron. Creates the
 * check ins that fell due, then for each one either sends it (an in app
 * notification, plus WhatsApp for learners with a live consent; both hooks
 * no-op when unkeyed) or skips it when the learner was sent one in the last
 * 60 days. No email: there is no email consent to send under yet.
 */

export type CreatedCheckin = { id: string; profile_id: string; months: number; due_on: string };

export interface CheckinStore {
  finishes(from: string, to: string): Promise<Finish[]>;
  existing(profileIds: string[]): Promise<ExistingCheckin[]>;
  create(rows: PlannedCheckin[]): Promise<CreatedCheckin[]>;
  /** The day each learner was last sent a check in, for sends on or after `since`. */
  lastSentOn(profileIds: string[], since: string): Promise<Map<string, string>>;
  markSent(id: string): Promise<void>;
  markSkipped(ids: string[]): Promise<void>;
  /** Profile id to WhatsApp number and name, for people with a live consent on their current number. */
  whatsappNumbers(): Promise<Map<string, { phone: string; displayName: string | null }>>;
  notify(profileId: string, payload: Record<string, string>): Promise<void>;
  /** The account's sign in email and name, for the check in email (founder decision, 13 Nov 2026). */
  accountEmail(profileId: string): Promise<{ email: string | null; displayName: string | null } | null>;
  /** outcome_checkin_sent, one per check in sent. */
  recordSent(months: number[]): Promise<void>;
}

export type CheckinSummary = { created: number; sent: number; skipped: number; whatsapp: number; email: number; failed: number };

export async function runOutcomeCheckins({
  store,
  today,
  sendWhatsApp,
  sendEmail,
}: {
  store: CheckinStore;
  today: string;
  sendWhatsApp: (phone: string, checkin: CreatedCheckin, displayName: string | null) => Promise<DeliveryResult>;
  /** A service email to the account address; every learner gets one (founder decision, 13 Nov 2026). */
  sendEmail?: (email: string, checkin: CreatedCheckin, displayName: string | null) => Promise<{ status: "sent" | "skipped" | "failed" }>;
}): Promise<CheckinSummary> {
  const summary: CheckinSummary = { created: 0, sent: 0, skipped: 0, whatsapp: 0, email: 0, failed: 0 };
  const window = finishWindow(today);
  const finishes = await store.finishes(window.from, window.to);
  if (!finishes.length) return summary;

  const profileIds = [...new Set(finishes.map((f) => f.profile_id))];
  const planned = planCheckins(finishes, await store.existing(profileIds), today);
  if (!planned.length) return summary;

  const created = await store.create(planned);
  summary.created = created.length;
  if (!created.length) return summary;

  const createdFor = [...new Set(created.map((c) => c.profile_id))];
  const lastSent = await store.lastSentOn(createdFor, addDays(today, -MIN_GAP_DAYS));
  const { send, skip } = chooseToSend(created, lastSent, today);
  if (skip.length) {
    await store.markSkipped(skip.map((c) => c.id));
    summary.skipped = skip.length;
  }

  const numbers = send.length ? await store.whatsappNumbers() : new Map<string, { phone: string; displayName: string | null }>();
  const sentMonths: number[] = [];
  for (const checkin of send) {
    try {
      await store.notify(checkin.profile_id, checkinPayload(checkin.id, checkin.months));
      await store.markSent(checkin.id);
      summary.sent++;
      sentMonths.push(checkin.months);
    } catch {
      summary.failed++;
      continue;
    }
    if (sendEmail) {
      const account = await store.accountEmail(checkin.profile_id).catch(() => null);
      if (account?.email) {
        const mailed = await sendEmail(account.email, checkin, account.displayName);
        if (mailed.status === "sent") summary.email++;
        else if (mailed.status === "failed") summary.failed++;
      }
    }
    const learner = numbers.get(checkin.profile_id);
    if (!learner) continue;
    const result = await sendWhatsApp(learner.phone, checkin, learner.displayName);
    if (result.status === "sent") summary.whatsapp++;
    else if (result.status === "failed") summary.failed++;
  }
  if (sentMonths.length) await store.recordSent(sentMonths);
  return summary;
}
