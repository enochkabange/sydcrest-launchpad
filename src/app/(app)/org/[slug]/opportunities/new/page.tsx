import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { Panel, Skeleton } from "@/components/business/bits";
import { OpportunityForm } from "@/components/opportunities/opportunity-form";
import { getOrgForMember } from "@/lib/organisations/queries";
import { createOrgOpportunity } from "../../actions";

export const metadata: Metadata = { title: "Post an opportunity", robots: { index: false } };

const POSTING_ROLES = new Set(["owner", "admin", "recruiter"]);

/**
 * Posting under the organisation (#161) with the shared OpportunityForm
 * (#177). Owners, admins and recruiters of a verified organisation post;
 * everyone else gets the reason instead of a form that would be refused.
 */
async function NewOpportunity({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { org, role } = await getOrgForMember(slug);
  const back = (
    <Link href={`/org/${org.slug}/opportunities`} className={buttonClasses("secondary", "self-start")}>
      Back to opportunities
    </Link>
  );

  if (org.verification_status !== "verified") {
    return (
      <Panel title="Posting opens once you are verified" tone="sunken">
        <p className="max-w-reading text-content-2">
          {org.name} can post jobs, internships, gigs, scholarships and grants after an admin verifies it. Ask for
          verification from the Overview.
        </p>
        {back}
      </Panel>
    );
  }
  if (!POSTING_ROLES.has(role)) {
    return (
      <Panel title="Ask a recruiter to post" tone="sunken">
        <p className="max-w-reading text-content-2">
          Owners, admins and recruiters of {org.name} post opportunities. Ask one of them to post this, or to give you the
          recruiter role.
        </p>
        {back}
      </Panel>
    );
  }

  return (
    <section aria-labelledby="new-opportunity-heading" className="flex flex-col gap-4">
      <div className="flex max-w-reading flex-col gap-1">
        <h2 id="new-opportunity-heading" className="text-subtitle text-content">
          Post an opportunity
        </h2>
        <p className="text-content-2">
          It is posted under {org.name}. Save it as a draft to finish later; open posts show on your public page and the
          opportunities board until their deadline.
        </p>
      </div>
      <OpportunityForm action={createOrgOpportunity.bind(null, org.id)} mode="organisation" />
    </section>
  );
}

export default function NewOpportunityPage({ params }: PageProps<"/org/[slug]/opportunities/new">) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <NewOpportunity params={params} />
    </Suspense>
  );
}
