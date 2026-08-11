/**
 * Toast — transient confirmation.
 *
 * Enters on transform + opacity only. The live region is the container, not
 * the toast, so announcements work when a toast is added to an existing stack.
 * Errors are assertive; everything else is polite and waits its turn.
 */
import { useEffect } from "react";
import Icon from "./Icon.jsx";

const tones = {
  success: { icon: "success", cls: "border-success-500/40", iconCls: "text-success-fg" },
  info:    { icon: "info",    cls: "border-blue-200",       iconCls: "text-info-fg" },
  warning: { icon: "warning", cls: "border-warning-500/40", iconCls: "text-warning-fg" },
  danger:  { icon: "danger",  cls: "border-danger-500/40",  iconCls: "text-danger-fg" },
};

export function Toast({ tone = "success", message, onDismiss, duration = 5000 }) {
  const t = tones[tone] ?? tones.success;

  useEffect(() => {
    if (!onDismiss || duration === 0) return;
    const id = setTimeout(onDismiss, duration);
    return () => clearTimeout(id);
  }, [onDismiss, duration]);

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border bg-surface-raised p-3.5 pr-2.5 shadow-md animate-toast-in ${t.cls}`}
    >
      <Icon name={t.icon} size="md" className={`mt-0.5 ${t.iconCls}`} />
      <p className="flex-1 text-sm font-medium text-content">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="h-7 w-7 shrink-0 rounded-md flex items-center justify-center text-content-3 hover:text-content transition-colors"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </div>
  );
}

/**
 * Stack container. Bottom-centre on phones (reachable by thumb, clear of the
 * browser chrome), bottom-right from `sm` up.
 */
export function ToastStack({ toasts = [], onDismiss, className = "" }) {
  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-2 sm:left-auto sm:right-4 sm:w-80 ${className}`}
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast {...t} onDismiss={() => onDismiss?.(t.id)} />
        </div>
      ))}
    </div>
  );
}

export default Toast;
