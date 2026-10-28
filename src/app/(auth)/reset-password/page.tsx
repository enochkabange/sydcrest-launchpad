import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { isRecoverySession } from "@/lib/password-reset";
import { ResetPasswordForm } from "./reset-password-form";
import { LinkExpired } from "./link-expired";

export const metadata: Metadata = { title: "Choose a new password" };

/**
 * The form only for the session a reset link signed in (see
 * isRecoverySession); anyone else is told the link has expired. Reads the
 * session, so it sits inside Suspense. The action checks again.
 */
async function ResetOrExpired() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims?.sub && isRecoverySession(data.claims) ? <ResetPasswordForm /> : <LinkExpired />;
}

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-title text-content">Choose a new password</h1>
      <Suspense fallback={<div aria-busy="true" className="h-56 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <ResetOrExpired />
      </Suspense>
    </div>
  );
}
