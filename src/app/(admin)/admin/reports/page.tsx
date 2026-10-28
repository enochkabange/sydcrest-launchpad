import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { setCredentialHidden, setReportStatus, unpublishReportedProfile } from "./actions";

export const metadata: Metadata = { title: "Reports", robots: { index: false } };

const FILTERS = [
  { slug: "open", label: "Open" },
  { slug: "reviewing", label: "Reviewing" },
  { slug: "actioned", label: "Actioned" },
  { slug: "dismissed", label: "Dismissed" },
  { slug: "all", label: "All" },
] as const;

export default function ReportsPage({ searchParams }: PageProps<"/admin/reports">) {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Queue searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Queue({ searchParams }: Pick<PageProps<"/admin/reports">, "searchParams">) {
  // The admin layout may also check; this page does not rely on it.
  const profile = await getMyProfile();
  if (profile.role !== "admin") notFound();

  const params = await searchParams;
  const raw = Array.isArray(params.status) ? params.status[0] : params.status;
  const filter = FILTERS.find((f) => f.slug === raw)?.slug ?? "open";

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("admin_reports", filter === "all" ? {} : { p_status: filter });
  if (error) throw new Error(`Could not load reports: ${error.message}`);
  const reports = data ?? [];
  // Reported credentials (#253): admins read every credential through RLS.
  const credentialIds = reports.filter((r) => r.target_type === "external_credential" && /^[0-9a-f-]{36}$/i.test(r.target_id)).map((r) => r.target_id);
  const { data: credentialRows } = credentialIds.length
    ? await supabase.from("external_credentials").select("id, title, issuer_name, verification, hidden_at, visibility, profile_id").in("id", credentialIds)
    : { data: [] };
  const credentials = new Map((credentialRows ?? []).map((c) => [c.id, c]));

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-title text-content">Reports</h1>
      <nav aria-label="Report status" className="flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <Link
            key={f.slug}
            href={`/admin/reports?status=${f.slug}`}
            aria-current={f.slug === filter ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              f.slug === filter ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>

      {reports.length === 0 ? (
        <p className="rounded-lg border border-line p-5 text-content-2">No reports here.</p>
      ) : (
        <ul className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4">
          {reports.map((r) => (
            <li key={r.id} className="flex flex-col gap-3 rounded-lg border border-line p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-content">
                  {r.target_type === "profile" ? (
                    <>
                      Profile:{" "}
                      {r.target_slug && r.target_is_public ? (
                        <Link href={`/u/${r.target_slug}`} className="text-content-link underline">
                          {r.target_name ?? r.target_slug}
                        </Link>
                      ) : (
                        <span>{r.target_name ?? r.target_id} (not public)</span>
                      )}
                    </>
                  ) : r.target_type === "external_credential" ? (
                    credentials.get(r.target_id) ? (
                      <>
                        Credential: {credentials.get(r.target_id)!.title}, {credentials.get(r.target_id)!.issuer_name} (
                        {credentials.get(r.target_id)!.verification === "issuer" ? "Verified by the issuer" : "Added by the learner"}
                        {credentials.get(r.target_id)!.hidden_at ? ", hidden" : ""})
                      </>
                    ) : (
                      "Credential: deleted by its owner"
                    )
                  ) : (
                    `${r.target_type}: ${r.target_id}`
                  )}
                </p>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-sm text-content-2">{r.status}</span>
              </div>
              <p className="whitespace-pre-line text-content">{r.reason}</p>
              <p className="text-sm text-content-3">
                Reported by {r.reporter_name ?? "a learner"} on{" "}
                {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Accra" }).format(
                  new Date(r.created_at),
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {r.status === "open" && (
                  <form action={setReportStatus.bind(null, r.id, "reviewing")}>
                    <Button type="submit" variant="secondary">
                      Start review
                    </Button>
                  </form>
                )}
                {r.target_type === "profile" && r.target_is_public && (
                  <form action={unpublishReportedProfile.bind(null, r.id, r.target_id)}>
                    <Button type="submit" variant="secondary">
                      Unpublish profile
                    </Button>
                  </form>
                )}
                {r.target_type === "external_credential" && credentials.get(r.target_id) && (
                  <form action={setCredentialHidden.bind(null, r.id, r.target_id, !credentials.get(r.target_id)!.hidden_at)}>
                    <Button type="submit" variant="secondary">
                      {credentials.get(r.target_id)!.hidden_at ? "Show credential again" : "Hide credential"}
                    </Button>
                  </form>
                )}
                {r.status !== "actioned" && (
                  <form action={setReportStatus.bind(null, r.id, "actioned")}>
                    <Button type="submit" variant="secondary">
                      Mark actioned
                    </Button>
                  </form>
                )}
                {r.status !== "dismissed" && (
                  <form action={setReportStatus.bind(null, r.id, "dismissed")}>
                    <Button type="submit" variant="ghost">
                      Dismiss
                    </Button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
