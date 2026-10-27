import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { BadgeCheck, CircleSlash, SearchX } from "lucide-react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { formatIssued } from "@/lib/certificates/format";
import { achievementCriteria, badgeUrls } from "@/lib/certificates/open-badges";
import { getProgramForBadge, verifyCertificate, type VerifiedCertificate } from "@/lib/certificates/server";
import { SITE_URL } from "@/lib/site";

const NOINDEX = { index: false, follow: false } as const;

function certificateTitle(cert: Pick<VerifiedCertificate, "program_title" | "specialization_label">) {
  return cert.specialization_label ? `${cert.program_title}: ${cert.specialization_label}` : cert.program_title;
}

export async function generateMetadata({ params }: PageProps<"/verify/[id]">): Promise<Metadata> {
  const { id } = await params;
  const cert = await verifyCertificate(id);
  if (!cert) return { title: "Certificate not found", robots: NOINDEX };
  if (cert.revoked_at) return { title: "Certificate revoked", robots: NOINDEX };
  const title = `${cert.recipient_name}: ${certificateTitle(cert)} certificate`;
  return {
    title,
    description: `${cert.recipient_name} earned the ${certificateTitle(cert)} certificate on SydCrest Launchpad. Issued ${formatIssued(cert.issued_at)}.`,
    alternates: { canonical: `/verify/${cert.verification_id}` },
    openGraph: { title, type: "website" },
  };
}

export default function VerifyPage({ params }: PageProps<"/verify/[id]">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Verification params={params} />
    </Suspense>
  );
}

async function Verification({ params }: Pick<PageProps<"/verify/[id]">, "params">) {
  const { id } = await params;
  const cert = await verifyCertificate(id);
  if (!cert) return <Unknown />;
  if (cert.revoked_at) return <Revoked cert={cert} />;
  return <Valid cert={cert} />;
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-sm text-content-3">{label}</dt>
      <dd className="font-semibold text-content">{children}</dd>
    </div>
  );
}

async function Valid({ cert }: { cert: VerifiedCertificate }) {
  const program = await getProgramForBadge(cert.program_slug);
  const urls = badgeUrls(SITE_URL);
  const criteria = achievementCriteria(
    program ?? { slug: cert.program_slug, title: cert.program_title, summary: null, certification_summary: null },
  );

  return (
    <MainWithRail
      railLabel="About this certificate"
      rail={
        <>
          <section aria-labelledby="criteria-heading" className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-5">
            <h2 id="criteria-heading" className="text-h3 text-content">
              What it takes
            </h2>
            <p className="text-content-2">{criteria}</p>
            {program && (
              <Link href="/programme" className="inline-flex min-h-11 items-center font-semibold text-content-link underline">
                About the programme
              </Link>
            )}
          </section>
          <section aria-labelledby="check-heading" className="flex flex-col gap-2 rounded-lg border border-line p-5">
            <h2 id="check-heading" className="text-h3 text-content">
              Check it yourself
            </h2>
            <p className="text-content-2">
              This page reads the live record, so a revoked certificate shows as revoked here. The certificate is also an Open Badges 3.0
              credential that badge tools can read.
            </p>
            <a href={urls.credential(cert.verification_id)} className="inline-flex min-h-11 items-center font-semibold text-content-link underline">
              Open Badges credential (JSON)
            </a>
            <p className="text-sm break-all text-content-3">Certificate ID {cert.verification_id}</p>
          </section>
        </>
      }
    >
      <article className="flex flex-col gap-6 rounded-lg border border-line bg-surface p-6 md:p-8 lg:p-10">
        <p className="inline-flex items-center gap-2 self-start rounded-full border border-success-fg/30 bg-success-bg px-3 py-1 text-sm font-semibold text-success-fg">
          <BadgeCheck aria-hidden="true" className="size-4" />
          Valid certificate
        </p>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <Image
            src={`/badges/${cert.program_slug}/image.png`}
            alt={`${cert.program_title} badge`}
            width={176}
            height={176}
            unoptimized
            priority
            className="size-36 shrink-0 rounded-full md:size-44"
          />
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-content-2">SydCrest Launchpad certifies that</p>
            <h1 className="text-title break-words text-content">{cert.recipient_name}</h1>
            <p className="text-lead text-content">
              completed the <strong>{certificateTitle(cert)}</strong>
            </p>
          </div>
        </div>
        <dl className="grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
          <Fact label="Issued">
            <time dateTime={cert.issued_at}>{formatIssued(cert.issued_at)}</time>
          </Fact>
          {cert.cohort_name && <Fact label="Cohort">{cert.cohort_name}</Fact>}
          <Fact label="Issued by">SydCrest Launchpad</Fact>
        </dl>
      </article>
    </MainWithRail>
  );
}

function StateCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-6 md:p-10 lg:flex-row lg:items-start lg:gap-8">
      <span aria-hidden="true" className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-surface ring-1 ring-line">
        {icon}
      </span>
      <div className="flex max-w-reading flex-col gap-3">
        <h1 className="text-title text-content">{title}</h1>
        {children}
      </div>
    </div>
  );
}

function Revoked({ cert }: { cert: VerifiedCertificate }) {
  return (
    <StateCard icon={<CircleSlash className="size-7 text-danger-fg" />} title="This certificate was revoked">
      <p role="status" className="self-start rounded-md border border-danger-fg/30 bg-danger-bg px-3 py-2 text-sm font-semibold text-danger-fg">
        Not valid. Revoked on <time dateTime={cert.revoked_at!}>{formatIssued(cert.revoked_at!)}</time>.
      </p>
      <p className="text-lead text-content-2">
        SydCrest Launchpad issued the {certificateTitle(cert)} certificate to {cert.recipient_name} on {formatIssued(cert.issued_at)} and has
        since withdrawn it. It no longer counts as proof of completing the programme.
      </p>
      <p className="text-content-2">
        If you think this is a mistake, the holder can contact SydCrest Launchpad.
      </p>
    </StateCard>
  );
}

function Unknown() {
  return (
    <StateCard icon={<SearchX className="size-7 text-content-2" />} title="No certificate found">
      <p className="text-lead text-content-2">
        There is no SydCrest Launchpad certificate with this ID. Check that the link was copied in full: a certificate ID is 32 letters and
        numbers.
      </p>
      <div>
        <Link href="/programme" className={buttonClasses("secondary")}>
          About our programmes
        </Link>
      </div>
    </StateCard>
  );
}
