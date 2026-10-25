import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasAgeAndConsent } from "@/lib/legal";
import {
  ANONYMOUS_ID_COOKIE,
  ANONYMOUS_ID_COOKIE_OPTIONS,
  isAnonymousId,
  newAnonymousId,
} from "@/lib/analytics/anonymous-id";

/**
 * Refreshes the Supabase session on every request so Server Components always
 * see a valid token. This is the only place auth cookies get rewritten.
 * The signed-out redirect below is only an early exit so the app shell never
 * flashes for visitors; pages still authorize through lib/auth.ts.
 * Signed in users without a date of birth and terms consent in their metadata
 * (Google sign ups, first visit) are sent to /welcome the same way. This is
 * the cheap metadata fallback; lib/auth.ts makes the authoritative check
 * against the consents table.
 * Signed out visitors get a random first party anonymous id cookie for the
 * analytics funnel (lib/analytics); nothing personal, no third parties.
 */
const PROTECTED = ["/dashboard", "/profile"];
const SIGNED_IN_ONLY = [...PROTECTED, "/welcome"];
/**
 * The path quiz result: signed out visitors arrive from the quiz, so they go
 * to sign up (not sign in) and come back here afterwards.
 */
const PATH_RESULT = "/path";

function matches(path: string, prefixes: string[]) {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
        },
      },
    },
  );

  // Nothing may run between createServerClient and getClaims, or users get
  // randomly logged out (Supabase SSR guidance).
  const { data } = await supabase.auth.getClaims();

  const path = request.nextUrl.pathname;
  const redirectTo = (pathname: string, search = "") => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    url.search = search;
    const redirect = NextResponse.redirect(url);
    // Carry over any cookies getClaims just set or cleared, or the stale session sticks.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  };

  const claims = data?.claims;
  if (path === PATH_RESULT) {
    if (!claims) return redirectTo("/signup", `?next=${PATH_RESULT}`);
    if (!hasAgeAndConsent(claims.user_metadata)) return redirectTo("/welcome", `?next=${PATH_RESULT}`);
  }
  if (!claims && matches(path, SIGNED_IN_ONLY)) return redirectTo("/login");

  // Set after getClaims: the setAll above replaces `response`.
  if (!claims && !isAnonymousId(request.cookies.get(ANONYMOUS_ID_COOKIE)?.value)) {
    const id = newAnonymousId();
    response.cookies.set(ANONYMOUS_ID_COOKIE, id, ANONYMOUS_ID_COOKIE_OPTIONS);
  }
  if (claims && matches(path, PROTECTED) && !hasAgeAndConsent(claims.user_metadata)) {
    return redirectTo("/welcome");
  }

  return response;
}
