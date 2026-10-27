import { DataTable, rowLinkClass, type Column } from "@/components/ui/layout";
import Link from "@/components/ui/link";
import { deadlineLabel, kindLabel, locationLabel, type Opportunity } from "@/lib/opportunities/model";
import { opportunityPath } from "./paths";

/** The board as a table: one line per opportunity on phones, columns from md. */
export function OpportunityTable({ rows, today, caption }: { rows: Opportunity[]; today: string; caption: string }) {
  const columns: Column<Opportunity>[] = [
    {
      header: "Opportunity",
      cell: (o) => (
        <span className="flex min-w-0 flex-col">
          <Link href={opportunityPath(o.slug)} className={`font-semibold text-content ${rowLinkClass}`}>
            {o.title}
          </Link>
          <span className="text-sm text-content-2">{o.organisation_name}</span>
        </span>
      ),
      className: "min-w-0 flex-1",
    },
    { header: "Type", cell: (o) => kindLabel(o.kind), className: "text-sm text-content-2", phone: "hide" },
    { header: "Location", cell: (o) => locationLabel(o), className: "text-sm text-content-2", phone: "hide" },
    {
      header: "Deadline",
      cell: (o) => deadlineLabel(o.deadline, today),
      className: "shrink-0 text-sm text-content-2 md:whitespace-nowrap",
    },
  ];
  return <DataTable caption={caption} columns={columns} rows={rows} rowKey={(o) => o.id} />;
}
