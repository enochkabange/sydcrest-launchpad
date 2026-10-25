import { createTwilioClient, type MessagingClient } from "./client";
import { logOnce, senderFor, twilioCredentials, type Env } from "./config";
import { renderTemplate, type TemplateName, type TemplateVars } from "./templates";

export type DeliveryResult =
  | { status: "sent"; sid: string }
  | { status: "skipped"; reason: "not_configured" | "invalid_number" }
  | { status: "failed"; error: string };

/** `client` swaps the transport (tests pass a fake); credentials are still required. */
type Options = { client?: MessagingClient; env?: Env };

const E164 = /^\+[1-9]\d{7,14}$/;

async function deliver(channel: "whatsapp" | "sms", to: string, body: string, { client, env = process.env }: Options) {
  const number = to.replace(/^whatsapp:/, "");
  if (!E164.test(number)) return { status: "skipped", reason: "invalid_number" } as const;

  const from = senderFor(channel, env);
  const credentials = twilioCredentials(env);
  if (!from || !credentials) {
    const vars = channel === "whatsapp" ? "TWILIO_WHATSAPP_FROM" : "TWILIO_SMS_FROM";
    logOnce(`${channel}-unconfigured`, `${channel} not sent: set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and ${vars}.`);
    return { status: "skipped", reason: "not_configured" } as const;
  }

  const prefix = channel === "whatsapp" ? "whatsapp:" : "";
  const result = await (client ?? createTwilioClient(credentials)).send({
    to: `${prefix}${number}`,
    from: `${prefix}${from}`,
    body,
  });
  if (!result.ok) {
    console.error(`[messaging] ${channel} send failed: ${result.error}`);
    return { status: "failed", error: result.error } as const;
  }
  return { status: "sent", sid: result.sid } as const;
}

/**
 * Send a WhatsApp message from a template. Callers must have checked consent.
 * Without Twilio credentials this does nothing and logs once.
 */
export function sendWhatsApp(to: string, template: TemplateName, vars: TemplateVars = {}, options: Options = {}): Promise<DeliveryResult> {
  return deliver("whatsapp", to, renderTemplate(template, vars), options);
}

/** Send an SMS from a template. Same rules as sendWhatsApp; needs TWILIO_SMS_FROM. */
export function sendSms(to: string, template: TemplateName, vars: TemplateVars = {}, options: Options = {}): Promise<DeliveryResult> {
  return deliver("sms", to, renderTemplate(template, vars), options);
}
