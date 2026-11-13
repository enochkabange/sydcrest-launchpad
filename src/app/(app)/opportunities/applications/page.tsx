import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { matchingForEmployers } from "@/lib/matching/flags";
import { canWithdraw, stageCopy } from "@/lib/opportunities/applications";
import { createClient } from "@/lib/supabase/server";
import { setReadinessSharing, withdrawOpportunityApplication } from "./actions";

export const metadata: Metadata = { title: "My applications" };

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Africa/Accra" });

/** The learner's applications made on SydCrest, newest first, with where each stands (#306). */
async function Applications({ searchParams }: { searchParams: PageProps<"/opportunities/applications">["searchParams"] }) {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data, error }, params] = await Promise.all([
    supabase
      .from("opportunity_applications")
      .select("id, stage, stage_changed_at, created_at, share_readiness, opportunities(slug, title, organisation_name)")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false }),
    searchParams,
  ]);
  if (error) throw new Error(`Could not load applications: ${error.message}`);
  const canShare = matchingForEmployers();
  return (
    <div className="flex flex-col gap-4">
      {params.sent === "1" && <Alert tone="success">Application sent. We will tell you in your notifications when it moves.</Alert>}
      {data.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">
          You have not applied on SydCrest yet. Listings marked Apply on SydCrest take applications here.{" "}
          <Link href="/opportunities">Browse opportunities</Link>
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {data.map((a) => {
            const stage = stageCopy(a.stage);
            return (
              <li key={a.id} className="flex flex-col gap-3 rounded-lg border border-line p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <Link href={`/opportunities/${a.opportunities?.slug}`} className="text-h3 font-semibold text-content">
                      {a.opportunities?.title}
                    </Link>
                    <span className="text-sm text-content-3">
                      {a.opportunities?.organisation_name} · applied {dateFormat.format(new Date(a.created_at))}
                    </span>
                  </div>
                  <span className="rounded-full bg-surface-sunken px-3 py-1 text-sm font-semibold text-content">{stage.label}</span>
                </div>
                <p className="text-content-2">{stage.learner}</p>
                {canShare && a.stage !== "withdrawn" && (
                  <form action={setReadinessSharing.bind(null, a.id, !a.share_readiness)} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-sm text-content-2">
                      {a.share_readiness
                        ? "You share your readiness band for this role with the employer."
                        : "You do not share your readiness band with this employer."}
                    </p>
                    <Button type="submit" variant="ghost" className="px-0">
                      {a.share_readiness ? "Stop sharing" : "Share my band"}
                    </Button>
                  </form>
                )}
                {canWithdraw(a.stage) && (
                  <form action={withdrawOpportunityApplication.bind(null, a.id)}>
                    <Button type="submit" variant="ghost" className="px-0">
                      Withdraw application
                    </Button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function MyApplicationsPage({ searchParams }: PageProps<"/opportunities/applications">) {
  return (
    <div className="flex max-w-reading flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">My applications</h1>
        <p className="text-lead text-content-2">
          Applications you sent on SydCrest. Only you and the employer you applied to can see them.{" "}
          <Link href="/opportunities/saved">Saved opportunities</Link>
        </p>
      </div>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Applications searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
