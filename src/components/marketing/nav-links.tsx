"use client";

import Link from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { MARKETING_NAV } from "@/content/marketing";

/** Always visible, never behind a hamburger: one scrollable row on phones, inline on desktop. */
export function MarketingNavLinks() {
  const pathname = usePathname();
  return (
    <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:px-0">
      {MARKETING_NAV.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <li key={href} className="shrink-0">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center rounded-md px-3 text-sm font-semibold no-underline ${
                active ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface-sunken hover:text-content"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
