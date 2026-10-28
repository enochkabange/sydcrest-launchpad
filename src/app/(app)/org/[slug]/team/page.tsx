import type { Metadata } from "next";
import { Suspense } from "react";
import { DataTable, MainWithRail, type Column } from "@/components/ui/layout";
import { ActionButton } from "@/components/business/action-button";
import { Badge, Panel, Skeleton, formatDate } from "@/components/business/bits";
import { Initials } from "@/components/social/profile-bits";
import { createClient } from "@/lib/supabase/server";
import { getOrgForMember } from "@/lib/organisations/queries";
import { assignableRoles, canManageMember, orgRoleLabel } from "@/lib/organisations/forms";
import { removeMember } from "../actions";
import { InviteForm } from "./invite-form";
import { RoleForm } from "./role-form";

export const metadata: Metadata = { title: "Team", robots: { index: false } };

type Row = { profile_id: string; display_name: string; role: string; status: string; joined_at: string | null; created_at: string };

async function Team({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { org, role: mine, userId } = await getOrgForMember(slug);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("organisation_roster")
    .select("profile_id, display_name, role, status, joined_at, created_at")
    .eq("organisation_id", org.id)
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Could not load the team: ${error.message}`);
  const rows: Row[] = (data ?? []).flatMap((r) =>
    r.profile_id && r.role && r.status && r.created_at
      ? [{ profile_id: r.profile_id, display_name: r.display_name ?? "A SydCrest member", role: r.role, status: r.status, joined_at: r.joined_at, created_at: r.created_at }]
      : [],
  );
  const roles = assignableRoles(mine);

  const columns: Column<Row>[] = [
    {
      header: "Name",
      cell: (r) => (
        <span className="flex items-center gap-3">
          <Initials name={r.display_name} />
          <span className="flex flex-col">
            <span className="font-semibold text-content">
              {r.display_name}
              {r.profile_id === userId && <span className="font-normal text-content-3"> (you)</span>}
            </span>
            {r.status === "invited" && <span className="text-sm text-content-3 md:hidden">Invited</span>}
          </span>
        </span>
      ),
      className: "flex-1",
    },
    {
      header: "Role",
      cell: (r) =>
        r.profile_id !== userId && canManageMember(mine, r.role) ? (
          <RoleForm organisationId={org.id} profileId={r.profile_id} current={r.role} roles={roles} name={r.display_name} />
        ) : (
          <span className="text-content">{orgRoleLabel(r.role)}</span>
        ),
    },
    {
      header: "Status",
      phone: "hide",
      cell: (r) =>
        r.status === "invited" ? <Badge tone="info">Invited {formatDate(r.created_at)}</Badge> : <span className="text-sm text-content-2">Joined {formatDate(r.joined_at)}</span>,
    },
    {
      header: "Actions",
      cell: (r) =>
        r.profile_id === userId ? (
          <ActionButton action={removeMember.bind(null, org.id, r.profile_id)} label="Leave" variant="ghost" confirm={`Leave ${org.name}?`} />
        ) : canManageMember(mine, r.role) ? (
          <ActionButton
            action={removeMember.bind(null, org.id, r.profile_id)}
            label={r.status === "invited" ? "Cancel invite" : "Remove"}
            variant="ghost"
            confirm={`Remove ${r.display_name}?`}
          />
        ) : null,
      align: "end",
    },
  ];

  return (
    <MainWithRail
      railLabel="Invite a colleague"
      rail={
        roles.length > 0 ? (
          <Panel title="Invite a colleague">
            <InviteForm organisationId={org.id} roles={roles} />
          </Panel>
        ) : (
          <Panel title="Invitations" tone="sunken">
            <p className="text-sm text-content-2">Owners and admins invite colleagues and change roles.</p>
          </Panel>
        )
      }
    >
      <section aria-labelledby="team-heading" className="flex flex-col gap-4">
        <h2 id="team-heading" className="text-subtitle text-content">
          Team
        </h2>
        <DataTable
          caption={`People in ${org.name}`}
          columns={columns}
          rows={rows}
          rowKey={(r) => r.profile_id}
          rowClassName={() => "flex-wrap py-3"}
        />
        <p className="text-sm text-content-3">
          Owners do everything. Admins edit the profile and manage admins and recruiters. Recruiters post opportunities and
          contact talent. Every organisation keeps at least one owner.
        </p>
      </section>
    </MainWithRail>
  );
}

export default function TeamPage({ params }: PageProps<"/org/[slug]/team">) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <Team params={params} />
    </Suspense>
  );
}
