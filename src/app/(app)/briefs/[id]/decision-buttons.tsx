"use client";

import { useState, useTransition } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { acceptPitch, declinePitch, setBriefStatus, withdrawPitch } from "../actions";

type Result = { message?: string } | undefined;

function useAction() {
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<string>();
  const run = (fn: () => Promise<Result>) =>
    start(async () => {
      setMessage(undefined);
      const result = await fn();
      if (result?.message) setMessage(result.message);
    });
  return { pending, message, run };
}

/**
 * Accept or decline a submitted pitch. Accepting asks for a second tap,
 * because it awards the brief and turns down every other pitch.
 */
export function PitchDecision({ pitchId, expertName }: { pitchId: string; expertName: string }) {
  const { pending, message, run } = useAction();
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="flex flex-col gap-3 border-t border-line pt-4">
      {message && <Alert tone="danger">{message}</Alert>}
      {confirming ? (
        <div className="flex flex-col gap-3 rounded-md bg-info-bg p-4 text-info-fg">
          <p className="text-sm">
            Accept {expertName}&rsquo;s pitch? This awards the brief, tells the other experts they were not chosen, and opens a booking with{" "}
            {expertName}.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button disabled={pending} onClick={() => run(() => acceptPitch(pitchId))}>
              {pending ? "Accepting" : "Yes, accept and open a booking"}
            </Button>
            <Button variant="secondary" disabled={pending} onClick={() => setConfirming(false)}>
              Not yet
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button disabled={pending} onClick={() => setConfirming(true)}>
            Accept pitch
          </Button>
          <Button variant="secondary" disabled={pending} onClick={() => run(() => declinePitch(pitchId))}>
            {pending ? "Declining" : "Decline"}
          </Button>
        </div>
      )}
    </div>
  );
}

export function WithdrawPitch({ pitchId }: { pitchId: string }) {
  const { pending, message, run } = useAction();
  return (
    <div className="flex flex-col gap-2">
      {message && <Alert tone="danger">{message}</Alert>}
      <Button variant="secondary" className="w-fit" disabled={pending} onClick={() => run(() => withdrawPitch(pitchId))}>
        {pending ? "Withdrawing" : "Withdraw pitch"}
      </Button>
    </div>
  );
}

export function BriefStatusControls({ briefId, status }: { briefId: string; status: string }) {
  const { pending, message, run } = useAction();
  return (
    <div className="flex flex-col gap-2">
      {message && <Alert tone="danger">{message}</Alert>}
      <div className="flex flex-wrap gap-2">
        {status === "open" ? (
          <Button variant="secondary" disabled={pending} onClick={() => run(() => setBriefStatus(briefId, "closed"))}>
            Close to new pitches
          </Button>
        ) : (
          <Button variant="secondary" disabled={pending} onClick={() => run(() => setBriefStatus(briefId, "open"))}>
            Reopen
          </Button>
        )}
        <Button variant="ghost" disabled={pending} onClick={() => run(() => setBriefStatus(briefId, "cancelled"))}>
          Cancel brief
        </Button>
      </div>
    </div>
  );
}
