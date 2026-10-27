import { Suspense } from "react";
import Link from "@/components/ui/link";
import { VerificationBadge } from "@/components/business/bits";
import { getOrgForMember } from "@/lib/organisations/queries";
import { orgRoleLabel } from "@/lib/organisations/forms";
import { OrgTabs } from "./org-tabs";

/**
 * The member area of one organisation (issue #161). Only its active members
 * get past getOrgForMember (everyone else sees a 404). The header reads the
 * session, so it streams in its own Suspense island.
 */
async function OrgHeader({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { org, role } = await getOrgForMember(slug);
  return (
    <header className="flex flex-col gap-4">
      <Link href="/org" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-2 hover:text-content">
        Your organisations
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-title text-content">{org.name}</h1>
        <VerificationBadge status={org.verification_status} />
      </div>
      <p className="text-sm text-content-2">You are {orgRoleLabel(role).toLowerCase()} here.</p>
      <OrgTabs slug={org.slug} publicHref={org.verification_status === "verified" ? `/org/${org.slug}` : null} />
    </header>
  );
}

export default function OrgLayout({ children, params }: LayoutProps<"/org/[slug]">) {
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<div className="h-40 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <OrgHeader params={params} />
      </Suspense>
      {children}
    </div>
  );
}
