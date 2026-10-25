"use client";

import Link from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { ADMIN_SECTIONS } from "./sections";

/** Section links that wrap onto a second row on narrow phones instead of scrolling sideways. */
export function AdminNavLinks({ pathname = "" }: { pathname?: string }) {
  return (
    <nav aria-label="Admin sections">
      <ul className="flex flex-wrap gap-1">
        {ADMIN_SECTIONS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm font-semibold ${active ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface hover:text-content"}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Highlights the current section. Reads the URL, so the layout wraps it in Suspense. */
export function AdminNav() {
  return <AdminNavLinks pathname={usePathname()} />;
}
