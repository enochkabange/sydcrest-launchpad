import type { Metadata } from "next";
import { DataTable, type Column } from "@/components/ui/layout";
import { BarList, ColumnChart, NothingYet, StatTile, StatGrid } from "@/components/insights/charts";
import type { RowOf } from "@/lib/insights/dashboards";
import { loadTable } from "@/lib/insights/data";
import { MIN_SAMPLE, enough, formatCount, formatRate, formatShare } from "@/lib/insights/metrics";
import { Definitions, ExportLink, InsightsPage, Section, type InsightsContext } from "../shell";

export const metadata: Metadata = { title: "Learning", robots: { index: false } };

type RoadmapRow = RowOf<"admin_insights_roadmaps">;
type TopicRow = RowOf<"admin_insights_topics">;
type QuestionRow = RowOf<"admin_insights_questions">;

async function Learning({ supabase, filters }: InsightsContext) {
  const [roadmaps, topics, questions, reviews] = await Promise.all([
    loadTable(supabase, "roadmaps", filters),
    loadTable(supabase, "topics", filters),
    loadTable(supabase, "questions", filters),
    loadTable(supabase, "reviews", filters),
  ]);
  const totals = roadmaps.reduce(
    (s, r) => ({ started: s.started + r.topics_started, done: s.done + r.topics_done, attempted: s.attempted + r.quiz_attempted, passed: s.passed + r.quiz_passed }),
    { started: 0, done: 0, attempted: 0, passed: 0 },
  );
  const rev = reviews.reduce((s, r) => ({ sessions: s.sessions + r.sessions, questions: s.questions + r.questions, correct: s.correct + r.correct }), {
    sessions: 0,
    questions: 0,
    correct: 0,
  });
  const passBars = roadmaps
    .filter((r) => enough(r.quiz_attempted))
    .map((r) => ({ label: r.roadmap_title, value: r.quiz_passed / r.quiz_attempted, detail: `${formatCount(r.quiz_passed)} of ${formatCount(r.quiz_attempted)}` }))
    .sort((a, b) => a.value - b.value);
  const hard = questions.filter((q) => enough(q.answers));

  const roadmapColumns: Column<RoadmapRow>[] = [
    { header: "Roadmap", cell: (r) => <span className="font-semibold text-content">{r.roadmap_title}</span>, className: "min-w-0 flex-1" },
    { header: "Learners", cell: (r) => formatCount(r.learners), align: "end", phone: "hide" },
    { header: "Topics started", cell: (r) => formatCount(r.topics_started), align: "end", phone: "hide" },
    { header: "Topics done", cell: (r) => formatCount(r.topics_done), align: "end", phone: "hide" },
    { header: "Quiz pass rate", cell: (r) => formatRate(r.quiz_passed, r.quiz_attempted), align: "end" },
    {
      header: "Lessons finished",
      cell: (r) => (r.lessons_opened === null ? "Not with these filters" : formatRate(r.lessons_finished ?? 0, r.lessons_opened)),
      align: "end",
      phone: "hide",
      className: "text-content-2",
    },
  ];
  const topicColumns: Column<TopicRow>[] = [
    {
      header: "Topic",
      cell: (r) => (
        <span className="flex flex-col">
          <span className="font-semibold text-content">{r.topic_title}</span>
          <span className="text-sm text-content-3">{r.roadmap_slug}</span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Started", cell: (r) => formatCount(r.started), align: "end", phone: "hide" },
    { header: "Done", cell: (r) => formatCount(r.done), align: "end", phone: "hide" },
    { header: "Quiz pass rate", cell: (r) => formatRate(r.quiz_passed, r.quiz_attempted), align: "end", phone: "hide" },
    { header: "Stalled", cell: (r) => formatCount(r.stalled), align: "end" },
  ];
  const questionColumns: Column<QuestionRow>[] = [
    {
      header: "Question",
      cell: (r) => (
        <span className="flex flex-col">
          <span className="text-content">{r.prompt ?? r.question_id}</span>
          <span className="text-sm text-content-3">{r.topic_title}</span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Answers", cell: (r) => formatCount(r.answers), align: "end", phone: "hide" },
    { header: "Correct", cell: (r) => formatRate(r.correct, r.answers), align: "end" },
  ];

  return (
    <>
      <StatGrid>
        <StatTile value={formatCount(totals.started)} label="Topics started" />
        <StatTile value={formatCount(totals.done)} label="Topics done" />
        <StatTile value={formatRate(totals.passed, totals.attempted)} label="Quiz pass rate" detail={`${formatCount(totals.passed)} of ${formatCount(totals.attempted)} quiz topics`} />
        <StatTile value={formatCount(rev.sessions)} label="Reviews completed" detail={`${formatRate(rev.correct, rev.questions)} of answers correct`} />
      </StatGrid>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <Section id="pass" title="Quiz pass rate by roadmap" lead={`Lowest first. Roadmaps with fewer than ${MIN_SAMPLE} quiz topics attempted are left out.`} table="roadmaps" filters={filters}>
          {passBars.length === 0 ? (
            <NothingYet>Not enough quiz attempts in this range yet.</NothingYet>
          ) : (
            <div className="rounded-lg border border-line bg-surface p-4 xl:p-5">
              <BarList label="Quiz pass rate by roadmap" bars={passBars} format={formatShare} />
            </div>
          )}
        </Section>
        <ColumnChart title="Reviews by day" valueLabel="Reviews" points={reviews.map((r) => ({ x: r.day, y: r.sessions }))} actions={<ExportLink table="reviews" filters={filters} />} />
      </div>

      <Section id="roadmaps" title="Roadmaps" table="roadmaps" filters={filters}>
        {roadmaps.length === 0 ? (
          <NothingYet>No one started a topic in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Learning by roadmap" columns={roadmapColumns} rows={roadmaps} rowKey={(r) => r.roadmap_slug} />
        )}
      </Section>

      <Section id="topics" title="Where learners stall" lead="Topics started in the range, most stalled learners first." table="topics" filters={filters}>
        {topics.length === 0 ? (
          <NothingYet>No topics started in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Topics by stalled learners" columns={topicColumns} rows={topics} rowKey={(r) => `${r.roadmap_slug}:${r.topic_title}`} />
        )}
      </Section>

      <Section id="questions" title="Hardest review questions" lead={`Lowest share correct first, from questions answered at least ${MIN_SAMPLE} times in reviews.`} table="questions" filters={filters}>
        {hard.length === 0 ? (
          <NothingYet>Not enough review answers in this range yet.</NothingYet>
        ) : (
          <DataTable caption="Hardest review questions" columns={questionColumns} rows={hard} rowKey={(r) => `${r.topic_title}:${r.question_id}`} />
        )}
      </Section>

      <Definitions
        items={[
          ["Topics started", "Topics a learner opened for the first time in the range."],
          ["Topics done", "Topics marked done in the range, by quiz or by the learner."],
          ["Quiz pass rate", "Quiz topics whose best score reached the pass mark, over quiz topics attempted. Each learner and topic counts once."],
          ["Lessons finished", "From the lesson rollup: people who first opened a lesson in the range and have finished that topic since. Recent days look lower than they will be. Not available with people filters."],
          ["Stalled", "Started in the range, not done, and started more than 14 days ago."],
          ["Hardest review questions", "Spaced review answers. Topic quizzes keep only the best score, so per question results come from reviews."],
        ]}
      />
    </>
  );
}

/** Admin insights: learning outcomes per roadmap and topic. */
export default function LearningInsightsPage({ searchParams }: PageProps<"/admin/insights/learning">) {
  return <InsightsPage slug="learning" searchParams={searchParams} render={Learning} />;
}
