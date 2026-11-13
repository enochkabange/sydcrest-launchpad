import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { requireUser } from "@/lib/auth";
import { fromRow } from "@/lib/learner-profile";
import { getPublishedRoadmaps } from "@/lib/roadmaps/public";
import { createClient } from "@/lib/supabase/server";
import { AboutForm } from "./about-form";

export const metadata: Metadata = { title: "About you" };

async function AboutDetails() {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data }, roadmaps] = await Promise.all([
    supabase.from("learner_profiles").select("*").eq("profile_id", user.id).maybeSingle(),
    getPublishedRoadmaps(),
  ]);
  const tracks = roadmaps.map((r) => ({ value: r.slug, label: r.title }));
  return <AboutForm profile={fromRow(data)} tracks={tracks} />;
}

/** Learner profile v2 (epic #320): optional questions that tailor learning and matching. */
export default function AboutPage() {
  return (
    <div className="flex max-w-md flex-col gap-6 lg:max-w-3xl">
      <div className="flex flex-col gap-2">
        <Link href="/profile" className="text-sm text-content-2">
          Back to profile
        </Link>
        <h1 className="text-title text-content">About you</h1>
        <p className="max-w-reading text-content-2">
          Every question is optional, and you can change or clear an answer at any time. Your answers shape your
          learning plan, reminders and the opportunities we suggest. They never affect your readiness score, and we
          never ask about gender, ethnicity, religion, health or marital status.{" "}
          <Link href="/privacy#learner-profile">How we use your answers</Link>.
        </p>
      </div>
      <Suspense fallback={<div className="h-[60rem] animate-skeleton rounded-lg bg-surface-sunken" />}>
        <AboutDetails />
      </Suspense>
    </div>
  );
}
