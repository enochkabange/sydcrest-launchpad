import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { DataTable, MainWithRail } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { appointReviewer, removeReviewer } from "./actions";
import { AppointReviewerForm } from "./forms";

export const metadata: Metadata = { title: "Portfolio reviewers" };

/**
 * Who reviews portfolios for verified skills (issue #248, founder decision
 * D3). Admins always can; this page appoints a small trusted group besides.
 */
export default function SkillReviewersPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex max-w-reading flex-col gap-2">
        <Link href="/admin/skills" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link">
          Skills
        </Link>
        <h1 className="text-title text-content">Portfolio reviewers</h1>
        <p className="text-lead text-content-2">
          People who already have a skill can send their work instead of taking the path. Reviewers approve it or send it
          back at{" "}
          <Link href="/skills/reviews" className="text-content-link underline">
            Portfolio reviews
          </Link>
          . Admins review too.
        </p>
      </header>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Reviewers />
      </Suspense>
    </div>
  );
}

type Row = { profile_id: string; display_name: string | null; public_slug: string | null };

async function Reviewers() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc("admin_skill_reviewers");
  if (error) throw new Error(`Could not load reviewers: ${error.message}`);
  const rows: Row[] = data ?? [];
  const name = (r: Row) => r.display_name?.trim() || "A SydCrest member";

  return (
    <MainWithRail
      railLabel="Appoint a reviewer"
      rail={
        <div className="flex flex-col gap-4 rounded-lg border border-line p-5">
          <h2 className="text-subtitle text-content">Appoint a reviewer</h2>
          <p className="text-sm text-content-2">
            Choose people you trust to judge the work against the skill page. They see Portfolio reviews in their Learn
            menu and cannot review their own work.
          </p>
          <AppointReviewerForm action={appointReviewer} />
        </div>
      }
    >
      {rows.length === 0 ? (
        <div className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5 xl:p-6">
          <h2 className="text-subtitle text-content">No reviewers appointed yet</h2>
          <p className="max-w-reading text-content-2">
            Until you appoint someone, only admins review portfolios. Appoint a reviewer with their sign in email.
          </p>
        </div>
      ) : (
        <DataTable
          caption="Appointed portfolio reviewers"
          rows={rows}
          rowKey={(r) => r.profile_id}
          columns={[
            {
              header: "Name",
              cell: (r) =>
                r.public_slug ? (
                  <Link href={`/u/${r.public_slug}`} className="font-semibold text-content-link underline">
                    {name(r)}
                  </Link>
                ) : (
                  <span className="font-semibold text-content">{name(r)}</span>
                ),
            },
            {
              header: "Actions",
              align: "end",
              cell: (r) => (
                <form action={removeReviewer.bind(null, r.profile_id)}>
                  <Button type="submit" variant="ghost">
                    Remove<span className="sr-only"> {name(r)}</span>
                  </Button>
                </form>
              ),
            },
          ]}
        />
      )}
    </MainWithRail>
  );
}
