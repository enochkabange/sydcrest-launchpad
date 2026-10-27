import { Suspense } from "react";
import Link from "@/components/ui/link";
import Logo from "@/components/brand/Logo";
import { LegalLinks } from "@/components/app-shell/legal-links";
import { PageViewTracker } from "@/lib/analytics/page-view-tracker";

/** Plain reading layout for the privacy policy and terms. Fully static: no session reads. */
export default function LegalLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line px-4 py-3 md:px-8">
        <Link href="/" aria-label="SydCrest Launchpad home" className="inline-flex min-h-11 items-center">
          <Logo size={28} />
        </Link>
      </header>
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-4 pt-10 pb-16 md:px-8">
        {children}
      </main>
      <footer className="border-t border-line px-4 py-2 md:px-8">
        <LegalLinks className="mx-auto w-full max-w-2xl" />
      </footer>
      {/* First party page views for the funnel; renders nothing. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </div>
  );
}
