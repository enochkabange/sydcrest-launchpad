import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { ReviewForm } from "@/components/learning-loop/review-form";
import { requireUser } from "@/lib/auth";
import { getLearningLoop, getReviewItems } from "@/lib/learning-loop/server";
import { REST_DAYS_PER_WEEK } from "@/lib/learning-loop/streak";

export const metadata: Metadata = { title: "5 minute review" };

/**
 * The 5 minute review (issue #232). The header and the rail's explanation
 * are static; the questions and the streak read the session, so each is a
 * Suspense island. Phones read header, questions, then how it works. From
 * lg the explanation and streak sit in a rail beside the questions.
 */
export default function ReviewPage() {
  return (
    <MainWithRail
      railLabel="About reviews"
      sticky
      rail={
        <>
          <section className="flex flex-col gap-3 rounded-lg border border-line p-5">
            <h2 className="text-h3 text-content">How reviews work</h2>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-content-2">
              <li>Questions come only from checkpoint quizzes you have passed.</li>
              <li>Questions you missed come back sooner. Ones you keep getting right rest for longer.</li>
              <li>A finished review counts toward your learning streak for the day.</li>
              <li>Reviews never change your passed topics, your achievements or the leaderboards.</li>
            </ul>
          </section>
          <Suspense fallback={<div className="h-32 animate-skeleton rounded-lg bg-surface-sunken" aria-hidden="true" />}>
            <StreakCard />
          </Suspense>
        </>
      }
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Your 5 minute review</h1>
        <p className="max-w-reading text-lead text-content-2">
          A few quick questions from topics you have already passed, to keep them fresh.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-hidden="true" />}>
        <Questions />
      </Suspense>
    </MainWithRail>
  );
}

async function Questions() {
  const user = await requireUser();
  const items = await getReviewItems(user.id);

  if (!items.length) {
    return (
      <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex max-w-reading flex-col gap-2">
          <h2 className="text-h3 text-content">Nothing to review yet</h2>
          <p className="text-content-2">
            Pass a checkpoint quiz on any roadmap topic and its questions will come back here for quick reviews.
          </p>
        </div>
        <Link href="/roadmaps" className={buttonClasses("primary", "shrink-0")}>
          Browse roadmaps
        </Link>
      </section>
    );
  }

  return (
    <div className="max-w-reading">
      <ReviewForm
        items={items.map((i) => ({
          nodeId: i.nodeId,
          questionId: i.question.id,
          nodeTitle: i.nodeTitle,
          href: `/learn/${i.roadmapSlug}/${i.nodeSlug}`,
          prompt: i.question.prompt,
          options: i.question.options,
        }))}
      />
    </div>
  );
}

async function StreakCard() {
  const user = await requireUser();
  const { daily, reviewQuestions } = await getLearningLoop(user.id);
  return (
    <section className="flex flex-col gap-2 rounded-lg border border-line p-5">
      <h2 className="text-h3 text-content">Your learning streak</h2>
      <p className="text-subtitle font-semibold text-content">
        {daily.days} {daily.days === 1 ? "day" : "days"}
      </p>
      <p className="text-sm text-content-2">
        {daily.activeToday
          ? "Today already counts."
          : reviewQuestions > 0
            ? "Finish this review and today counts."
            : "Pass a checkpoint quiz to start one."}{" "}
        Up to {REST_DAYS_PER_WEEK} missed days a week never break it.
      </p>
    </section>
  );
}
