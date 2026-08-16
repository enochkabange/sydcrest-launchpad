/**
 * AppShell — the frame every signed-in screen sits inside.
 *
 * The responsive decision, made once here so no screen re-litigates it:
 *
 *   < md   bottom tab bar. The majority device is a phone held one-handed;
 *          primary navigation belongs under the thumb, not behind a hamburger
 *          at the top-left corner — the hardest pixel on a phone to reach.
 *   ≥ md   persistent sidebar. Screen real estate exists, so spend it on
 *          orientation rather than hiding navigation behind a click.
 *
 * There is no hamburger menu at any breakpoint. Every primary destination is
 * always one tap away.
 */
import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import Avatar from "./Avatar.jsx";
import { LogoMark } from "./Logo.jsx";
import Logo from "./Logo.jsx";

/**
 * Theme. Three states, not two: "system" is the default and follows the OS,
 * so a learner who has their phone in night mode gets a dark app without
 * touching a setting. An explicit choice is remembered and wins over the OS.
 */
export function useTheme() {
  const [theme, setTheme] = useState(
    () => (typeof localStorage !== "undefined" && localStorage.getItem("syd-theme")) || "system"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
    try { localStorage.setItem("syd-theme", theme); } catch { /* private mode */ }
  }, [theme]);

  return [theme, setTheme];
}

function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="flex size-10 items-center justify-center rounded-md text-content-2 transition-colors hover:bg-surface-sunken hover:text-content"
    >
      <Icon name={theme === "dark" ? "themeLight" : "themeDark"} size="md" />
    </button>
  );
}

function NavItem({ item, active, onSelect, variant }) {
  const isSide = variant === "side";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.id)}
      aria-current={active ? "page" : undefined}
      className={
        isSide
          ? [
              "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors duration-150",
              active
                ? "bg-blue-50 text-blue-700"
                : "text-content-2 hover:bg-surface-sunken hover:text-content",
            ].join(" ")
          : [
              "relative flex flex-1 flex-col items-center gap-1 px-1 py-2 text-[0.6875rem] font-semibold transition-colors duration-150",
              active ? "text-blue-700" : "text-content-3",
            ].join(" ")
      }
    >
      <span className="relative">
        <Icon name={item.icon} size={isSide ? "md" : "lg"} />
        {item.badge > 0 && (
          <span
            className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-700 px-1 text-[0.625rem] font-bold text-white tabular-nums"
            aria-label={`${item.badge} unread`}
          >
            {item.badge > 9 ? "9+" : item.badge}
          </span>
        )}
      </span>
      <span className={isSide ? "flex-1 text-left" : ""}>{item.label}</span>

      {/* Active rail on the sidebar; a top bar on the tab bar. */}
      {isSide && active && (
        <span aria-hidden="true" className="h-5 w-1 rounded-full bg-blue-500" />
      )}
      {!isSide && (
        <span
          aria-hidden="true"
          className={`absolute inset-x-4 top-0 h-0.5 rounded-full bg-blue-500 transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </button>
  );
}

export default function AppShell({
  nav = [],
  current,
  onNavigate,
  user,
  notifications = 0,
  children,
}) {
  return (
    <div className="min-h-dvh bg-surface-sunken">
      {/* First tab stop on every page. Keyboard users should not have to walk
          the whole nav to reach content. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-30 border-b border-line bg-surface">
        {/* Same max-width and padding as the body below, so the logo sits
            directly above the sidebar instead of drifting to the window edge
            on a wide screen. */}
        <div className="mx-auto flex h-app-header w-full max-w-7xl items-center gap-3 px-4 md:pl-3">
          <span className="md:hidden"><LogoMark size={30} /></span>
          <span className="hidden md:inline-flex"><Logo size={32} /></span>

          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="relative flex size-10 items-center justify-center rounded-md text-content-2 transition-colors hover:bg-surface-sunken hover:text-content"
              aria-label={notifications ? `Notifications, ${notifications} unread` : "Notifications"}
            >
              <Icon name="notification" size="md" />
              {notifications > 0 && (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger-700" />
              )}
            </button>
            {user && (
              <button
                type="button"
                onClick={() => onNavigate?.("profile")}
                className="rounded-full transition-opacity hover:opacity-80"
                aria-label={`${user.name}'s profile`}
              >
                <Avatar name={user.name} src={user.avatar} size="sm" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl">
        <nav
          aria-label="Main"
          className="sticky top-app-header hidden h-[calc(100dvh-var(--spacing-app-header))] w-60 shrink-0 flex-col gap-1 border-r border-line bg-surface p-3 md:flex"
        >
          {nav.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              active={item.id === current}
              onSelect={onNavigate}
              variant="side"
            />
          ))}
        </nav>

        {/* pb-20 clears the mobile tab bar; it collapses at md where the bar is gone. */}
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 pb-20 outline-none md:pb-0">
          {children}
        </main>
      </div>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {nav.slice(0, 5).map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={item.id === current}
            onSelect={onNavigate}
            variant="tab"
          />
        ))}
      </nav>
    </div>
  );
}
