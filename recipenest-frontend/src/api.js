// api.js
//
// Central place to define the backend base URL and a small fetch
// wrapper that throws on non-2xx responses with a useful error
// message. Every page imports from here, which means the URL only
// needs to change in one location and error handling is consistent
// across the app.

export const API_BASE = "http://localhost:5236/api";

// apiFetch is a thin wrapper around fetch that:
//   1. Prepends the API base URL.
//   2. Sets the JSON Content-Type when a body is supplied.
//   3. Throws an Error with the server's message on non-2xx
//      responses so callers can use a single try/catch.
//   4. Returns parsed JSON for 200 responses, or null for 204.
export async function apiFetch(path, options = {}) {
  const { body, ...rest } = options;

  const init = {
    headers: { "Content-Type": "application/json" },
    ...rest
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, init);
  } catch {
    // fetch only throws on network-level failures (DNS, offline,
    // CORS preflight blocked). Surface a friendlier message.
    throw new Error(
      "Could not reach the server. Make sure the backend is running."
    );
  }

  if (!res.ok) {
    // Try to parse the body as JSON in case the server returned a
    // structured error (e.g. validation problem details). Fall back
    // to the status text if it isn't JSON.
    let message = res.statusText;
    try {
      const errBody = await res.json();
      if (errBody?.message) {
        message = errBody.message;
      } else if (errBody?.title) {
        message = errBody.title;
      } else if (errBody?.errors) {
        // ASP.NET Core ValidationProblemDetails shape
        message = Object.values(errBody.errors).flat().join(" ");
      }
    } catch {
      /* not JSON, keep status text */
    }
    throw new Error(message || `Request failed (${res.status})`);
  }

  // 204 No Content has no body to parse.
  if (res.status === 204) return null;

  return res.json();
}
