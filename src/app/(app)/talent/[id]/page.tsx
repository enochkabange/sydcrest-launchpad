import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { Badge, Panel, Skeleton, formatDate } from "@/components/business/bits";
import { TalentCard } from "@/components/business/talent-card";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getMyVerifiedOrganisations } from "@/lib/organisations/queries";
import { contactStatusLabel, isUuid } from "@/lib/talent/forms";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Talent", robots: { index: false } };

async function Person({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const user = await requireUser();
  const supabase = await createClient();
  // The view only returns listed, eligible learners to verified organisations and admins.
  const { data: row } = await supabase.from("talent_directory").select("*").eq("profile_id", id).maybeSingle();
  if (!row?.profile_id || id === user.id) notFound();

  const orgs = await getMyVerifiedOrganisations();
  const { data: past } = orgs.length
    ? await supabase
        .from("talent_contact_requests")
        .select("id, organisation_id, status, created_at")
        .eq("profile_id", id)
        .in("organisation_id", orgs.map((o) => o.id))
        .order("created_at", { ascending: false })
    : { data: [] };
  const orgName = new Map(orgs.map((o) => [o.id, o.name]));
  const pendingFor = new Set((past ?? []).filter((r) => r.status === "pending").map((r) => r.organisation_id));
  const askable = orgs.filter((o) => !pendingFor.has(o.id));
  const name = row.display_name ?? "This learner";
  const firstName = name.split(" ")[0];

  return (
    <MainWithRail
      railLabel={`Contact ${firstName}`}
      sticky
      rail={
        <Panel title={`Ask ${firstName} to talk`}>
          {orgs.length === 0 ? (
            <p className="text-sm text-content-2">Only members of verified organisations can ask to talk.</p>
          ) : askable.length === 0 ? (
            <p role="status" className="text-sm text-content-2">
              Request sent. It is waiting for {firstName}&apos;s reply, which shows on your organisation&apos;s Talent requests page.
            </p>
          ) : (
            <ContactForm profileId={id} firstName={firstName} organisations={askable.map((o) => ({ id: o.id, name: o.name }))} />
          )}
          {(past ?? []).length > 0 && (
            <ul className="flex flex-col gap-2 border-t border-line pt-3 text-sm">
              {(past ?? []).map((r) => (
                <li key={r.id} className="flex flex-wrap items-center gap-2">
                  <span className="text-content">{orgName.get(r.organisation_id)}</span>
                  <Badge tone={r.status === "accepted" ? "success" : r.status === "pending" ? "info" : "neutral"}>{contactStatusLabel(r.status)}</Badge>
                  <span className="text-content-3">{formatDate(r.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      }
    >
      <TalentCard row={row} full />
    </MainWithRail>
  );
}

export default function TalentPersonPage({ params }: PageProps<"/talent/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/talent" className="inline-flex min-h-11 items-center self-start text-sm font-semibold text-content-2 hover:text-content">
        Back to talent
      </Link>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Person params={params} />
      </Suspense>
    </div>
  );
}
