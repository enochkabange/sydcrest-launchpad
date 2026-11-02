import type { Metadata } from "next";
import { HubPage } from "@/components/app-shell/hub";

export const metadata: Metadata = { title: "Experts" };

/** The Experts tab's hub (issue #190, founder decision D5): every market destination, from src/lib/nav/config.ts. */
export default function ExpertsHub() {
  return <HubPage id="experts" />;
}
