"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteOrigin } from "@/lib/site-url";
import { parseSignIn, parseSignUp, type FieldErrors } from "@/lib/validation";

export type AuthState = {
  errors?: FieldErrors<"full_name" | "email" | "password">;
  message?: string;
  sentTo?: string;
  values?: { full_name?: string; email?: string };
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
  redirect("/dashboard");
}

export async function signUp(_prev: AuthState, form: FormData): Promise<AuthState> {
  const { data, errors } = parseSignUp(form);
  const values = { full_name: data.fullName, email: data.email };
  if (Object.keys(errors).length) return { errors, values };

  const supabase = await createClient();
  const { data: result, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      // Same key Google uses, so the profile trigger reads one field for both.
      data: { full_name: data.fullName },
      emailRedirectTo: `${await siteOrigin()}/auth/callback?next=/dashboard`,
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
  if (result.session) redirect("/dashboard");
  return { sentTo: data.email };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${await siteOrigin()}/auth/callback?next=/dashboard` },
  });
  if (error || !data.url) redirect("/login?error=google");
  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
