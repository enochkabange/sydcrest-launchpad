import type { ReactNode } from "react";

const TONES = {
  danger: "border-danger-fg/30 bg-danger-bg text-danger-fg",
  success: "border-success-fg/30 bg-success-bg text-success-fg",
  info: "border-info-fg/30 bg-info-bg text-info-fg",
} as const;

export function Alert({ tone, children }: { tone: keyof typeof TONES; children: ReactNode }) {
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={`rounded-md border px-3 py-2.5 text-sm ${TONES[tone]}`}>
      {children}
    </div>
  );
}
