"use client";

import { Button } from "@/components/ui/button";
import { clientTrack } from "@/lib/analytics/client/analytics";

export function PrintButton() {
  return (
    <Button
      onClick={() => {
        clientTrack("campaign_link_copied", { action: "print" });
        window.print();
      }}
    >
      Print this poster
    </Button>
  );
}
