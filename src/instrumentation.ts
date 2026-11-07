import type { Instrumentation } from "next";

/**
 * Server errors into first party analytics (issue #242): thrown Server Action
 * errors, Route Handler errors and render errors become server_error events
 * with the route pattern and the error digest (never the message or stack).
 * Node runtime only; the proxy's edge errors are left to the platform logs.
 */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { reportServerError } = await import("@/lib/analytics/server-error");
  await reportServerError(error, request, context);
};
