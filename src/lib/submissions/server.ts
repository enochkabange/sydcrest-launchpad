import "server-only";

// App entry point for the review job: importing through here keeps the secret
// key client and the Anthropic client out of any browser bundle.
export { createReviewClient, isAiReviewConfigured, needsAiReview, reviewSubmission } from "./review";
export type { ReviewOutcome, SubmissionToReview } from "./review";
