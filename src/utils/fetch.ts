import { Response } from "../@types/response";

type options = Omit<RequestInit, "body" | "method"> & {
  body?: object;
};

const formatUrl = (url: string | URL | Request) => url.toString().replace(/([ \/])(?=[^ \/]*$)/, "/");

const fetchFBX = <T = any>(
  url: string | URL | globalThis.Request,
  token: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | string,
  options?: options
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
      console.error(`❌ ~ error on call ${url}`, error);
    }) as Promise<Response<T>>;
};

/**
 * Performs a GET request to the specified URL with the provided token and options.
 * @param url - The URL to send the GET request to.
 * @param token - The token to include in the request headers.
 * @param options - Additional options for the request.
 * @returns A Promise that resolves to the response data.
 */
const get = <T = any>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options
): Promise<Response<T>> => {
  return fetchFBX(url, token, "GET", options);
};

/**
 * Sends a POST request to the specified URL with the provided token and options.
 *
 * @template T - The type of the response data.
 * @param {string | URL | globalThis.Request} url - The URL to send the request to.
 * @param {string} token - The token to include in the request headers.
 * @param {options} [options] - Additional options for the request.
 * @returns {Promise<Response<T>>} - A promise that resolves to the response data.
 */
const post = <T = any>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options
): Promise<Response<T>> => {
  return fetchFBX(url, token, "POST", options);
};

/**
 * Sends a PUT request to the specified URL with the provided token and options.
 *
 * @param url - The URL to send the request to.
 * @param token - The token to include in the request headers.
 * @param options - Additional options for the request.
 * @returns A promise that resolves to the response of the request.
 */
const put = <T = any>(
  url: string | URL | globalThis.Request,
  token: string,
  options?: options
): Promise<Response<T>> => {
  return fetchFBX(url, token, "PUT", options);
};

export { fetchFBX, post, put };
export default get;
