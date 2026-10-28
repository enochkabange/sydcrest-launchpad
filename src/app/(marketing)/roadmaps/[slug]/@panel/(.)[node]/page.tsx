import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ResourceRows, TopicNeighbours, TopicSummary } from "@/components/roadmaps/topic";
import { TopicLearnerStatus } from "@/components/roadmaps/topic-learner-status";
import { TopicPanel } from "@/components/roadmaps/topic-panel";
import { TopicStudyBuddy } from "@/components/study-buddy/topic-study-buddy";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { formatMinutes } from "@/lib/roadmaps/estimates";
import { practiceOutcome } from "@/lib/roadmaps/markdown";
import { getNodeDetail, getPublishedNode } from "@/lib/roadmaps/public";
import { learnPath } from "@/lib/roadmaps/seo";
import { locateInView, roadmapViewOf } from "@/lib/roadmaps/view-model";

const HEADING_ID = "topic-panel-title";

/**
 * A topic opened from the roadmap: the same summary as the topic page, in a
 * panel over the roadmap. Only soft navigations land here; a reload or a
 * shared link renders the full page at [node]/page.tsx.
 */
export default function TopicPanelPage({ params }: PageProps<"/roadmaps/[slug]/[node]">) {
  return (
    <TopicPanel labelledBy={HEADING_ID}>
      <Suspense fallback={<PanelSkeleton />}>
        <PanelContent params={params} />
      </Suspense>
    </TopicPanel>
  );
}

async function PanelContent({ params }: Pick<PageProps<"/roadmaps/[slug]/[node]">, "params">) {
  const { slug, node: nodeSlug } = await params;
  const found = await getPublishedNode(slug, nodeSlug);
  if (!found) notFound();
  const view = roadmapViewOf(found.roadmap);
  const located = locateInView(view, nodeSlug);
  if (!located) notFound();
  const { node, section, previous, next } = located;
  const detail = await getNodeDetail(slug, node.id);
  const outcome = practiceOutcome(detail.content?.practice_task_md);
  const lesson = learnPath(slug, node.slug);

  return (
    <>
      <TopicSummary node={node} section={section} sectionCount={view.sections.length} headingLevel={2} headingId={HEADING_ID} />

      {(outcome || node.minutes !== null) && (
        <section aria-labelledby="panel-outcome-heading" className="flex flex-col gap-2">
          <h3 id="panel-outcome-heading" className="text-xs font-bold tracking-widest text-content-3 uppercase">
            What you will be able to show
          </h3>
          {outcome && <p className="text-content">{outcome}</p>}
          {node.minutes !== null && (
            <p className="text-sm text-content-2">
              Time: {formatMinutes(node.minutes)} for the lesson, practice task and quiz. An estimate; take the time you need.
            </p>
          )}
        </section>
      )}

      <div className="flex flex-col gap-3 rounded-lg border border-line p-4">
        <h3 className="text-base text-content">The full lesson</h3>
        <p className="text-sm text-content-2">
          {detail.content
            ? "Read the explanation with a worked example and try the practice task."
            : "The written lesson for this topic is coming soon."}{" "}
          {detail.hasQuiz ? "Pass the quiz there to mark this topic done." : "The quiz for this topic is being prepared."}
        </p>
        <Link href={lesson} className={buttonClasses("primary", "self-start")}>
          Open the full lesson
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>

      <TopicLearnerStatus nodeId={node.id} quizQuestions={detail.quizQuestions} lessonPath={lesson} />

      <TopicStudyBuddy nodeTitle={node.title} lessonPath={lesson} />

      <section aria-labelledby="panel-resources-heading">
        <h3 id="panel-resources-heading" className="text-xs font-bold tracking-widest text-content-3 uppercase">
          Free resources
        </h3>
        <div className="mt-2">
          {detail.resources.length ? (
            <ResourceRows resources={detail.resources} />
          ) : (
            <p className="text-sm text-content-2">Resources for this topic are coming soon.</p>
          )}
        </div>
      </section>

      <TopicNeighbours slug={slug} previous={previous} next={next} inPanel />
    </>
  );
}

function PanelSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4" aria-busy="true">
      <div className="h-4 w-1/2 rounded bg-surface-sunken" />
      <div id={HEADING_ID} className="h-8 w-3/4 rounded bg-surface-sunken" />
      <div className="h-16 rounded bg-surface-sunken" />
      <div className="h-28 rounded-lg bg-surface-sunken" />
    </div>
  );
}
