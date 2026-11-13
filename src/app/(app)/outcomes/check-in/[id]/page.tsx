import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { requireUser } from "@/lib/auth";
import { checkinSkillOptions } from "@/lib/outcomes/checkin-options";
import { formatDay } from "@/lib/outcomes/labels";
import { createClient } from "@/lib/supabase/server";
import { answerCheckin } from "./actions";
import { CheckinForm } from "./checkin-form";

export const metadata: Metadata = { title: "Check in", robots: { index: false } };

async function Checkin({ params }: Pick<PageProps<"/outcomes/check-in/[id]">, "params">) {
  const { id } = await params;
  const user = await requireUser();
  const supabase = await createClient();
  const { data: checkin } = await supabase
    .from("outcome_checkins")
    .select("id, months, finished_on, answered_at, work_status, organisation, earnings_band, skills, share_in_reports, roadmap_id, cohorts(name, programs(title)), roadmaps(title)")
    .eq("id", id)
    .eq("profile_id", user.id)
    .maybeSingle();
  if (!checkin) notFound();

  const what = checkin.cohorts
    ? `${checkin.cohorts.programs?.title ?? "your programme"} (${checkin.cohorts.name})`
    : (checkin.roadmaps?.title ?? "your track");
  const skillOptions = await checkinSkillOptions(supabase, user.id, checkin.roadmap_id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Your {checkin.months} month check in</h1>
        <p className="text-lead text-content-2">
          You finished {what} on {formatDay(checkin.finished_on)}. How are things going?
        </p>
        {checkin.answered_at && (
          <p className="text-sm text-content-2">You answered on {formatDay(checkin.answered_at.slice(0, 10))}. You can change your answers.</p>
        )}
      </div>
      <CheckinForm action={answerCheckin.bind(null, checkin.id)} initial={checkin} skillOptions={skillOptions} />
    </div>
  );
}

function WhyWeAsk() {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
      <h2 className="text-h3 text-content">Why we ask</h2>
      <p className="text-sm text-content-2">
        We check in 3, 6 and 12 months after you finish, to learn what helps people into work and to show sponsors what their
        support made possible. Only the first question is needed.
      </p>
      <p className="text-sm text-content-2">
        Our team can read your answers. Sponsors only ever see totals, and only from learners who agree to be counted.
      </p>
      <Link href="/privacy#outcome-check-ins" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link hover:underline">
        How we use check ins
      </Link>
    </section>
  );
}

export default function CheckinPage({ params }: PageProps<"/outcomes/check-in/[id]">) {
  return (
    <MainWithRail railLabel="Why we ask" rail={<WhyWeAsk />}>
      <div className="flex max-w-2xl flex-col gap-6">
        <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Checkin params={params} />
        </Suspense>
      </div>
    </MainWithRail>
  );
}
