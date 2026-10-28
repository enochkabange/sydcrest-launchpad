import { Suspense } from "react";
import { SiteFooter } from "@/components/marketing/site-footer";
import { ViewerHeader, ViewerTabBar } from "@/components/app-shell/viewer-frame";
import { PageViewTracker } from "@/lib/analytics/page-view-tracker";

/**
 * The marketing site. Visitors get the site header; signed in users get the
 * app top bar and tab bar instead (viewer-frame.tsx), read inside Suspense
 * so pages still prerender.
 */
export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ViewerHeader />
      <main id="main" className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
      <ViewerTabBar />
      {/* First party page views for the funnel; renders nothing. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
