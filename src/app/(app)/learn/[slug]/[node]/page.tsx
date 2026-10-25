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
import { markComplete, startNode, submitQuiz } from "./actions";

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
      <h2 className="text-xl text-content">{title}</h2>
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
    .select("id, slug, title, summary, position, is_optional")
    .eq("roadmap_id", roadmap.id);
  const node = nodes?.find((n) => n.slug === nodeSlug);
  if (!nodes || !node) notFound();

  const [{ data: content }, { data: resources }, { data: quiz }, { data: progress }] = await Promise.all([
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
      .select("status, quiz_score")
      .eq("profile_id", user.id)
      .eq("node_id", node.id)
      .maybeSingle(),
  ]);

  const ordered = byPosition(nodes);
  const stepNumber = ordered.findIndex((n) => n.id === node.id) + 1;
  const following = nextByPosition(nodes, node.id);
  const next = following ? { href: `/learn/${roadmap.slug}/${following.slug}`, title: following.title } : null;
  const status = (progress?.status ?? "not_started") as keyof typeof STATUS_LABEL;
  const done = status === "done";
  const questions = parseQuestions(quiz?.questions);

  return (
    <article className="flex flex-col gap-8">
      {status === "not_started" && <StartNode nodeId={node.id} action={startNode} />}

      <header className="flex flex-col gap-3">
        <Link
          href={`/roadmaps/${roadmap.slug}`}
          className="-ml-2 inline-flex min-h-11 items-center gap-1.5 self-start rounded-md px-2 text-sm font-semibold text-content-link"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {roadmap.title}
        </Link>
        <p className="text-sm text-content-3">
          Topic {stepNumber} of {ordered.length}
          {node.is_optional ? " · Optional" : ""}
        </p>
        <h1 className="text-3xl text-content">{node.title}</h1>
        {node.summary && <p className="text-lg text-content-2">{node.summary}</p>}
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
                    className="flex min-h-11 items-center gap-3 rounded-lg border border-line p-3 text-content hover:bg-surface-sunken"
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
              passedBefore={done}
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

      {/*
        INTEGRATION SLOT: Study Buddy.
        The Study Buddy chat component mounts here, below the checkpoint.
        It has node.id, node.title and roadmap.slug available in this scope.
      */}
    </article>
  );
}

function StudySkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
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
