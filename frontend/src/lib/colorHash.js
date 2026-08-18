/**
 * Deterministic name→color hashing — extracted from Avatar.jsx's `pick()`
 * once MentorCard.jsx's specialty tags needed the same "stable, distinct
 * color per string" behavior (same avatar always gets the same background;
 * "React" always gets the same tag color).
 *
 * pickTagTone maps onto Badge's existing tone set rather than inventing new
 * colors — every one of those is already contrast-measured in tokens.css
 * (see the "AA on white" comments there); "danger" is excluded here since
 * red reads as a warning, not a neutral category label.
 */
const AVATAR_PALETTE = ["bg-blue-500", "bg-orange-800", "bg-role-cohort", "bg-neutral-600", "bg-blue-800"];
const TAG_TONES = ["info", "accent", "success", "warning"];

function hash(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function pickAvatarColor(name = "") {
  return AVATAR_PALETTE[hash(name) % AVATAR_PALETTE.length];
}

export function pickTagTone(label = "") {
  return TAG_TONES[hash(label) % TAG_TONES.length];
}
