"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteOrigin } from "@/lib/site-url";
import { parseAgeAndConsent, parseSignIn, parseSignUp, safeNextPath, type FieldErrors } from "@/lib/validation";
import { UNDER_AGE_MESSAGE } from "@/lib/legal";

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
  if (Object.keys(errors).length) return { errors, values: { email: data.email } };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    const message =
      error.code === "email_not_confirmed"
        ? "Confirm your email first. Check your inbox for the link we sent."
        : "That email and password don't match an account.";
    return { message, values: { email: data.email } };
  }
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
  if (Object.keys(errors).length) return { errors, values };

  const supabase = await createClient();
  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      // full_name: same key Google uses, so the profile trigger reads one field for both.
      // date_of_birth and terms_version move to the consents table in Wave 2.
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
    const message =
      error.code === "weak_password"
        ? "Choose a stronger password."
        : error.code === "over_email_send_rate_limit"
          ? "Too many sign ups just now. Try again in a few minutes."
          : "We couldn't create your account. Try again.";
    return { message, values };
  }
  // Email confirmation turned off: the user is signed in already.
  if (result.session) redirect(nextFrom(form));
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
    return { message: "We couldn't save that. Try again.", values: { date_of_birth: data.dateOfBirth } };
  }
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
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
