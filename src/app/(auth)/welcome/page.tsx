import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "../actions";
import { Button } from "@/components/ui/button";
import { WelcomeForm } from "./welcome-form";

export const metadata: Metadata = { title: "One more step" };

/** Reads the session, so it streams in behind Suspense. */
async function WelcomeGate() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.hasAgeAndConsent) redirect("/dashboard");
  return <WelcomeForm />;
}

/**
 * First stop for Google sign ups (Google shares no date of birth), and for
 * anyone whose account predates the age check.
 */
export default function WelcomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">One more step</h1>
        <p className="text-content-2">
          Before you start, tell us your date of birth and agree to our terms. SydCrest accounts are
          for people aged 18 and over.
        </p>
      </div>
      <Suspense fallback={<div className="h-56 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <WelcomeGate />
      </Suspense>
      <form action={signOut}>
        <Button type="submit" variant="ghost" className="px-0">
          Sign out instead
        </Button>
      </form>
    </div>
  );
}
