"use client";

import Link from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { HOME, NAV_GROUPS, PHONE_TABS, activeHref, activeTab, visibleItems, type NavItem, type NavRoles } from "@/lib/nav/config";

/**
 * The app navigation, drawn from src/lib/nav/config.ts. Each list comes in
 * two forms: an `Active...` one that reads usePathname() to mark the current
 * destination, and a plain one with nothing marked. The shell renders the
 * plain one as the <Suspense> fallback, so a dynamic route (where the
 * pathname is unknown while prerendering) still gets a static shell.
 */

const itemClass = (active: boolean) =>
  `flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold no-underline ${
    active ? "bg-info-bg text-info-fg" : "text-content-2 hover:bg-surface-sunken hover:text-content"
  }`;

/** Sidebar at md and up: Home, then every group expanded with its heading. */
export function SidebarList({ roles, pathname, ready = false }: { roles: NavRoles; pathname: string | null; ready?: boolean }) {
  const groups = NAV_GROUPS.map((g) => ({ group: g, items: visibleItems(g, roles) }));
  const current = activeHref(pathname, [HOME, ...groups.flatMap((g) => g.items)]);
  const link = (item: NavItem) => {
    const Icon = item.icon;
    const active = item.href === current;
    return (
      <li key={item.href}>
        <Link href={item.href} aria-current={active ? "page" : undefined} className={itemClass(active)}>
          <Icon className="size-5 shrink-0" aria-hidden="true" />
          {item.label}
        </Link>
      </li>
    );
  };
  return (
    // data-ready: the viewer's role items are in (e2e waits on it).
    <nav aria-label="Primary" data-ready={ready || undefined} className="flex flex-col gap-5">
      <ul className="flex flex-col gap-1">{link(HOME)}</ul>
      {groups.map(({ group, items }) => (
        <section key={group.id} aria-labelledby={`nav-${group.id}`} className="flex flex-col gap-1">
          <h2 id={`nav-${group.id}`} className="px-3 text-xs font-semibold tracking-wide text-content-3 uppercase">
            {group.label}
          </h2>
          <ul className="flex flex-col gap-1">{items.map(link)}</ul>
        </section>
      ))}
    </nav>
  );
}

export function ActiveSidebarList({ roles }: { roles: NavRoles }) {
  return <SidebarList roles={roles} pathname={usePathname()} ready />;
}

/** Fixed bottom tab bar under md: Home and the four hubs. No hamburger. */
export function TabList({ pathname }: { pathname: string | null }) {
  const current = activeTab(pathname);
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="flex">
        {PHONE_TABS.map(({ id, href, label, icon: Icon }) => {
          const active = id === current;
          return (
            <li key={id} className="min-w-0 flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold no-underline ${
                  active ? "text-content-link" : "text-content-3"
                }`}
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

export function ActiveTabList() {
  return <TabList pathname={usePathname()} />;
}

/**
 * The same five destinations as a row in the top bar, from md. Signed in
 * users see it on public pages (events, experts, roadmaps), which have no
 * sidebar so their full width layouts stay as designed.
 */
export function TopLinks({ pathname }: { pathname: string | null }) {
  const current = activeTab(pathname);
  return (
    <nav aria-label="App" className="hidden min-w-0 md:block">
      <ul className="flex gap-1">
        {PHONE_TABS.map(({ id, href, label, icon: Icon }) => {
          const active = id === current;
          return (
            <li key={id}>
              <Link href={href} aria-current={active ? "page" : undefined} className={itemClass(active)}>
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ActiveTopLinks() {
  return <TopLinks pathname={usePathname()} />;
}
