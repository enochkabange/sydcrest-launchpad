"use client";

import { Button } from "@/components/ui/button";

/** Opens the browser's print dialog, where "Save as PDF" makes the PDF. Hidden on paper. */
export function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()} className="print:hidden">
      Print or save as PDF
    </Button>
  );
}
