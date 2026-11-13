import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MessageResults } from "@/components/messaging/results";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { getMessageResults } from "@/lib/messaging/composer-server";

export const metadata: Metadata = { title: "Message results", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function Results({ params }: Pick<PageProps<"/admin/messages/[id]">, "params">) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const result = await getMessageResults(id);
  if (!result) notFound();
  let chapter: string | undefined;
  const chapterId = (result.message.filters as { chapter_id?: string } | null)?.chapter_id ?? result.message.chapter_id;
  if (chapterId) {
    const { data } = await supabase.from("chapters").select("name").eq("id", chapterId).maybeSingle();
    chapter = data?.name;
  }
  return <MessageResults message={result.message} rows={result.rows} windowOpen={result.windowOpen} names={{ chapter }} />;
}

/** Staff: one message's results against its holdout (#334). */
export default function MessageResultsPage({ params }: PageProps<"/admin/messages/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin/messages" className="-mb-2 inline-flex min-h-11 items-center self-start text-sm text-content-link">
        All messages
      </Link>
      <h1 className="text-title text-content">Message results</h1>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Results params={params} />
      </Suspense>
    </div>
  );
}
