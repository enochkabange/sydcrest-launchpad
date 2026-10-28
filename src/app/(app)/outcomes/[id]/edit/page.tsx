import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Alert } from "@/components/ui/alert";
import { MainWithRail } from "@/components/ui/layout";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { isOutcomeType } from "@/lib/outcomes/labels";
import { todayIso } from "@/lib/outcomes/validation";
import { editOutcome } from "../../actions";
import { OutcomeForm } from "../../outcome-form";
import { OutcomeTypesGuide } from "../../types-guide";

export const metadata: Metadata = { title: "Edit outcome" };

async function Form({ params }: Pick<PageProps<"/outcomes/[id]/edit">, "params">) {
  const user = await requireUser();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const supabase = await createClient();
  const { data: o } = await supabase
    .from("outcomes")
    .select("id, type, title, organisation_name, started_on, evidence_url, evidence_note, verification_status, verification_note")
    .eq("id", id)
    .eq("profile_id", user.id)
    .maybeSingle();
  // Verified outcomes are final; the list offers no edit for them.
  if (!o || o.verification_status === "verified" || !isOutcomeType(o.type)) notFound();

  return (
    <>
      {o.verification_status === "rejected" && (
        <Alert tone="info">
          {o.verification_note ? `Our team said: ${o.verification_note}` : "Our team could not confirm this from the evidence."} Saving
          sends it back for review.
        </Alert>
      )}
      <OutcomeForm
        action={editOutcome.bind(null, o.id)}
        submitLabel="Save and send for review"
        today={todayIso()}
        initial={{
          type: o.type,
          title: o.title,
          organisation_name: o.organisation_name,
          started_on: o.started_on,
          evidence_url: o.evidence_url,
          evidence_note: o.evidence_note,
        }}
      />
    </>
  );
}

export default function EditOutcomePage({ params }: PageProps<"/outcomes/[id]/edit">) {
  return (
    <MainWithRail railLabel="What counts as an outcome" rail={<OutcomeTypesGuide />}>
      <div className="flex max-w-2xl flex-col gap-6">
        <h1 className="text-title text-content">Edit outcome</h1>
        <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Form params={params} />
        </Suspense>
      </div>
    </MainWithRail>
  );
}
