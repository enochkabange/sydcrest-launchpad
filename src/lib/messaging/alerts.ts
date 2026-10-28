import type { AdminClient } from "./admin";
import { logOnce, senderFor, twilioCredentials, type Env } from "./config";
import { WHATSAPP_CONSENT_KIND, WHATSAPP_CONSENT_VERSION } from "./consent";
import { consentedCandidates, type Candidate } from "./reengage";
import { sendWhatsApp, type DeliveryResult } from "./send";
import { firstName } from "./templates";

/**
 * External alerts for booking and brief news (founder decision on #191):
 * in app always (the caller's job); WhatsApp only to people with a live
 * WhatsApp consent of the current version, on the number they consented
 * with; email stays off until an email sender exists. Without Twilio keys
 * nothing is looked up or sent, and a notice is logged once.
 */

export type AlertMessage = { title: string; href: string };
export type AlertSummary = { whatsapp: number; skipped: number; failed: number };

export type AlertDeps = {
  env?: Env;
  /** People among `profileIds` with a live WhatsApp consent on their current number. */
  consented: (profileIds: string[]) => Promise<Candidate[]>;
  send: (to: string, vars: Record<string, string | null>) => Promise<DeliveryResult>;
  siteHost: string;
};

export function whatsappConfigured(env: Env = process.env) {
  return Boolean(twilioCredentials(env) && senderFor("whatsapp", env));
}

/** Runs the alert for each recipient. Never throws: an alert must not undo what already saved. */
export async function runAlerts(recipientIds: string[], message: AlertMessage, deps: AlertDeps): Promise<AlertSummary> {
  const summary: AlertSummary = { whatsapp: 0, skipped: 0, failed: 0 };
  logOnce("alerts-email", "booking and brief email alerts are off until an email sender is set up; in app and WhatsApp only.");
  const ids = [...new Set(recipientIds)];
  if (!ids.length) return summary;
  if (!whatsappConfigured(deps.env)) {
    logOnce("alerts-whatsapp-unconfigured", "booking and brief WhatsApp alerts not sent: Twilio is not set up.");
    summary.skipped = ids.length;
    return summary;
  }
  try {
    const people = await deps.consented(ids);
    summary.skipped = ids.length - people.length;
    const url = `${deps.siteHost}${message.href}`;
    const results = await Promise.all(
      people.map((p) =>
        deps.send(p.phone, { name: firstName(p.displayName), title: message.title, url }).catch(
          (e): DeliveryResult => ({ status: "failed", error: e instanceof Error ? e.message : String(e) }),
        ),
      ),
    );
    for (const r of results) {
      if (r.status === "sent") summary.whatsapp++;
      else if (r.status === "failed") summary.failed++;
      else summary.skipped++;
    }
  } catch (e) {
    console.error(`[messaging] alerts failed: ${e instanceof Error ? e.message : String(e)}`);
    summary.failed = ids.length;
  }
  return summary;
}

/** Live WhatsApp consents (current version) for these people, matched to the number still on their profile. */
export async function consentedAmong(admin: AdminClient, profileIds: string[]): Promise<Candidate[]> {
  const { data: consents, error } = await admin
    .from("consents")
    .select("profile_id, phone")
    .in("profile_id", profileIds)
    .eq("kind", WHATSAPP_CONSENT_KIND)
    .eq("version", WHATSAPP_CONSENT_VERSION)
    .is("revoked_at", null)
    .not("phone", "is", null);
  if (error) throw new Error(`consents: ${error.message}`);
  if (!consents.length) return [];
  const { data: profiles, error: profileError } = await admin
    .from("profiles")
    .select("id, phone, display_name")
    .in("id", [...new Set(consents.map((c) => c.profile_id))])
    .not("phone", "is", null);
  if (profileError) throw new Error(`profiles: ${profileError.message}`);
  return consentedCandidates(consents, profiles);
}

/** Booking and brief alerts through the service role client and Twilio. */
export function sendAlerts(admin: AdminClient, recipientIds: string[], message: AlertMessage, siteHost: string) {
  return runAlerts(recipientIds, message, {
    consented: (ids) => consentedAmong(admin, ids),
    send: (to, vars) => sendWhatsApp(to, "alert", vars),
    siteHost,
  });
}
