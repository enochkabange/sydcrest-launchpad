import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, BookOpen, ExternalLink, PlayCircle, Wrench } from "lucide-react";
import Link from "@/components/ui/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Markdown } from "@/components/learn/markdown";
import { byPosition, nextByPosition } from "@/components/learn/next-node";
import { parseQuestions } from "@/components/learn/quiz-data";
import { Quiz } from "@/components/learn/quiz";
import { MarkComplete } from "@/components/learn/mark-complete";
import { StartNode } from "@/components/learn/start-node";
import { getMyProgress } from "@/lib/roadmaps/progress";
import { StudyBuddy } from "@/components/study-buddy/study-buddy";
import { isStudyBuddyConfigured } from "@/lib/study-buddy/chat";
import { getStudyBuddyAllowance } from "@/lib/study-buddy/data";
import { markComplete, startNode, submitQuiz } from "./actions";
import { TopicOutline } from "./topic-outline";

export const metadata: Metadata = { title: "Learn" };

// The app shell's nav reads usePathname() outside a Suspense boundary, which
// a dynamic segment cannot prerender. Allow this route to block until the
// shell wraps the nav in Suspense (see the PR's integration notes).
export const instant = false;

const RESOURCE_KIND = {
  article: { label: "Read", icon: BookOpen },
  video: { label: "Watch", icon: PlayCircle },
  practice: { label: "Practise", icon: Wrench },
} as const;

const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  done: "Completed",
} as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-subtitle text-content">{title}</h2>
      {children}
    </section>
  );
}

