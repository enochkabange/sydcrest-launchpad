"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { optedOut } from "@/lib/analytics/opt-out";
import { recordInviteSent, type InviteMethod } from "./invite-actions";

const noop = () => () => {};

/**
 * Shows a link with a copy button (and the share sheet where the browser has one).
 * With `trackInvite`, a successful copy or share records invite_sent.
 */
export function CopyLink({ url, label, trackInvite = false }: { url: string; label: string; trackInvite?: boolean }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  // False on the server and during hydration, so the markup matches.
  const canShare = useSyncExternalStore(
    noop,
    () => "share" in navigator,
    () => false,
  );

  function sent(method: InviteMethod) {
    if (!trackInvite || optedOut()) return;
    // Analytics must never break the button.
    recordInviteSent(method).catch(() => {});
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
      sent("copy");
    } catch {
      setStatus("failed");
    }
  }

  async function share() {
    try {
      await navigator.share({ url, title: "Join me on SydCrest Launchpad" });
      sent("share");
    } catch {
      // Dismissed share sheets reject; nothing to do.
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-content">
        {label}
        <input
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="min-h-11 w-full rounded-md border border-line-strong bg-surface-sunken px-3 text-base font-normal text-content"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={copy}>
          Copy link
        </Button>
        {canShare && (
          <Button variant="ghost" onClick={share}>
            Share
          </Button>
        )}
      </div>
      <p role="status" className="text-sm text-content-2">
        {status === "copied" ? "Link copied." : status === "failed" ? "Copy failed. Select the link and copy it." : ""}
      </p>
    </div>
  );
}
