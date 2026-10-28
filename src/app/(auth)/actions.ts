"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteOrigin } from "@/lib/site-url";
import { parseAgeAndConsent, parseSignIn, parseSignUp, safeNextPath, type FieldErrors } from "@/lib/validation";
import { UNDER_AGE_MESSAGE } from "@/lib/legal";
import { track, trackRefusal } from "@/lib/analytics/track";
import { recordLegalConsent } from "@/lib/consent-records";
import { allowFormSubmission, allowSignIn, FORM_RATE_LIMIT_MESSAGE, recordSignInFailure, SIGN_IN_LIMIT_MESSAGE } from "@/lib/rate-limit";

/** Where to go after auth: the form's `next` field, checked to be a local path. */
function nextFrom(form: FormData | undefined) {
  const next = form?.get("next");
  return safeNextPath(typeof next === "string" ? next : null);
}

export type AuthState = {
  errors?: FieldErrors<"full_name" | "email" | "password" | "date_of_birth" | "terms">;
  message?: string;
  sentTo?: string;
  values?: { full_name?: string; email?: string; date_of_birth?: string; terms?: boolean };
};

export async function signIn(_prev: AuthState, form: FormData): Promise<AuthState> {
  const { data, errors } = parseSignIn(form);
  if (Object.keys(errors).length) {
    await trackRefusal("sign_in", "validation");
    return { errors, values: { email: data.email } };
  }

  const supabase = await createClient();
  // Supabase Auth sees this server's address for every visitor, so its per
  // address limit cannot slow one visitor down: failed sign ins are counted
  // here, per visitor and per visitor with this email (issue #225).
  const requestHeaders = await headers();
  if (!(await allowSignIn(supabase, requestHeaders, data.email))) {
    await trackRefusal("sign_in", "rate_limited");
    return { message: SIGN_IN_LIMIT_MESSAGE, values: { email: data.email } };
  }
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    // Every refusal counts, an unknown email included, so the limit itself
    // never tells whether an account exists.
    await recordSignInFailure(supabase, requestHeaders, data.email);
    await trackRefusal("sign_in", "validation", error.code);
    const message =
      error.code === "email_not_confirmed"
        ? "Confirm your email first. Check your inbox for the link we sent."
        : "That email and password don't match an account.";
    return { message, values: { email: data.email } };
  }
  await track("sign_in", { method: "email" });
  redirect(nextFrom(form));
}

export async function signUp(_prev: AuthState, form: FormData): Promise<AuthState> {
  const { data, errors } = parseSignUp(form);
  const values = {
    full_name: data.fullName,
    email: data.email,
    date_of_birth: data.dateOfBirth,
    terms: form.get("terms") === "on",
  };
  if (Object.keys(errors).length) {
    await trackRefusal("signup", "validation");
    return { errors, values };
  }

  const supabase = await createClient();
  // Supabase Auth limits sign ups per address too, but it sees this server's
  // address for every visitor, so the per visitor limit is ours.
  if (!(await allowFormSubmission(supabase, "sign_up", await headers()))) {
    await trackRefusal("signup", "rate_limited");
    return { message: FORM_RATE_LIMIT_MESSAGE, values };
  }
  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      // full_name: same key Google uses, so the profile trigger reads one field for both.
      // terms_version waits here until there is a session: it is copied into
      // the consents table on the first signed in request (lib/consent-records).
      data: {
        full_name: data.fullName,
        date_of_birth: data.dateOfBirth,
        terms_version: data.termsVersion,
        terms_accepted_at: new Date().toISOString(),
      },
      emailRedirectTo: `${await siteOrigin()}/auth/callback?next=${encodeURIComponent(nextFrom(form))}`,
    },
  });
  if (error) {
    // Shown to the user only as a generic message; logged so Vercel logs say why.
    console.error("signUp failed", { code: error.code, status: error.status, message: error.message });
    const refusal =
      error.code === "weak_password" ? "validation" : error.code === "over_email_send_rate_limit" ? "rate_limited" : "server_error";
    await trackRefusal("signup", refusal, error.code);
    const message =
      error.code === "weak_password"
        ? "Choose a stronger password."
        : error.code === "over_email_send_rate_limit"
          ? "Too many sign ups just now. Try again in a few minutes."
          : "We couldn't create your account. Try again.";
    return { message, values };
  }
  // Signed in already only when email confirmation is off. Until then the
  // request is anonymous: the event carries just the visitor cookie, and
  // the consent rows are written on the first signed in request.
  const signedIn = Boolean(result.session && result.user);
  if (signedIn) await recordLegalConsent(supabase, data.termsVersion);
  await track("signup", { method: "email" });
  if (signedIn) redirect(nextFrom(form));
  return { sentTo: data.email };
}

/**
 * The /welcome step for people who signed up with Google, which shares no date
 * of birth. Under 18s are signed out without saving anything.
 */
export async function completeWelcome(_prev: AuthState, form: FormData): Promise<AuthState> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims?.sub) redirect("/login");

  const { data, errors } = parseAgeAndConsent(form);
  if (errors.date_of_birth === UNDER_AGE_MESSAGE) {
    await supabase.auth.signOut();
    redirect("/login?error=age");
  }
  if (Object.keys(errors).length) return { errors, values: { date_of_birth: data.dateOfBirth } };

  const { error } = await supabase.auth.updateUser({
    data: {
      date_of_birth: data.dateOfBirth,
      terms_version: data.termsVersion,
      terms_accepted_at: new Date().toISOString(),
    },
  });
  if (error) {
    console.error("completeWelcome failed", { code: error.code, status: error.status, message: error.message });
    await trackRefusal("welcome_completed", "server_error", error.code);
    return { message: "We couldn't save that. Try again.", values: { date_of_birth: data.dateOfBirth } };
  }
  await recordLegalConsent(supabase, data.termsVersion);
  // First time here without a date of birth means a new Google sign up
  // (not someone re-agreeing after revoking), so count it as their signup.
  const firstVisit = !(auth.claims.user_metadata as Record<string, unknown> | undefined)?.date_of_birth;
  if (firstVisit) await track("signup", { method: "google" });
  else await track("welcome_completed");
  // updateUser keeps the old access token, whose claims still lack the new
  // metadata. Refresh so the proxy and getClaims see it, or /dashboard
  // would bounce straight back here.
  await supabase.auth.refreshSession();
  redirect(nextFrom(form));
}

export async function signInWithGoogle(form?: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${await siteOrigin()}/auth/callback?next=${encodeURIComponent(nextFrom(form))}` },
  });
  if (error || !data.url) redirect("/login?error=google");
  redirect(data.url);
}

export async function signOut() {
  // Before signing out, so the event belongs to the session that ended.
  await track("sign_out");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
