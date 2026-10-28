import { Suspense } from "react";
import { SiteHeader } from "@/components/marketing/site-header";
import { getNavViewer } from "@/lib/nav/viewer";
import { AppTopBar, PhoneTabBar } from "./shell";

/**
 * Public and marketing pages for signed in users keep the app navigation
 * (issue #190). Only these two slots read the session, each inside its own
 * <Suspense> whose fallback is what a visitor sees, so the page itself still
 * prerenders for visitors and its content is never held back by the read.
 */

async function HeaderFor() {
  return (await getNavViewer()) ? <AppTopBar links /> : <SiteHeader />;
}

/** SiteHeader for visitors; the app top bar (destinations, bell, You menu) for signed in users. */
export function ViewerHeader() {
  return (
    <Suspense fallback={<SiteHeader />}>
      <HeaderFor />
    </Suspense>
  );
}

async function TabBarFor() {
  if (!(await getNavViewer())) return null;
  return (
    <>
      {/* In flow, so the footer is never trapped under the fixed bar. */}
      <div aria-hidden="true" className="h-[calc(3.5rem+env(safe-area-inset-bottom))] md:hidden" />
      <PhoneTabBar />
    </>
  );
}

/** The phone tab bar for signed in users; nothing for visitors. Place after the footer. */
export function ViewerTabBar() {
  return (
    <Suspense fallback={null}>
      <TabBarFor />
    </Suspense>
  );
}
