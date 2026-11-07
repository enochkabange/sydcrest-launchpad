import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RECOVERY_COOKIE, RECOVERY_COOKIE_MAX_AGE, RESET_PASSWORD_PATH } from "@/lib/password-reset";
import { confirmNextPath, isEmailOtpType } from "@/lib/auth-confirm";

/**
 * Lands the links in our auth emails (supabase/templates). The email links
 * to our own site, not to Supabase, so the link's domain matches the sender
 * and mail providers do not flag it. `verifyOtp` checks the token hash and
 * signs the visitor in, then `next` (only ever a local path) decides where
 * they land. Google sign in still returns through /auth/callback.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const rawType = searchParams.get("type");
  const type: EmailOtpType | null = isEmailOtpType(rawType) ? rawType : null;
  const recovery = type === "recovery";

  if (tokenHash && type) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      const next = confirmNextPath(searchParams.get("next"), recovery ? RESET_PASSWORD_PATH : "/dashboard");
      const response = NextResponse.redirect(`${origin}${next}`);
      if (recovery) await markRecoverySession(supabase, data.session?.access_token, response, origin);
      return response;
    }
    console.error("verifyOtp failed", { type, code: error.code, status: error.status });
  }
  return NextResponse.redirect(`${origin}${recovery ? "/forgot-password" : "/login"}?error=link`);
}

/**
 * The session verifyOtp makes records "otp" in `amr` for every email link,
 * so a reset session is told apart by this cookie holding its id
 * (isRecoverySession). Without the id the reset page says the link expired.
 */
async function markRecoverySession(
  supabase: Awaited<ReturnType<typeof createClient>>,
  accessToken: string | undefined,
  response: NextResponse,
  origin: string,
) {
  if (!accessToken) return;
  const { data } = await supabase.auth.getClaims(accessToken);
  const sessionId = data?.claims?.session_id;
  if (typeof sessionId !== "string") return;
  response.cookies.set(RECOVERY_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.startsWith("https://"),
    path: "/",
    maxAge: RECOVERY_COOKIE_MAX_AGE,
  });
}
