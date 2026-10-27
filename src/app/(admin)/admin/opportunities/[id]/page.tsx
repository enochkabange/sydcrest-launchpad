import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { OpportunityForm } from "@/components/opportunities/opportunity-form";
import { adminOpportunitiesPath, opportunityPath } from "@/components/opportunities/paths";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";
import { requireAdmin } from "@/lib/admin";
import { accraToday, formatDate, isOpenOn } from "@/lib/opportunities/model";
import { deleteOpportunity, setOpportunityStatusAsAdmin, updateOpportunity } from "../actions";

export const metadata: Metadata = { title: "Edit opportunity", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function EditOpportunityPage({ params, searchParams }: PageProps<"/admin/opportunities/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm text-content-2">
        <Link href={adminOpportunitiesPath} className="underline underline-offset-2 hover:text-content">
          Opportunities
        </Link>
      </nav>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Editor params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Editor({ params, searchParams }: PageProps<"/admin/opportunities/[id]">) {
  const { supabase } = await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const { data: o, error } = await supabase.from("opportunities").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(`Could not load the opportunity: ${error.message}`);
  if (!o) notFound();
  const { created } = await searchParams;
  const live = o.status === "open" && isOpenOn(o, accraToday());

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-title text-content">{o.title}</h1>
          <p className="text-content-2">
            {[
              `Offered by ${o.organisation_name}.`,
              o.organisation_id ? "Posted by the organisation; edits show under their name." : "",
              o.published_at ? `First opened ${formatDate(o.published_at)}.` : "",
            ]
              .filter(Boolean)
              .join(" ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {live && (
            <Link href={opportunityPath(o.slug)} className="inline-flex min-h-11 items-center gap-2 rounded-md px-4 text-sm font-semibold text-content-link underline">
              View on the board
              <ExternalLink aria-hidden className="size-4" />
            </Link>
          )}
          {o.status !== "draft" && (
            <form action={setOpportunityStatusAsAdmin}>
              <input type="hidden" name="id" value={o.id} />
              <input type="hidden" name="status" value={o.status === "open" ? "closed" : "open"} />
              <Button type="submit" variant="secondary">
                {o.status === "open" ? "Close now" : "Reopen"}
              </Button>
            </form>
          )}
        </div>
      </div>
      {created && <Alert tone="success">Posted. {o.status === "open" ? "It is on the public board now." : "It is saved as a draft."}</Alert>}
      {o.status === "open" && !live && (
        <Alert tone="info">The deadline has passed, so this no longer shows on the board. Set a later deadline to show it again.</Alert>
      )}

      <OpportunityForm action={updateOpportunity} mode="admin" opportunity={o} />

      <section aria-labelledby="delete-heading" className="flex flex-col items-start gap-3 rounded-lg border border-line p-5">
        <h2 id="delete-heading" className="text-h3 text-content">
          Delete
        </h2>
        <p className="max-w-reading text-sm text-content-2">
          Deleting removes the post and every learner&apos;s saved marker for it. To take it off the board but keep the
          record, close it instead.
        </p>
        <form action={deleteOpportunity}>
          <input type="hidden" name="id" value={o.id} />
          <Button type="submit" variant="secondary" className="text-danger-fg">
            Delete opportunity
          </Button>
        </form>
      </section>
    </>
  );
}
