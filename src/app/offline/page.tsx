import type { Metadata } from "next";
import Logo from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "You are offline",
  robots: { index: false },
};

/**
 * Served by public/sw.js when a page is requested without a connection and
 * this phone has no saved copy of it. Fully static and precached on install,
 * along with its CSS, so it renders with no network at all. Plain anchors
 * (not next/link) so both actions are full loads the service worker answers.
 */
export default function OfflinePage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-12">
      <Logo size={36} />
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl text-content">You are offline</h1>
        <p className="text-content-2">
          This page needs a connection to open, and it has not been saved on this phone yet.
        </p>
        <p className="text-content-2">
          Pages you have opened before still work without data. When your data or WiFi is back,
          try again.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {/* An empty href reloads the address the learner asked for. */}
        <a href="" className={buttonClasses("primary")}>
          Try again
        </a>
        <a href="/dashboard" className={buttonClasses("secondary")}>
          Go to your dashboard
        </a>
      </div>
    </main>
  );
}
