"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField } from "@/components/ui/field";
import { setMilestonePosts, type MilestonePostsState } from "./milestone-actions";

export function MilestonePostsToggle({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState<MilestonePostsState, FormData>(setMilestonePosts, { enabled });
  const current = state.enabled ?? enabled;

  return (
    <form key={state.saved ?? 0} action={action} className="flex flex-col gap-3">
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      {state.saved && <Alert tone="success">{current ? "Milestone posts are on." : "Milestone posts are off."}</Alert>}
      <CheckboxField id="milestone_posts" defaultChecked={current}>
        Post in the community when I finish a section or a roadmap, or earn a certificate
      </CheckboxField>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-content-2">
        <li>Off unless you turn it on.</li>
        <li>
          Each milestone gets one short post in the community feed, which everyone signed in to SydCrest can read. It says
          what you finished and that it was shared automatically.
        </li>
        <li>Only sections and roadmaps you finish by passing their checkpoint quizzes count. Topics you mark done yourself are never posted.</li>
        <li>You can delete any of these posts, and turning this off stops new ones.</li>
      </ul>
      <Button type="submit" variant="secondary" disabled={pending} className="self-start">
        {pending ? "Saving…" : "Save milestone choice"}
      </Button>
    </form>
  );
}
