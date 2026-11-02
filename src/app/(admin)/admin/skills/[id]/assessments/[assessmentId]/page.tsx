import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { parseQuestions } from "@/components/learn/quiz-data";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { parseAnswerKey } from "@/lib/skills/assessment";
import { Badge } from "../../../../roadmaps/fields";
import { deleteAssessment } from "../../../actions";
import { AssessmentSettingsForm, PublishAssessment } from "./settings-form";
import { QuestionEditor } from "./question-editor";

export const metadata: Metadata = { title: "Edit assessment" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function AssessmentPage({ params }: PageProps<"/admin/skills/[id]/assessments/[assessmentId]">) {
  return (
    <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Editor params={params} />
    </Suspense>
  );
}

async function Editor({ params }: Pick<PageProps<"/admin/skills/[id]/assessments/[assessmentId]">, "params">) {
  const { id, assessmentId } = await params;
  if (!UUID.test(id) || !UUID.test(assessmentId)) notFound();
  const { supabase } = await requireAdmin();
  const [{ data: assessment }, { data: key }] = await Promise.all([
    supabase
      .from("skill_assessments")
      .select("id, kind, title, instructions, questions, pass_threshold, retry_after_hours, is_published, skill:skills(id, name)")
      .eq("id", assessmentId)
      .eq("skill_id", id)
      .maybeSingle(),
    supabase.from("skill_assessment_answers").select("answer_key").eq("assessment_id", assessmentId).maybeSingle(),
  ]);
  if (!assessment || !assessment.skill) notFound();
  const isQuiz = assessment.kind === "quiz";
  const questions = parseQuestions(assessment.questions);

  return (
    <div className="flex flex-col gap-8">
      <Link href={`/admin/skills/${id}`} className="inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Back to {assessment.skill.name}
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-title text-content">{assessment.title}</h1>
          <Badge tone={assessment.is_published ? "success" : "neutral"}>{assessment.is_published ? "Published" : "Draft"}</Badge>
        </div>
        <p className="text-content-2">
          {isQuiz ? "Quiz" : "Portfolio review"} for {assessment.skill.name}.{" "}
          {assessment.is_published
            ? "People can take it while the skill is published."
            : "Nobody can take it until you publish it."}
        </p>
        <PublishAssessment id={assessment.id} published={assessment.is_published} />
      </div>

      {/* One column on phones. From lg the questions sit beside the settings. */}
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start lg:gap-10 xl:gap-12">
        <section aria-labelledby="questions-heading" className="flex flex-col gap-4 border-t border-line pt-6">
          {isQuiz ? (
            <>
              <div className="flex flex-col gap-1">
                <h2 id="questions-heading" className="text-subtitle text-content">
                  Questions and answers
                </h2>
                <p className="text-sm text-content-2">
                  Learners see the questions and options only. The right answers are stored apart, readable by admins, and
                  the result never says which answers were right. Write original questions with one clearly right option.
                </p>
              </div>
              <QuestionEditor assessmentId={assessment.id} questions={questions} answerKey={parseAnswerKey(key?.answer_key)} />
            </>
          ) : (
            <>
              <h2 id="questions-heading" className="text-subtitle text-content">
                How portfolios are reviewed
              </h2>
              <p className="text-content-2">
                People send a https link and an optional note. Skill reviewers and admins see it at{" "}
                <Link href="/skills/reviews" className="text-content-link underline">
                  /skills/reviews
                </Link>
                , approve it (which issues the skill) or send it back with a note. Use the instructions to say what the work
                must show.
              </p>
            </>
          )}
        </section>

        <section aria-labelledby="settings-heading" className="flex flex-col gap-4 border-t border-line pt-6">
          <h2 id="settings-heading" className="text-subtitle text-content">
            Settings
          </h2>
          <AssessmentSettingsForm assessment={assessment} />
          <form action={deleteAssessment} className="border-t border-line pt-4">
            <input type="hidden" name="id" value={assessment.id} />
            <input type="hidden" name="skill_id" value={id} />
            <p className="mb-2 text-sm text-content-2">
              Deleting removes the assessment and its attempts. Badges already earned through it stay.
            </p>
            <Button type="submit" variant="ghost">
              Delete this assessment
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
