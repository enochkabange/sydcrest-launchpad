import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics/track";
import { getCurrentUser } from "@/lib/auth";
import { readAnswersCookie } from "@/lib/path/cookie";
import { answersKey } from "@/lib/path/quiz";
import { latestSavedAnswers, resultFor } from "@/lib/path/server";
import { PathResultView, SavingPath } from "./path-result";
import { PathSync } from "./path-sync";

export const metadata: Metadata = { title: "Your path" };

/**
 * The quiz result. Signed out visitors are sent to sign up and come back
 * here; answers they gave before signing up are saved on arrival.
 */
async function PathContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/signup?next=/path");
  if (!user.hasAgeAndConsent) redirect("/welcome?next=/path");

  const [saved, pending] = await Promise.all([latestSavedAnswers(user.id), readAnswersCookie()]);
  const savedKey = saved ? answersKey(saved) : null;
  const hasPendingCookie = Boolean(pending && answersKey(pending) !== savedKey);

  let body;
  if (hasPendingCookie) body = <SavingPath />;
  else if (saved) {
    body = <PathResultView result={await resultFor(saved)} />;
    await track("path_viewed", {}, { profileId: user.id });
  }
  else body = <NoPathYet />;

  return (
    <PathSync savedKey={savedKey} hasPendingCookie={hasPendingCookie}>
      {body}
    </PathSync>
  );
}

function NoPathYet() {
  return (
    <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5">
      <h1 className="text-3xl text-content">Find your starting point</h1>
      <p className="text-content-2">
        Answer five quick questions and we will match you to a track, a starting point and a weekly
        plan that fits your time and data.
      </p>
      <Link href="/start" className={buttonClasses("primary")}>
        Take the quiz
      </Link>
    </section>
  );
}

export default function PathPage() {
  return (
    <Suspense fallback={<SavingPath label="Loading your path" />}>
      <PathContent />
    </Suspense>
  );
}
