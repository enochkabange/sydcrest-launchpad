/**
 * Twilio settings, read from the environment at call time (never at import,
 * so builds without credentials still work). Missing values mean "not set up
 * yet": senders skip quietly and log once instead of failing.
 */

export type Env = Record<string, string | undefined>;

export type TwilioCredentials = { accountSid: string; authToken: string };

export function twilioCredentials(env: Env = process.env): TwilioCredentials | null {
  const accountSid = env.TWILIO_ACCOUNT_SID?.trim();
  const authToken = env.TWILIO_AUTH_TOKEN?.trim();
  return accountSid && authToken ? { accountSid, authToken } : null;
}

/** Sender for a channel: TWILIO_WHATSAPP_FROM or TWILIO_SMS_FROM, as E.164 (+233...). */
export function senderFor(channel: "whatsapp" | "sms", env: Env = process.env): string | null {
  const from = (channel === "whatsapp" ? env.TWILIO_WHATSAPP_FROM : env.TWILIO_SMS_FROM)?.trim();
  if (!from) return null;
  // Accept either "+233..." or "whatsapp:+233..." in the env var.
  return from.replace(/^whatsapp:/, "");
}

const logged = new Set<string>();

/** Log a "not configured" notice once per process, so a daily job doesn't spam logs. */
export function logOnce(key: string, message: string) {
  if (logged.has(key)) return;
  logged.add(key);
  console.warn(`[messaging] ${message}`);
}

/** Test helper: forget which notices were logged. */
export function resetLogOnce() {
  logged.clear();
}
