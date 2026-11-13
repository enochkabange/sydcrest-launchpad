import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MessageResults } from "@/components/messaging/results";
import Link from "@/components/ui/link";
import { requireChapterLead } from "@/lib/chapters/lead";
import { getMessageResults } from "@/lib/messaging/composer-server";

export const metadata: Metadata = { title: "Message results", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function ChapterMessagePage({ params }: PageProps<"/chapters/[slug]/lead/messages/[id]">) {
  return (
    <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" aria-busy="true" />}>
      <Results params={params} />
    </Suspense>
  );
}

/** A chapter lead's message and how many came back, against the holdout (#334). */
async function Results({ params }: Pick<PageProps<"/chapters/[slug]/lead/messages/[id]">, "params">) {
  const { slug, id } = await params;
  const { chapter } = await requireChapterLead(slug);
  if (!UUID.test(id)) notFound();
  const result = await getMessageResults(id);
  if (!result || result.message.chapter_id !== chapter.id) notFound();
  return (
    <div className="flex flex-col gap-6">
      <Link href={`/chapters/${chapter.slug}/lead`} className="-mb-2 inline-flex min-h-11 items-center self-start text-sm text-content-link">
        Lead tools
      </Link>
      <h1 className="text-title text-content">Message results</h1>
      <MessageResults message={result.message} rows={result.rows} windowOpen={result.windowOpen} names={{ chapter: chapter.name }} />
    </div>
  );
}
