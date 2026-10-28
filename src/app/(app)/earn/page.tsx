import type { Metadata } from "next";
import { HubPage } from "@/components/app-shell/hub";

export const metadata: Metadata = { title: "Earn" };

/** The Earn tab's hub (issue #190): every Earn destination, from src/lib/nav/config.ts. */
export default function EarnHub() {
  return <HubPage id="earn" />;
}
