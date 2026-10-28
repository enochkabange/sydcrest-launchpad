"use client";

import { Briefcase, Check, Code, Copy } from "lucide-react";
import { useId, useState } from "react";
import { Button, buttonClasses } from "@/components/ui/button";

/**
 * The extra ways to share one credential beside the card (ShareCard):
 * LinkedIn's own "add certification" form, filled in, and a small embed
 * snippet (a link and an image, no scripts) for a personal site.
 */
export function ShareCredentialExtras({ linkedInUrl, embed, title }: { linkedInUrl: string; embed: string | null; title: string }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const [copied, setCopied] = useState(false);
  const panel = useId();

  async function copy() {
    try {
      await navigator.clipboard.writeText(embed ?? "");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary")}>
          <Briefcase aria-hidden="true" className="size-4" />
          Add to LinkedIn
          <span className="sr-only"> (opens LinkedIn in a new tab)</span>
        </a>
        {embed && (
          <Button variant="ghost" aria-expanded={showEmbed} aria-controls={panel} onClick={() => setShowEmbed((s) => !s)}>
            <Code aria-hidden="true" className="size-4" />
            Embed
          </Button>
        )}
      </div>
      {embed && showEmbed && (
        <div id={panel} className="flex flex-col gap-2 rounded-lg border border-line p-4">
          <label htmlFor={`${panel}-code`} className="text-sm font-semibold text-content">
            Embed code for {title}
          </label>
          <p className="text-sm text-content-3">Paste it into a website or blog. It is a link and an image, nothing else.</p>
          <textarea
            id={`${panel}-code`}
            readOnly
            value={embed}
            rows={4}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full rounded-md border border-line-strong bg-surface-sunken px-3 py-2 font-mono text-sm text-content"
          />
          <Button variant="secondary" className="self-start" onClick={copy}>
            {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
            {copied ? "Copied" : "Copy code"}
          </Button>
        </div>
      )}
    </div>
  );
}
