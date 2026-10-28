import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "@/components/ui/link";
import { MainWithRail } from "@/components/ui/layout";
import { getNavViewer } from "@/lib/nav/viewer";
import { DisplaySettings } from "./display-settings";

export const metadata: Metadata = {
  title: "Settings",
  description: "Theme, text size and accessibility settings for SydCrest Launchpad.",
  robots: { index: false },
};

/** Where the choices are kept: only this part reads the session, inside Suspense. */
async function WhereSaved() {
  const viewer = await getNavViewer();
  if (!viewer) {
    return (
      <p className="text-sm text-content-2">
        Saved on this device. <Link href="/login?next=/settings">Sign in</Link> to keep them on your account too.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3 text-sm text-content-2">
      <p>Saved on this device and on your account, so they follow you when you sign in somewhere else.</p>
      <p>
        <Link href="/profile#settings">WhatsApp reminders and messages</Link> are on your profile.
      </p>
    </div>
  );
}

/**
 * Display and accessibility settings (issue #204). Open to everyone: a
 * visitor can choose a theme or a text size before they have an account.
 * The controls are a client island over localStorage; the page prerenders.
 */
export default function SettingsPage() {
  return (
    <MainWithRail
      sticky
      railLabel="About these settings"
      rail={
        <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface-sunken p-4 md:p-6">
          <h2 className="text-h3 font-bold text-content">About these settings</h2>
          <Suspense fallback={<p className="text-sm text-content-2">Saved on this device.</p>}>
            <WhereSaved />
          </Suspense>
          <p className="text-sm text-content-2">
            Read our <Link href="/accessibility">accessibility statement</Link> to see what works today and how to tell
            us about a problem.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-title text-content">Settings</h1>
          <p className="text-lead text-content-2">Choose how SydCrest looks and reads for you. Changes apply straight away.</p>
        </header>
        <DisplaySettings />
      </div>
    </MainWithRail>
  );
}
