/**
 * Badge + RoleBadge.
 *
 * Status badges are tinted (50-level surface, 700-level text) rather than
 * solid — it keeps them quiet next to the brand accent and every pair clears
 * AA. Brand orange is absent from the status set on purpose: it means
 * "SydCrest", not "caution". See docs/design-system.md §4.
 */

const base =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 " +
  "text-xs font-semibold whitespace-nowrap border";

const tones = {
  neutral: "bg-surface-sunken text-content-2 border-line",
  info:    "bg-info-bg    text-info-fg    border-blue-200",
  success: "bg-success-bg text-success-fg border-success-500/25",
  warning: "bg-warning-bg text-warning-fg border-warning-500/30",
  danger:  "bg-danger-bg  text-danger-fg  border-danger-500/25",
  accent:  "bg-orange-50  text-orange-800  border-orange-300",
};

export default function Badge({ tone = "neutral", icon, className = "", children, ...props }) {
  return (
    <span
      className={[base, tones[tone] ?? tones.neutral, className].filter(Boolean).join(" ")}
      {...props}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}

/* The five-level role hierarchy from schema.sql. Weight escalates with
   authority: muted grey for mentee through solid ink for super_admin, so
   privilege is legible at a glance in admin tables. */
const roles = {
  mentee:         { label: "Mentee",        cls: "bg-surface-sunken text-content-2 border-line" },
  mentor:         { label: "Mentor",        cls: "bg-blue-50 text-blue-700 border-blue-200" },
  cohort_admin:   { label: "Cohort Admin",  cls: "bg-teal-50 text-role-cohort border-role-cohort/30" },
  platform_admin: { label: "Platform Admin",cls: "bg-orange-50 text-orange-800 border-orange-300" },
  /* The one solid badge — highest authority, so it inverts against the page
     in either theme rather than sitting in a fixed dark fill. */
  super_admin:    { label: "Super Admin",   cls: "bg-content text-surface border-content" },
};

export function RoleBadge({ role = "mentee", className = "", ...props }) {
  const r = roles[role] ?? roles.mentee;
  return (
    <span className={[base, r.cls, className].filter(Boolean).join(" ")} {...props}>
      {r.label}
    </span>
  );
}
