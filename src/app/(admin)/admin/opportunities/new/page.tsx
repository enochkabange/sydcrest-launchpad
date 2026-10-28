import type { Metadata } from "next";
import { Suspense } from "react";
import { OpportunityForm } from "@/components/opportunities/opportunity-form";
import { adminOpportunitiesPath } from "@/components/opportunities/paths";
import Link from "@/components/ui/link";
import { AdminOnly } from "../../admin-only";
import { createOpportunity } from "../actions";

export const metadata: Metadata = { title: "Post an opportunity", robots: { index: false } };

/** The form shows only to admins; createOpportunity checks the role again. */
export default function NewOpportunityPage() {
  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href={adminOpportunitiesPath} className="underline underline-offset-2 hover:text-content">
          Opportunities
        </Link>
      </nav>
      <div className="flex flex-col gap-2">
        <h1 className="text-title text-content">Post an opportunity</h1>
        <p className="max-w-reading text-content-2">
          Only post opportunities you have checked are real, with a working way to apply. Save as a draft to finish
          later; open posts go on the public board straight away.
        </p>
      </div>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <AdminOnly>
          <OpportunityForm action={createOpportunity} mode="admin" />
        </AdminOnly>
      </Suspense>
    </div>
  );
}
