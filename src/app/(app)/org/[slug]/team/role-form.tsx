"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { ORG_ROLES, type OrgRole } from "@/lib/organisations/forms";
import { changeMemberRole } from "../actions";

/** Change one member's role: a native select and a save button. */
export function RoleForm({
  organisationId,
  profileId,
  current,
  roles,
  name,
}: {
  organisationId: string;
  profileId: string;
  current: string;
  roles: OrgRole[];
  name: string;
}) {
  const [state, action, pending] = useActionState<{ message?: string }, FormData>(
    (_prev, form) => changeMemberRole(organisationId, profileId, form),
    {},
  );
  const id = `role-${profileId}`;
  return (
    <form action={action} className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="sr-only">
          Role for {name}
        </label>
        <select
          id={id}
          name="role"
          defaultValue={current}
          className="min-h-11 rounded-md border border-line-strong bg-surface px-2 text-sm text-content"
        >
          {ORG_ROLES.filter((r) => roles.includes(r.value) || r.value === current).map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        <Button type="submit" variant="ghost" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </Button>
      </div>
      {state.message && (
        <p role="alert" className="text-sm text-danger-fg">
          {state.message}
        </p>
      )}
    </form>
  );
}
