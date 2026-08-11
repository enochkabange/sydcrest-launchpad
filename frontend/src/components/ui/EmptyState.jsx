/**
 * EmptyState — what a learner sees before anything has happened.
 *
 * A first cohort is mostly empty screens for its first week, so this is a
 * primary state, not an edge case. Every empty state names the next action;
 * "No projects yet" alone is a dead end.
 */
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";

export default function EmptyState({
  icon = "document",
  title,
  description,
  action,
  onAction,
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-strong px-6 py-12 text-center ${className}`}
      {...props}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-surface-sunken text-content-3">
        <Icon name={icon} size="lg" />
      </span>

      <p className="text-lg font-bold text-content text-balance">{title}</p>

      {description && (
        <p className="max-w-sm text-sm text-content-2 text-pretty">{description}</p>
      )}

      {action && (
        <Button onClick={onAction} className="mt-2">{action}</Button>
      )}

      {children}
    </div>
  );
}
