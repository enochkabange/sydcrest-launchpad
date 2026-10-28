import type { ComponentProps } from "react";

const VARIANTS = {
  primary: "bg-action text-action-fg hover:bg-action-hover",
  secondary: "border border-line-strong bg-surface text-content hover:bg-surface-sunken",
  ghost: "text-content-2 hover:bg-surface-sunken hover:text-content",
} as const;

export function buttonClasses(variant: keyof typeof VARIANTS = "primary", className = "") {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: { variant?: keyof typeof VARIANTS } & ComponentProps<"button">) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
