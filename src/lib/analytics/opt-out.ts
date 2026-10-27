/** Honour Do Not Track and Global Privacy Control. Browser only. */
export function optedOut() {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}
