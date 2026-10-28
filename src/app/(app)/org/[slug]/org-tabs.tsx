"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/ui/link";

/** Section links inside an organisation's member area. Wraps on phones, one row from md. */
export function OrgTabs({ slug, publicHref }: { slug: string; publicHref: string | null }) {
  const pathname = usePathname();
  const tabs = [
    { href: `/org/${slug}/manage`, label: "Overview" },
    { href: `/org/${slug}/team`, label: "Team" },
    { href: `/org/${slug}/opportunities`, label: "Opportunities" },
    { href: `/org/${slug}/requests`, label: "Talent requests" },
  ];
  return (
    <nav aria-label="Organisation" className="flex flex-wrap gap-1 border-b border-line">
      {tabs.map((t) => {
        const active = pathname === t.href || pathname.startsWith(`${t.href}/`);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px inline-flex min-h-11 items-center border-b-2 px-3 text-sm font-semibold ${
              active ? "border-content-link text-content" : "border-transparent text-content-2 hover:text-content"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
      {publicHref && (
        <Link href={publicHref} className="-mb-px inline-flex min-h-11 items-center border-b-2 border-transparent px-3 text-sm font-semibold text-content-link hover:underline">
          Public page
        </Link>
      )}
    </nav>
  );
}
