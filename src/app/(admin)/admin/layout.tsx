import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import Logo from "@/components/brand/Logo";
import { LegalLinks } from "@/components/app-shell/legal-links";
import { SkipLink } from "@/components/app-shell/skip-link";
import { getMyProfile } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin";
import { AdminNav } from "./admin-nav";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin · SydCrest Launchpad" },
  robots: { index: false, follow: false },
};

/**
 * Renders the section only for admins. Non admins get a 404, signed out
 * visitors go to /login. Layouts are not re-run on every navigation, so each
 * admin page and Server Action calls requireAdmin again; this gate only keeps
 * the frame from showing admin pages to anyone else.
 */
async function AdminGate({ children }: { children: ReactNode }) {
  await requireAdmin();
  return children;
}

/**
 * The admin header's "Admin" link and section list, for admins only (issue
 * #245). Everyone else gets a plain logo header above the 404: the section
 * names are not shipped to them, not even as a loading fallback.
 */
async function AdminsOnly({ children }: { children: ReactNode }) {
  const profile = await getMyProfile();
  return profile.role === "admin" ? children : null;
}

/** Frame for the admin area. The session is read inside Suspense, never at the top. */
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col">
      <SkipLink />
      <header className="border-b border-line bg-surface-sunken">
        <div className="mx-auto flex w-full max-w-page flex-col gap-2 px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" aria-label="SydCrest Launchpad home">
              <Logo size={28} />
            </Link>
            <Suspense fallback={null}>
              <AdminsOnly>
                <Link href="/admin" className="inline-flex min-h-11 items-center text-sm font-semibold text-content-2 hover:text-content">
                  Admin
                </Link>
              </AdminsOnly>
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <AdminsOnly>
              <AdminNav />
            </AdminsOnly>
          </Suspense>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-page flex-1 px-4 pt-8 pb-16 md:px-8">
        <Suspense fallback={<div className="h-64 animate-skeleton rounded-lg bg-surface-sunken" />}>
          <AdminGate>{children}</AdminGate>
        </Suspense>
      </main>
      <footer className="border-t border-line px-4 py-2 md:px-8">
        <LegalLinks className="mx-auto w-full max-w-page" />
      </footer>
    </div>
  );
}
