import { Response } from "../@types";

type options<T = object> = Omit<RequestInit, "body" | "method"> & {
  body?: T;
};

const formatUrl = (url: string | URL | Request) => (!url.toString().endsWith("/") ? `${url}/` : url);

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

const request = <T = any, TBody = object>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options<TBody>,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
): Promise<Response<T>> => fetchFBX<T, TBody>(url, token, method, options as TBody);

export default request;
export { fetchFBX, request };
