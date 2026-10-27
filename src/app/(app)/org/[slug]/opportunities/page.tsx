import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { Panel, Skeleton } from "@/components/business/bits";
import { OpportunityList } from "@/components/business/opportunity-list";
import { createClient } from "@/lib/supabase/server";
import { getOrgForMember } from "@/lib/organisations/queries";

export const metadata: Metadata = { title: "Opportunities", robots: { index: false } };

// A dynamic segment under the app shell, whose nav reads usePathname() outside
// Suspense: allow blocking, as /learn/[slug]/[node] does, until the shell wraps it.
export const instant = false;

async function Opportunities({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { org } = await getOrgForMember(slug);
  const verified = org.verification_status === "verified";
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("id, title, kind, status, deadline, location, is_remote")
    .eq("organisation_id", org.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load opportunities: ${error.message}`);
  const rows = data ?? [];

  return (
    <MainWithRail
      railLabel="Posting opportunities"
      rail={
        <Panel title="Posting" tone="sunken">
          {verified ? (
            <>
              <p className="text-sm text-content-2">
                Post jobs, internships, gigs, scholarships and grants under {org.name}. Learners apply the way you say: a
                link or instructions.
              </p>
              <Link href={`/org/${org.slug}/opportunities/new`} className={buttonClasses("primary", "self-start")}>
                Post an opportunity
              </Link>
            </>
          ) : (
            <p className="text-sm text-content-2">
              Posting opens once {org.name} is verified. Ask for verification from the{" "}
              <Link href={`/org/${org.slug}/manage`} className="font-semibold text-content-link underline">
                Overview
              </Link>
              .
            </p>
          )}
        </Panel>
      }
    >
      <section aria-labelledby="opps-heading" className="flex flex-col gap-4">
        <h2 id="opps-heading" className="text-subtitle text-content">
          Opportunities
        </h2>
        {rows.length === 0 ? (
          <Panel tone="sunken">
            <p className="max-w-reading text-content-2">
              Nothing posted yet. What you post appears here with its status, and open posts show on your public page.
            </p>
          </Panel>
        ) : (
          <OpportunityList rows={rows} showStatus />
        )}
      </section>
    </MainWithRail>
  );
}

export default function OrgOpportunitiesPage({ params }: PageProps<"/org/[slug]/opportunities">) {
  return (
    <Suspense fallback={<Skeleton className="h-80" />}>
      <Opportunities params={params} />
    </Suspense>
  );
}
