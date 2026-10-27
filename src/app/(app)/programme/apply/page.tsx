import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDay, loadProgramme, loadUpcomingCohorts, type Programme } from "@/lib/programme-apply/data";
import { answeredQuestions, APPLY_PATH, DMP_SLUG, isOpen, statusCopy } from "@/lib/programme-apply/screening";
import { ApplicationForm, WithdrawButton } from "./application-form";

export const metadata: Metadata = { title: "Apply to the programme", robots: { index: false } };

const STATUS_TONE: Record<string, string> = {
  submitted: "bg-info-bg text-info-fg",
  waitlisted: "bg-info-bg text-info-fg",
  accepted: "bg-success-bg text-success-fg",
  declined: "bg-surface-sunken text-content-2",
  withdrawn: "bg-surface-sunken text-content-2",
};

function Skeleton({ className = "h-64" }: { className?: string }) {
  return <div className={`${className} animate-skeleton rounded-lg bg-surface-sunken`} />;
}

export default function ApplyPage() {
  return (
    <MainWithRail
      railLabel="About the programme"
      rail={
        <Suspense fallback={<Skeleton className="h-80" />}>
          <ProgrammeRail />
        </Suspense>
      }
    >
      <Suspense
        fallback={
          <>
            <Skeleton className="h-24" />
            <Skeleton className="h-96" />
          </>
        }
      >
        <ApplicationArea />
      </Suspense>
    </MainWithRail>
  );
}

