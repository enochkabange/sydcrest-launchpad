import type { Metadata } from "next";
import { HubPage } from "@/components/app-shell/hub";

export const metadata: Metadata = { title: "Mentors" };

/** The Mentors tab's hub (issue #190): every Mentors destination, from src/lib/nav/config.ts. */
export default function MentorsHub() {
  return <HubPage id="mentors" />;
}
