import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Award } from "lucide-react";
import Link from "@/components/ui/link";
import { AutoGrid, MainWithRail } from "@/components/ui/layout";
import { Initials } from "@/components/social/profile-bits";
import { CredentialCard } from "@/components/credentials/credential-card";
import { ReportCredentialForm } from "@/components/credentials/report-credential-form";
import { VerificationLabel } from "@/components/credentials/verification-label";
import { VerifiedSkillBadges } from "@/components/skills/verified-skill-badges";
import { getCurrentUser } from "@/lib/auth";
import { formatIssued } from "@/lib/certificates/format";
import { getPublicCertificates } from "@/lib/certificates/server";
import { getPublicExternalCredentials } from "@/lib/credentials/queries";
import { VERIFICATION_EXPLAINER, type Verification } from "@/lib/credentials/share";
import { getPublicVerifiedSkills } from "@/lib/skills/queries";
import { getPublicProfileBySlug } from "@/lib/social/queries";

export async function generateMetadata({ params }: PageProps<"/u/[slug]/credentials">): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getPublicProfileBySlug(slug);
  if (!profile) return { title: "Profile not found", robots: { index: false } };
  const name = profile.display_name ?? "A Launchpad learner";
  return {
    title: `${name}: credentials`,
    description: `Certificates and verified skills ${name} has chosen to show, each labelled with who checked it.`,
    alternates: { canonical: `/u/${profile.public_slug}/credentials` },
  };
}

/**
 * A learner's public credentials wallet (issue #253): SydCrest certificates
 * and verified skills (Verified by SydCrest) and the certificates from other
 * issuers they made public (Verified by the issuer, or Added by the learner).
 * Only for public profiles; the shell is static and the wallet streams in.
 */
export default function CredentialsWalletPage({ params }: PageProps<"/u/[slug]/credentials">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Wallet params={params} />
    </Suspense>
  );
}

const LEGEND: Verification[] = ["sydcrest", "issuer", "learner"];

async function Wallet({ params }: Pick<PageProps<"/u/[slug]/credentials">, "params">) {
  const { slug } = await params;
  const profile = await getPublicProfileBySlug(slug);
  if (!profile?.id || !profile.public_slug) notFound();
  const [certificates, verifiedSkills, external] = await Promise.all([
    getPublicCertificates(profile.id),
    getPublicVerifiedSkills(profile.id),
    getPublicExternalCredentials(profile.id),
  ]);
  const name = profile.display_name ?? "Launchpad learner";
  const first = name.split(" ")[0];
  const fromSydCrest = certificates.length + verifiedSkills.length;
  const empty = fromSydCrest === 0 && external.length === 0;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Link href={`/u/${profile.public_slug}`} className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-2 hover:text-content">
          Back to {first}&apos;s profile
        </Link>
        <div className="flex items-center gap-4">
          <Initials name={name} size="lg" />
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-title text-content">{name}&apos;s credentials</h1>
            {profile.headline && <p className="text-lead text-content-2">{profile.headline}</p>}
          </div>
        </div>
      </header>

      <MainWithRail
        railLabel="What the labels mean"
        rail={
          <section aria-labelledby="labels-heading" className="flex flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-5">
            <h2 id="labels-heading" className="text-h3 text-content">
              What the labels mean
            </h2>
            <ul className="flex flex-col gap-4">
              {LEGEND.map((kind) => (
                <li key={kind} className="flex flex-col gap-1.5">
                  <VerificationLabel kind={kind} />
                  <p className="text-sm text-content-2">{VERIFICATION_EXPLAINER[kind]}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-content-3">
              {fromSydCrest} from SydCrest, {external.length} from other issuers.
            </p>
          </section>
        }
      >
        {empty ? (
          <section className="flex flex-col items-start gap-3 rounded-lg border border-line bg-surface-sunken p-6">
            <h2 className="text-h3 text-content">Nothing to show yet</h2>
            <p className="max-w-reading text-content-2">
              {first} has not made any credentials public yet. Certificates and verified skills appear here when {first} earns them or
              chooses to show them.
            </p>
            <Link href="/skills" className="font-semibold text-content-link underline">
              How verified skills work
            </Link>
          </section>
        ) : (
          <>
            {fromSydCrest > 0 && (
              <section aria-labelledby="sydcrest-heading" className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 id="sydcrest-heading" className="text-subtitle text-content">
                    From SydCrest
                  </h2>
                  <VerificationLabel kind="sydcrest" />
                </div>
                {certificates.length > 0 && (
                  <AutoGrid min="md">
                    {certificates.map((c) => (
                      <article key={c.verification_id} className="flex h-full flex-col gap-2 rounded-lg border border-success-fg/30 bg-surface p-5">
                        <Award aria-hidden="true" className="size-6 text-content-accent" />
                        <h3 className="text-h3 text-content">{c.program_title}</h3>
                        {c.specialization_label && <p className="text-content-2">{c.specialization_label}</p>}
                        <p className="text-sm text-content-3">Issued {formatIssued(c.issued_at)}</p>
                        <Link href={`/verify/${c.verification_id}`} className="mt-auto inline-flex min-h-11 items-center text-sm font-semibold text-content-link underline">
                          Check this certificate<span className="sr-only">: {c.program_title}</span>
                        </Link>
                      </article>
                    ))}
                  </AutoGrid>
                )}
                {verifiedSkills.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-h3 text-content">Verified skills</h3>
                    <VerifiedSkillBadges skills={verifiedSkills} label={`Verified skills of ${name}`} />
                  </div>
                )}
              </section>
            )}

            {external.length > 0 && (
              <section aria-labelledby="external-heading" className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h2 id="external-heading" className="text-subtitle text-content">
                    From other issuers
                  </h2>
                  <p className="text-sm text-content-2">
                    SydCrest did not award these. Each says whether the issuer&apos;s own record was checked, and links to the issuer where
                    {` ${first}`} gave a link.
                  </p>
                </div>
                <AutoGrid min="md">
                  {external.map((c) => (
                    <CredentialCard key={c.id} credential={c}>
                      <Suspense fallback={null}>
                        <ReportIsland credentialId={c.id} ownerId={profile.id!} title={c.title} />
                      </Suspense>
                    </CredentialCard>
                  ))}
                </AutoGrid>
              </section>
            )}
          </>
        )}
      </MainWithRail>
    </div>
  );
}

/** Signed in visitors who are not the owner can report a credential. */
async function ReportIsland({ credentialId, ownerId, title }: { credentialId: string; ownerId: string; title: string }) {
  const user = await getCurrentUser();
  if (!user || user.id === ownerId) return null;
  return <ReportCredentialForm credentialId={credentialId} title={title} />;
}
