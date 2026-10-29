import { BadgeCheck, PenLine, ShieldCheck } from "lucide-react";
import { VERIFICATION_LABEL, type Verification } from "@/lib/credentials/share";

const STYLE: Record<Verification, string> = {
  sydcrest: "border-success-fg/30 bg-success-bg text-success-fg",
  issuer: "border-info-fg/30 bg-info-bg text-info-fg",
  learner: "border-line bg-surface-sunken text-content-2",
};

const ICON = { sydcrest: BadgeCheck, issuer: ShieldCheck, learner: PenLine };

/**
 * The one honest label for every credential (issue #253): Verified by
 * SydCrest, Verified by the issuer, or Added by the learner. Colour is never
 * the only signal; the words are always there.
 */
export function VerificationLabel({ kind, size = "md" }: { kind: Verification; size?: "sm" | "md" }) {
  const Icon = ICON[kind];
  return (
    <span
      className={`inline-flex items-center gap-1 self-start rounded-full border font-semibold whitespace-nowrap ${STYLE[kind]} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-0.5 text-sm"
      }`}
    >
      <Icon aria-hidden="true" className={size === "sm" ? "size-3.5 shrink-0" : "size-4 shrink-0"} />
      {VERIFICATION_LABEL[kind]}
    </span>
  );
}
