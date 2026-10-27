import Link from "@/components/ui/link";
import { Suspense } from "react";
import Logo from "@/components/brand/Logo";
import { AppNav } from "@/components/app-shell/nav";
import { UserChip } from "@/components/app-shell/user-chip";
import { LegalLinks } from "@/components/app-shell/legal-links";
import { PageViewTracker } from "@/lib/analytics/page-view-tracker";

/**
 * Frame for every signed-in screen. The session is read inside Suspense
 * boundaries further down, never awaited here, so the shell stays static.
 */
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      <aside className="hidden w-60 shrink-0 flex-col gap-8 border-r border-line bg-surface-sunken px-4 py-6 md:flex">
        <Link href="/dashboard" aria-label="SydCrest Launchpad home">
          <Logo size={32} />
        </Link>
        <div className="flex-1">
          <AppNav variant="sidebar" />
        </div>
        <Suspense>
          <UserChip />
        </Suspense>
        <LegalLinks />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center border-b border-line px-4 py-3 md:hidden">
          <Link href="/dashboard" aria-label="SydCrest Launchpad home">
            <Logo size={28} />
          </Link>
        </header>
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 pt-8 pb-24 md:px-8 md:pb-12">
          {children}
          {/* Phones: inside main, so its bottom padding keeps the links clear of the tab bar. */}
          <LegalLinks className="mt-12 border-t border-line pt-4 md:hidden" />
        </main>
      </div>
      <AppNav variant="tabs" />
      {/* First party page views for the funnel; renders nothing. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </div>
  );
}
