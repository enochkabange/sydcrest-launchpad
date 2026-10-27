"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { claimPathSkills, type ClaimState } from "@/app/(app)/skills/actions";

/**
 * Finishing a path adds its skills at once. This picks up skills that were
 * matched to a path after the learner finished it. The count is honest,
 * including zero.
 */
export function ClaimPathSkills() {
  const [state, action, pending] = useActionState<ClaimState>(claimPathSkills, {});

  return (
    <form action={action} className="flex flex-col gap-2 rounded-lg border border-line p-4">
      <p className="text-sm text-content-2">
        Finished a path before its skill was added to the catalogue? Check your completed paths for skills you have already
        earned.
      </p>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Checking" : "Claim skills from paths you've completed"}
      </Button>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.claimed !== undefined && !state.message && (
        <Alert tone={state.claimed > 0 ? "success" : "info"}>
          {state.claimed > 0
            ? `${state.claimed === 1 ? "One new skill" : `${state.claimed} new skills`} added to your profile.`
            : "Nothing new to claim. Skills from paths you finish are added automatically."}
        </Alert>
      )}
    </form>
  );
}
