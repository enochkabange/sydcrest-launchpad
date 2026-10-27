import { Award } from "lucide-react";
import Link from "@/components/ui/link";
import type { PublicCertificate } from "@/lib/certificates/server";
import { formatIssued } from "@/lib/certificates/format";

/** Live certificates on a public profile, each linking to its verification page. */
export function CertificateList({ certificates }: { certificates: PublicCertificate[] }) {
  return (
    <ul className="flex flex-col divide-y divide-line rounded-lg border border-line">
      {certificates.map((c) => (
        <li key={c.verification_id}>
          <Link
            href={`/verify/${c.verification_id}`}
            className="flex min-h-11 items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-sunken"
          >
            <Award aria-hidden="true" className="size-5 shrink-0 text-content-accent" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-semibold text-content">{c.program_title}</span>
              {c.specialization_label && <span className="text-sm text-content-2">{c.specialization_label}</span>}
            </span>
            <time dateTime={c.issued_at} className="shrink-0 text-sm text-content-3">
              {formatIssued(c.issued_at)}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
