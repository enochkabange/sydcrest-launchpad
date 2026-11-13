import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, type Column } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import {
  LESSON_FLAG_LABELS,
  MIN_ANSWERS,
  MIN_FEEDBACK,
  QUESTION_FLAG_LABELS,
  rankLessons,
  rankQuestions,
  rewriteQueue,
  type LessonAnalysis,
  type LessonCounts,
  type QuestionAnalysis,
  type QuestionCounts,
  type QueueItem,
} from "@/lib/content-quality/rank";
import { reasonLabel } from "@/lib/content-quality/reasons";

export const metadata: Metadata = { title: "Rewrite queue", robots: { index: false } };

const WINDOWS = [30, 90, 365] as const;

function windowOf(v: string | string[] | undefined): number {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return (WINDOWS as readonly number[]).includes(n) ? n : 90;
}

const pct = (v: number | null) => (v === null ? "–" : `${Math.round(v * 100)}%`);

function Flags({ item }: { item: QueueItem }) {
  const labels =
    item.kind === "question"
      ? item.flags.map((f) => QUESTION_FLAG_LABELS[f])
      : item.flags.map((f) => LESSON_FLAG_LABELS[f]);
  if (!labels.length) return null;
  return (
    <ul className="flex flex-wrap gap-1" aria-label="Signals">
      {labels.map((l) => (
        <li key={l} className="rounded-full bg-warning-bg px-2 py-0.5 text-xs font-semibold text-warning-fg">
          {l}
        </li>
      ))}
    </ul>
  );
}

function QueueCard({ item, rank }: { item: QueueItem; rank: number }) {
  const isQuestion = item.kind === "question";
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-line bg-surface p-4">
      <p className="text-sm text-content-3">
        {rank}. {isQuestion ? "Question" : "Lesson"} · {item.row.roadmap_slug} · {item.row.topic_title}
      </p>
      <h3 className="text-body font-semibold text-content">
        {isQuestion ? (item.row.prompt ?? `Question ${item.row.question_id}`) : item.row.topic_title}
      </h3>
      <Flags item={item} />
      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-content-2">
        {item.evidence.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </li>
  );
}

const questionColumns: Column<QuestionAnalysis>[] = [
  {
    header: "Question",
    cell: (q) => (
      <span className="flex min-w-0 flex-col">
        <span className="font-semibold text-content">{q.row.prompt ?? q.row.question_id}</span>
        <span className="text-sm text-content-2">
          {q.row.roadmap_slug} · {q.row.topic_title}
        </span>
      </span>
    ),
    className: "min-w-0 flex-1",
  },
  { header: "Answers", cell: (q) => q.row.answers, align: "end", phone: "hide" },
  { header: "Right", cell: (q) => pct(q.difficulty), align: "end" },
  { header: "Right when passed", cell: (q) => pct(q.strongCorrect), align: "end", phone: "hide" },
  { header: "Right when failed", cell: (q) => pct(q.weakCorrect), align: "end", phone: "hide" },
  {
    header: "Gap",
    cell: (q) => (q.discrimination === null ? "–" : `${Math.round(q.discrimination * 100)} pts`),
    align: "end",
    phone: "hide",
  },
  {
    header: "Most chosen wrong",
    cell: (q) => (q.row.wrong_choice_count ? `${q.row.wrong_option ?? `Option ${(q.row.wrong_choice ?? 0) + 1}`} (${q.row.wrong_choice_count})` : "–"),
    phone: "hide",
    className: "text-content-2",
  },
];

const lessonColumns: Column<LessonAnalysis>[] = [
  {
    header: "Lesson",
    cell: (l) => (
      <span className="flex min-w-0 flex-col">
        <span className="font-semibold text-content">{l.row.topic_title}</span>
        <span className="text-sm text-content-2">{l.row.roadmap_slug}</span>
      </span>
    ),
    className: "min-w-0 flex-1",
  },
  { header: "Visits", cell: (l) => l.row.visits, align: "end", phone: "hide" },
  {
    header: "Median read",
    cell: (l) =>
      l.row.median_scroll === null
        ? "–"
        : `${l.row.median_scroll}%${l.row.median_ms !== null ? `, ${Math.max(1, Math.round(l.row.median_ms / 60000))} min` : ""}`,
    align: "end",
    phone: "hide",
  },
  {
    header: "Not clear",
    cell: (l) => {
      const n = l.row.clear_yes + l.row.clear_no;
      if (!n) return "–";
      const reason = reasonLabel(l.row.top_reason);
      return `${l.row.clear_no} of ${n}${reason ? ` (${reason.toLowerCase()})` : ""}`;
    },
    align: "end",
  },
  { header: "Quiz fails", cell: (l) => (l.row.quiz_attempts ? `${l.row.quiz_fails} of ${l.row.quiz_attempts}` : "–"), align: "end", phone: "hide" },
  { header: "Read before a fail", cell: (l) => l.row.left_before_fail, align: "end", phone: "hide" },
  { header: "Study Buddy", cell: (l) => l.row.buddy_messages, align: "end", phone: "hide" },
];

