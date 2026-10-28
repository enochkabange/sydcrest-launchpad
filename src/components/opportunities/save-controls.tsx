"use client";

import { useActionState } from "react";
import { Bookmark, BookmarkCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeOpportunitySave, setOpportunityStatus, type SaveActionState } from "@/lib/opportunities/actions";

/**
 * Save, mark applied, undo and remove for one opportunity. Only the learner
 * ever sees these markers; posters never do. `back` is where to return
 * after signing in when the session has expired.
 */
export function SaveControls({
  opportunityId,
  title,
  status,
  back,
  compact = false,
}: {
  opportunityId: string;
  title: string;
  status: "saved" | "applied" | null;
  back: string;
  compact?: boolean;
}) {
  const [setState, setAction, setting] = useActionState<SaveActionState, FormData>(setOpportunityStatus, {});
  const [removeState, removeAction, removing] = useActionState<SaveActionState, FormData>(removeOpportunitySave, {});
  const pending = setting || removing;
  const error = setState.error ?? removeState.error;

  const hidden = (
    <>
      <input type="hidden" name="opportunity_id" value={opportunityId} />
      <input type="hidden" name="back" value={back} />
    </>
  );

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex flex-wrap gap-2 ${compact ? "" : "sm:flex-nowrap"}`}>
        {status === null && (
          <form action={setAction}>
            {hidden}
            <input type="hidden" name="status" value="saved" />
            <Button type="submit" variant="secondary" disabled={pending} aria-label={`Save ${title}`}>
              <Bookmark aria-hidden className="size-4" />
              {setting ? "Saving…" : "Save"}
            </Button>
          </form>
        )}
        {status === "saved" && (
          <form action={setAction}>
            {hidden}
            <input type="hidden" name="status" value="applied" />
            <Button type="submit" variant="secondary" disabled={pending} aria-label={`Mark ${title} as applied`}>
              <Check aria-hidden className="size-4" />
              {setting ? "Saving…" : "Mark as applied"}
            </Button>
          </form>
        )}
        {status === "applied" && (
          <form action={setAction}>
            {hidden}
            <input type="hidden" name="status" value="saved" />
            <Button type="submit" variant="ghost" disabled={pending} aria-label={`Mark ${title} as not applied yet`}>
              {setting ? "Saving…" : "Not applied yet"}
            </Button>
          </form>
        )}
        {status !== null && (
          <form action={removeAction}>
            {hidden}
            <Button type="submit" variant="ghost" disabled={pending} aria-label={`Remove ${title} from your saved list`}>
              {removing ? "Removing…" : "Remove"}
            </Button>
          </form>
        )}
      </div>
      {status && !compact && (
        <p className="flex items-center gap-2 text-sm text-content-2" role="status">
          <BookmarkCheck aria-hidden className="size-4 text-content-3" />
          {status === "applied" ? "You marked this as applied. Only you can see this." : "Saved to your list. Only you can see this."}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}
