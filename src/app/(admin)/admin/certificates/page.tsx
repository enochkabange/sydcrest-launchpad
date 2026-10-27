import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Alert } from "@/components/ui/alert";
import { RevokeCertificateForm } from "@/components/certificates/revoke-certificate-form";
import { getMyProfile } from "@/lib/auth";
import { formatIssued } from "@/lib/certificates/format";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Certificates", robots: { index: false } };

const FILTERS = [
  { slug: "live", label: "Live" },
  { slug: "revoked", label: "Revoked" },
  { slug: "all", label: "All" },
] as const;

export default function AdminCertificatesPage({ searchParams }: PageProps<"/admin/certificates">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <CertificatesList searchParams={searchParams} />
    </Suspense>
  );
}

async function CertificatesList({ searchParams }: Pick<PageProps<"/admin/certificates">, "searchParams">) {
  const profile = await getMyProfile();
  if (profile.role !== "admin") notFound();

  const params = await searchParams;
  const raw = Array.isArray(params.status) ? params.status[0] : params.status;
  const filter = FILTERS.find((f) => f.slug === raw)?.slug ?? "live";
  const justRevoked = typeof params.revoked === "string" ? params.revoked : null;

  const supabase = await createClient();
  let query = supabase
    .from("certificates")
    .select("id, verification_id, recipient_name, program_title, specialization_label, issued_at, revoked_at, revocation_reason, cohorts(name)")
    .order("issued_at", { ascending: false })
    .limit(200);
  if (filter === "live") query = query.is("revoked_at", null);
  if (filter === "revoked") query = query.not("revoked_at", "is", null);
  const { data, error } = await query;
  if (error) throw new Error(`Could not load certificates: ${error.message}`);
  const certificates = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-title text-content">Certificates</h1>
        <p className="max-w-reading text-content-2">
          Mentors issue certificates from their cohorts. Revoke one only with a clear reason: its public page then says it was revoked.
        </p>
      </div>
      {justRevoked && (
        <div className="max-w-reading">
          <Alert tone="success">Certificate revoked. Its verification page now shows it as revoked.</Alert>
        </div>
      )}
      <nav aria-label="Certificate status" className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={`/admin/certificates?status=${f.slug}`}
            aria-current={f.slug === filter ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              f.slug === filter ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {certificates.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface-sunken p-6 text-content-2">
          {filter === "revoked" ? "No revoked certificates." : "No certificates issued yet. They appear here once a mentor issues one."}
        </p>
      ) : (
        <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4">
          {certificates.map((c) => (
            <li key={c.id} className="flex flex-col gap-2 rounded-lg border border-line p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-content">{c.recipient_name}</p>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-sm ${
                    c.revoked_at ? "border-danger-fg/30 bg-danger-bg text-danger-fg" : "border-success-fg/30 bg-success-bg text-success-fg"
                  }`}
                >
                  {c.revoked_at ? "Revoked" : "Live"}
                </span>
              </div>
              <p className="text-content-2">
                {c.specialization_label ? `${c.program_title}: ${c.specialization_label}` : c.program_title}
                {c.cohorts?.name ? `, ${c.cohorts.name}` : ""}
              </p>
              <p className="text-sm text-content-3">
                Issued {formatIssued(c.issued_at)}
                {c.revoked_at ? `. Revoked ${formatIssued(c.revoked_at)}` : ""}
              </p>
              {c.revocation_reason && <p className="text-sm whitespace-pre-line text-content-2">Reason: {c.revocation_reason}</p>}
              <div className="flex flex-wrap items-start gap-2">
                <Link href={`/verify/${c.verification_id}`} className="inline-flex min-h-11 items-center px-3 text-sm font-semibold text-content-link underline">
                  Verification page
                </Link>
                {!c.revoked_at && <RevokeCertificateForm certificateId={c.id} recipientName={c.recipient_name} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
