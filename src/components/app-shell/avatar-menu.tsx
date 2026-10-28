"use client";

import { useId, useRef } from "react";
import { LogOut, UserRound } from "lucide-react";
import Link from "@/components/ui/link";
import { signOut } from "@/app/(auth)/actions";
import { groupById, visibleItems, NO_ROLES, type NavRoles } from "@/lib/nav/config";

export type AvatarViewer = { name: string | null; email: string | null; roles: NavRoles };

function initials(name: string | null): string | null {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return null;
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/**
 * "You" in the top bar: the avatar opens a small menu with the You group
 * (Profile, Notifications, Settings, Admin for admins) and Sign out. Built on
 * the native popover attribute, so it opens without waiting for JavaScript,
 * closes on Escape or a tap outside, and sits above the page. `viewer` is
 * null until the name streams in.
 */
export function AvatarMenu({ viewer }: { viewer: AvatarViewer | null }) {
  const id = useId();
  const menu = useRef<HTMLDivElement>(null);
  const items = visibleItems(groupById("you"), viewer?.roles ?? NO_ROLES);
  const letters = initials(viewer?.name ?? null);
  // Client navigation keeps the layout mounted, so close the menu on the way out.
  const close = () => menu.current?.hidePopover?.();

  return (
    <>
      <button
        type="button"
        popoverTarget={id}
        aria-label="You: profile, notifications and settings"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-surface-sunken"
      >
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-info-bg text-xs font-bold text-info-fg">
          {letters ?? <UserRound className="size-5" aria-hidden="true" />}
        </span>
      </button>
      <div
        id={id}
        ref={menu}
        popover="auto"
        aria-label="You"
        data-testid="you-menu"
        className="fixed inset-auto top-14 right-4 m-0 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-line bg-surface-raised p-2 text-content shadow-lg"
      >
        {viewer && (viewer.name || viewer.email) && (
          <div className="min-w-0 border-b border-line px-3 pt-1 pb-3">
            {viewer.name && <p className="truncate text-sm font-semibold">{viewer.name}</p>}
            {viewer.email && <p className="truncate text-xs text-content-3">{viewer.email}</p>}
          </div>
        )}
        <ul className="flex flex-col gap-1 pt-2">
          {items.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={close}
                className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold text-content-2 no-underline hover:bg-surface-sunken hover:text-content"
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
          <li className="border-t border-line pt-1">
            <form action={signOut}>
              <button
                type="submit"
                className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-sm font-semibold text-content-2 hover:bg-surface-sunken hover:text-content"
              >
                <LogOut className="size-5 shrink-0" aria-hidden="true" />
                Sign out
              </button>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}
