import { staticPages } from "./url";

/** Core marketing and legal pages. A feature's own public pages go in its own module. */
export const corePages = staticPages([
  { path: "/", priority: 1 },
  { path: "/programme", priority: 0.9 },
  { path: "/start", priority: 0.8 },
  { path: "/roadmaps", priority: 0.8 },
  { path: "/experts", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/partners", priority: 0.7 },
  { path: "/business", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
]);
