import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { Card, Pill } from "@/components/mentor/fields";
import { PeerReviewForm } from "@/components/mentor/peer-review-form";
import { Work } from "@/components/mentor/work";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { requireUser } from "@/lib/auth";
import { parseCriteria, rubricForWeek } from "@/lib/mentor/progress";
import { createClient } from "@/lib/supabase/server";
import { submitPeerReview } from "../actions";

export const metadata: Metadata = { title: "Peer review", robots: { index: false } };

export default function PeerReviewPage({ params }: PageProps<"/cohort/reviews/[reviewId]">) {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/cohort/reviews" className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold text-content-2 hover:text-content">
        <ChevronLeft aria-hidden="true" className="size-4" />
        Peer reviews
      </Link>
      <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Review params={params} />
      </Suspense>
    </div>
  );
}

async function Review({ params }: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await params;
  await requireUser();
  if (!/^[0-9a-f-]{36}$/i.test(reviewId)) notFound();
  const supabase = await createClient();

  // Only the assigned reviewer gets a row; the view carries the work and never its author or scores.
  const { data: row } = await supabase.from("peer_review_submissions").select("*").eq("review_id", reviewId).maybeSingle();
  if (!row?.program_id || !row.program_week_id) notFound();

  const [{ data: week }, { data: rubrics }, file] = await Promise.all([
    supabase.from("program_weeks").select("week_number, theme, assignment").eq("id", row.program_week_id).single(),
    supabase.from("rubrics").select("program_week_id, title, criteria").eq("program_id", row.program_id),
    row.file_path ? supabase.storage.from("submissions").createSignedUrl(row.file_path, 60 * 10) : Promise.resolve(null),
  ]);
  const rubric = rubricForWeek(rubrics ?? [], row.program_week_id);
  const criteria = parseCriteria(rubric?.criteria);
  const submitted = row.review_status === "submitted";

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="text-title text-content">Review a classmate&apos;s capstone</h1>
        <p className="text-lead text-content-2">
          Week {week?.week_number}: {week ? displayTheme(week.theme) : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {submitted ? <Pill tone="success">Sent</Pill> : <Pill tone="info">To do</Pill>}
          {rubric && <Pill>{rubric.title}</Pill>}
        </div>
      </header>
      <MainWithRail
        railLabel="Your review"
        sticky
        rail={
          <Card title={submitted ? "Your review" : "Write your review"}>
            <PeerReviewForm
              action={submitPeerReview.bind(null, reviewId)}
              criteria={criteria}
              scores={(row.rubric_scores ?? {}) as Record<string, unknown>}
              comment={row.comment}
              submitted={submitted}
            />
          </Card>
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
            Their work
          </h2>
          <Work bodyText={row.body_text} linkUrl={row.link_url} hasFile={!!row.file_path} fileUrl={file?.data?.signedUrl ?? null} />
        </section>
      </MainWithRail>
    </>
  );
}
