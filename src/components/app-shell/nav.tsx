"use client";

import Link from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { House, UserRound, type LucideIcon } from "lucide-react";

const DESTINATIONS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/profile", label: "Profile", icon: UserRound },
];

/** Sidebar list at md and up; fixed bottom tab bar under the thumb on phones. No hamburger. */
export function AppNav({ variant }: { variant: "sidebar" | "tabs" }) {
  const pathname = usePathname();

  if (variant === "tabs") {
    return (
      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
        <ul className="flex">
          {DESTINATIONS.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold ${active ? "text-content-link" : "text-content-3"}`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col gap-1">
        {DESTINATIONS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold ${active ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface-sunken hover:text-content"}`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
