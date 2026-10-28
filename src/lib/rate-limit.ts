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
 * - Failed sign ins (issue #225) are counted per visitor address and per
 *   visitor address and email pair (supabase/migrations/20261029130000_sign_in_limit.sql),
 *   checked before Supabase is asked and recorded only when it refuses.
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

/**
 * Shown when sign in is refused for too many failures. It reads the same
 * whether or not the email has an account.
 */
export const SIGN_IN_LIMIT_MESSAGE =
  "Too many attempts. Please wait a few minutes and try again, or reset your password.";

export type FormBucket = "waitlist" | "sign_up" | "password_reset" | "beacon";

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

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** A sha256 of the address, the only form of it the database sees. */
export function addressKey(address: string): Promise<string> {
  return sha256Hex(`sydcrest-rate-limit:${address.toLowerCase()}`);
}

/**
 * A sha256 of the address and the email together: one visitor trying one
 * account. With the address inside, failures from elsewhere never count
 * against the account's owner.
 */
export function signInPairKey(address: string, email: string): Promise<string> {
  return sha256Hex(`sydcrest-sign-in:${address.toLowerCase()}|${email.trim().toLowerCase()}`);
}

type RpcResult<T> = PromiseLike<{ data: T | null; error: { code?: string; message: string } | null }>;
type SignInKeys = { p_address_key: string; p_pair_key: string };

type RpcClient = {
  rpc(fn: "take_form_rate_limit", args: { p_bucket: FormBucket; p_key: string }): RpcResult<boolean>;
};

type SignInRpcClient = {
  rpc(fn: "sign_in_allowed", args: SignInKeys): RpcResult<boolean>;
  rpc(fn: "record_sign_in_failure", args: SignInKeys): RpcResult<unknown>;
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

async function signInKeys(headers: HeaderSource, email: string): Promise<SignInKeys | null> {
  const address = clientAddress(headers);
  if (isLocalAddress(address)) return null;
  return { p_address_key: await addressKey(address!), p_pair_key: await signInPairKey(address!, email) };
}

/**
 * Whether this visitor may try to sign in with this email, asked before
 * Supabase is. Local runs are not limited. If the limiter fails the attempt
 * goes ahead (logged without the email): Supabase Auth's own limits remain.
 */
export async function allowSignIn(client: SignInRpcClient, headers: HeaderSource, email: string): Promise<boolean> {
  try {
    const keys = await signInKeys(headers, email);
    if (!keys) return true;
    const { data, error } = await client.rpc("sign_in_allowed", keys);
    if (error) {
      console.error("sign in limit failed", { code: error.code, message: error.message });
      return true;
    }
    return data !== false;
  } catch (cause) {
    console.error("sign in limit failed", { message: cause instanceof Error ? cause.message : String(cause) });
    return true;
  }
}

/** Counts one failed sign in for this visitor and this visitor with this email. */
export async function recordSignInFailure(client: SignInRpcClient, headers: HeaderSource, email: string): Promise<void> {
  try {
    const keys = await signInKeys(headers, email);
    if (!keys) return;
    const { error } = await client.rpc("record_sign_in_failure", keys);
    if (error) console.error("sign in failure not recorded", { code: error.code, message: error.message });
  } catch (cause) {
    console.error("sign in failure not recorded", { message: cause instanceof Error ? cause.message : String(cause) });
  }
}
