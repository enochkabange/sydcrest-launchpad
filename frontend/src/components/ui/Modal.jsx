/**
 * Modal — built on the native <dialog> element.
 *
 * `showModal()` gives real focus trapping, Escape-to-close, inert background
 * content and the top-layer stacking context for free. Hand-rolled focus traps
 * are a common source of accessibility bugs; this avoids writing one.
 *
 * What it does NOT do: body scroll lock behind the dialog is applied here
 * manually, but there is no scroll-position restoration on iOS Safari, which
 * has long-standing quirks. If that bites during the beta, revisit it then
 * rather than pre-emptively.
 */
import { useEffect, useRef } from "react";
import Icon from "./Icon.jsx";

const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export default function Modal({
  open,
  onClose,
  title,
  description,
  size = "md",
  footer,
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (open && !el.open) {
      el.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && el.open) {
      el.close();
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* Escape and the backdrop both fire `cancel`/`close` natively — route them
     back through onClose so React state stays the source of truth. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => { e.preventDefault(); onClose?.(); };
    el.addEventListener("cancel", handle);
    return () => el.removeEventListener("cancel", handle);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={(e) => { if (e.target === ref.current) onClose?.(); }}
      /* `m-auto` is load-bearing: the UA stylesheet centres a modal <dialog>
         with `margin: auto`, and Tailwind's preflight resets it to 0. Without
         this the panel pins to the top-left corner. */
      className={`m-auto w-[calc(100%-2rem)] ${sizes[size] ?? sizes.md} rounded-xl border border-line bg-surface-raised p-0 shadow-lg backdrop:bg-neutral-900/50 open:animate-panel-in`}
    >
      <div className="flex items-start gap-3 px-5 pt-5">
        <div className="flex-1 min-w-0">
          {title && (
            <h2 id="modal-title" className="text-lg font-bold text-content text-balance">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-content-2">{description}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 flex size-9 shrink-0 items-center justify-center rounded-md text-content-3 hover:bg-surface-sunken hover:text-content transition-colors"
        >
          <Icon name="close" size="md" />
        </button>
      </div>

      {children && <div className="px-5 py-4">{children}</div>}

      {footer && (
        <div className="flex justify-end gap-2 border-t border-line bg-surface-sunken px-5 py-3 rounded-b-xl">
          {footer}
        </div>
      )}
    </dialog>
  );
}
