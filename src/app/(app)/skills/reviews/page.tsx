import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail } from "@/components/ui/layout";
import { createClient } from "@/lib/supabase/server";
import { formatWhen } from "@/lib/skills/assessment";
import { getMyReviewerStatus } from "@/lib/skills/queries";
import { reviewPortfolio } from "../actions";
import { ReviewForm } from "./review-form";

export const metadata: Metadata = { title: "Portfolio reviews", robots: { index: false } };

export default function ReviewsPage() {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <ReviewQueue />
    </Suspense>
  );
}

type QueueRow = {
  attempt_id: string;
  skill_name: string;
  profile_id: string;
  display_name: string | null;
  public_slug: string | null;
  status: string;
  portfolio_url: string;
  portfolio_note: string | null;
  review_note: string | null;
  reviewed_at: string | null;
  submitted_at: string;
};

/**
 * Skill reviewers (appointed by an admin) and admins only. A staff tool, so
 * everyone else gets a 404, as in the admin area (founder decision D6).
 */
async function ReviewQueue() {
  const { userId, reviewer } = await getMyReviewerStatus();
  if (!reviewer) notFound();

  const supabase = await createClient();
  const [pending, reviewed] = await Promise.all([
    supabase.from("portfolio_review_queue").select("*").eq("status", "pending_review").order("submitted_at").limit(100),
    supabase
      .from("portfolio_review_queue")
      .select("*")
      .in("status", ["approved", "rejected"])
      .order("reviewed_at", { ascending: false })
      .limit(20),
  ]);
  if (pending.error) throw new Error(`Could not load the review queue: ${pending.error.message}`);
  if (reviewed.error) throw new Error(`Could not load past reviews: ${reviewed.error.message}`);
  const clean = (rows: typeof pending.data) =>
    (rows ?? []).flatMap((r) =>
      r.attempt_id && r.skill_name && r.profile_id && r.status && r.portfolio_url && r.submitted_at
        ? [{ ...r, attempt_id: r.attempt_id, skill_name: r.skill_name, profile_id: r.profile_id, status: r.status, portfolio_url: r.portfolio_url, submitted_at: r.submitted_at } as QueueRow]
        : [],
    );
  const waiting = clean(pending.data);
  const done = clean(reviewed.data);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex max-w-reading flex-col gap-2">
        <h1 className="text-title text-content">Portfolio reviews</h1>
        <p className="text-lead text-content-2">
          People who already have a skill send their work here instead of taking the path. Approve it and the verified badge
          is added to their profile.
        </p>
      </header>
      <MainWithRail
        railLabel="Reviewing well"
        rail={
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5 text-sm text-content-2">
            <h2 className="text-h3 text-content">Reviewing well</h2>
            <p>
              <span className="text-h3 text-content">{waiting.length}</span> waiting
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Open the link and check the work shows the skill on the skill page, not effort alone.</li>
              <li>Approve only work you are confident the person did.</li>
              <li>When you send work back, say what to improve. The person sees your note.</li>
              <li>You cannot review your own work; another reviewer will.</li>
            </ul>
          </div>
        }
      >
        <section aria-labelledby="waiting-heading" className="flex flex-col gap-4">
          <h2 id="waiting-heading" className="text-subtitle text-content">
            Waiting for review
          </h2>
          {waiting.length === 0 ? (
            <div className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
              <p className="font-semibold text-content">Nothing is waiting.</p>
              <p className="mt-1">New submissions appear here, oldest first, as people send their work.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {waiting.map((r) => (
                <li key={r.attempt_id} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4 xl:p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-content">
                      {r.skill_name}
                      <span className="font-normal text-content-2"> from {personName(r)}</span>
                    </p>
                    <p className="text-sm text-content-3">Sent {formatWhen(r.submitted_at)}</p>
                  </div>
                  <a
                    href={r.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow ugc"
                    className="inline-flex min-h-11 items-center gap-2 self-start break-all font-semibold text-content-link underline"
                  >
                    {r.portfolio_url}
                    <ExternalLink aria-hidden className="size-4 shrink-0" />
                  </a>
                  {r.portfolio_note && <p className="whitespace-pre-line text-content">{r.portfolio_note}</p>}
                  {r.profile_id === userId ? (
                    <p className="text-sm text-content-2">This is your own submission. Another reviewer will check it.</p>
                  ) : (
                    <ReviewForm attemptId={r.attempt_id} action={reviewPortfolio.bind(null, r.attempt_id)} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="done-heading" className="flex flex-col gap-4">
          <h2 id="done-heading" className="text-subtitle text-content">
            Recently reviewed
          </h2>
          {done.length === 0 ? (
            <p className="rounded-lg border border-line p-5 text-content-2">Reviews you and other reviewers make appear here.</p>
          ) : (
            <DataTable
              caption="Recently reviewed portfolios"
              rows={done}
              rowKey={(r) => r.attempt_id}
              columns={[
                { header: "Skill", cell: (r) => <span className="font-semibold text-content">{r.skill_name}</span> },
                { header: "Person", cell: (r) => personName(r), phone: "hide" },
                {
                  header: "Decision",
                  cell: (r) => (
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${r.status === "approved" ? "bg-success-bg text-success-fg" : "bg-surface-sunken text-content-2"}`}
                    >
                      {r.status === "approved" ? "Approved" : "Sent back"}
                    </span>
                  ),
                },
                { header: "Reviewed", cell: (r) => (r.reviewed_at ? formatWhen(r.reviewed_at) : ""), align: "end", phone: "hide" },
              ]}
            />
          )}
        </section>
      </MainWithRail>
    </div>
  );
}

function personName(r: QueueRow) {
  const name = r.display_name?.trim() || "A learner";
  return r.public_slug ? (
    <Link href={`/u/${r.public_slug}`} className="text-content-link underline">
      {name}
    </Link>
  ) : (
    name
  );
}
