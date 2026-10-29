"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { analyticsOffHere, browserSaysDoNotTrack, setAnalyticsOff } from "./opt-out";

type Choice = "on" | "off" | "browser";

const noop = () => () => {};

function readChoice(): Choice {
  if (browserSaysDoNotTrack()) return "browser";
  return analyticsOffHere() ? "off" : "on";
}

/**
 * The switch on the privacy page: turns first party analytics off (or back
 * on) for this browser. Do Not Track and Global Privacy Control already turn
 * it off, and the page says so. The setting is a cookie the server reads too,
 * so nothing is recorded from this browser while it is off.
 */
export function AnalyticsChoice() {
  // Null on the server and during hydration, so the markup matches.
  const saved = useSyncExternalStore<Choice | null>(noop, readChoice, () => null);
  const [changed, setChanged] = useState<Choice | null>(null);
  const choice = changed ?? saved;

  function set(off: boolean) {
    setAnalyticsOff(off);
    setChanged(off ? "off" : "on");
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border border-line bg-surface-sunken p-4">
      <p role="status" className="text-content">
        {choice === null && "Checking the setting on this device."}
        {choice === "browser" &&
          "Your browser asks websites not to track you (Do Not Track or Global Privacy Control), so we record no analytics from it."}
        {choice === "on" && "Analytics are on for this browser."}
        {choice === "off" && "Analytics are off for this browser. We record nothing from it until you turn them back on."}
      </p>
      {choice === "on" && (
        <Button variant="secondary" className="self-start" onClick={() => set(true)}>
          Turn analytics off on this device
        </Button>
      )}
      {choice === "off" && (
        <Button variant="secondary" className="self-start" onClick={() => set(false)}>
          Turn analytics back on
        </Button>
      )}
    </div>
  );
}
