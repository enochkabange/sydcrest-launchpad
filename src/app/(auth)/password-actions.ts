"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteOrigin } from "@/lib/site-url";
import { parseNewPassword, parseResetRequest, type FieldErrors } from "@/lib/validation";
import { allowFormSubmission, FORM_RATE_LIMIT_MESSAGE } from "@/lib/rate-limit";
import { track, trackRefusal } from "@/lib/analytics/track";
import {
  isRecoverySession,
  PASSWORD_CHANGED_NOTICE,
  RESET_PASSWORD_PATH,
  RESET_SENT_MESSAGE,
} from "@/lib/password-reset";

export type ResetRequestState = {
  errors?: FieldErrors<"email">;
  /** A problem with the request itself (the form limit). */
  message?: string;
  /** The neutral confirmation, the same for every address. */
  sent?: string;
  values?: { email?: string };
};

/**
 * Sends a reset link. Every valid request gets the same answer, whether or
 * not an account uses the address (Supabase also answers unknown addresses
 * as if it had sent one), so the form cannot be used to find out who has an
 * account. Supabase errors, its own email limits included, get that answer
 * too: its per address limit only trips for real accounts, so saying so
 * would give them away. Only our limit, which counts the visitor's
 * connection rather than the address typed, says to wait.
 */
export async function requestPasswordReset(_prev: ResetRequestState, form: FormData): Promise<ResetRequestState> {
  const { data, errors } = parseResetRequest(form);
  if (Object.keys(errors).length) return { errors, values: { email: data.email } };

  const supabase = await createClient();
  if (!(await allowFormSubmission(supabase, "password_reset", await headers()))) {
    await trackRefusal("password_reset_requested", "rate_limited");
    return { message: FORM_RATE_LIMIT_MESSAGE, values: { email: data.email } };
  }
  const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${await siteOrigin()}/auth/callback?next=${encodeURIComponent(RESET_PASSWORD_PATH)}`,
  });
  if (error) {
    // Logged without the address so Vercel logs say why, never who.
    console.error("resetPasswordForEmail failed", { code: error.code, status: error.status, message: error.message });
  }
  await track("password_reset_requested");
  return { sent: RESET_SENT_MESSAGE };
}

export type NewPasswordState = {
  errors?: FieldErrors<"password" | "confirm_password">;
  message?: string;
  /** The reset session has gone (expired or signed out): show the expired state. */
  expired?: boolean;
};

/** Saves the new password for the session a reset link signed in, then goes to the dashboard. */
export async function updatePassword(_prev: NewPasswordState, form: FormData): Promise<NewPasswordState> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims?.sub || !isRecoverySession(auth.claims)) return { expired: true };

  const { data, errors } = parseNewPassword(form);
  if (Object.keys(errors).length) return { errors };

  const { error } = await supabase.auth.updateUser({ password: data.password });
  if (error) {
    console.error("updatePassword failed", { code: error.code, status: error.status, message: error.message });
    await trackRefusal("password_updated", error.code === "weak_password" || error.code === "same_password" ? "validation" : "server_error", error.code);
    if (error.code === "weak_password") return { errors: { password: "Choose a stronger password." } };
    if (error.code === "same_password") {
      return { errors: { password: "That is your current password. Choose a new one." } };
    }
    if (error.code === "session_not_found" || error.status === 401) return { expired: true };
    return { message: "We couldn't save your new password. Try again." };
  }
  await track("password_updated");
  redirect(`/dashboard?notice=${PASSWORD_CHANGED_NOTICE}`);
}
