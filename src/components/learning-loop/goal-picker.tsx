"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { buttonClasses } from "@/components/ui/button";
import { setWeeklyGoal } from "@/lib/learning-loop/actions";
import { GOAL_TARGETS, type GoalState } from "@/lib/learning-loop/review-data";

/**
 * Pick 1, 3 or 5 topics a week. Each choice is its own submit button, so it
 * works before the page's script loads and needs one tap.
 */
export function GoalPicker({ current }: { current: number | null }) {
  const [state, action, pending] = useActionState<GoalState, FormData>(setWeeklyGoal, {});
  return (
    <form action={action} className="flex flex-col gap-2">
      <fieldset className="flex flex-col gap-2" disabled={pending}>
        <legend className="mb-2 text-sm text-content-2">Topics to pass each week</legend>
        <div className="flex flex-wrap gap-2">
          {GOAL_TARGETS.map((n) => (
            <button
              key={n}
              type="submit"
              name="target"
              value={n}
              aria-pressed={current === n}
              className={buttonClasses(current === n ? "primary" : "secondary", "min-w-24")}
            >
              {n === 1 ? "1 topic" : `${n} topics`}
            </button>
          ))}
        </div>
      </fieldset>
      {state.message && <Alert tone="danger">{state.message}</Alert>}
    </form>
  );
}
