"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The public verification link with a copy button, plus LinkedIn's
 * "add a certification" form prefilled (a plain link out; nothing is sent
 * to LinkedIn by us).
 */
export function ShareCertificate({
  url,
  title,
  verificationId,
  issuedAt,
}: {
  url: string;
  title: string;
  verificationId: string;
  issuedAt: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const issued = new Date(issuedAt);
  const linkedIn = new URL("https://www.linkedin.com/profile/add");
  linkedIn.search = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: title,
    organizationName: "SydCrest Launchpad",
    issueYear: String(issued.getUTCFullYear()),
    issueMonth: String(issued.getUTCMonth() + 1),
    certUrl: url,
    certId: verificationId,
  }).toString();

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1.5 text-sm font-semibold text-content">
        Verification link
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
        <a
          href={linkedIn.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold text-content-2 transition-colors hover:bg-surface-sunken hover:text-content"
        >
          Add to LinkedIn
          <ExternalLink aria-hidden="true" className="size-4" />
          <span className="sr-only">(opens LinkedIn in a new tab)</span>
        </a>
      </div>
      <p role="status" className="text-sm text-content-2">
        {status === "copied" ? "Link copied." : status === "failed" ? "Copy failed. Select the link and copy it." : ""}
      </p>
    </div>
  );
}
