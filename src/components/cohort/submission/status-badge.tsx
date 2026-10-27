import { STATUS_LABEL, STATUS_TONE, type SubmissionStatus } from "@/lib/submissions/status";

const TONES = {
  neutral: "border-line bg-surface-sunken text-content-2",
  info: "border-info-fg/30 bg-info-bg text-info-fg",
  warning: "border-warning-fg/30 bg-warning-bg text-warning-fg",
  success: "border-success-fg/30 bg-success-bg text-success-fg",
} as const;

/** The status of a piece of work, in words (colour is never the only signal). */
export function SubmissionStatusBadge({ status }: { status: SubmissionStatus | null }) {
  const label = status ? STATUS_LABEL[status] : "Not started";
  const tone = status ? STATUS_TONE[status] : "neutral";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}>
      {label}
    </span>
  );
}
