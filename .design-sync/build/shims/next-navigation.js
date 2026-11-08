function P() { return (typeof window !== "undefined" && window.SydCrestPreview) || {}; }
var router = { push: function () {}, replace: function () {}, refresh: function () {}, back: function () {}, forward: function () {}, prefetch: function () {} };
export function usePathname() { return P().pathname || null; }
export function useRouter() { return router; }
export function useSearchParams() { return new URLSearchParams(P().search || ""); }
export function useParams() { return P().params || {}; }
export function useSelectedLayoutSegment() { return null; }
export function useSelectedLayoutSegments() { return []; }
export function redirect() {}
export function permanentRedirect() {}
export function notFound() {}
export function unstable_rethrow() {}
export var RedirectType = { push: "push", replace: "replace" };
