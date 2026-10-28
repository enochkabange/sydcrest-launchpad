/**
 * The app side of the rate limiter (issue #193). The limits live in the
 * database (supabase/migrations/20261029100000_rate_limits.sql):
 *
 * - Signed in writes (reports, briefs, pitches, bookings and their messages,
 *   talent contact requests, organisations, outcomes, RSVPs) are counted per
 *   person by a trigger, which refuses the write with RATE_LIMITED_CODE.
 * - Signed out forms (waitlist, sign up, password reset) are counted per visitor address
 *   through take_form_rate_limit. The address is hashed here first, so the
 *   database never stores it.
 *
 * No Node only imports: the bookings and organisations form helpers that use
 * the message are shared with client components.
 */

/** program_limit_exceeded: what the database raises when a limit is reached. */
export const RATE_LIMITED_CODE = "54000";

/** Shown when a signed in person reaches a limit. */
export const RATE_LIMIT_MESSAGE = "You have done that a lot in a short time. Wait a little and try again.";

/** Shown when a signed out form is refused for the visitor's connection. */
export const FORM_RATE_LIMIT_MESSAGE =
  "This form has been sent many times from your connection just now. Wait a while and try again.";

export type FormBucket = "waitlist" | "sign_up" | "password_reset";

/** True when a Supabase error is the rate limiter refusing the write. */
export function isRateLimited(error: { code?: string | null } | null | undefined): boolean {
  return error?.code === RATE_LIMITED_CODE;
}

type HeaderSource = { get(name: string): string | null };

/**
 * The visitor's address. On Vercel x-forwarded-for is set by the platform
 * (a client cannot spoof it), first entry first; x-real-ip as a fallback.
 */
export function clientAddress(headers: HeaderSource): string | null {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || headers.get("x-real-ip")?.trim();
  return address ? address : null;
}

/** Loopback or unknown: a local run (dev, e2e), where every visitor shares one address. */
export function isLocalAddress(address: string | null): boolean {
  if (!address) return true;
  const a = address.toLowerCase().replace(/^::ffff:/, "");
  return a === "::1" || a === "localhost" || /^127\./.test(a);
}

/** A sha256 of the address, the only form of it the database sees. */
export async function addressKey(address: string): Promise<string> {
  const bytes = new TextEncoder().encode(`sydcrest-rate-limit:${address.toLowerCase()}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

type RpcClient = {
  rpc(
    fn: "take_form_rate_limit",
    args: { p_bucket: FormBucket; p_key: string },
  ): PromiseLike<{ data: boolean | null; error: { code?: string; message: string } | null }>;
};

/**
 * Counts one submission of a signed out form for this visitor and says
 * whether it may go ahead. Local runs are not limited. If the limiter itself
 * fails the form goes ahead (and the failure is logged): the write that
 * follows still has the database's own checks behind it.
 */
export async function allowFormSubmission(client: RpcClient, bucket: FormBucket, headers: HeaderSource): Promise<boolean> {
  const address = clientAddress(headers);
  if (isLocalAddress(address)) return true;
  try {
    const { data, error } = await client.rpc("take_form_rate_limit", { p_bucket: bucket, p_key: await addressKey(address!) });
    if (error) {
      console.error("form rate limit failed", { bucket, code: error.code, message: error.message });
      return true;
    }
    return data !== false;
  } catch (cause) {
    console.error("form rate limit failed", { bucket, message: cause instanceof Error ? cause.message : String(cause) });
    return true;
  }
}
