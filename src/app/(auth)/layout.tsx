import { Suspense } from "react";
import Link from "@/components/ui/link";
import Logo from "@/components/brand/Logo";
import { LegalLinks } from "@/components/app-shell/legal-links";
import { PageViewTracker } from "@/lib/analytics/page-view-tracker";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 px-4 py-12">
      <Link href="/" aria-label="SydCrest Launchpad home" className="self-start">
        <Logo size={36} />
      </Link>
      {children}
      <LegalLinks />
      {/* Shared sign up links skip the marketing pages; count the visit here too. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </main>
  );
}
