export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = "api.telegram.org";

    const headers = new Headers(request.headers);
    headers.set("host", "api.telegram.org");

    const init = {
      method: request.method,
      headers,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : request.body,
      redirect: request.redirect,
    };

    return fetch(new Request(url.toString(), init));
  },
};
