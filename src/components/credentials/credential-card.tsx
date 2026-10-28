import type { ReactNode } from "react";
import { ExternalLink, FileText } from "lucide-react";
import { externalVerification, type ExternalCredential } from "@/lib/credentials/model";
import { formatMonthYear, isExpired, VERIFICATION_EXPLAINER } from "@/lib/credentials/share";
import { VerificationLabel } from "./verification-label";

type CardCredential = Pick<
  ExternalCredential,
  "id" | "title" | "issuer_name" | "issued_on" | "expires_on" | "credential_id" | "verification_url" | "file_path" | "file_url" | "verification"
>;

/**
 * One certificate from another issuer, as anyone sees it (issue #253): what
 * it is, who issued it, when, the honest label and the issuer's own link to
 * check it. An attached image shows as a thumbnail; a PDF opens in a new tab.
 * File links are short lived signed URLs made for this request.
 */
export function CredentialCard({ credential, headingLevel = 3, children }: { credential: CardCredential; headingLevel?: 2 | 3; children?: ReactNode }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const kind = externalVerification(credential);
  const issued = formatMonthYear(credential.issued_on);
  const expires = formatMonthYear(credential.expires_on);
  const expired = isExpired(credential.expires_on);
  const isImage = !!credential.file_path && !credential.file_path.endsWith(".pdf");

  return (
    <article id={`c-${credential.id}`} className="flex h-full scroll-mt-24 flex-col gap-3 rounded-lg border border-line bg-surface p-5">
      <div className="flex items-start gap-4">
        {isImage && credential.file_url ? (
          /* eslint-disable-next-line @next/next/no-img-element -- a signed URL to a private file; next/image would cache it. */
          <img
            src={credential.file_url}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            className="size-18 shrink-0 rounded-md border border-line bg-surface-sunken object-contain"
          />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <H className="text-h3 text-content">{credential.title}</H>
          <p className="text-content-2">{credential.issuer_name}</p>
          <p className="text-sm text-content-3">
            {[issued ? `Issued ${issued}` : null, expires ? `${expired ? "Expired" : "Expires"} ${expires}` : null].filter(Boolean).join(" · ") ||
              "No date given"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <VerificationLabel kind={kind} />
        {expired && (
          <span className="inline-flex items-center rounded-full border border-warning-fg/30 bg-warning-bg px-2.5 py-0.5 text-sm font-semibold text-warning-fg">
            Expired
          </span>
        )}
      </div>
      <p className="text-sm text-content-2">{VERIFICATION_EXPLAINER[kind]}</p>
      {credential.credential_id && (
        <p className="text-sm break-all text-content-3">
          Credential ID: <span className="text-content-2">{credential.credential_id}</span>
        </p>
      )}
      {(credential.verification_url || (credential.file_url && !isImage)) && (
        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {credential.verification_url && (
            <a
              href={credential.verification_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex min-h-11 items-center gap-1 font-semibold text-content-link underline"
            >
              Check with {credential.issuer_name}
              <ExternalLink aria-hidden="true" className="size-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {credential.file_url && !isImage && (
            <a
              href={credential.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 font-semibold text-content-link underline"
            >
              <FileText aria-hidden="true" className="size-4" />
              Open the certificate PDF
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </p>
      )}
      {isImage && credential.file_url && (
        <a
          href={credential.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold text-content-link underline"
        >
          View the certificate image
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      {children}
    </article>
  );
}
