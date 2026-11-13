import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, type Column } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { DELETION_GRACE_DAYS } from "@/lib/data-rights/constants";
import type { Database } from "@/lib/supabase/database.types";

export const metadata: Metadata = { title: "Deletion requests", robots: { index: false } };

type Row = Database["public"]["Functions"]["admin_deletion_requests"]["Returns"][number];

const STATUS: Record<string, string> = { pending: "Waiting", cancelled: "Cancelled", completed: "Deleted" };
const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "–");

async function Requests() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc("admin_deletion_requests", { p_limit: 200 });
  if (error) throw new Error(`Could not load deletion requests: ${error.message}`);
  const rows = data ?? [];
  const columns: Column<Row>[] = [
    {
      header: "Member",
      cell: (r) =>
        r.profile_id ? (
          <Link href={`/admin/learners/${r.profile_id}`} prefetch={false} className="font-semibold">
            {r.display_name || "No name yet"}
          </Link>
        ) : (
          <span className="text-content-2">Deleted account</span>
        ),
      className: "min-w-0 flex-1",
    },
    { header: "Status", cell: (r) => STATUS[r.status] ?? r.status },
    { header: "Asked", cell: (r) => day(r.requested_at), align: "end", phone: "hide", className: "tabular-nums" },
    {
      header: "Deletes on",
      cell: (r) => (r.status === "pending" ? day(r.delete_after) : r.status === "completed" ? day(r.completed_at) : `Cancelled ${day(r.cancelled_at)}`),
      align: "end",
      className: "tabular-nums",
    },
    { header: "Last error", cell: (r) => r.last_error ?? "", phone: "hide", className: "text-content-2" },
  ];
  const pending = rows.filter((r) => r.status === "pending").length;
  return (
    <div className="flex flex-col gap-4">
      <p className="text-content">
        {pending === 0 ? "No accounts are waiting to be deleted." : `${pending} ${pending === 1 ? "account is" : "accounts are"} waiting to be deleted.`}
      </p>
      {rows.length > 0 && <DataTable caption="Deletion requests" columns={columns} rows={rows} rowKey={(r) => r.id} />}
    </div>
  );
}

/** Admin: members who asked to delete their account (#333). Nothing to do here: the daily job deletes them. */
export default function DeletionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link href="/admin/learners" className="text-sm text-content-2">
          All learners
        </Link>
        <h1 className="text-title text-content">Deletion requests</h1>
        <p className="max-w-reading text-content-2">
          Members delete their own accounts from their profile. We wait {DELETION_GRACE_DAYS} days so they can change their
          mind, then the daily job deletes the account and their uploaded files. Certificates stay verifiable and daily
          totals stay; nothing else is kept. A request that failed shows its error and is tried again the next day.
        </p>
      </div>
      <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Requests />
      </Suspense>
    </div>
  );
}
