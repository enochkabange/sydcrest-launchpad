"use client";

import { useEffect, useSyncExternalStore } from "react";
import { isConstrainedConnection, type NetworkInformationLike } from "@/lib/connection";

type Connection = NetworkInformationLike & EventTarget;

function connection(): Connection | undefined {
  return (navigator as Navigator & { connection?: Connection }).connection;
}

function subscribe(onChange: () => void) {
  const c = connection();
  c?.addEventListener("change", onChange);
  return () => c?.removeEventListener("change", onChange);
}

const getSnapshot = () => isConstrainedConnection(connection());
// The server cannot know the learner's connection; assume normal and let the
// client correct it straight after hydration.
const getServerSnapshot = () => false;

/**
 * True when the learner has Data Saver on (Chrome "Lite mode") or is on a 2G
 * class link. Re-evaluates when the connection changes, so walking out of
 * WiFi range onto slow mobile data switches it on without a reload.
 */
export function useDataSaver(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Mirrors the state onto <html data-save-data> so future CSS (background
 * images, decorative media) can lighten itself with a
 * `[data-save-data] &` selector instead of every component reading the hook.
 * Today the app ships no raster images, so nothing keys off it yet.
 */
export function DataSaverFlag() {
  const saveData = useDataSaver();
  useEffect(() => {
    if (saveData) document.documentElement.dataset.saveData = "true";
    else delete document.documentElement.dataset.saveData;
  }, [saveData]);
  return null;
}
