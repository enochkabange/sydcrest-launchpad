import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { ActionButton } from "@/components/business/action-button";
import { Panel, Skeleton, formatDate } from "@/components/business/bits";
import { getOrgForMember } from "@/lib/organisations/queries";
import { canRequestVerification, orgKindLabel } from "@/lib/organisations/forms";
import { regionLabel } from "@/lib/regions";
import { requestVerification } from "../actions";
import { OrganisationProfileForm } from "./profile-form";

export const metadata: Metadata = { title: "Organisation", robots: { index: false } };

// A dynamic segment under the app shell, whose nav reads usePathname() outside
// Suspense: allow blocking, as /learn/[slug]/[node] does, until the shell wraps it.
export const instant = false;

type Params = { params: Promise<{ slug: string }> };

function VerificationPanel({
  org,
  canAsk,
}: {
  org: { id: string; verification_status: string; verification_note: string | null; verified_at: string | null };
  canAsk: boolean;
}) {
  const status = org.verification_status;
  return (
    <Panel title="Verification">
      {status === "verified" && (
        <p className="text-sm text-content-2">
          Verified on {formatDate(org.verified_at)}. You can post opportunities, browse the talent directory and your
          public page is live.
        </p>
      )}
      {status === "pending" && (
        <p className="text-sm text-content-2">
          Our team is checking your organisation. We look at your website, registration number and what you told us.
          You will see the result here.
        </p>
      )}
      {status === "unverified" && (
        <p className="text-sm text-content-2">
          Verified organisations can post opportunities and browse certified learners. Fill in your profile, then ask us
          to verify you. A registration number and website help us decide quickly.
        </p>
      )}
      {status === "rejected" && (
        <p className="text-sm text-content-2">We could not verify the organisation yet. Update your profile and ask again.</p>
      )}
      {status === "suspended" && (
        <p className="text-sm text-content-2">This organisation is suspended. Contact the SydCrest team to talk about it.</p>
      )}
      {org.verification_note && (status === "rejected" || status === "suspended") && (
        <p className="rounded-md border border-line bg-surface-sunken p-3 text-sm text-content">
          <span className="font-semibold">Note from our team: </span>
          {org.verification_note}
        </p>
      )}
      {canRequestVerification(status) &&
        (canAsk ? (
          <ActionButton action={requestVerification.bind(null, org.id)} label="Ask to be verified" pendingLabel="Sending…" variant="primary" />
        ) : (
          <p className="text-sm text-content-3">An owner or admin can ask for verification.</p>
        ))}
    </Panel>
  );
}

async function Overview({ params, searchParams }: Params & { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const { org, role } = await getOrgForMember(slug);
  const created = (await searchParams).created === "1";
  const canEdit = role === "owner" || role === "admin";
  const verified = org.verification_status === "verified";

  const nextSteps = [
    { href: `/org/${org.slug}/team`, label: "Invite your team", body: "Add owners, admins and recruiters." },
    { href: `/org/${org.slug}/opportunities`, label: "Post an opportunity", body: "Jobs, internships, gigs, scholarships and grants." },
    { href: "/talent", label: "Browse talent", body: "Certified learners who chose to be found." },
  ];

  return (
    <MainWithRail
      railLabel="Verification and next steps"
      rail={
        <>
          <VerificationPanel org={org} canAsk={canEdit} />
          <Panel title="Next steps" tone="sunken">
            <ul className="flex flex-col gap-1">
              {nextSteps.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="flex min-h-11 flex-col justify-center rounded-md px-2 py-2 hover:bg-surface">
                    <span className="font-semibold text-content-link">{s.label}</span>
                    <span className="text-sm text-content-2">{s.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {!verified && <p className="text-sm text-content-3">Posting and the talent directory open once you are verified.</p>}
          </Panel>
        </>
      }
    >
      {created && <Alert tone="success">Your business account is ready. You are its owner.</Alert>}
      <section aria-labelledby="profile-heading" className="flex max-w-2xl flex-col gap-4">
        <h2 id="profile-heading" className="text-subtitle text-content">
          Profile
        </h2>
        {canEdit ? (
          <OrganisationProfileForm
            organisationId={org.id}
            verified={verified}
            values={{
              name: org.name,
              slug: org.slug,
              kind: org.kind,
              description: org.description,
              website: org.website,
              region: org.region,
              registration_number: org.registration_number,
            }}
          />
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-content-3">Kind</dt>
              <dd className="text-content">{orgKindLabel(org.kind)}</dd>
            </div>
            <div>
              <dt className="text-sm text-content-3">Region</dt>
              <dd className="text-content">{regionLabel(org.region) ?? "Not set"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-content-3">About</dt>
              <dd className="whitespace-pre-line text-content">{org.description ?? "Not written yet."}</dd>
            </div>
            <p className="text-sm text-content-3 sm:col-span-2">Owners and admins edit the profile.</p>
          </dl>
        )}
        {verified && (
          <Link href={`/org/${org.slug}`} className={buttonClasses("secondary", "self-start")}>
            View public page
          </Link>
        )}
      </section>
    </MainWithRail>
  );
}

export default function ManageOrganisationPage({ params, searchParams }: PageProps<"/org/[slug]/manage">) {
  return (
    <Suspense fallback={<Skeleton className="h-[32rem]" />}>
      <Overview params={params} searchParams={searchParams} />
    </Suspense>
  );
}
