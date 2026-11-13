"use client";

import { useState } from "react";
import { Button, buttonClasses } from "@/components/ui/button";
import { SelectField, TextField } from "@/components/ui/field";
import Link from "@/components/ui/link";
import { clientTrack } from "@/lib/analytics/client/analytics";
import { normaliseTag } from "@/lib/analytics/attribution";
import { LINK_TARGETS, chapterCampaignLink, isLinkTarget, targetPath, type LinkTarget } from "@/lib/chapters/campaign-link";
import { QrCode, qrSvgFile } from "./qr-code";

/**
 * Builds the chapter's tagged link (#335): which page it opens and an
 * optional label for one post or poster. Shows the link, a QR code made on
 * the device, and opens the printable poster.
 */
export function CampaignLinkBuilder({ chapterSlug, chapterName, origin }: { chapterSlug: string; chapterName: string; origin: string }) {
  const [target, setTarget] = useState<LinkTarget>("chapter");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const link = chapterCampaignLink({ origin, path: targetPath(target, chapterSlug), chapterSlug, content }) ?? "";
  const contentTag = normaliseTag(content);
  const posterHref = `/chapters/${chapterSlug}/poster?${new URLSearchParams({ target, ...(contentTag ? { content: contentTag } : {}) }).toString()}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
    clientTrack("campaign_link_copied", { action: "copy" });
  }

  function download() {
    const blob = new Blob([qrSvgFile(link)], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chapterSlug}${contentTag ? `-${contentTag}` : ""}-qr.svg`;
    a.click();
    URL.revokeObjectURL(url);
    clientTrack("campaign_link_copied", { action: "download" });
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <SelectField id="link_target" label="Page it opens" value={target} onChange={(e) => isLinkTarget(e.target.value) && setTarget(e.target.value)}>
            {LINK_TARGETS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </SelectField>
          <TextField
            id="link_content"
            label="Label for this link (optional)"
            hint="To tell links apart, like library or skillshop-march."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoComplete="off"
          />
        </div>
        <TextField id="campaign_link" label="Your chapter link" value={link} readOnly onFocus={(e) => e.currentTarget.select()} />
        <div className="flex flex-wrap gap-3">
          <Button onClick={copy}>{copied ? "Copied" : "Copy link"}</Button>
          <Button variant="secondary" onClick={download}>
            Download QR code
          </Button>
          <Link href={posterHref} className={buttonClasses("secondary")}>
            Make a poster
          </Link>
        </div>
        <p className="text-sm text-content-3">
          People who sign up through this link count towards {chapterName} on the acquisition dashboard and in new members above.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 self-start rounded-lg border border-line bg-surface p-3">
        <QrCode value={link} label={`QR code for ${link}`} className="size-40" />
        <span className="text-xs text-content-3">Scan to test</span>
      </div>
    </div>
  );
}
