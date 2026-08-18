/**
 * API client — thin fetch wrapper over the backend.
 *
 * Not a generated SDK; the route contract is small enough that hand-written
 * calls stay more readable than a codegen layer would. Handles the two
 * things every call needs: the bearer token and a consistent error shape.
 */
export const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL && import.meta.env.DEV) {
  throw new Error('VITE_API_URL is not set. Add it to frontend/.env.local.');
}

const TOKEN_KEY = 'sydcrest_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

/* Fires when a request comes back 401 with TOKEN_EXPIRED (or any 401 once
   we have a token — an active session that suddenly 401s is functionally
   expired either way). AuthContext subscribes to this to clear state and
   redirect, rather than every call site handling it individually. */
const listeners = new Set();
export const onUnauthorized = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

async function request(path, { method = 'GET', body, headers, ...rest } = {}) {
  const token = tokenStore.get();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    if (res.status === 401 && token) listeners.forEach((fn) => fn());
    const message = data?.error || data?.errors?.[0]?.msg || `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  return data;
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

/* multipart uploads bypass `request()`'s JSON body handling entirely — a
   FormData body must NOT get `Content-Type: application/json` (that would
   stop the browser from setting its own `multipart/form-data; boundary=…`)
   and must not be JSON.stringify'd. */
async function requestForm(path, formData) {
  const token = tokenStore.get();
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    if (res.status === 401 && token) listeners.forEach((fn) => fn());
    throw new ApiError(data?.error || `Request failed (${res.status})`, res.status, data);
  }
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
  postForm: (path, formData) => requestForm(path, formData),
};
