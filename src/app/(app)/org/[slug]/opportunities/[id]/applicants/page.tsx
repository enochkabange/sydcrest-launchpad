import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "@/components/ui/link";
import { Panel, Skeleton } from "@/components/business/bits";
import { regionLabel } from "@/lib/regions";
import { sharesContact, stageCopy } from "@/lib/opportunities/applications";
import { getOrgForMember } from "@/lib/organisations/queries";
import { createClient } from "@/lib/supabase/server";
import { StageForm } from "./stage-form";

export const metadata: Metadata = { title: "Applicants", robots: { index: false } };

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "Africa/Accra" });

/**
 * Applicants for one listing (#306). org_opportunity_applicants returns rows
 * only to the organisation's owners, admins and recruiters (and platform
 * admins), with phone and email from shortlisted on.
 */
async function Applicants({ params }: { params: PageProps<"/org/[slug]/opportunities/[id]/applicants">["params"] }) {
  const { slug, id } = await params;
  const { org } = await getOrgForMember(slug);
  const supabase = await createClient();
  const { data: o } = await supabase
    .from("opportunities")
    .select("id, title, apply_on_sydcrest")
    .eq("id", id)
    .eq("organisation_id", org.id)
    .maybeSingle();
  if (!o) notFound();
  const { data: rows, error } = await supabase.rpc("org_opportunity_applicants", { p_opportunity_id: o.id });
  if (error) throw new Error(`Could not load applicants: ${error.message}`);
  const path = `/org/${org.slug}/opportunities/${o.id}/applicants`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-content-3">
          <Link href={`/org/${org.slug}/opportunities`}>Opportunities</Link>
        </p>
        <h2 className="text-subtitle text-content">Applicants: {o.title}</h2>
        <p className="max-w-reading text-content-2">
          Move people through the stages; each change tells them in their notifications. Phone and email appear once you
          shortlist someone. Marking someone hired is final and records the job for SydCrest to verify.
        </p>
      </div>
      {!o.apply_on_sydcrest && (
        <Panel tone="sunken">
          <p className="text-content-2">This listing does not take applications on SydCrest, so no new ones will arrive.</p>
        </Panel>
      )}
      {rows.length === 0 ? (
        <Panel tone="sunken">
          <p className="text-content-2">No applications yet.</p>
        </Panel>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((a) => (
            <li key={a.application_id} className="flex flex-col gap-3 rounded-lg border border-line p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <h3 className="text-h3 text-content">
                    {a.public_slug ? <Link href={`/u/${a.public_slug}`}>{a.display_name}</Link> : a.display_name}
                  </h3>
                  <p className="text-sm text-content-3">
                    {[a.region ? `${regionLabel(a.region)} Region` : null, `applied ${dateFormat.format(new Date(a.applied_at))}`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <span className="rounded-full bg-surface-sunken px-3 py-1 text-sm font-semibold text-content">{stageCopy(a.stage).label}</span>
              </div>
              {a.verified_skills.length > 0 && (
                <p className="text-sm text-content-2">
                  <span className="font-semibold text-content">Verified skills:</span> {a.verified_skills.join(", ")}
                </p>
              )}
              <p className="max-w-reading whitespace-pre-line text-content-2">{a.note}</p>
              {a.portfolio_url && (
                <a href={a.portfolio_url} target="_blank" rel="noopener noreferrer nofollow" className="self-start text-sm font-semibold">
                  Portfolio<span className="sr-only"> of {a.display_name} (opens in a new tab)</span>
                </a>
              )}
              {sharesContact(a.stage) && (a.phone || a.email) && (
                <p className="text-sm text-content">
                  <span className="font-semibold">Contact:</span> {[a.phone, a.email].filter(Boolean).join(" · ")}
                </p>
              )}
              <StageForm applicationId={a.application_id} name={a.display_name ?? "this applicant"} stage={a.stage} path={path} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ApplicantsPage({ params }: PageProps<"/org/[slug]/opportunities/[id]/applicants">) {
  return (
    <Suspense fallback={<Skeleton className="h-80" />}>
      <Applicants params={params} />
    </Suspense>
  );
}
