import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { Card, Pill } from "@/components/mentor/fields";
import { AssignReviewForm } from "@/components/mentor/forms";
import { GradeSubmissionForm } from "@/components/cohort/submission";
import { RubricScores, Work } from "@/components/mentor/work";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { nameOf, requireStaff, shortDate, type RosterRow } from "@/lib/mentor/data";
import { parseCriteria, rubricForWeek } from "@/lib/mentor/progress";
import { assignPeerReview } from "../../actions";

export const metadata: Metadata = { title: "Review work", robots: { index: false } };

const STATUS_COPY: Record<string, string> = {
  submitted: "Waiting for review",
  ai_reviewed: "AI review ready",
  returned: "Returned for changes",
  graded: "Graded",
};

export default function SubmissionPage({ params }: PageProps<"/mentor/submissions/[id]">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Review params={params} />
    </Suspense>
  );
}

type AiFeedback = { summary?: unknown; criteria?: unknown };

type GradableStatus = "submitted" | "ai_reviewed" | "returned" | "graded";

/** Sent work can be graded (or re graded); a draft never reaches a mentor. */
function isGradable(status: string): status is GradableStatus {
  return status === "submitted" || status === "ai_reviewed" || status === "returned" || status === "graded";
}

async function Review({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { cohorts, supabase } = await requireStaff();
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  // RLS: staff of the learner's cohorts (past or present) and admins only.
  const { data: sub } = await supabase
    .from("submissions")
    .select(
      "id, profile_id, program_id, program_week_id, cohort_id, status, attempt, body_text, link_url, file_path, ai_feedback, ai_score, mentor_feedback, final_score, graded_at, submitted_at",
    )
    .eq("id", id)
    .maybeSingle();
  if (!sub) notFound();

  const [{ data: week }, { data: rubrics }, { data: program }, { data: reviews }, { data: roster }, file] = await Promise.all([
    supabase.from("program_weeks").select("id, week_number, theme, is_capstone, assignment").eq("id", sub.program_week_id).single(),
    supabase.from("rubrics").select("program_week_id, title, criteria").eq("program_id", sub.program_id),
    supabase.from("programs").select("pass_score").eq("id", sub.program_id).single(),
    supabase.from("peer_reviews").select("id, reviewer_id, status, rubric_scores, comment, submitted_at").eq("submission_id", sub.id),
    supabase.from("cohort_roster").select("*").eq("role", "learner"),
    sub.file_path ? supabase.storage.from("submissions").createSignedUrl(sub.file_path, 60 * 10) : Promise.resolve(null),
  ]);

  const people = (roster ?? []) as RosterRow[];
  const author = people.find((p) => p.profile_id === sub.profile_id);
  const nameById = new Map(people.map((p) => [p.profile_id, nameOf(p)]));
  const rubric = rubricForWeek(rubrics ?? [], sub.program_week_id);
  const criteria = parseCriteria(rubric?.criteria);
  const ai = (sub.ai_feedback ?? null) as AiFeedback | null;
  const aiCriteria = Array.isArray(ai?.criteria) ? (ai.criteria as { id?: string; points?: number; comment?: string }[]) : [];

  // Reviewers: active learners in this programme's cohorts that the caller can see, never the author.
  const programCohorts = new Set(cohorts.filter((c) => c.program.id === sub.program_id).map((c) => c.id));
  const assigned = new Set((reviews ?? []).map((r) => r.reviewer_id));
  const candidates = [
    ...new Map(
      people
        .filter((p) => programCohorts.has(p.cohort_id) && p.status === "active" && p.profile_id !== sub.profile_id && !assigned.has(p.profile_id))
        .map((p) => [p.profile_id, { id: p.profile_id, name: nameOf(p) }]),
    ).values(),
  ].sort((a, b) => a.name.localeCompare(b.name));

  const backHref = `/mentor?cohort=${sub.cohort_id}`;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <Link href={backHref} className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold text-content-2 hover:text-content">
          <ChevronLeft aria-hidden="true" className="size-4" />
          Mentor console
        </Link>
        <h1 className="text-title text-content">
          {nameOf(author)}, week {week?.week_number}
        </h1>
        <p className="text-lead text-content-2">
          {week ? displayTheme(week.theme) : ""}
          {week?.is_capstone ? ". Capstone." : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          <Pill tone={sub.status === "graded" ? "success" : sub.status === "returned" ? "warning" : "info"}>{STATUS_COPY[sub.status] ?? sub.status}</Pill>
          {sub.final_score !== null && <Pill tone="success">Final score {sub.final_score}</Pill>}
          <Pill>Attempt {sub.attempt}</Pill>
          {sub.submitted_at && <Pill>Sent {shortDate(sub.submitted_at)}</Pill>}
        </div>
      </header>

      <MainWithRail
        railLabel="Grade and peer review"
        sticky
        rail={
          <>
            {isGradable(sub.status) && (
              <Card title={sub.status === "graded" ? "Change the grade" : "Grade"}>
                <GradeSubmissionForm
                  submissionId={sub.id}
                  suggestedScore={sub.final_score ?? sub.ai_score}
                  mentorFeedback={sub.mentor_feedback}
                  passScore={program?.pass_score ?? 60}
                  status={sub.status}
                />
              </Card>
            )}
            {week?.is_capstone && (
              <Card title="Peer review">
                <p className="text-sm text-content-2">
                  Assign at least one other learner to review this capstone. The reviewer sees the work, never the author&apos;s scores.
                </p>
                <AssignReviewForm action={assignPeerReview.bind(null, sub.id)} candidates={candidates} />
              </Card>
            )}
          </>
        }
      >
        {week?.assignment && (
          <section aria-labelledby="brief-heading" className="flex flex-col gap-2">
            <h2 id="brief-heading" className="text-subtitle text-content">
              The assignment
            </h2>
            <p className="max-w-reading whitespace-pre-line text-content-2">{week.assignment}</p>
          </section>
        )}

        <section aria-labelledby="work-heading" className="flex flex-col gap-3">
          <h2 id="work-heading" className="text-subtitle text-content">
            The work
          </h2>
          <Work bodyText={sub.body_text} linkUrl={sub.link_url} hasFile={!!sub.file_path} fileUrl={file?.data?.signedUrl ?? null} />
        </section>

        <section aria-labelledby="ai-heading" className="flex flex-col gap-3">
          <h2 id="ai-heading" className="text-subtitle text-content">
            AI review
          </h2>
          {ai ? (
            <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
              {sub.ai_score !== null && <p className="font-semibold text-content">Suggested score {sub.ai_score}</p>}
              {typeof ai.summary === "string" && <p className="whitespace-pre-line text-content-2">{ai.summary}</p>}
              {aiCriteria.length > 0 && (
                <ul className="flex flex-col gap-2 text-sm">
                  {aiCriteria.map((c, i) => (
                    <li key={c.id ?? i}>
                      <span className="font-semibold text-content">
                        {criteria.find((k) => k.id === c.id)?.label ?? c.id}
                        {typeof c.points === "number" ? `: ${c.points}` : ""}
                      </span>
                      {c.comment ? <span className="text-content-2">. {c.comment}</span> : null}
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-sm text-content-3">A suggestion only. Your grade is the one that counts.</p>
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-line-strong bg-surface-sunken p-4 text-sm text-content-2">
              No AI review for this attempt yet. You can grade without it.
            </p>
          )}
        </section>

        {(reviews ?? []).length > 0 && (
          <section aria-labelledby="peer-heading" className="flex flex-col gap-3">
            <h2 id="peer-heading" className="text-subtitle text-content">
              Peer reviews
            </h2>
            <ul className="grid gap-3 xl:grid-cols-2">
              {(reviews ?? []).map((r) => (
                <li key={r.id} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-content">{nameById.get(r.reviewer_id) ?? "A learner"}</span>
                    <Pill tone={r.status === "submitted" ? "success" : "neutral"}>{r.status === "submitted" ? "Submitted" : "Assigned"}</Pill>
                  </div>
                  {r.status === "submitted" && (
                    <>
                      <RubricScores criteria={criteria} scores={(r.rubric_scores ?? {}) as Record<string, unknown>} />
                      {r.comment && <p className="whitespace-pre-line text-sm text-content-2">{r.comment}</p>}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </MainWithRail>
    </div>
  );
}
