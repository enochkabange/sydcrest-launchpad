import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/validation";
import { RESET_PASSWORD_PATH } from "@/lib/password-reset";

/**
 * Lands Google sign in (PKCE code exchange). Our auth emails link to
 * /auth/confirm instead (supabase/templates); this route still lands any
 * email sent with Supabase's default template, whose link verifies on
 * Supabase and then comes back here with a code. `next` is only ever a local
 * path (safeNextPath). A reset link that no longer works goes back to the
 * forgot password form.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }
  const retry = next === RESET_PASSWORD_PATH ? "/forgot-password" : "/login";
  return NextResponse.redirect(`${origin}${retry}?error=link`);
}
