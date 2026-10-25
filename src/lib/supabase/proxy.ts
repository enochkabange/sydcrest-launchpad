import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasAgeAndConsent } from "@/lib/legal";

/**
 * Refreshes the Supabase session on every request so Server Components always
 * see a valid token. This is the only place auth cookies get rewritten.
 * The signed-out redirect below is only an early exit so the app shell never
 * flashes for visitors; pages still authorize through lib/auth.ts.
 * Signed in users without a date of birth and terms consent in their metadata
 * (Google sign ups, first visit) are sent to /welcome the same way.
 */
const PROTECTED = ["/dashboard", "/profile", "/learn"];
const SIGNED_IN_ONLY = [...PROTECTED, "/welcome"];

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
  const redirectTo = (pathname: string) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    url.search = "";
    const redirect = NextResponse.redirect(url);
    // Carry over any cookies getClaims just set or cleared, or the stale session sticks.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  };

  const claims = data?.claims;
  if (!claims && matches(path, SIGNED_IN_ONLY)) return redirectTo("/login");
  if (claims && matches(path, PROTECTED) && !hasAgeAndConsent(claims.user_metadata)) {
    return redirectTo("/welcome");
  }

  return response;
}
