import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail, rowLinkClass } from "@/components/ui/layout";
import { Card, EmptyState, Pill } from "@/components/mentor/fields";
import { displayTheme } from "@/components/marketing/curriculum-weeks";
import { requireUser } from "@/lib/auth";
import { shortDate } from "@/lib/mentor/data";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Peer reviews", robots: { index: false } };

export default function ReviewsPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-reading flex-col gap-2">
        <h1 className="text-title text-content">Peer reviews</h1>
        <p className="text-lead text-content-2">
          Your mentor assigns you a classmate&apos;s capstone to review against the rubric. Giving at least one review is part of
          earning your certificate.
        </p>
      </header>
      <Suspense fallback={<div aria-busy="true" className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Reviews />
      </Suspense>
    </div>
  );
}

async function Reviews() {
  const user = await requireUser();
  const supabase = await createClient();
  // The view returns only the caller's assignments, with the work and nothing about its author.
  const { data, error } = await supabase
    .from("peer_review_submissions")
    .select("review_id, review_status, assigned_at, program_id, program_week_id, submitted_at")
    .order("assigned_at", { ascending: false });
  if (error) throw new Error(`Could not load your peer reviews: ${error.message}`);
  const reviews = data ?? [];

  const weekIds = [...new Set(reviews.map((r) => r.program_week_id).filter((x): x is string => !!x))];
  const programIds = [...new Set(reviews.map((r) => r.program_id).filter((x): x is string => !!x))];
  const [{ data: weeks }, { data: programs }, { data: memberships }] = await Promise.all([
    weekIds.length
      ? supabase.from("program_weeks").select("id, week_number, theme").in("id", weekIds)
      : Promise.resolve({ data: [] as { id: string; week_number: number; theme: string }[] }),
    supabase.from("programs").select("id, title, min_peer_reviews").in("id", programIds.length ? programIds : ["00000000-0000-0000-0000-000000000000"]),
    supabase.from("cohort_members").select("cohort_id, cohorts!cohort_members_cohort_id_fkey!inner(program_id, programs!inner(id, title, min_peer_reviews))").eq("profile_id", user.id).eq("role", "learner"),
  ]);
  const weekById = new Map((weeks ?? []).map((w) => [w.id, w]));

  // Requirement per programme the learner is in, even before any assignment.
  const programMap = new Map<string, { title: string; min: number }>();
  for (const p of programs ?? []) programMap.set(p.id, { title: p.title, min: p.min_peer_reviews });
  for (const m of memberships ?? []) {
    const p = (m.cohorts as unknown as { programs: { id: string; title: string; min_peer_reviews: number } }).programs;
    programMap.set(p.id, { title: p.title, min: p.min_peer_reviews });
  }
  const todo = reviews.filter((r) => r.review_status === "assigned");

  return (
    <MainWithRail
      railLabel="Your requirement"
      rail={
        programMap.size > 0 ? (
          [...programMap.entries()].map(([id, p]) => {
            const done = reviews.filter((r) => r.program_id === id && r.review_status === "submitted").length;
            return (
              <Card key={id} title={p.title}>
                <p className="text-sm text-content-2">
                  {done} of {p.min} required {p.min === 1 ? "review" : "reviews"} given.
                </p>
                <div className="h-2 overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
                  <div className="h-full rounded-full bg-success-fg" style={{ width: `${Math.min(100, (done / Math.max(1, p.min)) * 100)}%` }} />
                </div>
                <p className="text-sm text-content-2">There is no waiver: every certified learner has reviewed a peer.</p>
              </Card>
            );
          })
        ) : (
          <Card title="How peer review works">
            <p className="text-sm text-content-2">
              When you are in a programme cohort, your mentor assigns you a classmate&apos;s capstone near the end. You score it
              against the same rubric your own work is marked on and leave a comment.
            </p>
          </Card>
        )
      }
    >
      <section aria-labelledby="todo-heading" className="flex flex-col gap-3">
        <h2 id="todo-heading" className="text-subtitle text-content">
          Reviews to do
        </h2>
        {todo.length === 0 ? (
          <EmptyState title={reviews.length ? "All your reviews are sent" : "No reviews assigned yet"}>
            {reviews.length
              ? "Thank you. You can still open a sent review below and update it."
              : "Your mentor assigns capstone reviews once classmates send their capstone work. They will show here."}
          </EmptyState>
        ) : null}
        {reviews.length > 0 && (
          <DataTable
            caption="Your peer review assignments"
            rowKey={(r) => r.review_id ?? ""}
            rows={[...todo, ...reviews.filter((r) => r.review_status !== "assigned")]}
            columns={[
              {
                header: "Work",
                cell: (r) => {
                  const w = r.program_week_id ? weekById.get(r.program_week_id) : undefined;
                  return (
                    <Link href={`/cohort/reviews/${r.review_id}`} className={`font-semibold text-content ${rowLinkClass}`}>
                      Week {w?.week_number}: {w ? displayTheme(w.theme) : "Capstone"}
                    </Link>
                  );
                },
              },
              { header: "Assigned", phone: "hide", cell: (r) => <span className="text-sm text-content-2">{r.assigned_at ? shortDate(r.assigned_at) : ""}</span> },
              {
                header: "Status",
                align: "end",
                cell: (r) => (r.review_status === "submitted" ? <Pill tone="success">Sent</Pill> : <Pill tone="info">To do</Pill>),
              },
            ]}
          />
        )}
      </section>
    </MainWithRail>
  );
}
