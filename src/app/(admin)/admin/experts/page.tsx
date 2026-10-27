import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin";
import { decideApplication, setExpertFlags, setExpertStatus } from "./actions";

export const metadata: Metadata = { title: "Experts", robots: { index: false } };

const VIEWS = [
  { slug: "queue", label: "Applications to review" },
  { slug: "decided", label: "Decided applications" },
  { slug: "experts", label: "All experts" },
] as const;
type View = (typeof VIEWS)[number]["slug"];

const STATUS_LABELS: Record<string, string> = {
  approved: "Approved",
  rejected: "Declined",
  withdrawn: "Withdrawn",
  submitted: "In review",
  pending: "Pending",
  delisted: "Delisted",
};
const label = (status: string | null) => (status ? (STATUS_LABELS[status] ?? status) : "");

const STATUS_FILTERS = ["all", "approved", "pending", "delisted"] as const;

const dateTime = new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Accra" });

const NOTE =
  "min-h-20 w-full rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-content placeholder:text-content-3";

function Pill({ children, tone = "plain" }: { children: React.ReactNode; tone?: "plain" | "info" | "success" | "danger" }) {
  const tones = {
    plain: "border border-line text-content-2",
    info: "bg-info-bg text-info-fg",
    success: "bg-success-bg text-success-fg",
    danger: "bg-danger-bg text-danger-fg",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-sm ${tones[tone]}`}>{children}</span>;
}

function LinkList({ label, links }: { label: string; links: string[] }) {
  if (!links.length) return null;
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold text-content">{label}</p>
      <ul className="flex flex-col gap-1">
        {links.map((href) => (
          <li key={href} className="min-w-0">
            <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="break-all text-sm text-content-link underline">
              {href}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg border border-dashed border-line-strong bg-surface-sunken p-6 text-content-2">{children}</p>;
}

async function Applications({ decided }: { decided: boolean }) {
  const { supabase } = await requireAdmin();
  let query = supabase.from("expert_application_queue").select("*");
  query = decided
    ? query.neq("status", "submitted").order("decided_at", { ascending: false, nullsFirst: false }).limit(100)
    : query.eq("status", "submitted").order("fast_track", { ascending: false }).order("created_at");
  const { data, error } = await query;
  if (error) throw new Error(`Could not load applications: ${error.message}`);
  const rows = data ?? [];

  if (!rows.length) {
    return <Empty>{decided ? "No decided applications yet." : "No applications are waiting. New ones appear here, mentors first."}</Empty>;
  }

  return (
    <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start">
      {rows.map((a) => (
        <li key={a.application_id} className="flex flex-col gap-4 rounded-lg border border-line p-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-h3 font-semibold text-content">{a.display_name ?? a.slug}</h2>
              {a.fast_track && <Pill tone="info">Mentor, fast track</Pill>}
              {decided && <Pill tone={a.status === "approved" ? "success" : "plain"}>{label(a.status)}</Pill>}
            </div>
            <p className="text-content-2">{a.headline}</p>
            <p className="text-sm text-content-3">
              Applied {a.created_at ? dateTime.format(new Date(a.created_at)) : ""}. Expert page link name: {a.slug}
            </p>
          </div>
          {!!a.skills?.length && (
            <ul className="flex flex-wrap gap-2" aria-label="Skills">
              {a.skills.map((s) => (
                <li key={s}>
                  <Pill>{s}</Pill>
                </li>
              ))}
            </ul>
          )}
          <LinkList label="Sample work" links={a.evidence_links ?? []} />
          <LinkList label="Links" links={a.links ?? []} />
          {a.experience && (
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-content">Experience</p>
              <p className="whitespace-pre-line text-content-2">{a.experience}</p>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-content">Why they want to be an expert</p>
            <p className="whitespace-pre-line text-content-2">{a.motivation}</p>
          </div>
          {decided ? (
            a.decision_note && (
              <p className="text-sm text-content-2">
                <span className="font-semibold text-content">Note: </span>
                {a.decision_note}
              </p>
            )
          ) : (
            <form className="flex flex-col gap-3 border-t border-line pt-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`note-${a.application_id}`} className="text-sm font-semibold text-content">
                  Note to the applicant (optional)
                </label>
                <textarea id={`note-${a.application_id}`} name="note" maxLength={1000} className={NOTE} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" formAction={decideApplication.bind(null, a.application_id!, "approved")}>
                  Approve<span className="sr-only"> {a.display_name}</span>
                </Button>
                <Button type="submit" variant="secondary" formAction={decideApplication.bind(null, a.application_id!, "rejected")}>
                  Decline<span className="sr-only"> {a.display_name}</span>
                </Button>
              </div>
            </form>
          )}
        </li>
      ))}
    </ul>
  );
}

async function Experts({ status }: { status: (typeof STATUS_FILTERS)[number] }) {
  const { supabase } = await requireAdmin();
  let query = supabase
    .from("expert_profiles")
    .select("profile_id, slug, headline, status, status_reason, is_verified, is_featured, approved_at, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status !== "all") query = query.eq("status", status);
  // Admins cannot read other people's profiles rows; the queue view carries each applicant's name.
  const [{ data, error }, { data: names }] = await Promise.all([
    query,
    supabase.from("expert_application_queue").select("profile_id, display_name"),
  ]);
  if (error) throw new Error(`Could not load experts: ${error.message}`);
  const nameOf = new Map((names ?? []).map((n) => [n.profile_id, n.display_name]));
  const rows = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Expert status" className="flex flex-wrap gap-1">
        {STATUS_FILTERS.map((s) => (
          <Link
            key={s}
            href={`/admin/experts?view=experts&status=${s}`}
            aria-current={s === status ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              s === status ? "bg-surface-sunken text-content" : "text-content-2 hover:text-content"
            }`}
          >
            {s === "all" ? "All" : label(s)}
          </Link>
        ))}
      </nav>
      {!rows.length ? (
        <Empty>No experts here yet.</Empty>
      ) : (
        <ul className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start xl:grid-cols-3">
          {rows.map((e) => {
            const name = nameOf.get(e.profile_id) ?? e.slug;
            return (
              <li key={e.profile_id} className="flex flex-col gap-3 rounded-lg border border-line p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-h3 font-semibold text-content">{name}</h2>
                  <Pill tone={e.status === "approved" ? "success" : e.status === "delisted" ? "danger" : "plain"}>{label(e.status)}</Pill>
                  {e.is_verified && <Pill tone="info">Verified</Pill>}
                  {e.is_featured && <Pill tone="info">Featured</Pill>}
                </div>
                <p className="text-content-2">{e.headline}</p>
                {e.status === "approved" ? (
                  <Link href={`/experts/${e.slug}`} className="inline-flex min-h-11 items-center self-start text-sm text-content-link underline">
                    /experts/{e.slug}
                  </Link>
                ) : (
                  <p className="text-sm text-content-3">/experts/{e.slug} (not public)</p>
                )}
                {e.status_reason && (
                  <p className="text-sm text-content-2">
                    <span className="font-semibold text-content">Reason: </span>
                    {e.status_reason}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  <form action={setExpertFlags.bind(null, e.profile_id, { verified: !e.is_verified })}>
                    <Button type="submit" variant="secondary">
                      {e.is_verified ? "Remove verified" : "Verify"}
                      <span className="sr-only"> {name}</span>
                    </Button>
                  </form>
                  <form action={setExpertFlags.bind(null, e.profile_id, { featured: !e.is_featured })}>
                    <Button type="submit" variant="secondary">
                      {e.is_featured ? "Unfeature" : "Feature"}
                      <span className="sr-only"> {name}</span>
                    </Button>
                  </form>
                  {e.status === "delisted" && (
                    <form action={setExpertStatus.bind(null, e.profile_id, "approved")}>
                      <Button type="submit" variant="secondary">
                        List again<span className="sr-only"> {name}</span>
                      </Button>
                    </form>
                  )}
                </div>
                {e.status !== "delisted" && (
                  <form action={setExpertStatus.bind(null, e.profile_id, "delisted")} className="flex flex-col gap-2 border-t border-line pt-3">
                    <label htmlFor={`reason-${e.profile_id}`} className="text-sm font-semibold text-content">
                      Reason for delisting (shown to the expert)
                    </label>
                    <textarea id={`reason-${e.profile_id}`} name="reason" maxLength={1000} className={NOTE} />
                    <Button type="submit" variant="ghost" className="self-start">
                      Delist<span className="sr-only"> {name}</span>
                    </Button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

async function ExpertsAdmin({ searchParams }: Pick<PageProps<"/admin/experts">, "searchParams">) {
  await requireAdmin();
  const params = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const view: View = VIEWS.find((v) => v.slug === first(params.view))?.slug ?? "queue";
  const status = STATUS_FILTERS.find((s) => s === first(params.status)) ?? "all";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Experts</h1>
        <p className="max-w-reading text-content-2">
          Spot check applications, then approve or decline. Delist experts who break the rules, and verify or feature
          approved ones.
        </p>
      </div>
      <nav aria-label="Expert views" className="flex flex-wrap gap-1 border-b border-line pb-2">
        {VIEWS.map((v) => (
          <Link
            key={v.slug}
            href={`/admin/experts?view=${v.slug}`}
            aria-current={v.slug === view ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${
              v.slug === view ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface-sunken hover:text-content"
            }`}
          >
            {v.label}
          </Link>
        ))}
      </nav>
      {view === "experts" ? <Experts status={status} /> : <Applications decided={view === "decided"} />}
    </div>
  );
}

export default function AdminExpertsPage({ searchParams }: PageProps<"/admin/experts">) {
  return (
    <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
      <ExpertsAdmin searchParams={searchParams} />
    </Suspense>
  );
}
