import { Suspense } from "react";
import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/*
 * Quiz and review status for one topic in the topic panel (issue #244). A
 * request time island in a box that reserves its height. Read only: the quiz
 * is taken on the lesson, the review runs at /review. RLS returns only the
 * learner's own rows.
 */

const BOX = "flex min-h-24 flex-col gap-1.5 rounded-lg border border-line p-4 text-sm";

export function TopicLearnerStatus({ nodeId, quizQuestions, lessonPath }: { nodeId: string; quizQuestions: number; lessonPath: string }) {
  return (
    <section aria-labelledby="topic-status-heading" className={BOX}>
      <h3 id="topic-status-heading" className="text-xs font-bold tracking-widest text-content-3 uppercase">
        Quiz and review
      </h3>
      <Suspense fallback={<VisitorStatus quizQuestions={quizQuestions} lessonPath={lessonPath} />}>
        <LiveStatus nodeId={nodeId} quizQuestions={quizQuestions} lessonPath={lessonPath} />
      </Suspense>
    </section>
  );
}

function quizLine(quizQuestions: number) {
  return quizQuestions > 0
    ? `This topic has a ${quizQuestions} question quiz. Passing it marks the topic done.`
    : "The quiz for this topic is being prepared.";
}

function VisitorStatus({ quizQuestions, lessonPath }: { quizQuestions: number; lessonPath: string }) {
  return (
    <>
      <p className="text-content">{quizLine(quizQuestions)}</p>
      <p className="text-content-2">
        <Link href={`/login?next=${encodeURIComponent(lessonPath)}`} className="font-semibold text-content-link underline">
          Sign in
        </Link>{" "}
        to save your quiz result and add the topic to your 5 minute review.
      </p>
    </>
  );
}

const dayFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "Africa/Accra" });

async function LiveStatus({ nodeId, quizQuestions, lessonPath }: { nodeId: string; quizQuestions: number; lessonPath: string }) {
  const user = await getCurrentUser();
  if (!user) return <VisitorStatus quizQuestions={quizQuestions} lessonPath={lessonPath} />;
  const supabase = await createClient();
  const [{ data: progress }, { data: answers }] = await Promise.all([
    supabase.from("roadmap_progress").select("quiz_score, verified_at").eq("profile_id", user.id).eq("node_id", nodeId).maybeSingle(),
    supabase
      .from("review_answers")
      .select("correct, answered_at")
      .eq("profile_id", user.id)
      .eq("node_id", nodeId)
      .order("answered_at", { ascending: false })
      .limit(50),
  ]);

  const passed = !!progress?.verified_at;
  const quiz = passed
    ? `You passed the quiz${progress?.quiz_score != null ? ` with ${progress.quiz_score}%` : ""}.`
    : progress?.quiz_score != null
      ? `Your best quiz score so far is ${progress.quiz_score}%. Try again on the lesson.`
      : quizLine(quizQuestions);

  const reviewed = answers ?? [];
  const review = !passed
    ? "Pass the quiz and its questions join your 5 minute review."
    : reviewed.length === 0
      ? "Its questions are in your 5 minute review. You have not reviewed them yet."
      : `In your 5 minute review: ${reviewed.filter((a) => a.correct).length} of ${reviewed.length} answers right, last on ${dayFormat.format(new Date(reviewed[0].answered_at))}.`;

  return (
    <>
      <p className="text-content" data-testid="topic-quiz-status">
        {quiz}
      </p>
      <p className="text-content-2">
        {review}{" "}
        {passed && (
          <Link href="/review" className="font-semibold text-content-link underline">
            Open the review
          </Link>
        )}
      </p>
    </>
  );
}
