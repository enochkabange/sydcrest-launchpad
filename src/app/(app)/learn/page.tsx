import type { Metadata } from "next";
import { HubPage } from "@/components/app-shell/hub";

export const metadata: Metadata = { title: "Learn" };

/** The Learn tab's hub (issue #190): every Learn destination, from src/lib/nav/config.ts. */
export default function LearnHub() {
  return <HubPage id="learn" />;
}
