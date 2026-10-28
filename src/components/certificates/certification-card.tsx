import Image from "next/image";
import Link from "@/components/ui/link";
import { badgeUrls } from "@/lib/certificates/open-badges";
import { SITE_URL } from "@/lib/site";
import { formatIssued } from "@/lib/certificates/format";
import type { CertificationStatus } from "@/lib/certificates/status";
import type { OwnCertificate } from "@/lib/certificates/server";
import { ChecklistView } from "./checklist";
import { ShareCertificate } from "./share-certificate";

/**
 * A learner's certificate panel for one programme: the checklist while they
 * work towards it, then the certificate with its badge, verification link
 * and sharing once issued. Server safe; data comes from the caller.
 */
export function CertificationCard({
  programTitle,
  programSlug,
  status,
  certificate,
  headingLevel = 2,
}: {
  programTitle: string;
  /** Null when the programme is no longer published: the badge image is left out. */
  programSlug: string | null;
  status: CertificationStatus | null;
  certificate: OwnCertificate | null;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const urls = badgeUrls(SITE_URL);

  if (certificate) {
    const title = certificate.specialization_label
      ? `${certificate.program_title}: ${certificate.specialization_label}`
      : certificate.program_title;
    return (
      <section aria-label={`${programTitle} certificate`} className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-5 md:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {programSlug && (
            <Image
              src={`/badges/${programSlug}/image.png`}
              alt=""
              width={112}
              height={112}
              unoptimized
              className="size-24 shrink-0 rounded-full md:size-28"
            />
          )}
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-sm font-semibold text-success-fg">Certificate issued</p>
            <H className="text-h3 text-content">{title}</H>
            <p className="text-sm text-content-2">
              Issued <time dateTime={certificate.issued_at}>{formatIssued(certificate.issued_at)}</time>.{" "}
              <Link href={`/verify/${certificate.verification_id}`} className="font-semibold text-content-link underline">
                View certificate
              </Link>
            </p>
          </div>
        </div>
        <ShareCertificate
          url={urls.verifyPage(certificate.verification_id)}
          title={title}
          verificationId={certificate.verification_id}
          issuedAt={certificate.issued_at}
        />
      </section>
    );
  }

  return (
    <section aria-label={`${programTitle} certification`} className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-5 md:p-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-content-accent">Certificate</p>
        <H className="text-h3 text-content">{programTitle}</H>
        <p className="text-sm text-content-2">
          {status?.eligible
            ? "You have met every criterion. Your mentor makes the final review."
            : "Your progress towards the certificate. Each step updates as your work is graded."}
        </p>
      </div>
      {status ? (
        <ChecklistView status={status} />
      ) : (
        <p className="rounded-md bg-surface-sunken p-4 text-sm text-content-2">Your progress could not be loaded. Refresh to try again.</p>
      )}
    </section>
  );
}
