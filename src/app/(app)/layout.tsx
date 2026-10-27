import { Suspense } from "react";
import { AppSidebar, AppTopBar, PhoneTabBar } from "@/components/app-shell/shell";
import { LegalLinks } from "@/components/app-shell/legal-links";
import { PageViewTracker } from "@/lib/analytics/page-view-tracker";

/**
 * Frame for every signed-in screen. The session and the pathname are read
 * inside Suspense boundaries further down (shell.tsx), never here, so the
 * frame stays static and dynamic routes stream their content into it.
 */
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar />
        <main id="main" className="mx-auto w-full max-w-page flex-1 px-4 pt-8 pb-24 md:px-8 md:pb-12">
          {children}
          {/* Phones: inside main, so its bottom padding keeps the links clear of the tab bar. */}
          <LegalLinks className="mt-12 border-t border-line pt-4 md:hidden" />
        </main>
      </div>
      <PhoneTabBar />
      {/* First party page views for the funnel; renders nothing. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </div>
  );
}
