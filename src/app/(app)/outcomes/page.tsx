import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button, buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDay, isVerificationStatus, outcomeTypeLabel, STATUS_LABELS, STATUS_TONES } from "@/lib/outcomes/labels";
import { deleteOutcome } from "./actions";

export const metadata: Metadata = { title: "Your outcomes" };

const NOTICES = {
  reported: "Thanks. Your outcome is in. Our team will check the evidence and let it count once it is verified.",
  updated: "Saved. Your outcome is back with our team for review.",
  deleted: "Outcome removed.",
} as const;

async function Notice({ searchParams }: Pick<PageProps<"/outcomes">, "searchParams">) {
  const params = await searchParams;
  const key = (Object.keys(NOTICES) as (keyof typeof NOTICES)[]).find((k) => params[k]);
  return key ? <Alert tone="success">{NOTICES[key]}</Alert> : null;
}

async function OutcomeList() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("outcomes")
    .select("id, type, title, organisation_name, started_on, verification_status, verification_note, created_at")
    .eq("profile_id", user.id)
    .order("started_on", { ascending: false });
  if (error) throw new Error(`Could not load your outcomes: ${error.message}`);
  const outcomes = data ?? [];

  if (!outcomes.length) {
    return (
      <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:p-6">
        <div className="flex max-w-reading flex-col gap-2">
          <h2 className="text-h3 text-content">Nothing reported yet</h2>
          <p className="text-content-2">
            When you land a job, an internship, a freelance contract, a scholarship or a grant, report it here. It helps us show
            what SydCrest learners go on to do, and it helps the next learner believe they can too.
          </p>
        </div>
        <Link href="/outcomes/new" className={buttonClasses("primary", "shrink-0")}>
          Report an outcome
        </Link>
      </section>
    );
  }

  return (
    <ul className="flex flex-col gap-3 xl:gap-4" aria-label="Your reported outcomes">
      {outcomes.map((o) => {
        const status = isVerificationStatus(o.verification_status) ? o.verification_status : "pending";
        return (
          <li key={o.id} className="flex flex-col gap-3 rounded-lg border border-line p-4 md:p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-xs font-bold tracking-widest text-content-3 uppercase">{outcomeTypeLabel(o.type)}</p>
                <h2 className="text-h3 text-content">
                  {o.title ? `${o.title}, ${o.organisation_name}` : o.organisation_name}
                </h2>
                <p className="text-sm text-content-2">Started {formatDay(o.started_on)}</p>
              </div>
              <span className={`self-start rounded-full border px-2.5 py-0.5 text-sm font-semibold whitespace-nowrap ${STATUS_TONES[status]}`}>
                {STATUS_LABELS[status]}
              </span>
            </div>
            {status === "rejected" && (
              <div className="rounded-md bg-surface-sunken p-3 text-sm text-content-2">
                <p className="font-semibold text-content">What our team said</p>
                <p className="mt-1 whitespace-pre-line">
                  {o.verification_note ?? "We could not confirm this from the evidence. Add more and it goes back for review."}
                </p>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {status !== "verified" && (
                <Link href={`/outcomes/${o.id}/edit`} className={buttonClasses("secondary")}>
                  {status === "rejected" ? "Add evidence" : "Edit"}
                </Link>
              )}
              <details className="group">
                <summary className={`${buttonClasses("ghost")} cursor-pointer list-none`}>Remove</summary>
                <form action={deleteOutcome.bind(null, o.id)} className="mt-2 flex flex-wrap items-center gap-2 rounded-md border border-line p-3">
                  <p className="text-sm text-content-2">
                    {status === "verified" ? "Remove it? It will also leave our published counts." : "Remove this outcome?"}
                  </p>
                  <Button type="submit" variant="secondary">
                    Yes, remove it
                  </Button>
                </form>
              </details>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function HowItWorks() {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
      <h2 className="text-h3 text-content">How verification works</h2>
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-content-2">
        <li>You report the outcome with a link or a note we can check.</li>
        <li>Someone on our team checks it, usually by looking at the evidence or contacting the organisation.</li>
        <li>Once verified, it counts toward the numbers on our public impact page. We publish counts only, never your name.</li>
      </ol>
      <p className="text-sm text-content-2">
        A verified outcome is final and can no longer be edited. If our team needs more, you will see a note here and can add
        evidence.
      </p>
      <Link href="/impact" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link hover:underline">
        See our impact page
      </Link>
    </section>
  );
}

/**
 * A learner's own outcomes: report, edit while not verified, remove. Main
 * column holds the list; from lg the rail explains verification (on phones
 * it follows the list).
 */
export default function OutcomesPage({ searchParams }: PageProps<"/outcomes">) {
  return (
    <MainWithRail railLabel="About verification" rail={<HowItWorks />}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-title text-content">Your outcomes</h1>
            <p className="max-w-reading text-lead text-content-2">
              The jobs, internships, contracts, scholarships and grants you have landed.
            </p>
          </div>
          <Link href="/outcomes/new" className={buttonClasses("primary", "self-start md:self-auto")}>
            Report an outcome
          </Link>
        </div>
        <Suspense fallback={null}>
          <Notice searchParams={searchParams} />
        </Suspense>
      </div>
      <Suspense fallback={<div className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <OutcomeList />
      </Suspense>
    </MainWithRail>
  );
}
