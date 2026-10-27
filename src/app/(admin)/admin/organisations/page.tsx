import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { VerificationBadge, formatDate } from "@/components/business/bits";
import { requireAdmin } from "@/lib/admin";
import { orgKindLabel } from "@/lib/organisations/forms";
import { regionLabel } from "@/lib/regions";
import { DecisionForm } from "./decision-form";

export const metadata: Metadata = { title: "Organisations", robots: { index: false } };

const FILTERS = [
  { slug: "pending", label: "Waiting for review" },
  { slug: "verified", label: "Verified" },
  { slug: "rejected", label: "Not approved" },
  { slug: "suspended", label: "Suspended" },
  { slug: "unverified", label: "Not asked yet" },
  { slug: "all", label: "All" },
] as const;

export default function AdminOrganisationsPage({ searchParams }: PageProps<"/admin/organisations">) {
  return (
    <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <Queue searchParams={searchParams} />
    </Suspense>
  );
}

async function Queue({ searchParams }: Pick<PageProps<"/admin/organisations">, "searchParams">) {
  // The layout also checks; this page does not rely on it.
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const raw = Array.isArray(params.status) ? params.status[0] : params.status;
  const filter = FILTERS.find((f) => f.slug === raw)?.slug ?? "pending";

  let query = supabase
    .from("organisations")
    .select("id, slug, name, kind, description, website, region, registration_number, verification_status, verification_note, verified_at, created_at, updated_at")
    .order("updated_at", { ascending: filter === "pending" })
    .limit(100);
  if (filter !== "all") query = query.eq("verification_status", filter);
  const { data, error } = await query;
  if (error) throw new Error(`Could not load organisations: ${error.message}`);
  const orgs = data ?? [];

  const ids = orgs.map((o) => o.id);
  const { data: roster } = ids.length
    ? await supabase.from("organisation_roster").select("organisation_id, display_name, role, status").in("organisation_id", ids).eq("role", "owner")
    : { data: [] };
  const owners = new Map<string, string[]>();
  for (const r of roster ?? []) {
    if (!r.organisation_id || r.status !== "active") continue;
    owners.set(r.organisation_id, [...(owners.get(r.organisation_id) ?? []), r.display_name ?? "Unnamed"]);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-title text-content">Organisations</h1>
      <p className="max-w-reading text-content-2">
        Check each organisation is real before verifying: the website, the registration number and who owns it. Verified
        organisations post opportunities and browse the talent directory.
      </p>
      <nav aria-label="Verification status" className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={`/admin/organisations?status=${f.slug}`}
            aria-current={f.slug === filter ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              f.slug === filter ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {orgs.length === 0 ? (
        <p className="rounded-lg border border-line bg-surface-sunken p-5 text-content-2">No organisations here.</p>
      ) : (
        <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4">
          {orgs.map((o) => (
            <li key={o.id} className="flex flex-col gap-3 rounded-lg border border-line p-4 xl:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-h3 text-content">{o.name}</h2>
                <VerificationBadge status={o.verification_status} />
              </div>
              <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm">
                <dt className="text-content-3">Kind</dt>
                <dd className="text-content">{orgKindLabel(o.kind)}</dd>
                <dt className="text-content-3">Region</dt>
                <dd className="text-content">{regionLabel(o.region) ?? "Not set"}</dd>
                <dt className="text-content-3">Website</dt>
                <dd className="break-all">
                  {o.website ? (
                    <a href={o.website} target="_blank" rel="noopener noreferrer nofollow" className="text-content-link underline">
                      {o.website}
                    </a>
                  ) : (
                    <span className="text-content">None given</span>
                  )}
                </dd>
                <dt className="text-content-3">Registration</dt>
                <dd className="text-content">{o.registration_number ?? "None given"}</dd>
                <dt className="text-content-3">Owners</dt>
                <dd className="text-content">{(owners.get(o.id) ?? []).join(", ") || "None"}</dd>
                <dt className="text-content-3">Created</dt>
                <dd className="text-content">{formatDate(o.created_at)}</dd>
              </dl>
              {o.description && <p className="line-clamp-4 whitespace-pre-line text-sm text-content-2">{o.description}</p>}
              {o.verification_note && (
                <p className="rounded-md border border-line bg-surface-sunken p-3 text-sm text-content">
                  <span className="font-semibold">Last note: </span>
                  {o.verification_note}
                </p>
              )}
              <DecisionForm organisationId={o.id} status={o.verification_status} name={o.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
