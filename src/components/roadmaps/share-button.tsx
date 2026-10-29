"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { clientTrack } from "@/lib/analytics/client/analytics";

/**
 * Native share sheet on phones (WhatsApp, SMS and the rest), copy link
 * everywhere else. Shares this deployment's URL for the given path.
 */
export function ShareButton({ path, title, text }: { path: string; title: string; text?: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        clientTrack("share_clicked", { target: "roadmap", channel: "share" });
        return;
      } catch (error) {
        // The learner closed the share sheet; nothing to do.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      clientTrack("share_clicked", { target: "roadmap", channel: "copy" });
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button type="button" onClick={share} className={buttonClasses("secondary", "w-full sm:w-auto")}>
        {status === "copied" ? <Check aria-hidden className="size-4" /> : <Share2 aria-hidden className="size-4" />}
        Share
      </button>
      <p role="status" className="min-h-5 text-sm text-content-2">
        {status === "copied" && "Link copied."}
        {status === "failed" && "Could not copy. Copy the address from your browser."}
      </p>
    </div>
  );
}
