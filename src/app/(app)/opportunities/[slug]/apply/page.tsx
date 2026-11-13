import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "@/components/ui/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { ApplyForm } from "./apply-form";
import { matchingForEmployers } from "@/lib/matching/flags";

export const metadata: Metadata = { title: "Apply", robots: { index: false } };

/**
 * Apply on SydCrest (#306). What the employer sees: name, region, verified
 * skills, public profile, this note and the portfolio link; phone and email
 * only once shortlisted.
 */
async function Apply({ params }: { params: PageProps<"/opportunities/[slug]/apply">["params"] }) {
  const user = await requireUser();
  const { slug } = await params;
  const supabase = await createClient();
  const { data: o } = await supabase
    .from("opportunities")
    .select("id, slug, title, organisation_name, apply_on_sydcrest, status, deadline")
    .eq("slug", slug)
    .maybeSingle();
  if (!o || o.status !== "open" || !o.apply_on_sydcrest) notFound();
  const [{ data: existing }, { data: listing }] = await Promise.all([
    supabase.from("opportunity_applications").select("id").eq("opportunity_id", o.id).eq("profile_id", user.id).maybeSingle(),
    supabase.from("talent_listings").select("portfolio_url").eq("profile_id", user.id).maybeSingle(),
  ]);
  if (existing) redirect("/opportunities/applications");
  return (
    <>
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-content-3">{o.organisation_name}</p>
        <h1 className="text-title text-content">Apply: {o.title}</h1>
        <p className="text-content-2">
          {o.organisation_name} will see your name, region, verified skills, public profile if you have one, and what you
          write below. Your phone and email are shared only if they shortlist you.
        </p>
      </header>
      <ApplyForm
        opportunityId={o.id}
        slug={o.slug}
        organisation={o.organisation_name}
        defaultPortfolio={listing?.portfolio_url ?? null}
        canShareReadiness={matchingForEmployers()}
      />
      <p className="text-sm text-content-3">
        <Link href={`/opportunities/${o.slug}`}>Back to the listing</Link>
      </p>
    </>
  );
}

export default function ApplyPage({ params }: PageProps<"/opportunities/[slug]/apply">) {
  return (
    <div className="flex max-w-reading flex-col gap-6">
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Apply params={params} />
      </Suspense>
    </div>
  );
}
