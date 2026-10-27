import type { Metadata } from "next";
import { Suspense } from "react";
import { MainWithRail } from "@/components/ui/layout";
import { requireUser } from "@/lib/auth";
import { todayIso } from "@/lib/outcomes/validation";
import { reportOutcome } from "../actions";
import { OutcomeForm } from "../outcome-form";
import { OutcomeTypesGuide } from "../types-guide";

export const metadata: Metadata = { title: "Report an outcome" };

async function Form() {
  // Signed in only; also makes "today" a request time value.
  await requireUser();
  return <OutcomeForm action={reportOutcome} submitLabel="Report outcome" today={todayIso()} />;
}

export default function NewOutcomePage() {
  return (
    <MainWithRail railLabel="What counts as an outcome" rail={<OutcomeTypesGuide />}>
      <div className="flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-content">Report an outcome</h1>
          <p className="text-lead text-content-2">Tell us what you landed. Our team checks it before it counts.</p>
        </div>
        <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <Form />
        </Suspense>
      </div>
    </MainWithRail>
  );
}
