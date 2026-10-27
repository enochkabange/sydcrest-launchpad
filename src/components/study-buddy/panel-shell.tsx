import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";

/**
 * The Study Buddy card frame. Server safe (no "use client"), so the signed
 * out prompt can render on prerendered public pages without the chat bundle.
 */
export function PanelShell({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <section
      aria-labelledby="study-buddy-heading"
      className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 sm:p-5"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <MessageCircle aria-hidden className="size-5 text-content-accent" />
          <h2 id="study-buddy-heading" className="text-lg font-bold text-content">
            Study Buddy
          </h2>
        </div>
        {aside}
      </header>
      {children}
    </section>
  );
}
