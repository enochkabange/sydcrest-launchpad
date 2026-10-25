"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Celebration, type NextNode } from "./celebration";
import type { CompletionState } from "./quiz-data";

/** For topics without a checkpoint quiz: the learner marks it done once they have worked through it. */
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
    return <Celebration heading="Topic complete" roadmapTitle={roadmapTitle} unlocked={state.unlocked} next={next} />;
  }

  if (done) {
    return <Celebration heading="You completed this topic" roadmapTitle={roadmapTitle} next={next} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="node_id" value={nodeId} />
      <p className="text-content-2">
        This topic has no checkpoint quiz. When you have read the explanation and tried the practice task, mark it
        complete.
      </p>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Saving" : "Mark complete"}
      </Button>
    </form>
  );
}
