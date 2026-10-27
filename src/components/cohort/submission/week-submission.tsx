import type { ReactNode } from "react";
import { requireUser } from "@/lib/auth";
import { isAiReviewConfigured } from "@/lib/submissions/server";
import { getMyLearnerMembership, getMySubmission, getRubric, getWeek } from "@/lib/submissions/queries";
import { AiFeedbackPanel, MentorFeedbackPanel, aiReviewState } from "./feedback-panels";
import { PortfolioToggle } from "./portfolio-toggle";
import { ReviewRefresher } from "./review-refresher";
import { SubmissionStatusBadge } from "./status-badge";
import { SubmissionForm } from "./submission-form";
import { RubricSummary, SubmittedWork } from "./submitted-work";

/**
 * Everything a learner does with one week's assignment: write or attach the
 * work, see the AI and mentor feedback, submit again, and add graded work to
 * their portfolio. Mount it in the week page's #submit slot inside
 * <Suspense> (it reads the session):
 *
 *   <section id="submit"><Suspense fallback={<SubmissionSkeleton />}><WeekSubmission weekId={week.id} /></Suspense></section>
 *
 * weekId is the learner's own program_weeks row for that week number (their
 * specialization's row where one exists, else the shared row).
 */
export async function WeekSubmission({ weekId, headingId = "your-work-heading" }: { weekId: string; headingId?: string }) {
  const user = await requireUser();
  const week = await getWeek(weekId);
  if (!week) {
    return (
      <EmptyCard title="This week is not open">
        We couldn&apos;t find this week&apos;s assignment. Go back to your cohort and choose the week again.
      </EmptyCard>
    );
  }
  const [rubric, submission, membership] = await Promise.all([
    getRubric(week.programId, week.id),
    getMySubmission(user.id, week.id),
    getMyLearnerMembership(user.id, week.programId),
  ]);

  if (!membership && !submission) {
    return (
      <EmptyCard title="Submissions open when you join a cohort">
        Once you are an active learner in {week.programTitle || "this programme"}, you can send your work for this week here
        and get feedback from AI and your mentor.
      </EmptyCard>
    );
  }

  const status = submission?.status ?? null;
  const state = aiReviewState({
    status,
    hasText: Boolean(submission?.bodyText),
    feedback: submission?.aiFeedback ?? null,
    configured: isAiReviewConfigured(),
    submittedAt: submission?.submittedAt ?? null,
  });
  const graded = status === "graded";
  const canEdit = !graded && Boolean(membership);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 id={headingId} className="text-subtitle text-content">
          Your work
        </h2>
        <SubmissionStatusBadge status={status} />
        {submission && submission.attempt > 1 && (
          <span className="text-sm text-content-3">Attempt {submission.attempt}</span>
        )}
        {submission?.submittedAt && (
          <span className="text-sm text-content-3">
            Sent <time dateTime={submission.submittedAt}>{formatDate(submission.submittedAt)}</time>
          </span>
        )}
      </header>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22.5rem] xl:gap-12">
        <div className="flex min-w-0 flex-col gap-6">
          {/* Feedback first on phones, where it is what the learner came back for. */}
          <div className="flex flex-col gap-4 lg:hidden">
            <MentorFeedbackPanel
              status={status}
              finalScore={submission?.finalScore ?? null}
              feedback={submission?.mentorFeedback ?? null}
              passScore={week.passScore}
            />
            <AiFeedbackPanel state={state} feedback={submission?.aiFeedback ?? null} score={submission?.aiScore ?? null} rubric={rubric} />
          </div>

          {canEdit ? (
            <SubmissionForm
              weekId={week.id}
              profileId={user.id}
              status={status}
              bodyText={submission?.bodyText ?? null}
              linkUrl={submission?.linkUrl ?? null}
              filePath={submission?.filePath ?? null}
            />
          ) : submission ? (
            <SubmittedWork
              bodyText={submission.bodyText}
              linkUrl={submission.linkUrl}
              filePath={submission.filePath}
              fileUrl={submission.fileUrl}
            />
          ) : null}

          {graded && submission && (
            <section aria-labelledby="portfolio-heading" className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 lg:p-5">
              <h3 id="portfolio-heading" className="text-h3 text-content">
                Portfolio
              </h3>
              <PortfolioToggle submissionId={submission.id} inPortfolio={submission.inPortfolio} />
            </section>
          )}
        </div>

        <aside aria-label="Feedback and marking" className="flex min-w-0 flex-col gap-4">
          <div className="hidden flex-col gap-4 lg:flex">
            <MentorFeedbackPanel
              status={status}
              finalScore={submission?.finalScore ?? null}
              feedback={submission?.mentorFeedback ?? null}
              passScore={week.passScore}
            />
            <AiFeedbackPanel state={state} feedback={submission?.aiFeedback ?? null} score={submission?.aiScore ?? null} rubric={rubric} />
          </div>
          {rubric && <RubricSummary rubric={rubric} />}
        </aside>
      </div>

      {state === "pending" && submission && <ReviewRefresher attempt={submission.attempt} />}
    </div>
  );
}

/** Same footprint as the loaded section, for the Suspense fallback. */
export function SubmissionSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="h-9 w-48 animate-skeleton rounded-md bg-surface-sunken" />
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22.5rem] xl:gap-12">
        <div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />
        <div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />
      </div>
    </div>
  );
}

function EmptyCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-dashed border-line-strong bg-surface-sunken p-6 lg:p-8">
      <h2 className="text-subtitle text-content">{title}</h2>
      <p className="max-w-reading text-content-2">{children}</p>
    </div>
  );
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Accra",
  }).format(new Date(iso));
}
