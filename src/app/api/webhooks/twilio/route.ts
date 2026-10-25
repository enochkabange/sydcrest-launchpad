import { connection } from "next/server";
import { createAdminClient } from "@/lib/messaging/admin";
import { isStopKeyword, phoneFromTwilioAddress, WHATSAPP_CONSENT_KIND } from "@/lib/messaging/consent";
import { logOnce } from "@/lib/messaging/config";
import { isValidTwilioSignature } from "@/lib/messaging/signature";

const STOPPED_REPLY =
  "You will not get any more WhatsApp messages from SydCrest. You can turn them back on from your profile.";

function twiml(message?: string) {
  const body = message
    ? `<Response><Message>${message.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</Message></Response>`
    : "<Response/>";
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    headers: { "Content-Type": "text/xml" },
  });
}

/**
 * The URL Twilio signed. Set TWILIO_WEBHOOK_URL to the exact URL configured
 * in the Twilio console; otherwise rebuild it from the forwarded headers,
 * since behind Vercel request.url may not carry the public scheme and host.
 */
function signedUrl(request: Request) {
  if (process.env.TWILIO_WEBHOOK_URL) return process.env.TWILIO_WEBHOOK_URL;
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? url.host;
  const proto = request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  return `${proto}://${host}${url.pathname}${url.search}`;
}

/**
 * Inbound WhatsApp and SMS replies. A STOP keyword revokes WhatsApp consent
 * for every profile with that phone number. Other replies are ignored.
 */
export async function POST(request: Request) {
  await connection();
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    logOnce("webhook-unconfigured", "Twilio webhook ignored: set TWILIO_AUTH_TOKEN.");
    return new Response("Messaging is not configured", { status: 503 });
  }

  const params = Object.fromEntries(new URLSearchParams(await request.text()));
  if (!isValidTwilioSignature(authToken, request.headers.get("x-twilio-signature"), signedUrl(request), params)) {
    return new Response("Invalid signature", { status: 403 });
  }

  if (!isStopKeyword(params.Body)) return twiml();
  const phone = phoneFromTwilioAddress(params.From);
  if (!phone) return twiml();

  const admin = createAdminClient();
  if (!admin) {
    // Twilio retries on 5xx, which gives us another chance once the key is set.
    console.error("[messaging] STOP received but SUPABASE_SECRET_KEY is not set; consent not revoked.");
    return new Response("Database access is not configured", { status: 503 });
  }

  const { data: profiles, error } = await admin.from("profiles").select("id").eq("phone", phone);
  if (error) {
    console.error(`[messaging] STOP lookup failed: ${error.message}`);
    return new Response("Lookup failed", { status: 500 });
  }
  if (profiles.length) {
    // revoke_consent reads auth.uid(), which is empty for the service role, so
    // stamp revoked_at directly (the service role has the update grant).
    const { error: revokeError } = await admin
      .from("consents")
      .update({ revoked_at: new Date().toISOString() })
      .in("profile_id", profiles.map((p) => p.id))
      .eq("kind", WHATSAPP_CONSENT_KIND)
      .is("revoked_at", null);
    if (revokeError) {
      console.error(`[messaging] STOP revoke failed: ${revokeError.message}`);
      return new Response("Revoke failed", { status: 500 });
    }
  }

  // SMS STOP is answered by Twilio itself; WhatsApp needs our confirmation.
  return params.From?.startsWith("whatsapp:") ? twiml(STOPPED_REPLY) : twiml();
}
