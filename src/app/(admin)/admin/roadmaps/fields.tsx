const BADGE_TONES = {
  success: "bg-success-bg text-success-fg",
  danger: "bg-danger-bg text-danger-fg",
  neutral: "bg-surface-sunken text-content-2",
  info: "bg-info-bg text-info-fg",
} as const;

/** Small tinted status label. Always carries words, never colour alone. */
export function Badge({ tone, children }: { tone: keyof typeof BADGE_TONES; children: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${BADGE_TONES[tone]}`}>{children}</span>;
}
