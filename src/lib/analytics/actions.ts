"use server";

import { track } from "./track";
import { sanitizePath } from "./events";

/** Called by <PageViewTracker /> after each client navigation. Path only, no query string. */
export async function recordPageView(path: string) {
  const clean = sanitizePath(path);
  if (!clean) return;
  await track("page_view", { path: clean });
}
