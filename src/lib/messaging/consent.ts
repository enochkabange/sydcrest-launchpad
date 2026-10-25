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
