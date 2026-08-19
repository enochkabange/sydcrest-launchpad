/**
 * DropdownMenu — shadcn/ui pattern: Radix primitives restyled to this
 * app's own tokens (see the @theme aliases in tokens.css: --color-popover,
 * --color-menu-hover, --color-border) rather than shadcn's default
 * palette, so this looks like it belongs next to Modal.jsx and Card.jsx,
 * not like an imported foreign component. Radix supplies the actual
 * hard part for free: focus management, keyboard nav (arrow keys, Home/
 * End, type-ahead), portal rendering, and correct ARIA roles.
 */
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/cn.js";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export function DropdownMenuContent({ className, sideOffset = 6, align = "end", ...props }) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg",
          "data-[state=open]:animate-panel-in",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-content outline-none transition-colors",
        "data-[highlighted]:bg-menu-hover data-[highlighted]:text-menu-hover-fg",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-45",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({ className, ...props }) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}
