/**
 * Card — the default container for lessons, projects, mentors, opportunities.
 * Separation comes from the border; shadow is reserved for genuinely raised
 * surfaces (menus, modals). Flat cards read better on low-DPI Android panels.
 */

const variants = {
  default: "bg-surface border border-line",
  raised:  "bg-surface border border-line shadow-md",
  sunken:  "bg-surface-sunken border border-line",
  accent:  "bg-surface border border-line border-l-4 border-l-orange-500",
};

export default function Card({
  variant = "default",
  interactive = false,
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={[
        "rounded-lg",
        variants[variant] ?? variants.default,
        interactive
          ? "transition-shadow duration-150 hover:shadow-md cursor-pointer"
          : "",
        className,
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }) {
  return (
    <div className={`px-5 pt-5 pb-3 ${className}`} {...props}>{children}</div>
  );
}

export function CardTitle({ as: Tag = "h3", className = "", children, ...props }) {
  return (
    <Tag className={`text-lg font-bold text-content ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export function CardBody({ className = "", children, ...props }) {
  return <div className={`px-5 pb-5 ${className}`} {...props}>{children}</div>;
}

export function CardFooter({ className = "", children, ...props }) {
  return (
    <div
      className={`px-5 py-3 border-t border-line bg-surface-sunken rounded-b-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
