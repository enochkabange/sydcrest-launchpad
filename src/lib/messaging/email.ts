import "server-only";

/**
 * Service emails (founder decision, 13 Nov 2026: outcome check ins also go to
 * the account email). Sent through Resend with RESEND_API_KEY; without it
 * nothing is sent and the result says so, like WhatsApp without Twilio.
 * Plain text only, from the no reply address.
 */
export type EmailResult = { status: "sent"; id: string } | { status: "skipped"; reason: "not_configured" | "no_address" } | { status: "failed"; error: string };

export const SERVICE_FROM = "SydCrest <hello@mail.sydcrest.com>";

type Fetch = typeof fetch;

export async function sendServiceEmail(
  { to, subject, text }: { to: string | null | undefined; subject: string; text: string },
  { env = process.env, post = fetch }: { env?: Record<string, string | undefined>; post?: Fetch } = {},
): Promise<EmailResult> {
  const key = env.RESEND_API_KEY?.trim();
  if (!key) return { status: "skipped", reason: "not_configured" };
  const address = to?.trim();
  if (!address || !address.includes("@")) return { status: "skipped", reason: "no_address" };
  try {
    const res = await post("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: env.EMAIL_FROM?.trim() || SERVICE_FROM, to: [address], subject, text }),
    });
    if (!res.ok) return { status: "failed", error: `resend ${res.status}` };
    const body = (await res.json().catch(() => ({}))) as { id?: string };
    return { status: "sent", id: body.id ?? "" };
  } catch (cause) {
    return { status: "failed", error: cause instanceof Error ? cause.message : String(cause) };
  }
}
