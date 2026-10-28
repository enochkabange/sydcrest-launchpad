import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { buttonClasses } from "@/components/ui/button";
import { MainWithRail } from "@/components/ui/layout";
import { ActionButton } from "@/components/business/action-button";
import { Badge, Panel, Skeleton, formatDate, type Tone } from "@/components/business/bits";
import { createClient } from "@/lib/supabase/server";
import { getOrgForMember } from "@/lib/organisations/queries";
import { contactStatusLabel } from "@/lib/talent/forms";
import { withdrawContactRequest } from "../actions";

export const metadata: Metadata = { title: "Talent requests", robots: { index: false } };

// A dynamic segment under the app shell, whose nav reads usePathname() outside
// Suspense: allow blocking, as /learn/[slug]/[node] does, until the shell wraps it.
export const instant = false;

const STATUS_TONE: Record<string, Tone> = { pending: "info", accepted: "success", declined: "neutral", withdrawn: "neutral" };

async function Requests({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { org, role } = await getOrgForMember(slug);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talent_contact_requests")
    .select("id, profile_id, message, status, shared_contact, responded_at, created_at")
    .eq("organisation_id", org.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load requests: ${error.message}`);
  const requests = data ?? [];

  // Names come from the directory, which shows only learners still listed.
  const ids = [...new Set(requests.map((r) => r.profile_id))];
  const { data: people } = ids.length
    ? await supabase.from("talent_directory").select("profile_id, display_name, headline").in("profile_id", ids)
    : { data: [] };
  const byId = new Map((people ?? []).map((p) => [p.profile_id, p]));
  const canWithdraw = ["owner", "admin", "recruiter"].includes(role);

  return (
    <MainWithRail
      railLabel="How contact works"
      rail={
        <Panel title="How contact works" tone="sunken">
          <p className="text-sm text-content-2">
            Learners see your organisation&apos;s name and your message. Nothing about them beyond their directory
            listing reaches you unless they accept, and then only the contact detail they choose to share.
          </p>
          <Link href="/talent" className={buttonClasses("secondary", "self-start")}>
            Browse talent
          </Link>
        </Panel>
      }
    >
      <section aria-labelledby="requests-heading" className="flex flex-col gap-4">
        <h2 id="requests-heading" className="text-subtitle text-content">
          Talent requests
        </h2>
        {requests.length === 0 ? (
          <Panel tone="sunken">
            <p className="max-w-reading text-content-2">
              No requests yet. When you ask a learner from the talent directory to talk, the request and their answer
              show up here.
            </p>
          </Panel>
        ) : (
          <ul className="flex flex-col gap-3">
            {requests.map((r) => {
              const person = byId.get(r.profile_id);
              return (
                <li key={r.id} className="flex flex-col gap-3 rounded-lg border border-line p-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-6">
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-content">
                        {person ? (
                          <Link href={`/talent/${r.profile_id}`} className="text-content-link underline">
                            {person.display_name ?? "A learner"}
                          </Link>
                        ) : (
                          "A learner who has left the directory"
                        )}
                      </p>
                      <Badge tone={STATUS_TONE[r.status] ?? "neutral"}>{contactStatusLabel(r.status)}</Badge>
                    </div>
                    {person?.headline && <p className="text-sm text-content-2">{person.headline}</p>}
                    <p className="line-clamp-3 whitespace-pre-line text-sm text-content-2">{r.message}</p>
                    {r.status === "accepted" && (
                      <p className="rounded-md border border-success-fg/30 bg-success-bg p-3 text-sm text-success-fg">
                        {r.shared_contact ? (
                          <>
                            <span className="font-semibold">They shared: </span>
                            {r.shared_contact}
                          </>
                        ) : (
                          "They accepted but did not share a contact detail. They may reach out to you."
                        )}
                      </p>
                    )}
                    <p className="text-sm text-content-3">
                      Sent {formatDate(r.created_at)}
                      {r.responded_at ? ` · answered ${formatDate(r.responded_at)}` : ""}
                    </p>
                  </div>
                  {r.status === "pending" && canWithdraw && (
                    <ActionButton action={withdrawContactRequest.bind(null, r.id)} label="Withdraw" variant="ghost" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </MainWithRail>
  );
}

export default function RequestsPage({ params }: PageProps<"/org/[slug]/requests">) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <Requests params={params} />
    </Suspense>
  );
}
