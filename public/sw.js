/* SydCrest Launchpad service worker.
 *
 * Plain JavaScript on purpose: no build step, no dependencies, served from
 * /sw.js with no-cache headers (next.config.ts) so updates land on next load.
 *
 * What it does
 *   /_next/static/*, fonts      cache first (file names are content hashed)
 *   icons, manifest             stale while revalidate
 *   public pages                network first (3 s timeout), then the saved
 *                               copy, then the offline page
 *   signed in pages             network first, saved copy only when offline
 *   /auth/*, /api/*, POSTs,     never cached, never touched
 *   cross origin (Supabase),
 *   RSC and prefetch requests
 *
 * Public pages are network first so the first visit after a deploy shows the
 * new page, not the previous build (an old page can also post to a Server
 * Action that no longer exists). On a slow connection the saved copy is shown
 * after NAV_TIMEOUT_MS and the network response still refreshes the cache.
 *
 * Signed in pages are network first, not stale while revalidate, because
 * phones here are often shared: a second learner signing in must never be
 * shown the first learner's dashboard from cache while online. Their saved
 * copies are deleted on sign out (see onServerAction) and whenever the server
 * redirects a signed in page away (session ended).
 *
 * Bump VERSION whenever this file's caching logic changes; activate deletes
 * every cache from older versions.
 */

const VERSION = "v3";
const STATIC_CACHE = `sydcrest-static-${VERSION}`;
const PAGES_CACHE = `sydcrest-pages-${VERSION}`;
const PRIVATE_CACHE = `sydcrest-private-${VERSION}`;
const CURRENT = [STATIC_CACHE, PAGES_CACHE, PRIVATE_CACHE];

const OFFLINE_URL = "/offline";
// How long a public page waits for the network before using its saved copy.
const NAV_TIMEOUT_MS = 3000;
const PRIVATE_PREFIXES = ["/dashboard", "/profile", "/learn"];
const NEVER_PREFIXES = ["/auth/", "/api/", "/sw.js"];
const SIGNED_OUT_PAGES = ["/login", "/signup"];
const PRECACHE = [OFFLINE_URL, "/manifest.webmanifest", "/icons/icon-192.png"];

// Keep storage modest on low end phones; oldest entries go first.
const LIMITS = { [STATIC_CACHE]: 120, [PAGES_CACHE]: 40, [PRIVATE_CACHE]: 20 };

// Static asset paths inside HTML or an RSC payload (which escapes quotes).
const STATIC_URL = /\/_next\/static\/[^"'\s)\\]+/g;

const matchesPrefix = (path, prefixes) =>
  prefixes.some((p) => path === p.replace(/\/$/, "") || path.startsWith(p.endsWith("/") ? p : `${p}/`));

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const pages = await caches.open(PAGES_CACHE);
      const statics = await caches.open(STATIC_CACHE);
      await statics.addAll(PRECACHE.filter((u) => u !== OFFLINE_URL));

      // The offline page must render with no network, so save its styles
      // too. They are hashed static files, so cache first owns them.
      const res = await fetch(OFFLINE_URL, { cache: "reload" });
      if (!res.ok) throw new Error(`offline page returned ${res.status}`);
      const html = await res.clone().text();
      await pages.put(OFFLINE_URL, res);
      // Only CSS and fonts: the offline page needs no JavaScript (plain
      // links), and skipping its scripts saves about 40 KB on install.
      await warmStatic((html.match(STATIC_URL) ?? []).filter((u) => /\.(css|woff2)$/.test(u)));

      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((n) => n.startsWith("sydcrest-") && !CURRENT.includes(n)).map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    })(),
  );
});

/**
 * The page that registered the worker loaded before the worker existed, so
 * none of it went through the cache. The registrar posts its URL and the
 * static files it used, and we save them now; otherwise the very first page a
 * learner opens would not work offline.
 */
self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "warm" || typeof data.page !== "string") return;
  event.waitUntil(
    (async () => {
      await warmStatic(Array.isArray(data.assets) ? data.assets : []);
      const url = new URL(data.page, self.location.origin);
      if (url.origin !== self.location.origin || matchesPrefix(url.pathname, NEVER_PREFIXES)) return;
      if (url.pathname === OFFLINE_URL) return;
      const isPrivate = matchesPrefix(url.pathname, PRIVATE_PREFIXES);
      const cacheName = isPrivate ? PRIVATE_CACHE : PAGES_CACHE;
      if (await caches.match(url.href, { cacheName })) return;
      try {
        const response = await fetch(url.href, { credentials: "same-origin", redirect: "manual" });
        if (cacheable(response)) await put(cacheName, url.href, response);
      } catch {
        // Offline already; nothing to save.
      }
    })(),
  );
});

