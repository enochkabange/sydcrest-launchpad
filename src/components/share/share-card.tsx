"use client";

import { clientTrack } from "@/lib/analytics/client/analytics";
import { Check, Download, Link2, Share2 } from "lucide-react";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { Button, buttonClasses } from "@/components/ui/button";
import { cardFileName, shareMode, type CardFormat, type ShareMode } from "@/lib/share/card";

const noop = () => () => {};
const probe = () => new File([new Uint8Array(1)], "card.png", { type: "image/png" });

const FORMATS: { value: CardFormat; label: string; hint: string }[] = [
  { value: "story", label: "Status size", hint: "Tall, for WhatsApp Status and stories" },
  { value: "square", label: "Square", hint: "For chats and feeds" },
];

/**
 * Share a milestone card. Nothing is fetched until the learner opens it.
 * Where the browser can share files (most phones, some computers), "Share
 * image" opens the share sheet with the card itself, so it can go straight to
 * a WhatsApp Status. Everywhere else: copy the link and download the image.
 *
 * `imageBase` is the card route without the format (`/og/achievements/<id>`),
 * `pageUrl` the public page the link opens.
 */
export function ShareCard({
  imageBase,
  pageUrl,
  headline,
  text,
  buttonLabel = "Share a card",
  note = "The card shows this milestone, the date and your name as your public profile shows it. Anyone with the link can see it.",
}: {
  imageBase: string;
  pageUrl: string;
  headline: string;
  text: string;
  buttonLabel?: string;
  /** What the card shows and who can see it, in plain words. */
  note?: string;
}) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<CardFormat>("story");
  const [files, setFiles] = useState<Partial<Record<CardFormat, File>>>({});
  const [status, setStatus] = useState("");
  // "none" on the server and during hydration, so the markup matches.
  const mode = useSyncExternalStore<ShareMode>(
    noop,
    () => shareMode(navigator, probe),
    () => "none",
  );
  const src = `${imageBase}/${format}`;
  const fileName = cardFileName(headline, format);
  const sharedTarget = imageBase.includes("certificate") ? "certificate" : "achievement";

  // Fetch the image ahead of the tap: share sheets need the file ready the
  // moment the button is pressed, or some browsers refuse to open.
  useEffect(() => {
    if (!open || mode !== "files" || files[format]) return;
    let live = true;
    fetch(src)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
      .then((blob) => {
        if (live) setFiles((f) => ({ ...f, [format]: new File([blob], fileName, { type: "image/png" }) }));
      })
      .catch(() => {
        if (live) setStatus("The card could not be loaded. Copy the link instead.");
      });
    return () => {
      live = false;
    };
  }, [open, mode, format, files, src, fileName]);

  async function shareImage() {
    const file = files[format];
    if (!file) return;
    try {
      await navigator.share({ files: [file], title: headline, text: `${text} ${pageUrl}` });
      clientTrack("share_clicked", { target: sharedTarget, channel: "share" });
      setStatus("Shared.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Sharing did not work here. Download the image or copy the link instead.");
    }
  }

  async function shareLink() {
    try {
      await navigator.share({ title: headline, text, url: pageUrl });
      clientTrack("share_clicked", { target: sharedTarget, channel: "share" });
      setStatus("Shared.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Sharing did not work here. Copy the link instead.");
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(pageUrl);
      clientTrack("share_clicked", { target: sharedTarget, channel: "copy" });
      setStatus("Link copied.");
    } catch {
      setStatus("Copy failed. The link is " + pageUrl);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="secondary"
        className="self-start"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOpen((o) => !o);
          setStatus("");
        }}
      >
        <Share2 aria-hidden="true" className="size-4" />
        {buttonLabel}
      </Button>

      {open && (
        <div id={panelId} className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 sm:flex-row sm:items-start sm:gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- a generated PNG; next/image would re-encode it. */}
          <img
            src={src}
            alt={`Your card: ${headline}`}
            width={format === "story" ? 180 : 240}
            height={format === "story" ? 320 : 240}
            className="shrink-0 self-center rounded-md border border-line bg-surface-sunken sm:self-start"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm font-semibold text-content">Card size</legend>
              {FORMATS.map((f) => (
                <label key={f.value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2 hover:bg-surface-sunken">
                  <input
                    type="radio"
                    name={`${panelId}-format`}
                    value={f.value}
                    checked={format === f.value}
                    onChange={() => {
                      setFormat(f.value);
                      setStatus("");
                    }}
                    className="size-5 shrink-0 accent-line-selected"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-content">{f.label}</span>
                    <span className="text-sm text-content-3">{f.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <p className="text-sm text-content-2">{note}</p>
            <div className="flex flex-wrap gap-2">
              {mode === "files" && (
                <Button onClick={shareImage} disabled={!files[format]}>
                  <Share2 aria-hidden="true" className="size-4" />
                  {files[format] ? "Share image" : "Preparing image…"}
                </Button>
              )}
              {mode === "link" && (
                <Button onClick={shareLink}>
                  <Share2 aria-hidden="true" className="size-4" />
                  Share link
                </Button>
              )}
              <a
                href={src}
                download={fileName}
                onClick={() => clientTrack("share_clicked", { target: sharedTarget, channel: "download" })}
                className={buttonClasses(mode === "none" ? "primary" : "secondary")}
              >
                <Download aria-hidden="true" className="size-4" />
                Download image
              </a>
              <Button variant="secondary" onClick={copy}>
                {status === "Link copied." ? <Check aria-hidden="true" className="size-4" /> : <Link2 aria-hidden="true" className="size-4" />}
                Copy link
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Always in the page so updates are announced; takes no room until there is something to say. */}
      <p role="status" className={status ? "text-sm text-content-2" : "sr-only"}>
        {status}
      </p>
    </div>
  );
}
