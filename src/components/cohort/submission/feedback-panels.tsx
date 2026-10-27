import { Bot, MessageSquareText } from "lucide-react";
import type { ReactNode } from "react";
import type { AiFeedback, Rubric } from "@/lib/submissions/feedback";
import type { AiReviewState, SubmissionStatus } from "@/lib/submissions/status";

export { aiReviewState, type AiReviewState } from "@/lib/submissions/status";

function Card({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 lg:p-5">
      <h3 className="flex items-center gap-2 text-h3 text-content">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  );
}

/** The AI rubric review: overall summary, then each criterion with its points. */
export function AiFeedbackPanel({
  state,
  feedback,
  score,
  rubric,
  audience = "learner",
}: {
  state: AiReviewState;
  feedback: AiFeedback | null;
  score: number | null;
  rubric: Rubric | null;
  audience?: "learner" | "mentor";
}) {
  if (state === "none") return null;
  const icon = <Bot aria-hidden className="size-5 text-content-3" />;
  const yours = audience === "learner";

  if (state === "resting") {
    return (
      <Card title="AI feedback is resting" icon={icon}>
        <p className="text-sm text-content-2">
          {yours
            ? "Automatic feedback is switched off right now. Your work is safe and your mentor will review it as usual."
            : "Automatic feedback is switched off right now, so this work has no AI review. Grade it as usual."}
        </p>
      </Card>
    );
  }
  if (state === "pending") {
    return (
      <Card title="AI feedback on its way" icon={icon}>
        <p className="text-sm text-content-2" role="status">
          {yours
            ? "We are checking your work against the rubric. This usually takes under a minute. You can leave this page and come back."
            : "The AI review for this attempt has not finished yet."}
        </p>
      </Card>
    );
  }
  if (state === "unavailable") {
    return (
      <Card title="No AI feedback this time" icon={icon}>
        <p className="text-sm text-content-2">
          {yours
            ? "We couldn't write AI feedback for this version. Your work is safe and your mentor will review it as usual."
            : "The AI review for this attempt did not complete. Grade it as usual."}
        </p>
      </Card>
    );
  }
  if (state === "mentor_only") {
    return (
      <Card title="Your mentor will review this" icon={icon}>
        <p className="text-sm text-content-2">
          {yours
            ? "AI feedback reads written answers only, so it skips a link or file on its own. Add a short written note next time if you would like quick feedback too."
            : "No written text, so there is no AI review. Open the link or file to grade it."}
        </p>
      </Card>
    );
  }

  const byId = new Map((rubric?.criteria ?? []).map((c) => [c.id, c]));
  return (
    <Card title="AI feedback" icon={icon}>
      {typeof score === "number" && (
        <p className="text-sm text-content-2">
          Suggested score <span className="font-semibold text-content">{score} out of 100</span>.{" "}
          {yours ? "Your mentor sets the final score." : "A suggestion only; you set the final score."}
        </p>
      )}
      <p className="text-content">{feedback?.summary}</p>
      {feedback && feedback.criteria.length > 0 && (
        <ul className="flex flex-col divide-y divide-line rounded-md border border-line">
          {feedback.criteria.map((c) => {
            const criterion = byId.get(c.id);
            return (
              <li key={c.id} className="flex flex-col gap-1 px-3 py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-content">{criterion?.label ?? c.id}</span>
                  <span className="shrink-0 text-sm tabular-nums text-content-2">
                    {c.points}
                    {criterion ? ` of ${criterion.max_points}` : ""}
                  </span>
                </div>
                <p className="text-sm text-content-2">{c.comment}</p>
              </li>
            );
          })}
        </ul>
      )}
      <p className="text-xs text-content-3">
        Written by AI against the week&apos;s rubric. It can be wrong; {yours ? "your mentor checks it." : "check it against the work."}
      </p>
    </Card>
  );
}

/** The mentor's word: final score and feedback, or a request for changes. */
export function MentorFeedbackPanel({
  status,
  finalScore,
  feedback,
  passScore,
}: {
  status: SubmissionStatus | null;
  finalScore: number | null;
  feedback: string | null;
  passScore: number;
}) {
  const icon = <MessageSquareText aria-hidden className="size-5 text-content-3" />;
  if (status === "graded" && typeof finalScore === "number") {
    const passed = finalScore >= passScore;
    return (
      <Card title="Mentor feedback" icon={icon}>
        <p className="text-sm text-content-2">
          Final score <span className="font-semibold text-content">{finalScore} out of 100</span>.{" "}
          {passed ? "This week is passed." : `A week passes at ${passScore}. Ask your mentor about your next step.`}
        </p>
        {feedback && <p className="whitespace-pre-line text-content">{feedback}</p>}
      </Card>
    );
  }
  if (status === "returned") {
    return (
      <Card title="Your mentor asked for changes" icon={icon}>
        {feedback ? (
          <p className="whitespace-pre-line text-content">{feedback}</p>
        ) : (
          <p className="text-sm text-content-2">Update your work and submit it again.</p>
        )}
      </Card>
    );
  }
  return null;
}
