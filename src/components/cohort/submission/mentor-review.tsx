import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { getSubmissionForStaff } from "@/lib/submissions/queries";
import { isAiReviewConfigured } from "@/lib/submissions/server";
import { AiFeedbackPanel, aiReviewState } from "./feedback-panels";
import { GradeSubmissionForm } from "./grade-form";
import { SubmissionStatusBadge } from "./status-badge";
import { RubricSummary, SubmittedWork } from "./submitted-work";

/**
 * One piece of sent work as a mentor, coordinator or admin grades it: the
 * work, the AI review (a suggestion), the rubric and the grading form. For
 * the mentor console (#146). Reads the session, so mount it in <Suspense>.
 * RLS decides access: a submission the caller may not read shows as not found.
 */
export async function MentorSubmissionReview({ submissionId }: { submissionId: string }) {
  const found = await getSubmissionForStaff(submissionId);
  if (!found) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-dashed border-line-strong bg-surface-sunken p-6 lg:p-8">
        <h2 className="text-subtitle text-content">Work not found</h2>
        <p className="max-w-reading text-content-2">
          This work does not exist, has not been submitted yet, or belongs to a learner outside your cohorts.
        </p>
      </div>
    );
  }
  const { submission, week, rubric, learnerName } = found;
  const state = aiReviewState({
    status: submission.status,
    hasText: Boolean(submission.bodyText),
    feedback: submission.aiFeedback,
    configured: isAiReviewConfigured(),
    submittedAt: submission?.submittedAt ?? null,
  });
  const gradable = submission.status !== "draft";

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm text-content-3">
          Week {week.weekNumber}
          {week.isCapstone ? ", capstone" : ""}: {displayTheme(week.theme)}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-subtitle text-content">{learnerName}</h2>
          <SubmissionStatusBadge status={submission.status} />
          {submission.attempt > 1 && <span className="text-sm text-content-3">Attempt {submission.attempt}</span>}
        </div>
      </header>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_22.5rem] xl:gap-12">
        <div className="flex min-w-0 flex-col gap-6">
          <section aria-label="Submitted work" className="flex flex-col gap-3">
            <h3 className="text-h3 text-content">Submitted work</h3>
            <SubmittedWork
              bodyText={submission.bodyText}
              linkUrl={submission.linkUrl}
              filePath={submission.filePath}
              fileUrl={submission.fileUrl}
            />
          </section>
          <AiFeedbackPanel
            state={state}
            feedback={submission.aiFeedback}
            score={submission.aiScore}
            rubric={rubric}
            audience="mentor"
          />
        </div>
        <aside aria-label="Grading" className="flex min-w-0 flex-col gap-4">
          {gradable && (
            <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 lg:p-5">
              <h3 className="text-h3 text-content">Grade</h3>
              <GradeSubmissionForm
                key={`${submission.attempt}-${submission.updatedAt}`}
                submissionId={submission.id}
                suggestedScore={submission.finalScore ?? submission.aiScore}
                mentorFeedback={submission.mentorFeedback}
                passScore={week.passScore}
                status={submission.status as "submitted" | "ai_reviewed" | "returned" | "graded"}
              />
            </section>
          )}
          {rubric && <RubricSummary rubric={rubric} />}
        </aside>
      </div>
    </div>
  );
}
