/**
 * The smallest Twilio client that does the job: one REST call to the Messages
 * resource with fetch. The official SDK (twilio 6.x) is about 27 MB installed
 * for a single POST we need, so we call the documented REST API directly.
 */

export type OutboundMessage = {
  /** Full Twilio address: "+233..." for SMS, "whatsapp:+233..." for WhatsApp. */
  to: string;
  from: string;
  body: string;
};

export type SendResult = { ok: true; sid: string } | { ok: false; error: string };

export interface MessagingClient {
  send(message: OutboundMessage): Promise<SendResult>;
}

const API = "https://api.twilio.com/2010-04-01";

export function createTwilioClient(
  { accountSid, authToken }: { accountSid: string; authToken: string },
  fetchImpl: typeof fetch = fetch,
): MessagingClient {
  return {
    async send({ to, from, body }) {
      try {
        const res = await fetchImpl(`${API}/Accounts/${encodeURIComponent(accountSid)}/Messages.json`, {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ To: to, From: from, Body: body }),
        });
        const json = (await res.json().catch(() => ({}))) as { sid?: string; code?: number; message?: string };
        if (!res.ok || !json.sid) {
          return { ok: false, error: `Twilio ${res.status}${json.code ? ` (${json.code})` : ""}: ${json.message ?? "no message"}` };
        }
        return { ok: true, sid: json.sid };
      } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    },
  };
}

/** In memory client for tests: records every message, never calls the network. */
export function createFakeClient(options: { fail?: boolean } = {}) {
  const sent: OutboundMessage[] = [];
  const client: MessagingClient & { sent: OutboundMessage[] } = {
    sent,
    async send(message) {
      if (options.fail) return { ok: false, error: "fake failure" };
      sent.push(message);
      return { ok: true, sid: `SM_fake_${sent.length}` };
    },
  };
  return client;
}
