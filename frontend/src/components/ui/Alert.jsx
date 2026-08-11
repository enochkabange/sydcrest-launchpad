/**
 * Alert — inline messaging that completes the status story Badge starts.
 *
 * Every tone carries its own icon, so the meaning survives for a colourblind
 * learner and on the washed-out screen of a cheap phone in daylight. Brand
 * orange is absent here for the same reason it is absent from Badge: it means
 * SydCrest, not caution.
 */
import Icon from "./Icon.jsx";

const tones = {
  info: {
    icon: "info",
    cls: "bg-info-bg border-blue-200 text-blue-900",
    iconCls: "text-info-fg",
  },
  success: {
    icon: "success",
    cls: "bg-success-bg border-success-500/30 text-success-fg",
    iconCls: "text-success-fg",
  },
  warning: {
    icon: "warning",
    cls: "bg-warning-bg border-warning-500/40 text-warning-fg",
    iconCls: "text-warning-fg",
  },
  danger: {
    icon: "danger",
    cls: "bg-danger-bg border-danger-500/30 text-danger-fg",
    iconCls: "text-danger-fg",
  },
};

export default function Alert({
  tone = "info",
  title,
  onDismiss,
  className = "",
  children,
  ...props
}) {
  const t = tones[tone] ?? tones.info;

  return (
    <div
      /* Errors interrupt; everything else waits for a pause in speech. */
      role={tone === "danger" ? "alert" : "status"}
      className={`flex gap-3 rounded-lg border p-4 ${t.cls} ${className}`}
      {...props}
    >
      <Icon name={t.icon} size="md" className={`mt-0.5 ${t.iconCls}`} />

      <div className="flex-1 min-w-0">
        {title && <p className="font-bold leading-snug">{title}</p>}
        {children && (
          <div className={`text-sm ${title ? "mt-1" : ""} opacity-90`}>{children}</div>
        )}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-m-1 h-8 w-8 shrink-0 rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </div>
  );
}
