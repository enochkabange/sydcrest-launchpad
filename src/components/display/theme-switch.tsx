"use client";

import { Moon, Sun } from "lucide-react";
import { updateDisplayPrefs, useIsDark } from "@/lib/display/store";

/**
 * The quick switch in the app top bar, the sidebar and the site header:
 * one tap between light and dark. "Follow my device" and the other display
 * choices live on /settings. Both icons are in the HTML and CSS shows the
 * right one (the same rule as the logo), so nothing flashes before hydration.
 */
export function ThemeSwitch({ className = "" }: { className?: string }) {
  const dark = useIsDark();
  const label = dark ? "Use light theme" : "Use dark theme";
  return (
    <button
      type="button"
      onClick={() => updateDisplayPrefs({ theme: dark ? "light" : "dark" })}
      aria-label={dark === null ? "Switch theme" : label}
      title={dark === null ? undefined : label}
      data-testid="theme-switch"
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-content-2 hover:bg-surface-sunken hover:text-content ${className}`}
    >
      <Moon className="syd-on-light size-5" aria-hidden="true" />
      <Sun className="syd-on-dark size-5" aria-hidden="true" />
    </button>
  );
}
