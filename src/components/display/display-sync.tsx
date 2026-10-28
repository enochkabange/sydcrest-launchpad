"use client";

import { useEffect, useLayoutEffect } from "react";
import { saveDisplayPrefsToProfile } from "@/lib/display/actions";
import { newerPrefs, parseDisplayPrefs } from "@/lib/display/prefs";
import { applyDisplayPrefs, readDisplayPrefs, setProfileSaver, writeDisplayPrefs } from "@/lib/display/store";

/**
 * Mounted once in the root layout. The inline script already applied the
 * prefs while the HTML was parsed; in development React resets <html> on its
 * Strict Mode remount, so apply them again before paint. A no-op in production.
 */
export function DisplayPrefsRoot() {
  useLayoutEffect(() => applyDisplayPrefs(), []);
  return null;
}

/**
 * For signed in users (rendered beside the You menu, inside its Suspense).
 * On load the newer of the device copy and the profile copy wins; a profile
 * that was never set takes the device's choices, so settings picked before
 * signing up follow the account. Every later change is saved to the profile.
 */
export function DisplayPrefsSync({ remote }: { remote: unknown }) {
  useEffect(() => {
    const local = readDisplayPrefs();
    const fromProfile = remote ? parseDisplayPrefs(remote) : null;
    const winner = newerPrefs(local, fromProfile);
    if (winner === "remote" && fromProfile) writeDisplayPrefs(fromProfile);
    else if (winner === "local" && (!fromProfile || fromProfile.updatedAt === 0)) void saveDisplayPrefsToProfile(local);

    setProfileSaver((p) => void saveDisplayPrefsToProfile(p));
    return () => setProfileSaver(null);
  }, [remote]);
  return null;
}
