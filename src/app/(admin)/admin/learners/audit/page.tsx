import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { DataTable, type Column } from "@/components/ui/layout";
import { requireAdmin } from "@/lib/admin";
import { auditActionLabel } from "@/lib/people/console";
import type { Database } from "@/lib/supabase/database.types";

export const metadata: Metadata = { title: "Audit log", robots: { index: false } };

type Entry = Database["public"]["Functions"]["admin_audit_entries"]["Returns"][number];

async function Entries() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.rpc("admin_audit_entries", { p_limit: 300 });
  if (error) throw new Error(`Could not load the audit log: ${error.message}`);
  const columns: Column<Entry>[] = [
    {
      header: "What",
      cell: (e) => (
        <span className="flex min-w-0 flex-col">
          <span className="font-semibold text-content">{auditActionLabel(e.action)}</span>
          {e.note && <span className="text-sm break-words text-content-2">{e.note}</span>}
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    {
      header: "Member",
      cell: (e) =>
        e.target_profile_id ? (
          <Link href={`/admin/learners/${e.target_profile_id}`} prefetch={false}>
            {e.target_name || "No name yet"}
          </Link>
        ) : (
          "–"
        ),
    },
    { header: "By", cell: (e) => e.admin_name ?? "System", className: "text-content-2" },
    { header: "When", cell: (e) => e.at.slice(0, 16).replace("T", " "), align: "end", className: "tabular-nums text-content-2" },
  ];
  return (data ?? []).length ? (
    <DataTable caption="Audit log" columns={columns} rows={data ?? []} rowKey={(e) => e.id} />
  ) : (
    <p className="text-content-2">Nothing logged yet.</p>
  );
}

/** Admin: every admin search, page view and action on a member, newest first (#332). */
export default function AuditPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Link href="/admin/learners" className="text-sm text-content-2">
          All learners
        </Link>
        <h1 className="text-title text-content">Audit log</h1>
        <p className="max-w-reading text-content-2">
          Every search, every learner page opened and every change an admin makes, with who and when. It cannot be edited.
          Notes about a person are cleared when their account is deleted. The latest 300 lines.
        </p>
      </div>
      <Suspense fallback={<div className="h-96 animate-skeleton rounded-lg bg-surface-sunken" />}>
        <Entries />
      </Suspense>
    </div>
  );
}
