import "server-only";
import { createAdminClient, type AdminClient } from "@/lib/messaging/admin";
import { SITE_URL } from "@/lib/site";

/**
 * Error alerts for the founder (#304). Errors are recorded as analytics
 * events (#242) and shown on /admin/insights/reliability; this sends a short
 * alert to Slack and email when one happens, at most once an hour per kind of
 * error (public.claim_error_alert keeps count of the repeats in between).
 *
 * An alert names only the source, route, error name and digest: never a
 * message (a browser's can quote what someone typed) or who it happened to,
 * so no personal data reaches Slack or Resend. Messages stay on Reliability. Both channels are
 * optional: SLACK_ALERT_WEBHOOK_URL for Slack, ALERT_EMAIL with
 * RESEND_API_KEY for email. With neither set nothing is looked up or sent.
 * Never throws: an alert must not turn one error into two.
 */

export type ErrorAlert = {
  source: "server" | "client";
  /** Route pattern, for example /roadmaps/[slug]; null when not known. */
  route: string | null;
  /** Error name or code, for example TypeError. */
  error?: string;
  /** Next.js error digest, which matches the Vercel log line. */
  digest?: string;
};

type Env = Record<string, string | undefined>;

const ALERT_FROM = "SydCrest alerts <alerts@mail.sydcrest.com>";

export function alertChannels(env: Env = process.env) {
  const slack = env.SLACK_ALERT_WEBHOOK_URL?.trim() || null;
  const email = env.ALERT_EMAIL?.trim() && env.RESEND_API_KEY?.trim() ? env.ALERT_EMAIL.trim() : null;
  return { slack, email, any: Boolean(slack || email) };
}

/** One kind of error: the same source, route and error name alert together. */
export function errorFingerprint(alert: ErrorAlert) {
  return [alert.source, alert.route ?? "unknown", alert.error ?? "Error"].join(" ").slice(0, 300);
}

/** Subject line and plain text body. Pure. */
export function formatErrorAlert(alert: ErrorAlert, heldBack: number, siteUrl = SITE_URL) {
  const where = alert.route ?? "an unknown page";
  const kind = alert.source === "server" ? "Server error" : "Browser error";
  const subject = `${kind} on ${where}${alert.error ? ` (${alert.error})` : ""}`;
  const lines = [
    subject,
    alert.digest ? `Digest: ${alert.digest} (search the Vercel logs for it)` : null,
    heldBack > 0 ? `It also happened ${heldBack} more ${heldBack === 1 ? "time" : "times"} since the last alert.` : null,
    `Reliability: ${siteUrl}/admin/insights/reliability`,
  ].filter((l): l is string => l !== null);
  return { subject: `[SydCrest] ${subject}`, text: lines.join("\n") };
}

export type AlertDeps = {
  env?: Env;
  claim: (fingerprint: string) => Promise<{ send: boolean; heldBack: number } | null>;
  fetch?: typeof fetch;
  siteUrl?: string;
};

/** Claims the hourly slot and, if it is ours, sends to every configured channel. */
export async function sendErrorAlert(alert: ErrorAlert, deps: AlertDeps): Promise<"sent" | "held" | "off" | "failed"> {
  const env = deps.env ?? process.env;
  const channels = alertChannels(env);
  if (!channels.any) return "off";
  const post = deps.fetch ?? fetch;
  try {
    const claim = await deps.claim(errorFingerprint(alert));
    if (!claim) return "failed";
    if (!claim.send) return "held";
    const { subject, text } = formatErrorAlert(alert, claim.heldBack, deps.siteUrl);
    const sends: Promise<Response>[] = [];
    if (channels.slack) {
      sends.push(post(channels.slack, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) }));
    }
    if (channels.email) {
      sends.push(
        post("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${env.RESEND_API_KEY!.trim()}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from: ALERT_FROM, to: [channels.email], subject, text }),
        }),
      );
    }
    const results = await Promise.allSettled(sends);
    const failed = results.filter((r) => r.status === "rejected" || !r.value.ok);
    if (failed.length) console.error(`[alerts] ${failed.length} of ${results.length} alert channels failed`);
    return failed.length === results.length ? "failed" : "sent";
  } catch (e) {
    console.error(`[alerts] error alert not sent: ${e instanceof Error ? e.message : String(e)}`);
    return "failed";
  }
}

async function claimWith(admin: AdminClient, fingerprint: string) {
  const { data, error } = await admin.rpc("claim_error_alert", { p_fingerprint: fingerprint });
  if (error || !data?.[0]) {
    console.error(`[alerts] claim failed: ${error?.message ?? "no row"}`);
    return null;
  }
  return { send: data[0].send, heldBack: data[0].held_back };
}

/** The production wiring: the service role claims the slot. */
export async function alertError(alert: ErrorAlert) {
  if (!alertChannels().any) return "off" as const;
  const admin = createAdminClient();
  if (!admin) return "off" as const;
  return sendErrorAlert(alert, { claim: (fingerprint) => claimWith(admin, fingerprint) });
}
