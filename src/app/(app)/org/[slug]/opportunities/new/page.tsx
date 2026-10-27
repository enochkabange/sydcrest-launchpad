import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { Panel, Skeleton } from "@/components/business/bits";
import { getOrgForMember } from "@/lib/organisations/queries";

export const metadata: Metadata = { title: "Post an opportunity", robots: { index: false } };

// A dynamic segment under the app shell, whose nav reads usePathname() outside
// Suspense: allow blocking, as /learn/[slug]/[node] does, until the shell wraps it.
export const instant = false;

/**
 * Placeholder (issue #161): the posting form is OpportunityForm from
 * src/components/opportunities/, built with the opportunities board. Once it
 * is on main, mount it here with this organisation's id.
 */
async function NewOpportunity({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { org } = await getOrgForMember(slug);
  return (
    <Panel title="Posting is nearly here" tone="sunken">
      <p className="max-w-reading text-content-2">
        The posting form arrives with the opportunities board. When it does, you will post here under {org.name}, and open
        posts will show on your public page and the board.
      </p>
      <Link href={`/org/${org.slug}/opportunities`} className={buttonClasses("secondary", "self-start")}>
        Back to opportunities
      </Link>
    </Panel>
  );
}

export default function NewOpportunityPage({ params }: PageProps<"/org/[slug]/opportunities/new">) {
  return (
    <Suspense fallback={<Skeleton className="h-48" />}>
      <NewOpportunity params={params} />
    </Suspense>
  );
}
