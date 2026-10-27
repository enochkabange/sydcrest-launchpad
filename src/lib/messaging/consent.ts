/**
 * WhatsApp consent facts shared by the profile toggle, the cron job and the
 * opt out webhook. Bump the version when the promise on the toggle changes:
 * sends require a live consent of the current version.
 */
export const WHATSAPP_CONSENT_KIND = "whatsapp";
export const WHATSAPP_CONSENT_VERSION = "2026-10";

/** Twilio's standard opt out keywords, matched on the whole message. */
const STOP_WORDS = new Set(["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"]);

export function isStopKeyword(body: string | null | undefined) {
  if (!body) return false;
  return STOP_WORDS.has(body.trim().replace(/[.!]+$/, "").toUpperCase());
}

/** "whatsapp:+233241234567" or "+233241234567" -> "+233241234567"; null if not E.164. */
export function phoneFromTwilioAddress(address: string | null | undefined) {
  const number = address?.trim().replace(/^whatsapp:/i, "") ?? "";
  return /^\+[1-9]\d{7,14}$/.test(number) ? number : null;
}

/** Why a WhatsApp consent was revoked, when it wasn't the learner turning it off. */
export type RevokedReason = "stop" | "phone_changed";

type ConsentRow = { phone: string | null };

/**
 * Welcome a number the first time it is opted in, never again when someone
 * turns updates back on for the same number. Rows from before consents
 * recorded a number (phone null) count as already welcomed.
 */
export function shouldSendWelcome(earlier: ConsentRow[], phone: string) {
  return !earlier.some((c) => c.phone === null || c.phone === phone);
}

/**
 * Saving `nextPhone` on the profile revokes live WhatsApp consent given for
 * any other number (a database trigger does it); true when that will happen,
 * so the profile can ask the learner to opt in again.
 */
export function phoneChangeRevokes(live: ConsentRow[], nextPhone: string | null) {
  return live.some((c) => c.phone !== nextPhone);
}
