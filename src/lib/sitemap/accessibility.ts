import { staticPages } from "./url";

/** The accessibility statement (issue #204). /settings stays out: it is per device, not content. */
export const accessibilityPages = staticPages([{ path: "/accessibility", priority: 0.3 }]);
