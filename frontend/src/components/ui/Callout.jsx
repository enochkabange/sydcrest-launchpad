/**
 * Callout — asides inside lesson content.
 *
 * Distinct from Alert: Alert reports what the *system* did ("submission
 * failed"). Callout is the *author* speaking to the learner ("watch out for
 * this"). They look different on purpose so the two never blur.
 *
 * `task` is the one that earns its place in a cohort product — a concrete
 * thing to go and do before continuing, which is where curriculum turns into
 * practice.
 */
import Icon from "./Icon.jsx";

const kinds = {
  note:    { icon: "info",     label: "Note",      cls: "border-blue-200 bg-info-bg",             iconCls: "text-info-fg" },
  tip:     { icon: "ai",       label: "Tip",       cls: "border-success-500/30 bg-success-bg",    iconCls: "text-success-fg" },
  warning: { icon: "warning",  label: "Watch out", cls: "border-warning-500/40 bg-warning-bg",    iconCls: "text-warning-fg" },
  task:    { icon: "goal",     label: "Your turn", cls: "border-orange-300 bg-orange-50",         iconCls: "text-orange-800" },
};

export default function Callout({ kind = "note", title, className = "", children, ...props }) {
  const k = kinds[kind] ?? kinds.note;

  return (
    <aside
      className={`full-bleed my-6 rounded-lg border-l-4 border-y border-r p-4 ${k.cls} ${className}`}
      {...props}
    >
      <p className="flex items-center gap-2 text-sm font-bold text-content">
        <Icon name={k.icon} size="sm" className={k.iconCls} />
        {title ?? k.label}
      </p>
      <div className="mt-1.5 text-[0.9375rem] leading-relaxed text-content-2 [&>*+*]:mt-2">
        {children}
      </div>
    </aside>
  );
}
