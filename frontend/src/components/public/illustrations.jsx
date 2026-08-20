/**
 * Public-site decorative illustrations. Abstract angular compositions built
 * from the same bar/gradient language as Logo.jsx (LogoMark), not a new
 * illustration style bolted onto the brand. Purely decorative — aria-hidden,
 * no content a screen reader needs — and colors are hardcoded brand hex
 * (same approach LogoMark takes) rather than theme tokens, so the mark reads
 * identically in light and dark mode instead of trying to "theme" a logo.
 *
 * These stand in for photography: PLATFORM_SPEC.md's no-fake-content rule
 * blocks fabricating photos of students/mentors that don't exist yet for a
 * pre-launch, zero-cohort project, so visual weight comes from abstract
 * brand marks instead.
 */
import { useId } from "react";

/** Large ascending composition — Home hero's empty right-side space on desktop. */
export function HeroGraphic({ className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 420 420" className={className} aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={`${id}-cool`} x1="40" y1="380" x2="220" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3872BD" />
          <stop offset="1" stopColor="#11100F" />
        </linearGradient>
        <linearGradient id={`${id}-warm`} x1="210" y1="210" x2="400" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F1EF1E" />
          <stop offset="1" stopColor="#F79020" />
        </linearGradient>
      </defs>
      <rect x="30" y="298" width="160" height="48" rx="5" fill={`url(#${id}-cool)`} transform="rotate(-18 110 322)" />
      <rect x="118" y="218" width="138" height="44" rx="5" fill="#1c75bb" transform="rotate(-18 187 240)" />
      <rect x="202" y="138" width="124" height="42" rx="5" fill={`url(#${id}-warm)`} transform="rotate(-18 264 159)" />
      <rect x="272" y="58" width="112" height="40" rx="5" fill={`url(#${id}-warm)`} transform="rotate(-18 328 78)" />
      <circle cx="366" cy="44" r="17" fill="#F79020" />
    </svg>
  );
}

const STEP_PALETTE = [
  { from: "#1c75bb", to: "#124e7e" },
  { from: "#f79020", to: "#a0590e" },
  { from: "#165b93", to: "#0a2e4d" },
];
const STEP_ROTATIONS = [-16, 12, -8];

/** Small angular badge used for "How it works" step markers, replacing plain numbers. */
export function StepGraphic({ index = 0, className = "size-11" }) {
  const id = useId().replace(/:/g, "");
  const { from, to } = STEP_PALETTE[index % STEP_PALETTE.length];
  const rotation = STEP_ROTATIONS[index % STEP_ROTATIONS.length];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-surface-sunken ${className}`}>
      <svg viewBox="0 0 32 32" className="size-5" aria-hidden="true" role="presentation">
        <defs>
          <linearGradient id={`${id}-g`} x1="4" y1="24" x2="28" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <rect x="5" y="12.5" width="22" height="7" rx="1.5" fill={`url(#${id}-g)`} transform={`rotate(${rotation} 16 16)`} />
      </svg>
    </span>
  );
}

/** Small decorative mark for page headers (Programs, ProgramDetail, About). */
export function SectionAccent({ className = "size-10" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" role="presentation">
      <defs>
        <linearGradient id={`${id}-g`} x1="4" y1="34" x2="36" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1c75bb" />
          <stop offset="1" stopColor="#f79020" />
        </linearGradient>
      </defs>
      <rect x="5" y="15" width="30" height="9" rx="2" fill={`url(#${id}-g)`} transform="rotate(-10 20 20)" />
      <rect x="11" y="4" width="18" height="6" rx="1.5" fill="#f79020" opacity="0.35" transform="rotate(-10 20 7)" />
    </svg>
  );
}
