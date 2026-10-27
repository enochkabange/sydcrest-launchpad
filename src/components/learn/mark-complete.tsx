"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Celebration, type NextNode } from "./celebration";
import type { CompletionState } from "./quiz-data";

/**
 * For topics without a checkpoint quiz: the learner marks it done once they have worked through it. This is
 * personal tracking (issue #128): it shows in their own progress but earns no achievement and does not count
 * on leaderboards or streaks, which only count topics passed with a quiz.
 */
const SELF_MARK_NOTE =
  "This is for your own tracking. Leaderboards, streaks and achievements count topics you pass with a checkpoint quiz.";

export function MarkComplete({
  nodeId,
  done,
  roadmapTitle,
  next,
  action,
}: {
  nodeId: string;
  done: boolean;
  roadmapTitle: string;
  next: NextNode;
  action: (prev: CompletionState, form: FormData) => Promise<CompletionState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  if (state.unlocked) {
    return (
      <Celebration
        heading="Marked as done"
        roadmapTitle={roadmapTitle}
        unlocked={state.unlocked}
        note={SELF_MARK_NOTE}
        next={next}
      />
    );
  }

  if (done) {
    return <Celebration heading="You marked this topic done" roadmapTitle={roadmapTitle} note={SELF_MARK_NOTE} next={next} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="node_id" value={nodeId} />
      <p className="text-content-2">
        This topic has no checkpoint quiz. When you have read the explanation and tried the practice task, mark it
        done to track your own progress. It does not count toward leaderboards, streaks or achievements.
      </p>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving" : "Mark as done"}
      </Button>
    </form>
  );
}