/** Signed out visitors sign in and come straight back; Google sign ups finish /welcome first. */
async function requireApplicant() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(APPLY_PATH)}`);
  if (!user.hasAgeAndConsent) redirect(`/welcome?next=${encodeURIComponent(APPLY_PATH)}`);
  return user;
}

function Heading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: ReactNode }) {
  return (
    <header className="flex flex-col gap-2">
      <p className="text-xs font-bold tracking-widest text-content-3 uppercase">{eyebrow}</p>
      <h1 className="text-title text-content">{title}</h1>
      {lead && <div className="max-w-reading text-lead text-content-2">{lead}</div>}
    </header>
  );
}

async function ApplicationArea() {
  const user = await requireApplicant();
  const supabase = await createClient();
  const programme = await loadProgramme(supabase, DMP_SLUG);

  if (!programme?.is_published) {
    return (
      <>
        <Heading eyebrow="Programme" title="Applications are not open yet" />
        <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:p-8">
          <p className="max-w-reading text-content-2">
            We will open applications here when the next cohort is ready. Join the waitlist and we will tell you.
          </p>
          <Link href="/programme#waitlist" className={buttonClasses("primary")}>
            Join the waitlist
          </Link>
        </section>
      </>
    );
  }

  const [{ data: applications, error }, cohorts] = await Promise.all([
    supabase
      .from("cohort_applications")
      .select("id, status, specialization, screening_answers, decision_note, cohort_id, created_at, decided_at, cohorts!cohort_applications_cohort_id_fkey(name, starts_on)")
      .eq("program_id", programme.id)
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false }),
    loadUpcomingCohorts(supabase, programme.id),
  ]);
  if (error) throw new Error(`Could not load your application: ${error.message}`);

  const live = applications?.find((a) => isOpen(a.status) || a.status === "accepted");
  const latest = live ?? applications?.[0];

  if (live) {
    return (
      <>
        <Heading eyebrow={programme.title} title="Your application" />
        <StatusCard application={live} programme={programme} />
      </>
    );
  }

  return (
    <>
      <Heading
        eyebrow={programme.title}
        title={latest ? "Apply again" : `Apply to the ${programme.title}`}
        lead={
          <p>
            A few short questions so the team can get to know you. There are no wrong answers, and you can withdraw at
            any time.
          </p>
        }
      />
      {latest && <StatusCard application={latest} programme={programme} compact />}
      <section aria-labelledby="apply-form" className="rounded-lg border border-line bg-surface p-5 lg:p-8">
        <h2 id="apply-form" className="sr-only">
          Application form
        </h2>
        <div className="max-w-2xl">
          <ApplicationForm
            questions={programme.questions}
            specializations={programme.specializations}
            cohorts={cohorts.map((c) => ({ id: c.id, label: `${c.name}, starts ${formatDay(c.starts_on)}` }))}
          />
        </div>
      </section>
    </>
  );
}

type ApplicationRow = {
  id: string;
  status: string;
  specialization: string | null;
  screening_answers: unknown;
  decision_note: string | null;
  created_at: string;
  decided_at: string | null;
  cohorts: { name: string; starts_on: string } | null;
};

function StatusCard({
  application: a,
  programme,
  compact = false,
}: {
  application: ApplicationRow;
  programme: Programme;
  compact?: boolean;
}) {
  const { label, detail } = statusCopy(a.status);
  const answers = answeredQuestions(programme.questions, a.screening_answers);
  const specialization = programme.specializations.find((s) => s.slug === a.specialization)?.label;

  return (
    <section
      aria-labelledby="application-status"
      data-testid="application-status"
      className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5 lg:p-8"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex max-w-reading flex-col gap-2">
          <h2 id="application-status" className="text-subtitle text-content">
            {compact ? "Your last application" : "Status"}:{" "}
            <span className={`inline-block rounded-full px-3 py-0.5 align-middle text-base font-semibold ${STATUS_TONE[a.status] ?? ""}`}>
              {label}
            </span>
          </h2>
          <p className="text-content-2">{detail}</p>
          <p className="text-sm text-content-3">
            Sent on {formatDay(a.created_at)}
            {a.decided_at && `. Updated on ${formatDay(a.decided_at)}`}.
          </p>
        </div>
        {a.status === "accepted" && (
          <Link href="/cohort" className={buttonClasses("primary", "shrink-0")}>
            Go to your cohort
          </Link>
        )}
      </div>

      {a.status === "accepted" && a.cohorts && (
        <p className="rounded-md bg-success-bg px-4 py-3 text-success-fg">
          You are in <strong>{a.cohorts.name}</strong>, starting {formatDay(a.cohorts.starts_on)}.
        </p>
      )}

      {a.decision_note && (
        <div className="flex flex-col gap-1 rounded-md border border-line bg-surface-sunken px-4 py-3">
          <p className="text-sm font-semibold text-content">A note from the team</p>
          <p className="whitespace-pre-line text-content-2">{a.decision_note}</p>
        </div>
      )}

      {!compact && (answers.length > 0 || specialization) && (
        <details className="group rounded-md border border-line">
          <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-semibold text-content">
            Your answers
          </summary>
          <dl className="flex flex-col gap-4 border-t border-line px-4 py-4">
            {answers.map(({ prompt, answer }) => (
              <div key={prompt} className="flex flex-col gap-1">
                <dt className="text-sm text-content-3">{prompt}</dt>
                <dd className="whitespace-pre-line text-content">{answer}</dd>
              </div>
            ))}
            {specialization && (
              <div className="flex flex-col gap-1">
                <dt className="text-sm text-content-3">Specialisation you are leaning towards</dt>
                <dd className="text-content">{specialization}</dd>
              </div>
            )}
          </dl>
        </details>
      )}

      {isOpen(a.status) && (
        <div className="border-t border-line pt-5">
          <WithdrawButton applicationId={a.id} />
        </div>
      )}
    </section>
  );
}

/** Facts about the programme, all from the programme row and its cohorts. */
async function ProgrammeRail() {
  const supabase = await createClient();
  const programme = await loadProgramme(supabase, DMP_SLUG);
  if (!programme) return null;
  const cohorts = await loadUpcomingCohorts(supabase, programme.id);
  const next = cohorts[0];

  return (
    <>
      <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
        <h2 className="text-h3 text-content">{programme.title}</h2>
        <dl className="flex flex-col gap-3 text-sm">
          <div>
            <dt className="text-content-3">Length</dt>
            <dd className="text-content">{programme.duration_weeks} weeks, with a weekly assignment</dd>
          </div>
          {next && (
            <div>
              <dt className="text-content-3">Next cohort</dt>
              <dd className="text-content">
                {next.name}, starts {formatDay(next.starts_on)}
              </dd>
            </div>
          )}
          {programme.specializations.length > 0 && (
            <div>
              <dt className="text-content-3">Specialisations</dt>
              <dd className="text-content">{programme.specializations.map((s) => s.label).join(", ")}</dd>
            </div>
          )}
          {programme.eligibility && (
            <div>
              <dt className="text-content-3">Who can apply</dt>
              <dd className="text-content">{programme.eligibility}</dd>
            </div>
          )}
        </dl>
        <Link href="/programme" className="inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
          See the full curriculum
        </Link>
      </section>
      <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
        <h2 className="text-h3 text-content">What happens next</h2>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-content-2">
          <li>You send your answers. They stay private to you and the programme team.</li>
          <li>The team reviews applications and offers seats in a cohort.</li>
          <li>Once you are accepted, your cohort page opens with your weekly plan and your mentor.</li>
        </ol>
      </section>
    </>
  );
}
