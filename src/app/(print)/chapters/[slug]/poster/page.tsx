import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PrintButton } from "@/components/chapters/print-button";
import { QrCode } from "@/components/chapters/qr-code";
import { buttonClasses } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { chapterCampaignLink, isLinkTarget, targetPath } from "@/lib/chapters/campaign-link";
import { getPublicChapter } from "@/lib/chapters/public";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Chapter poster", robots: { index: false } };

function one(v: string | string[] | undefined) {
  return (Array.isArray(v) ? v[0] : v) ?? "";
}

/**
 * A printable A4 poster for a chapter (#335) with its tagged link as a QR
 * code, so every sign up from the poster counts for the chapter. Built from
 * the lead tools; the address carries the page it opens and the link's label.
 */
export default function PosterPage({ params, searchParams }: PageProps<"/chapters/[slug]/poster">) {
  return (
    <Suspense fallback={<div className="m-8 h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-busy="true" />}>
      <Poster params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Poster({ params, searchParams }: PageProps<"/chapters/[slug]/poster">) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const chapter = await getPublicChapter(slug);
  if (!chapter) notFound();
  const target = isLinkTarget(one(query.target)) ? (one(query.target) as "chapter" | "signup" | "events" | "home") : "chapter";
  const link = chapterCampaignLink({ origin: SITE_URL, path: targetPath(target, chapter.slug), chapterSlug: chapter.slug, content: one(query.content) || "poster" });
  if (!link) notFound();
  const shown = new URL(link);

  return (
    <div className="mx-auto flex w-full max-w-[210mm] flex-col gap-6 p-4 md:p-8 print:max-w-none print:p-0">
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <PrintButton />
        <Link href={`/chapters/${chapter.slug}/lead`} className={buttonClasses("secondary")}>
          Back to lead tools
        </Link>
        <p className="text-sm text-content-2">Prints on one A4 page. Use black and white if you like: the code still scans.</p>
      </div>

      {/* Paper is white whatever the screen theme: the poster opts out of theming on purpose. */}
      <section
        aria-label="Poster"
        style={{ backgroundColor: "#ffffff", color: "#111111" }}
        className="flex min-h-[260mm] flex-col items-center justify-between gap-8 rounded-lg border border-line p-10 text-center print:min-h-[270mm] print:rounded-none print:border-0"
      >
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold tracking-wide uppercase">SydCrest Launchpad · {chapter.city}</p>
          <h1 className="text-display">Learn tech skills for free, with people near you</h1>
          <p className="text-lead">
            Join the {chapter.name}: free roadmaps, Skillshops and a community that helps you into work.
          </p>
        </div>
        <QrCode value={link} label={`QR code for ${chapter.name}`} className="size-[110mm] max-w-full" />
        <div className="flex flex-col gap-2">
          <p className="text-h3">Scan with your phone camera to join</p>
          <p className="text-sm break-all" data-testid="poster-link">
            {shown.host}
            {shown.pathname}
          </p>
        </div>
      </section>
    </div>
  );
}