const buddyColumns: Column<LessonAnalysis>[] = [
  {
    header: "Topic",
    cell: (l) => (
      <span className="flex min-w-0 flex-col">
        <span className="font-semibold text-content">{l.row.topic_title}</span>
        <span className="text-sm text-content-2">{l.row.roadmap_slug}</span>
      </span>
    ),
    className: "min-w-0 flex-1",
  },
  { header: "Questions", cell: (l) => l.row.buddy_messages, align: "end" },
  { header: "Chats", cell: (l) => l.row.buddy_chats, align: "end", phone: "hide" },
  { header: "Fifth message or later", cell: (l) => l.row.buddy_deep, align: "end", phone: "hide" },
  { header: "Why or compare", cell: (l) => l.row.buddy_why, align: "end", phone: "hide" },
  { header: "About code", cell: (l) => l.row.buddy_code, align: "end", phone: "hide" },
  { header: "Long", cell: (l) => l.row.buddy_long, align: "end", phone: "hide" },
];

async function Report({ searchParams }: Pick<PageProps<"/admin/content/quality">, "searchParams">) {
  const { supabase } = await requireAdmin();
  const days = windowOf((await searchParams).days);
  const [questionsRes, lessonsRes] = await Promise.all([
    supabase.rpc("admin_content_questions", { p_days: days }),
    supabase.rpc("admin_content_lessons", { p_days: days }),
  ]);
  if (questionsRes.error) throw new Error(`Could not load question analysis: ${questionsRes.error.message}`);
  if (lessonsRes.error) throw new Error(`Could not load lesson signals: ${lessonsRes.error.message}`);

  // The functions return nulls where there is nothing to measure (no option text, no reading yet).
  const questions = rankQuestions((questionsRes.data ?? []) as QuestionCounts[]);
  const lessons = rankLessons((lessonsRes.data ?? []) as LessonCounts[]);
  const queue = rewriteQueue(questions, lessons);
  const buddy = lessons.filter((l) => l.row.buddy_messages > 0).sort((a, b) => b.row.buddy_messages - a.row.buddy_messages);

  return (
    <div className="flex flex-col gap-8">
      <nav aria-label="Time window" className="flex flex-wrap gap-1">
        {WINDOWS.map((w) => (
          <Link
            key={w}
            href={`/admin/content/quality?days=${w}`}
            aria-current={w === days ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              w === days ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            Last {w} days
          </Link>
        ))}
      </nav>

      <section aria-labelledby="queue-heading" className="flex flex-col gap-3">
        <h2 id="queue-heading" className="text-subtitle text-content">
          Most worth fixing
        </h2>
        {queue.length === 0 ? (
          <p className="max-w-reading text-content-2">
            Nothing stands out yet. A question needs {MIN_ANSWERS} answers and a lesson needs {MIN_FEEDBACK} answers to
            &quot;Was this lesson clear?&quot; (or enough quiz attempts and visits) before it can join the queue.
          </p>
        ) : (
          <ol className="grid gap-3 lg:grid-cols-2">
            {queue.map((item, i) => (
              <QueueCard key={item.key} item={item} rank={i + 1} />
            ))}
          </ol>
        )}
      </section>

      <section aria-labelledby="questions-heading" className="flex flex-col gap-3">
        <h2 id="questions-heading" className="text-subtitle text-content">
          Questions
        </h2>
        <p className="max-w-reading text-sm text-content-2">
          Right: share of all answers that were right. Gap: right when the attempt passed minus right when it failed; near
          zero or below means the question does not tell strong and weak learners apart.
        </p>
        {questions.length === 0 ? (
          <p className="text-content-2">No checkpoint answers in this window yet.</p>
        ) : (
          <DataTable caption="Quiz questions" columns={questionColumns} rows={questions.slice(0, 50)} rowKey={(q) => q.key} />
        )}
      </section>

      <section aria-labelledby="lessons-heading" className="flex flex-col gap-3">
        <h2 id="lessons-heading" className="text-subtitle text-content">
          Lessons
        </h2>
        <p className="max-w-reading text-sm text-content-2">
          Median read: how far down the page the middle visit got and how long the page was visible. Read before a fail:
          the lesson a learner left last before failing a quiz within a day.
        </p>
        {lessons.length === 0 ? (
          <p className="text-content-2">No lesson visits or feedback in this window yet.</p>
        ) : (
          <DataTable caption="Lessons" columns={lessonColumns} rows={lessons.slice(0, 50)} rowKey={(l) => l.key} />
        )}
      </section>

      <section aria-labelledby="buddy-heading" className="flex flex-col gap-3">
        <h2 id="buddy-heading" className="text-subtitle text-content">
          Study Buddy themes
        </h2>
        <p className="max-w-reading text-sm text-content-2">
          What learners ask about, by topic and kind of question. Counts only: the words learners type are never kept here.
        </p>
        {buddy.length === 0 ? (
          <p className="text-content-2">No Study Buddy questions about a topic in this window yet.</p>
        ) : (
          <DataTable caption="Study Buddy questions by topic" columns={buddyColumns} rows={buddy.slice(0, 50)} rowKey={(l) => l.key} />
        )}
      </section>
    </div>
  );
}

/** Admin: the rewrite queue (#326), lessons and quiz questions ranked by how much they seem to confuse learners. */
export default function ContentQualityPage({ searchParams }: PageProps<"/admin/content/quality">) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link href="/admin/content" className="self-start text-sm font-semibold text-content-link hover:underline">
          Node content
        </Link>
        <h1 className="text-title text-content">Rewrite queue</h1>
        <p className="max-w-reading text-content-2">
          The lessons and quiz questions most worth fixing, with the evidence: answers, what learners who passed got wrong,
          the wrong answers they pick, &quot;Was this lesson clear?&quot;, reading and Study Buddy questions.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Report searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
