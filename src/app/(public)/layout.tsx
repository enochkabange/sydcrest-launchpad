import { Suspense } from "react";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SkipLink } from "@/components/app-shell/skip-link";
import { ViewerHeader, ViewerTabBar } from "@/components/app-shell/viewer-frame";
import { PageViewTracker } from "@/lib/analytics/page-view-tracker";

/**
 * Pages anyone can open without signing in: public profiles and shared
 * achievements. The page itself reads no session; viewer specific parts of
 * each page sit inside their own <Suspense> boundary, and so does the choice
 * between the site header (visitors) and the app navigation (signed in).
 */
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <SkipLink />
      <ViewerHeader />
      <main id="main" className="mx-auto w-full max-w-page flex-1 px-4 pt-8 pb-16 md:px-8">
        {children}
      </main>
      <SiteFooter />
      <ViewerTabBar />
      {/* First party page views for the funnel; renders nothing. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </div>
  );
}
