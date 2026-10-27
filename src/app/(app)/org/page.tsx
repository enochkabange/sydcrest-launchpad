import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { AutoGrid, MainWithRail } from "@/components/ui/layout";
import { ActionButton } from "@/components/business/action-button";
import { Badge, Panel, Skeleton, VerificationBadge } from "@/components/business/bits";
import { getMyMemberships } from "@/lib/organisations/queries";
import { orgKindLabel, orgRoleLabel } from "@/lib/organisations/forms";
import { regionLabel } from "@/lib/regions";
import { acceptInvite, leaveOrganisation } from "./actions";

export const metadata: Metadata = { title: "Your organisations" };

async function Organisations() {
  const memberships = await getMyMemberships();
  const active = memberships.filter((m) => m.status === "active");
  const invites = memberships.filter((m) => m.status === "invited");

  return (
    <>
      {invites.length > 0 && (
        <section aria-labelledby="invites-heading" className="flex flex-col gap-3">
          <h2 id="invites-heading" className="text-subtitle text-content">
            Invitations
          </h2>
          <ul className="flex flex-col gap-3">
            {invites.map((m) => (
              <li
                key={m.organisation.id}
                className="flex flex-col gap-3 rounded-lg border border-info-fg/30 bg-info-bg p-4 md:flex-row md:items-center md:justify-between"
              >
                <p className="text-content">
                  <span className="font-semibold">{m.organisation.name}</span> invited you to join as{" "}
                  {orgRoleLabel(m.role).toLowerCase()}.
                </p>
                <div className="flex flex-wrap gap-2">
                  <ActionButton
                    action={acceptInvite.bind(null, m.organisation.id, m.organisation.slug)}
                    label="Accept"
                    pendingLabel="Joining…"
                    variant="primary"
                  />
                  <ActionButton action={leaveOrganisation.bind(null, m.organisation.id)} label="Decline" variant="ghost" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="orgs-heading" className="flex flex-col gap-3">
        <h2 id="orgs-heading" className="text-subtitle text-content">
          Organisations you act for
        </h2>
        {active.length === 0 ? (
          <Panel tone="sunken">
            <p className="max-w-reading text-content-2">
              You are not part of a business account yet. Create one for your organisation, or ask a colleague who
              owns one to invite you.
            </p>
            <Link href="/business/new" className={buttonClasses("primary", "self-start")}>
              Create a business account
            </Link>
          </Panel>
        ) : (
          <AutoGrid min="lg" as="ul">
            {active.map((m) => (
              <li key={m.organisation.id} className="relative flex flex-col gap-3 rounded-lg border border-line p-5 transition-colors hover:bg-surface-sunken">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-h3 text-content">
                    <Link href={`/org/${m.organisation.slug}/manage`} className="after:absolute after:inset-0 after:content-['']">
                      {m.organisation.name}
                    </Link>
                  </h3>
                  <VerificationBadge status={m.organisation.verification_status} />
                </div>
                <p className="text-sm text-content-2">
                  {[orgKindLabel(m.organisation.kind), regionLabel(m.organisation.region)].filter(Boolean).join(" · ")}
                </p>
                <Badge>{`You are ${orgRoleLabel(m.role).toLowerCase()}`}</Badge>
              </li>
            ))}
          </AutoGrid>
        )}
      </section>
    </>
  );
}

export default function OrganisationsPage() {
  return (
    <MainWithRail
      railLabel="About business accounts"
      rail={
        <Panel title="Hiring through SydCrest" tone="sunken">
          <p className="text-sm text-content-2">
            Verified organisations post opportunities and browse the talent directory: certified learners who chose
            to be found. Learners decide whether to share contact details.
          </p>
          <Link href="/business/new" className={buttonClasses("secondary", "self-start")}>
            Create another
          </Link>
        </Panel>
      }
    >
      <h1 className="text-title text-content">Your organisations</h1>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <Organisations />
      </Suspense>
    </MainWithRail>
  );
}
