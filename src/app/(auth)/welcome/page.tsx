import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasDateOfBirth } from "@/lib/consent";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../actions";
import { Button } from "@/components/ui/button";
import { WelcomeForm } from "./welcome-form";

export const metadata: Metadata = { title: "One more step" };

/** Reads the session, so it streams in behind Suspense. */
async function WelcomeGate() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.isSetUp) redirect("/dashboard");
  const askConsent = !user.hasAgeAndConsent;
  // A date of birth on file cannot change, so someone re-agreeing is not asked again (#251).
  const { data } = await (await createClient()).auth.getClaims();
  return (
    <>
      <p className="text-content-2">
        {askConsent
          ? "Before you start, confirm your age and agree to our terms. SydCrest accounts are for people aged 18 and over."
          : "Add your phone number to keep using SydCrest. Every account needs one."}
      </p>
      <WelcomeForm
        askConsent={askConsent}
        askDateOfBirth={askConsent && !hasDateOfBirth(data?.claims?.user_metadata)}
        askPhone={!user.hasPhone}
      />
    </>
  );
}

/**
 * First stop for Google sign ups (Google shares no date of birth), for
 * anyone whose account predates the age check, and for accounts without a
 * phone number (#285). Asks only for what is missing.
 */
export default function WelcomePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-title text-content">One more step</h1>
      <Suspense fallback={<div className="h-56 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <div className="flex flex-col gap-6">
          <WelcomeGate />
        </div>
      </Suspense>
      <form action={signOut}>
        <Button type="submit" variant="ghost" className="px-0">
          Sign out instead
        </Button>
      </form>
    </div>
  );
}
