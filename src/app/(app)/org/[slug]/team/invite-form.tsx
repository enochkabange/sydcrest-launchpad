"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import { ORG_ROLES, type OrgRole } from "@/lib/organisations/forms";
import { inviteMember, type InviteState } from "../actions";

export function InviteForm({ organisationId, roles }: { organisationId: string; roles: OrgRole[] }) {
  const [state, action, pending] = useActionState<InviteState, FormData>(inviteMember.bind(null, organisationId), {});
  return (
    <form key={state.invited ?? "form"} action={action} className="flex flex-col gap-4" noValidate>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.invited && <Alert tone="success">{state.invited} is invited. They accept from their Organisations page.</Alert>}
      <TextField
        id="profile"
        label="Their public profile link"
        hint="They turn on a public profile from their Profile page and send you the link."
        error={state.errors?.profile}
        autoCapitalize="none"
        spellCheck={false}
        required
      />
      <SelectField
        id="role"
        label="Role"
        hint="Admins edit the profile and manage the team. Recruiters post and contact talent."
        defaultValue={roles.includes("recruiter") ? "recruiter" : roles[0]}
        error={state.errors?.role}
      >
        {ORG_ROLES.filter((r) => roles.includes(r.value)).map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </SelectField>
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Inviting…" : "Send invitation"}
      </Button>
    </form>
  );
}
