import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Check } from "lucide-react";
import Link from "@/components/ui/link";
import { DataTable, MainWithRail, type Column } from "@/components/ui/layout";
import { ChecklistView } from "@/components/certificates/checklist";
import { IssueCertificateButton } from "@/components/certificates/issue-certificate-button";
import { getMyProfile, requireUser } from "@/lib/auth";
import { getCohortCertificationRoster, getStaffCohorts, type RosterLearner, type StaffCohort } from "@/lib/certificates/server";
import { listWeeks } from "@/lib/certificates/status";

export const metadata: Metadata = { title: "Issue certificates", robots: { index: false } };

/**
 * Mentors (and coordinators or admins as backup) see each learner of a
 * cohort against the certification criteria and issue certificates. The
 * database checks the criteria and the role again on issue.
 */
export default function IssueCertificatesPage({ searchParams }: PageProps<"/certificates/issue">) {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex max-w-reading flex-col gap-2">
        <Link href="/certificates" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-link">
          Certificates
        </Link>
        <h1 className="text-title text-content">Issue certificates</h1>
        <p className="text-lead text-content-2">
          Your final review as mentor. A learner is ready once every week is passed, the capstone included, and they have reviewed a
          classmate&apos;s capstone.
        </p>
      </header>
      <Suspense fallback={<div aria-busy="true" className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Roster searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Roster({ searchParams }: Pick<PageProps<"/certificates/issue">, "searchParams">) {
  const [user, profile] = await Promise.all([requireUser(), getMyProfile()]);
  const cohorts = await getStaffCohorts(user.id, profile.role === "admin");
  if (cohorts.length === 0) notFound();

  const params = await searchParams;
  const wanted = Array.isArray(params.cohort) ? params.cohort[0] : params.cohort;
  const cohort = cohorts.find((c) => c.id === wanted) ?? cohorts[0];
  const learners = await getCohortCertificationRoster(cohort);
  const ready = learners.filter((l) => !l.certificate && l.status?.eligible && l.memberStatus !== "deferred");
  const issued = learners.filter((l) => l.certificate);

  return (
    <MainWithRail
      railLabel="Cohort"
      railFirst
      rail={
        <>
          {cohorts.length > 1 && <CohortPicker cohorts={cohorts} current={cohort.id} />}
          <section aria-labelledby="summary-heading" className="flex flex-col gap-3 rounded-lg border border-line bg-surface-sunken p-5">
            <h2 id="summary-heading" className="text-h3 text-content">
              {cohort.name}
            </h2>
            <p className="text-sm text-content-2">{cohort.programTitle}</p>
            <dl className="grid grid-cols-3 gap-3">
              <Count label="Learners" value={learners.length} />
              <Count label="Ready" value={ready.length} />
              <Count label="Issued" value={issued.length} />
            </dl>
          </section>
        </>
      }
    >
      {learners.length === 0 ? (
        <section className="flex flex-col gap-2 rounded-lg border border-line bg-surface-sunken p-6">
          <h2 className="text-h3 text-content">No learners in this cohort yet</h2>
          <p className="max-w-reading text-content-2">Learners appear here once their applications are accepted into the cohort.</p>
        </section>
      ) : (
        <>
          <DataTable caption={`Certification progress in ${cohort.name}`} columns={COLUMNS} rows={learners} rowKey={(l) => l.memberId} />
          <section aria-labelledby="detail-heading" className="flex flex-col gap-3">
            <h2 id="detail-heading" className="text-subtitle text-content">
              Checklist by learner
            </h2>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {learners.map((l) => (
                <li key={l.memberId} className="flex flex-col gap-3 rounded-lg border border-line p-4">
                  <p className="font-semibold text-content">{l.name}</p>
                  {l.status ? (
                    <ChecklistView status={l.status} issued={!!l.certificate} audience="staff" />
                  ) : (
                    <p className="text-sm text-content-2">Progress could not be loaded.</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </MainWithRail>
  );
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col">
      <dt className="text-sm text-content-3">{label}</dt>
      <dd className="text-2xl font-semibold text-content">{value}</dd>
    </div>
  );
}

function CohortPicker({ cohorts, current }: { cohorts: StaffCohort[]; current: string }) {
  return (
    <form method="get" className="flex flex-col gap-2 rounded-lg border border-line p-5">
      <label htmlFor="cohort" className="text-sm font-semibold text-content">
        Cohort
      </label>
      <select
        id="cohort"
        name="cohort"
        defaultValue={current}
        className="min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-base text-content"
      >
        {cohorts.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.programTitle})
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-md border border-line-strong bg-surface px-4 text-sm font-semibold text-content hover:bg-surface-sunken"
      >
        Show cohort
      </button>
    </form>
  );
}

function Yes({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${ok ? "text-success-fg" : "text-content-2"}`}>
      {ok && <Check aria-hidden="true" className="size-4" />}
      {children}
    </span>
  );
}

const COLUMNS: Column<RosterLearner>[] = [
  { header: "Learner", cell: (l) => <span className="font-semibold text-content">{l.name}</span>, className: "min-w-0 flex-1" },
  {
    header: "Weeks passed",
    phone: "hide",
    cell: (l) =>
      l.status ? (
        <Yes ok={l.status.missingWeeks.length === 0 && l.status.weeksRequired > 0}>
          {l.status.weeksPassed} of {l.status.weeksRequired}
          {l.status.missingWeeks.length > 0 && (
            <span className="sr-only">. Still to pass: {listWeeks(l.status.missingWeeks)}</span>
          )}
        </Yes>
      ) : (
        "Not loaded"
      ),
  },
  {
    header: "Capstone",
    phone: "hide",
    cell: (l) => (l.status ? <Yes ok={l.status.capstonePassed}>{l.status.capstonePassed ? "Passed" : "Not yet"}</Yes> : null),
  },
  {
    header: "Peer reviews",
    phone: "hide",
    cell: (l) =>
      l.status ? (
        <Yes ok={l.status.peerReviewsGiven >= l.status.peerReviewsRequired}>
          {l.status.peerReviewsGiven} of {l.status.peerReviewsRequired}
        </Yes>
      ) : null,
  },
  {
    header: "Certificate",
    cell: (l) => {
      if (l.certificate) {
        return (
          <Link
            href={`/verify/${l.certificate.verification_id}`}
            aria-label={`Issued: view ${l.name}'s certificate`}
            className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-success-fg underline"
          >
            <Check aria-hidden="true" className="size-4" />
            Issued
          </Link>
        );
      }
      if (l.memberStatus === "deferred") return <span className="text-sm text-content-2">Deferred</span>;
      if (l.status?.eligible) return <IssueCertificateButton cohortMemberId={l.memberId} learnerName={l.name} />;
      return <span className="text-sm text-content-2">Not ready</span>;
    },
  },
];
