import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { Badge, Panel, formatDate } from "@/components/business/bits";
import { OpportunityList } from "@/components/business/opportunity-list";
import { Initials } from "@/components/social/profile-bits";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { getPublicOrganisation } from "@/lib/organisations/queries";
import { orgKindLabel } from "@/lib/organisations/forms";
import { regionLabel } from "@/lib/regions";

/**
 * A verified organisation's public page (issue #161). Reads only the
 * public_organisations view and open opportunities as the anon role, so a
 * signed in viewer never sees more than a stranger. Unverified organisations
 * are not public: their members are sent to the member area, everyone else
 * gets a 404.
 */
export async function generateMetadata({ params }: PageProps<"/org/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const org = await getPublicOrganisation(slug);
  if (!org?.name) return { title: "Organisation not found", robots: { index: false } };
  return {
    title: org.name,
    description: org.description?.slice(0, 160) ?? `${org.name} is a verified organisation hiring through SydCrest Launchpad.`,
    alternates: { canonical: `/org/${org.slug}` },
  };
}

/** Members of an organisation that is not public yet go to its member area. */
async function memberRedirect(slug: string) {
  const user = await getCurrentUser();
  if (!user) return;
  const supabase = await createClient();
  const { data } = await supabase.from("organisations").select("slug").eq("slug", slug.toLowerCase()).maybeSingle();
  if (data?.slug) redirect(`/org/${data.slug}/manage`);
}

async function OrganisationProfile({ params }: Pick<PageProps<"/org/[slug]">, "params">) {
  const { slug } = await params;
  const org = await getPublicOrganisation(slug);
  if (!org?.id || !org.name || !org.slug) {
    await memberRedirect(slug);
    notFound();
  }

  const supabase = await createPublicClient();
  const { data: opportunities } = await supabase
    .from("opportunities")
    .select("id, title, kind, status, deadline, location, is_remote")
    .eq("organisation_id", org.id)
    .eq("status", "open")
    .order("deadline", { ascending: true, nullsFirst: false });
  const open = opportunities ?? [];
  const region = regionLabel(org.region);

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Initials name={org.name} size="lg" />
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-title text-content">{org.name}</h1>
            <p className="text-content-2">{[orgKindLabel(org.kind), region ? `${region} Region` : null].filter(Boolean).join(" · ")}</p>
          </div>
        </div>
        <Badge tone="success">{`Verified by SydCrest${org.verified_at ? ` on ${formatDate(org.verified_at)}` : ""}`}</Badge>
      </header>

      <MainWithRail
        railLabel={`About ${org.name}`}
        rail={
          <Panel title="Details" tone="sunken">
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-content-3">Kind</dt>
                <dd className="text-content">{orgKindLabel(org.kind)}</dd>
              </div>
              {region && (
                <div>
                  <dt className="text-content-3">Region</dt>
                  <dd className="text-content">{region}</dd>
                </div>
              )}
              {org.website && (
                <div>
                  <dt className="text-content-3">Website</dt>
                  <dd>
                    <a href={org.website} rel="noopener noreferrer nofollow" target="_blank" className="break-all text-content-link underline">
                      {org.website.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <p className="text-sm text-content-2">
              Verified means our team checked that this organisation is real. SydCrest never handles pay between
              organisations and learners.
            </p>
          </Panel>
        }
      >
        <section aria-labelledby="about-heading" className="flex flex-col gap-3">
          <h2 id="about-heading" className="text-subtitle text-content">
            About
          </h2>
          <p className="max-w-reading whitespace-pre-line text-content-2">
            {org.description ?? `${org.name} has not written about itself yet.`}
          </p>
        </section>

        <section aria-labelledby="open-heading" className="flex flex-col gap-3">
          <h2 id="open-heading" className="text-subtitle text-content">
            Open opportunities
          </h2>
          {open.length === 0 ? (
            <Panel tone="sunken">
              <p className="max-w-reading text-content-2">No open opportunities right now. New posts from {org.name} appear here.</p>
              <Link href="/roadmaps" className={buttonClasses("secondary", "self-start")}>
                Build skills while you wait
              </Link>
            </Panel>
          ) : (
            <OpportunityList rows={open} showStatus={false} />
          )}
        </section>
      </MainWithRail>
    </article>
  );
}

export default function PublicOrganisationPage({ params }: PageProps<"/org/[slug]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <OrganisationProfile params={params} />
    </Suspense>
  );
}
