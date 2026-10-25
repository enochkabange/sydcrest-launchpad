import Link from "@/components/ui/link";
import Logo from "@/components/brand/Logo";

/**
 * Pages anyone can open without signing in: public profiles and shared
 * achievements. No session reads here; viewer specific parts of each page
 * sit inside their own <Suspense> boundary.
 */
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-8">
        <Link href="/" aria-label="SydCrest Launchpad home" className="inline-flex min-h-11 items-center">
          <Logo size={28} />
        </Link>
        <Link href="/leaderboards" className="inline-flex min-h-11 items-center text-sm font-semibold text-content-2 hover:text-content">
          Leaderboards
        </Link>
      </header>
      <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-4 pt-8 pb-16 md:px-8">
        {children}
      </main>
    </div>
  );
}
