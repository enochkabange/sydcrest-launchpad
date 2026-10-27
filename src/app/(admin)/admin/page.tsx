import type { Metadata } from "next";
import Link from "@/components/ui/link";
import { ADMIN_SECTIONS } from "./sections";

export const metadata: Metadata = { title: "Admin" };

/** Static list of sections; the layout's gate has already checked the viewer is an admin. */
export default function AdminHome() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-title text-content">Admin</h1>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_SECTIONS.map(({ href, label, description }) => (
          <li key={href}>
            <Link href={href} className="flex min-h-11 flex-col gap-1 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-sunken">
              <span className="text-lg font-semibold text-content">{label}</span>
              <span className="text-sm text-content-2">{description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
