/**
 * Browser analytics (issue #242): one queue per page, the tab session id, the
 * current route pattern, and the reporters for page views, Web Vitals, form
 * starts and submits, and browser errors. Everything checks the opt out
 * first, never throws and never blocks the page.
 */
import { BEACON_PATH, type WireEvent } from "../beacon";
import { ROUTE_COOKIE, SESSION_COOKIE, isSessionId } from "../context";
import { FORM_NAMES, scrubMessage, type EventName, type FormName, type PropsOf } from "../events";
import { optedOut } from "../opt-out";
import { BeaconQueue, beaconTransport } from "./queue";
import { Deduper, ERROR_SAMPLE_RATE, VITALS_SAMPLE_RATE, inSample, type SessionStore } from "./sampling";

let queue: BeaconQueue | null = null;
let currentRoute: string | null = null;
let installed = false;
const errors = new Deduper(10);

function sessionStore(): SessionStore | null {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function newId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  // Older browsers on plain http: a random v4 shaped id.
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function setCookie(name: string, value: string) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${secure}`;
}

/** This tab's session id, minted on first use; also shared with the server as a session cookie. */
export function sessionId(): string | null {
  const store = sessionStore();
  try {
    const saved = store?.getItem(SESSION_COOKIE);
    if (isSessionId(saved)) return saved;
    const id = newId();
    store?.setItem(SESSION_COOKIE, id);
    setCookie(SESSION_COOKIE, id);
    return id;
  } catch {
    return null;
  }
}

function getQueue() {
  queue ??= new BeaconQueue({ transport: beaconTransport(BEACON_PATH), sessionId });
  return queue;
}

/** Tells analytics which route pattern the visitor is on (and the server, through a session cookie). */
export function setRoute(route: string) {
  currentRoute = route;
  try {
    setCookie(ROUTE_COOKIE, route);
    const id = sessionId();
    if (id) setCookie(SESSION_COOKIE, id);
  } catch {
    // No cookies: server events fall back to the referer.
  }
}

/** Queues one browser event. */
export function clientTrack<N extends EventName>(name: N, props?: PropsOf<N>) {
  try {
    if (optedOut()) return;
    getQueue().push({ n: name, p: props as WireEvent["p"], r: currentRoute });
  } catch {
    // Analytics never breaks the page.
  }
}

/** Sends whatever is waiting, e.g. when the page is hidden. */
export function flush() {
  queue?.flush();
}

type Metric = { name: string; value: number; rating?: string; navigationType?: string };

/**
 * useReportWebVitals callback. Module level, so its reference never changes
 * (Next reports again for a new function). A quarter of tab sessions.
 */
export function reportWebVital(metric: Metric) {
  if (!inSample("vitals", VITALS_SAMPLE_RATE, sessionStore())) return;
  clientTrack("web_vital", {
    metric: metric.name as PropsOf<"web_vital">["metric"],
    value: metric.value,
    rating: metric.rating as PropsOf<"web_vital">["rating"],
    navigation: metric.navigationType as PropsOf<"web_vital">["navigation"],
  });
}

/** Reports a browser error: sampled per session, deduped per page, message scrubbed, never a stack. */
export function reportClientError(kind: "boundary" | "error" | "rejection", error: unknown) {
  try {
    if (!inSample("errors", ERROR_SAMPLE_RATE, sessionStore())) return;
    const err = error as { name?: unknown; message?: unknown; digest?: unknown } | null;
    const message = scrubMessage(typeof err?.message === "string" ? err.message : typeof error === "string" ? error : "") ?? "";
    const name = typeof err?.name === "string" ? err.name : undefined;
    const digest = typeof err?.digest === "string" ? err.digest : undefined;
    if (!errors.first(`${kind}|${name}|${message}|${digest}`)) return;
    clientTrack("client_error", { kind, message, error: name, digest });
    flush();
  } catch {
    // Reporting an error must never cause another.
  }
}

function formOf(target: EventTarget | null): { form: HTMLFormElement; name: FormName } | null {
  const form = target instanceof Element ? target.closest("form[data-analytics-form]") : null;
  if (!(form instanceof HTMLFormElement)) return null;
  const name = form.dataset.analyticsForm;
  return name && (FORM_NAMES as readonly string[]).includes(name) ? { form, name: name as FormName } : null;
}

/**
 * Once per page: browser error listeners, form start and submit listeners
 * (forms opt in with data-analytics-form="<name>"), and a flush whenever the
 * page is hidden or closed.
 */
export function installListeners() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  const started = new WeakSet<HTMLFormElement>();

  window.addEventListener("error", (event) => reportClientError("error", event.error ?? event.message));
  window.addEventListener("unhandledrejection", (event) => reportClientError("rejection", event.reason));

  document.addEventListener(
    "input",
    (event) => {
      const found = formOf(event.target);
      if (!found || started.has(found.form)) return;
      started.add(found.form);
      clientTrack("form_started", { form: found.name });
    },
    true,
  );
  document.addEventListener(
    "submit",
    (event) => {
      const found = formOf(event.target);
      if (found) clientTrack("form_submitted", { form: found.name });
    },
    true,
  );

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  window.addEventListener("pagehide", flush);
}
