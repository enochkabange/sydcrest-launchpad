/**
 * Assignment submissions (#145). Mount points for sibling features:
 *
 * - Cohort week page (#144), `#submit` slot:
 *     <Suspense fallback={<SubmissionSkeleton />}><WeekSubmission weekId={week.id} /></Suspense>
 * - Mentor console (#146), one piece of work:
 *     <Suspense fallback={<SubmissionSkeleton />}><MentorSubmissionReview submissionId={id} /></Suspense>
 *   or compose the parts: SubmittedWork, AiFeedbackPanel (audience "mentor"),
 *   GradeSubmissionForm, RubricSummary, SubmissionStatusBadge.
 */
export { WeekSubmission, SubmissionSkeleton } from "./week-submission";
export { MentorSubmissionReview } from "./mentor-review";
export { SubmissionForm, type SubmissionFormProps } from "./submission-form";
export { GradeSubmissionForm, type GradeSubmissionFormProps } from "./grade-form";
export { PortfolioToggle } from "./portfolio-toggle";
export { AiFeedbackPanel, MentorFeedbackPanel, aiReviewState, type AiReviewState } from "./feedback-panels";
export { SubmittedWork, RubricSummary } from "./submitted-work";
export { SubmissionStatusBadge } from "./status-badge";
