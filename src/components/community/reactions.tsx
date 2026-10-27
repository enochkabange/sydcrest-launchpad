"use client";

import { useState, useTransition } from "react";
import { HandHeart, Lightbulb, PartyPopper, ThumbsUp, type LucideIcon } from "lucide-react";
import { setReaction } from "@/lib/community/actions";
import { REACTIONS, toggleReaction, type ReactionCounts, type ReactionKind } from "@/lib/community/model";

const ICONS: Record<ReactionKind, LucideIcon> = { like: ThumbsUp, celebrate: PartyPopper, helpful: Lightbulb, support: HandHeart };

/**
 * The four reactions as toggle buttons with counts. Optimistic: the count
 * moves at once and rolls back if the server refuses. Read only when the
 * viewer cannot react (an admin outside the group, or hidden content).
 */
export function ReactionBar({
  target,
  id,
  reactions,
  mine,
  readOnly = false,
}: {
  target: "post" | "reply";
  id: string;
  reactions: ReactionCounts;
  mine: ReactionKind[];
  readOnly?: boolean;
}) {
  const [state, setState] = useState({ reactions, mine });
  // Fresh counts from the server (after a refresh) replace the local ones.
  const [fromServer, setFromServer] = useState(reactions);
  if (reactions !== fromServer) {
    setFromServer(reactions);
    setState({ reactions, mine });
  }
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function toggle(kind: ReactionKind) {
    const before = state;
    const on = !state.mine.includes(kind);
    setState(toggleReaction(state, kind));
    setError(null);
    start(async () => {
      const res = await setReaction(target, id, kind, on);
      if (res.error) {
        setState(before);
        setError(res.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <ul className="flex flex-wrap gap-1" aria-label="Reactions">
        {REACTIONS.map(({ kind, label }) => {
          const Icon = ICONS[kind];
          const count = state.reactions[kind];
          const active = state.mine.includes(kind);
          if (readOnly && !count) return null;
          return (
            <li key={kind}>
              <button
                type="button"
                disabled={readOnly || pending}
                aria-pressed={active}
                aria-label={`${label}${count ? `, ${count}` : ""}`}
                title={label}
                onClick={() => toggle(kind)}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition-colors disabled:cursor-default ${
                  active
                    ? "border-info-fg/40 bg-info-bg text-info-fg"
                    : "border-line text-content-2 hover:border-line-strong hover:bg-surface-sunken hover:text-content"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {count > 0 && <span>{count}</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {error && (
        <p role="alert" className="text-sm text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}
