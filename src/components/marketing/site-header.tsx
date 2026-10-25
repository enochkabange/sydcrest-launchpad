import Link from "@/components/ui/link";
import Logo, { LogoMark } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/button";
import { MarketingNavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 pt-3 md:flex-row md:items-center md:gap-6 md:px-8 md:py-3">
        <div className="flex items-center justify-between gap-3 md:contents">
          <Link href="/" aria-label="SydCrest Launchpad home" className="flex min-h-11 shrink-0 items-center no-underline">
            <span className="sm:hidden">
              <LogoMark size={36} variant="auto" />
            </span>
            <span className="hidden sm:block">
              <Logo size={34} />
            </span>
          </Link>
          <div className="flex items-center gap-2 md:order-last md:ml-auto">
            <Link href="/login" className={buttonClasses("ghost", "whitespace-nowrap")}>
              Sign in
            </Link>
            <Link href="/signup" className={buttonClasses("primary", "whitespace-nowrap")}>
              Create account
            </Link>
          </div>
        </div>
        <nav aria-label="Site" className="pb-2 md:pb-0">
          <MarketingNavLinks />
        </nav>
      </div>
    </header>
  );
}
