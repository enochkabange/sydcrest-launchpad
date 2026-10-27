import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { CertificationCard } from "@/components/certificates/certification-card";
import { getMyProfile, requireUser } from "@/lib/auth";
import { getMyCertification, getStaffCohorts } from "@/lib/certificates/server";

export const metadata: Metadata = { title: "Certificates", robots: { index: false } };

/**
 * The learner's certificates and the checklist towards each one. Staff of a
 * cohort also get a link to the issuing screen.
 */
export default function CertificatesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-reading flex-col gap-2">
        <h1 className="text-title text-content">Certificates</h1>
        <p className="text-lead text-content-2">
          Finish a mentored programme to earn a certificate anyone can check online, with a badge you can share.
        </p>
      </header>
      <MainWithRail
        railLabel="How certificates work"
        rail={
          <>
            <Suspense fallback={null}>
              <StaffCard />
            </Suspense>
            <section aria-labelledby="how-heading" className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
              <h2 id="how-heading" className="text-h3 text-content">
                How it works
              </h2>
              <ol className="flex list-decimal flex-col gap-2 pl-5 text-content-2">
                <li>Pass every week&apos;s assignment, including your capstone.</li>
                <li>Review at least one classmate&apos;s capstone.</li>
                <li>Your mentor makes the final review and issues your certificate.</li>
                <li>Share the verification link. Anyone who opens it sees that it is real.</li>
              </ol>
            </section>
          </>
        }
      >
        <Suspense fallback={<div aria-busy="true" className="h-72 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <MyCertificates />
        </Suspense>
      </MainWithRail>
    </div>
  );
}

async function MyCertificates() {
  const user = await requireUser();
  const { programmes, certificates } = await getMyCertification(user.id);
  const revoked = certificates.filter((c) => c.revoked_at);

  if (programmes.length === 0 && certificates.length === 0) {
    return (
      <section className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface-sunken p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex max-w-reading flex-col gap-1">
          <h2 className="text-h3 text-content">No certificates yet</h2>
          <p className="text-content-2">
            Certificates come from finishing a mentored programme. When you join a cohort, your progress towards the certificate shows here.
          </p>
        </div>
        <Link href="/programme" className={buttonClasses("secondary", "shrink-0")}>
          See the programme
        </Link>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {programmes.map((p) => (
        <CertificationCard
          key={p.programId}
          programTitle={p.programTitle}
          programSlug={p.programSlug}
          status={p.status}
          certificate={p.certificate}
        />
      ))}
      {revoked.length > 0 && (
        <section aria-labelledby="revoked-heading" className="flex flex-col gap-2 rounded-lg border border-line p-5">
          <h2 id="revoked-heading" className="text-h3 text-content">
            Revoked
          </h2>
          <ul className="flex flex-col gap-1 text-content-2">
            {revoked.map((c) => (
              <li key={c.id}>
                {c.program_title}{" "}
                <Link href={`/verify/${c.verification_id}`} className="text-content-link underline">
                  View
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

async function StaffCard() {
  const [user, profile] = await Promise.all([requireUser(), getMyProfile()]);
  const cohorts = await getStaffCohorts(user.id, profile.role === "admin");
  if (cohorts.length === 0) return null;
  return (
    <section aria-labelledby="staff-heading" className="flex flex-col items-start gap-3 rounded-lg border border-line p-5">
      <h2 id="staff-heading" className="text-h3 text-content">
        For mentors
      </h2>
      <p className="text-content-2">See who has met the criteria in your cohorts and issue their certificates.</p>
      <Link href="/certificates/issue" className={buttonClasses("primary")}>
        Issue certificates
      </Link>
    </section>
  );
}
