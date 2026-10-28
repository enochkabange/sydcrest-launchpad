import { Suspense } from "react";
import Link from "@/components/ui/link";
import Logo, { LogoMark } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/button";
import { MarketingNavLinks, MarketingNavLinksFallback } from "./nav-links";

/**
 * The visitor header: logo and account buttons, then the public areas
 * (PUBLIC_NAV in src/lib/nav/config.ts) on their own row at every width.
 * Nine links do not fit beside the logo and buttons even at 1280; on their
 * own row they all show from lg, and narrower screens scroll the row inside
 * itself, never the page (#136).
 */
export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col gap-1 px-4 pt-3 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="SydCrest Launchpad home" className="flex min-h-11 shrink-0 items-center no-underline">
            <span className="sm:hidden">
              <LogoMark size={36} variant="auto" />
            </span>
            <span className="hidden sm:block">
              <Logo size={34} />
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className={buttonClasses("ghost", "whitespace-nowrap")}>
              Sign in
            </Link>
            <Link href="/signup" className={buttonClasses("primary", "whitespace-nowrap")}>
              Create account
            </Link>
          </div>
        </div>
        <nav aria-label="Site" className="min-w-0 pb-2">
          {/* usePathname is unknown while prerendering a dynamic route's App Shell. */}
          <Suspense fallback={<MarketingNavLinksFallback />}>
            <MarketingNavLinks />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
