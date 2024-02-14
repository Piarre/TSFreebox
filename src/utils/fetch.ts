type options<T = object> = Omit<RequestInit, "body" | "method"> & {
  body?: T;
};

const formatUrl = (url: string | URL | Request) => {
  if (!url.toString().endsWith("/")) {
    return `${url}/`;
  } else {
    return url;
  }
};

const fetchFBX = <T = any, TBody = object>(
  url: string | URL | globalThis.Request,
  token: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | string,
  options?: options<TBody>
): Promise<Response<T>> => {
  return fetch(formatUrl(url), {
    ...options,
    method,
    body: JSON.stringify(options?.body),
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
      "X-Fbx-App-Auth": token || "",
      Host: "mafreebox.freebox.fr",
      
    },
  })
    .then((res) => res.json() as T)
    .catch((error) => {
      throw new Error(`❌ ~ error on call ${url}`, {
        cause: error,
      });
    }) as Promise<Response<T>>;
};

const get = <T = any>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options
): Promise<Response<T>> => {
  return fetchFBX<T>(url, token, "GET", options);
};

const post = <T = any, TBody = object>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options<TBody>
): Promise<Response<T>> => {
  return fetchFBX<T, TBody>(url, token, "POST", options as TBody);
};

const put = <T = any, TBody = object>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options<TBody>
): Promise<Response<T>> => {
  return fetchFBX<T, TBody>(url, token, "PUT", options as TBody);
};

const _delete = <T = any, TBody = object>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options<TBody>
): Promise<Response<T>> => {
  return fetchFBX<T, TBody>(url, token, "DELETE", options as TBody);
};

export { get, post, put, _delete, fetchFBX };
