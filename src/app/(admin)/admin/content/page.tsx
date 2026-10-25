import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMyProfile } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Alert } from "@/components/ui/alert";
import { contentModel } from "@/lib/content-generation/config";
import { createAnthropic } from "@/lib/content-generation/server";
import { CollectForm, GenerateForm, type BatchOption } from "./content-forms";

export const metadata: Metadata = { title: "Node content", robots: { index: false } };

async function recentBatches(): Promise<BatchOption[]> {
  const client = createAnthropic();
  if (!client) return [];
  try {
    const page = await client.messages.batches.list({ limit: 10 });
    return page.data.map((b) => ({
      id: b.id,
      label: `${new Date(b.created_at).toLocaleString("en-GB", { timeZone: "Africa/Accra" })}, ${b.processing_status.replace("_", " ")}, ${
        b.request_counts.processing + b.request_counts.succeeded + b.request_counts.errored + b.request_counts.canceled + b.request_counts.expired
      } requests`,
    }));
  } catch {
    return [];
  }
}

async function ContentAdmin() {
  // This page does its own admin check; the actions check again.
  const profile = await getMyProfile();
  if (profile.role !== "admin") notFound();

  const supabase = await createClient();
  const [{ data: roadmaps }, batches] = await Promise.all([
    supabase.from("roadmaps").select("slug, title").order("display_order"),
    recentBatches(),
  ]);
  const hasKey = Boolean(process.env.ANTHROPIC_API_KEY);
  const hasDb = Boolean(process.env.SUPABASE_SECRET_KEY);

  return (
    <>
      <h1 className="text-3xl text-content">Node content</h1>
      {!hasKey && (
        <Alert tone="info">AI generation is off: ANTHROPIC_API_KEY is not set. You can still estimate costs.</Alert>
      )}
      {!hasDb && <Alert tone="info">Content writes are off: SUPABASE_SECRET_KEY is not set.</Alert>}
      <section className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 md:p-6">
        <h2 className="text-xl text-content">Generate</h2>
        <p className="text-content-2">
          Sends each node to the Batch API with {contentModel()} for an explanation, a practice task and a quiz of three
          to five questions. Results are checked before anything is saved. Review the content before publishing a
          roadmap.
        </p>
        <GenerateForm roadmaps={roadmaps ?? []} />
      </section>
      <section className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 md:p-6">
        <h2 className="text-xl text-content">Collect</h2>
        <p className="text-content-2">Saves the results of a finished batch. Collecting the same batch twice is safe.</p>
        <CollectForm batches={batches} />
      </section>
    </>
  );
}

export default function ContentAdminPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      {/* The heading renders after the admin check so others see only the 404. */}
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <ContentAdmin />
      </Suspense>
    </div>
  );
}
