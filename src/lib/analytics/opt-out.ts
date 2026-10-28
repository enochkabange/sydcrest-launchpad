import { OPT_OUT_COOKIE } from "./context";

/**
 * Browser only. True when the visitor has Do Not Track or Global Privacy
 * Control on, or turned analytics off on this device (the privacy page). The
 * server checks the same signals, so nothing is recorded either way.
 */
export function optedOut() {
  return browserSaysDoNotTrack() || analyticsOffHere();
}

/** Whether the visitor's own switch is off on this device (ignores DNT and GPC). */
export function analyticsOffHere() {
  return document.cookie.split("; ").includes(`${OPT_OUT_COOKIE}=off`);
}

/** Whether the browser itself asks not to be tracked. */
export function browserSaysDoNotTrack() {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}

/** Turns analytics off (or back on) for this browser, for a year. */
export function setAnalyticsOff(off: boolean) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = off
    ? `${OPT_OUT_COOKIE}=off; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
    : `${OPT_OUT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}
