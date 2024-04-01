import { store } from "../stores";

export function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = store.getState()["token"];
  if (!token) {
    throw new Error("No token found");
  }

  const optionsWithAuth = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
    },
  };

  return fetch(url, optionsWithAuth);
}
