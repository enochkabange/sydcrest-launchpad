import { Suspense } from "react";
import Link from "@/components/ui/link";
import Logo, { LogoMark } from "@/components/brand/Logo";
import { getNavViewer } from "@/lib/nav/viewer";
import { NO_ROLES } from "@/lib/nav/config";
import { ActiveSidebarList, ActiveTabList, ActiveTopLinks, SidebarList, TabList, TopLinks } from "./nav";
import { AvatarMenu } from "./avatar-menu";
import { ShellBell } from "./bell";
import { UserChip } from "./user-chip";
import { LegalLinks } from "./legal-links";
import { ThemeSwitch } from "@/components/display/theme-switch";
import { DisplayPrefsSync } from "@/components/display/display-sync";

/**
 * The pieces of the signed in frame (issue #190), shared by the app layout
 * and, for signed in users, the public and marketing layouts. Everything
 * that reads the session or the pathname sits in its own <Suspense> with a
 * plain fallback, so the frame itself prerenders for every route, dynamic
 * ones included.
 */

async function SidebarForViewer() {
  const viewer = await getNavViewer();
  return <ActiveSidebarList roles={viewer?.roles ?? NO_ROLES} />;
}

/** The md and up sidebar: every group expanded, role items once the viewer streams in. */
export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-6 overflow-y-auto border-r border-line bg-surface-sunken px-4 py-6 md:flex">
      <div className="flex items-center justify-between gap-2">
        <Link href="/dashboard" aria-label="SydCrest Launchpad home" className="inline-flex min-h-11 items-center">
          <Logo size={32} />
        </Link>
        <div className="flex items-center">
          <ThemeSwitch />
          <ShellBell />
        </div>
      </div>
      <div className="flex-1">
        <Suspense fallback={<SidebarList roles={NO_ROLES} pathname={null} />}>
          <SidebarForViewer />
        </Suspense>
      </div>
      <Suspense>
        <UserChip />
      </Suspense>
      <LegalLinks />
    </aside>
  );
}

async function AvatarForViewer() {
  const viewer = await getNavViewer();
  return (
    <>
      <AvatarMenu viewer={viewer} />
      {/* Profile copy of the display settings: load on sign in, save on change (#204). */}
      {viewer && <DisplayPrefsSync remote={viewer.displayPrefs} />}
    </>
  );
}

/**
 * Logo, bell and the You menu. In the app it is the phone header (the
 * sidebar takes over from md); on public pages `links` adds the five
 * destinations as a row from md, since those pages have no sidebar.
 */
export function AppTopBar({ links = false }: { links?: boolean }) {
  return (
    <header className={`border-b border-line bg-surface ${links ? "" : "md:hidden"}`}>
      <div className={`flex items-center justify-between gap-3 px-4 py-2 ${links ? "mx-auto w-full max-w-page md:gap-6 md:px-8" : ""}`}>
        <Link href="/dashboard" aria-label="SydCrest Launchpad home" className="inline-flex min-h-11 shrink-0 items-center">
          <span className={links ? "lg:hidden" : ""}>
            <LogoMark size={32} variant="auto" />
          </span>
          {links && (
            <span className="hidden lg:block">
              <Logo size={30} />
            </span>
          )}
        </Link>
        {links && (
          <div className="mr-auto min-w-0">
            <Suspense fallback={<TopLinks pathname={null} />}>
              <ActiveTopLinks />
            </Suspense>
          </div>
        )}
        <div className="flex items-center gap-1">
          <ThemeSwitch />
          <ShellBell />
          <Suspense fallback={<AvatarMenu viewer={null} />}>
            <AvatarForViewer />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

/** The phone tab bar (hidden from md). Pathname aware, so it waits behind Suspense. */
export function PhoneTabBar() {
  return (
    <Suspense fallback={<TabList pathname={null} />}>
      <ActiveTabList />
    </Suspense>
  );
}