async function warmStatic(urls) {
  const statics = await caches.open(STATIC_CACHE);
  const paths = [...new Set(urls)]
    .map((u) => new URL(u, self.location.origin))
    .filter((u) => u.origin === self.location.origin && u.pathname.startsWith("/_next/static/"))
    .map((u) => u.pathname);
  await Promise.all(
    paths.map(async (p) => {
      if (!(await statics.match(p))) await statics.add(p).catch(() => {});
    }),
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Supabase, analytics and anything else off origin go straight out.
  if (url.origin !== self.location.origin) return;

  if (request.method !== "GET") {
    if (request.headers.has("Next-Action")) event.respondWith(onServerAction(request));
    return;
  }

  if (matchesPrefix(url.pathname, NEVER_PREFIXES)) return;
  if (request.headers.has("Authorization")) return;

  if (url.pathname.startsWith("/_next/static/") || url.pathname.endsWith(".woff2")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (url.pathname.startsWith("/icons/") || url.pathname === "/manifest.webmanifest") {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE, event));
    return;
  }

  // Full page loads only. Client side navigations fetch RSC payloads that
  // depend on the current router state, so they are left to the network; if
  // that fails Next.js falls back to a full load, which lands here.
  if (request.mode === "navigate") {
    event.respondWith(
      matchesPrefix(url.pathname, PRIVATE_PREFIXES)
        ? networkFirstPrivate(request)
        : publicPage(request, url, event),
    );
  }
});

/** Server action POSTs pass through untouched; we only watch for sign out. */
async function onServerAction(request) {
  const response = await fetch(request);
  const redirect = response.headers.get("x-action-redirect");
  if (redirect) {
    const path = new URL(redirect.split(";")[0], self.location.origin).pathname;
    // signOut redirects home; sign in flows land on the dashboard. Either way
    // the previous learner's saved pages must go.
    if (path === "/" || SIGNED_OUT_PAGES.includes(path) || path === "/dashboard") {
      await caches.delete(PRIVATE_CACHE);
    }
  }
  return response;
}

function cacheable(response) {
  return response && response.status === 200 && response.type === "basic";
}

async function put(cacheName, request, response) {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
  const limit = LIMITS[cacheName];
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - limit))) {
    if (new URL(key.url).pathname !== OFFLINE_URL) await cache.delete(key);
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { cacheName: STATIC_CACHE });
  if (cached) return cached;
  const response = await fetch(request);
  if (cacheable(response)) await put(STATIC_CACHE, request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName, event) {
  const cached = await caches.match(request, { cacheName });
  const network = fetch(request).then(async (response) => {
    if (cacheable(response)) await put(cacheName, request, response.clone());
    return response;
  });
  if (cached) {
    event.waitUntil(network.catch(() => {}));
    return cached;
  }
  return network;
}

async function offlineFallback() {
  return (
    (await caches.match(OFFLINE_URL, { cacheName: PAGES_CACHE })) ??
    new Response("You are offline. Try again when you have a connection.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  );
}

async function publicPage(request, url, event) {
  if (SIGNED_OUT_PAGES.includes(url.pathname)) {
    // Reaching sign in or sign up means nobody is signed in on this phone.
    event.waitUntil(caches.delete(PRIVATE_CACHE));
  }
  return networkFirstPage(request, event);
}

/**
 * Network first with a timeout. The cache write is registered with waitUntil
 * before the race, so it clones the body before anyone reads it and still
 * finishes when the timeout wins: the next visit is then current.
 */
async function networkFirstPage(request, event) {
  const network = fetch(request);
  event.waitUntil(
    network
      .then((response) => (cacheable(response) ? put(PAGES_CACHE, request, response.clone()) : undefined))
      .catch(() => {}),
  );

  let timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(resolve, NAV_TIMEOUT_MS, null);
  });
  try {
    const response = await Promise.race([network, timeout]);
    if (response) return response;
  } catch {
    // Offline: fall through to the saved copy.
  } finally {
    clearTimeout(timer);
  }

  const cached = await caches.match(request, { cacheName: PAGES_CACHE });
  if (cached) return cached;
  try {
    // Slow but not offline, and nothing saved: keep waiting for the network.
    return await network;
  } catch {
    return offlineFallback();
  }
}

async function networkFirstPrivate(request) {
  try {
    const response = await fetch(request);
    if (response.type === "opaqueredirect") {
      // The only redirect on a signed in page is "session ended, go sign in".
      await caches.delete(PRIVATE_CACHE);
    } else if (cacheable(response)) {
      await put(PRIVATE_CACHE, request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request, { cacheName: PRIVATE_CACHE })) ?? offlineFallback();
  }
}