async function Study({ params }: { params: Promise<{ slug: string; node: string }> }) {
  const user = await requireUser();
  const { slug, node: nodeSlug } = await params;
  const supabase = await createClient();

  const { data: roadmap } = await supabase
    .from("roadmaps")
    .select("id, slug, title")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!roadmap) notFound();

  const { data: nodes } = await supabase
    .from("roadmap_nodes")
    .select("id, parent_id, slug, title, summary, position, is_optional")
    .eq("roadmap_id", roadmap.id);
  const node = nodes?.find((n) => n.slug === nodeSlug);
  if (!nodes || !node) notFound();

  const [{ data: content }, { data: resources }, { data: quiz }, { data: progress }, allProgress] = await Promise.all([
    supabase.from("node_content").select("explanation_md, practice_task_md").eq("node_id", node.id).maybeSingle(),
    supabase
      .from("node_resources")
      .select("id, label, url, kind")
      .eq("node_id", node.id)
      .eq("is_active", true)
      .order("position"),
    supabase.from("node_quiz").select("questions, pass_threshold").eq("node_id", node.id).maybeSingle(),
    supabase
      .from("roadmap_progress")
      .select("status, quiz_score, verified_at")
      .eq("profile_id", user.id)
      .eq("node_id", node.id)
      .maybeSingle(),
    // Every status for the outline beside the lesson; one cached query shared with its progress marks.
    getMyProgress(),
  ]);

  const ordered = byPosition(nodes);
  const stepNumber = ordered.findIndex((n) => n.id === node.id) + 1;
  const following = nextByPosition(nodes, node.id);
  const next = following ? { href: `/learn/${roadmap.slug}/${following.slug}`, title: following.title } : null;
  const status = (progress?.status ?? "not_started") as keyof typeof STATUS_LABEL;
  const done = status === "done";
  const questions = parseQuestions(quiz?.questions);

  // One column on phones. From xl the lesson keeps a readable measure and the topic outline sits beside it.
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_22.5rem] xl:items-start xl:gap-12">
      <article className="flex max-w-3xl flex-col gap-8">
        {status === "not_started" && <StartNode nodeId={node.id} action={startNode} />}

        <header className="flex flex-col gap-3">
          <Link
            href={`/roadmaps/${roadmap.slug}`}
            className="-ml-2 inline-flex min-h-11 items-center gap-1.5 self-start rounded-md px-2 text-sm font-semibold text-content-link hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {roadmap.title}
          </Link>
          <p className="text-sm text-content-3">
            Topic {stepNumber} of {ordered.length}
            {node.is_optional ? " · Optional" : ""}
          </p>
          <h1 className="text-title text-content">{node.title}</h1>
          {node.summary && <p className="text-lead text-content-2">{node.summary}</p>}
          <p
            className={`self-start rounded-full px-3 py-1 text-sm font-semibold ${
              done ? "bg-success-bg text-success-fg" : "bg-surface-sunken text-content-2"
            }`}
          >
            {STATUS_LABEL[status === "not_started" ? "in_progress" : status]}
          </p>
        </header>

        <Section title="Explanation">
          {content?.explanation_md ? (
            <Markdown source={content.explanation_md} />
          ) : (
            <p className="text-content-2">
              The explanation for this topic is still being written. The resources below are a good place to start.
            </p>
          )}
        </Section>

        {content?.practice_task_md && (
          <Section title="Practice task">
            <div className="rounded-lg border border-line bg-surface-sunken p-4">
              <Markdown source={content.practice_task_md} />
            </div>
          </Section>
        )}

        {!!resources?.length && (
          <Section title="Resources">
            <ul className="flex flex-col gap-2">
              {resources.map((r) => {
                const kind = RESOURCE_KIND[r.kind as keyof typeof RESOURCE_KIND] ?? RESOURCE_KIND.article;
                const Icon = kind.icon;
                return (
                  <li key={r.id}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-3 rounded-lg border border-line p-3 text-content transition-colors hover:border-line-strong hover:bg-surface-sunken"
                    >
                      <Icon className="size-5 shrink-0 text-content-3" aria-hidden="true" />
                      <span className="flex-1">
                        <span className="block font-semibold">{r.label}</span>
                        <span className="block text-sm text-content-3">{kind.label}</span>
                      </span>
                      <ExternalLink className="size-4 shrink-0 text-content-3" aria-label="Opens in a new tab" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        <Section title="Checkpoint">
          {quiz ? (
            questions.length ? (
              <Quiz
                nodeId={node.id}
                questions={questions}
                passThreshold={quiz.pass_threshold}
                passedBefore={!!progress?.verified_at}
                bestScore={progress?.quiz_score ?? null}
                roadmapTitle={roadmap.title}
                next={next}
                action={submitQuiz}
              />
            ) : (
              <p className="text-content-2">The checkpoint quiz for this topic is being prepared.</p>
            )
          ) : (
            <MarkComplete
              nodeId={node.id}
              done={done}
              roadmapTitle={roadmap.title}
              next={next}
              action={markComplete}
            />
          )}
        </Section>

        {/* Own boundary, so the lesson never waits on today's usage read. In the lesson column at every width. */}
        <Suspense fallback={<StudyBuddySkeleton />}>
          <StudyBuddySlot nodeId={node.id} nodeTitle={node.title} />
        </Suspense>
      </article>
      <aside className="hidden xl:sticky xl:top-8 xl:block">
        <TopicOutline roadmap={roadmap} nodes={nodes} currentId={node.id} progress={allProgress ?? new Map()} />
      </aside>
    </div>
  );
}

async function StudyBuddySlot({ nodeId, nodeTitle }: { nodeId: string; nodeTitle: string }) {
  const available = isStudyBuddyConfigured();
  // A failed usage read only hides the counter; the route still enforces the cap.
  const allowance = available ? await getStudyBuddyAllowance().catch(() => null) : null;
  return (
    <StudyBuddy
      nodeId={nodeId}
      nodeTitle={nodeTitle}
      signedIn
      available={available}
      remainingToday={allowance?.remaining ?? null}
      limit={allowance?.limit}
    />
  );
}

function StudyBuddySkeleton() {
  return <div className="h-48 animate-skeleton rounded-lg bg-surface-sunken" aria-hidden="true" />;
}

function StudySkeleton() {
  return (
    <div className="flex max-w-3xl flex-col gap-6" aria-hidden="true">
      <div className="h-5 w-32 animate-skeleton rounded-md bg-surface-sunken" />
      <div className="h-9 w-3/4 animate-skeleton rounded-md bg-surface-sunken" />
      <div className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />
      <div className="h-24 animate-skeleton rounded-lg bg-surface-sunken" />
    </div>
  );
}

export default function NodePage({ params }: PageProps<"/learn/[slug]/[node]">) {
  return (
    <Suspense fallback={<StudySkeleton />}>
      <Study params={params} />
    </Suspense>
  );
}
