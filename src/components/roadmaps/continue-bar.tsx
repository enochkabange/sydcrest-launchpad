import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { getCurrentUser } from "@/lib/auth";
import { getLearningLoop } from "@/lib/learning-loop/server";
import { weeklyPace } from "@/lib/path/recommend";
import { latestSavedAnswers } from "@/lib/path/server";
import { formatEstimate, formatMinutes, timeLeftCopy } from "@/lib/roadmaps/estimates";
import { nodePath } from "@/lib/roadmaps/seo";
import type { RoadmapView, ViewNode } from "@/lib/roadmaps/view-model";
import { liveView } from "./views/live";

/*
 * "Continue where you left off" (issue #244): the learner's next step, its
 * time and the time left at their weekly hours from the path quiz. A request
 * time island; the prerendered fallback is the visitor's "Start here" bar in
 * the same box, and the box reserves its height, so nothing below it moves
 * when the learner's version arrives (#223).
 */

const BOX =
  "flex min-h-36 flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-4 md:min-h-24 md:flex-row md:items-center md:gap-6 md:px-5";

export function ContinueBar({ slug, view }: { slug: string; view: RoadmapView }) {
  return (
    <Suspense fallback={<VisitorBar slug={slug} view={view} />}>
      <LiveContinueBar slug={slug} view={view} />
    </Suspense>
  );
}

function firstStep(view: RoadmapView): ViewNode | null {
  const id = view.order.find((i) => !view.byId[i]?.optional) ?? view.order[0];
  return id ? view.byId[id] : null;
}

function VisitorBar({ slug, view }: { slug: string; view: RoadmapView }) {
  const step = firstStep(view);
  if (!step) return null;
  const total = formatEstimate(view.requiredEstimate);
  return (
    <Bar
      eyebrow="Start here"
      step={step}
      slug={slug}
      action="Start"
      detail={`${total ? `${total.charAt(0).toUpperCase()}${total.slice(1)} for the whole roadmap. ` : ""}Sign in to save your progress.`}
    />
  );
}

async function LiveContinueBar({ slug, view }: { slug: string; view: RoadmapView }) {
  const live = await liveView(view);
  if (!live.hasProgress) return <VisitorBar slug={slug} view={view} />;
  const user = await getCurrentUser();
  const [answers, loop] = user ? await Promise.all([latestSavedAnswers(user.id), getLearningLoop(user.id)]) : [null, null];
  const pace = answers ? weeklyPace(answers.hours) : null;
  const goal =
    loop?.weekly.target != null ? ` This week: ${loop.weekly.done} of ${loop.weekly.target} ${loop.weekly.target === 1 ? "topic" : "topics"}.` : "";

  const next = live.upNextId ? live.byId[live.upNextId] : null;
  if (!next) {
    return (
      <section aria-label="Your progress" className={BOX} data-testid="continue-bar">
        <div className="flex-1">
          <p className="text-sm font-semibold text-content-3">Roadmap complete</p>
          <p className="mt-1 font-bold text-content">You have finished every required topic. Well done.</p>
          <p className="mt-1 text-sm text-content-2">Optional topics are still here whenever you want them.{goal}</p>
        </div>
      </section>
    );
  }
  const started = live.counts.started;
  return (
    <Bar
      eyebrow={started ? "Continue where you left off" : "Start here"}
      step={next}
      slug={slug}
      action={started ? "Continue" : "Start"}
      detail={`${timeLeftCopy(live.minutesLeft, pace) ?? ""}${goal}`.trim()}
    />
  );
}

function Bar({ eyebrow, step, slug, action, detail }: { eyebrow: string; step: ViewNode; slug: string; action: string; detail: string }) {
  return (
    <section aria-label={eyebrow} className={BOX} data-testid="continue-bar">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-content-3">{eyebrow}</p>
        <p className="mt-1 font-bold text-content">
          <span className="mr-2 font-normal text-content-3 tabular-nums">{step.number}</span>
          {step.title}
          {step.minutes !== null && <span className="ml-2 text-sm font-normal text-content-2">{formatMinutes(step.minutes)}</span>}
        </p>
        {detail && <p className="mt-1 text-sm text-content-2">{detail}</p>}
      </div>
      <Link href={nodePath(slug, step.slug)} className={buttonClasses("primary", "w-full shrink-0 md:w-auto")}>
        {action}
        <span className="sr-only">: {step.title}</span>
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </section>
  );
}
