import { cookies } from "next/headers";
import { env } from "./env";

export const BASE_URL = `http://${env("backendIP")}/api/${env("apiVersion")}`;

async function get(url,  opts = { auth: true}) {
  const accessToken = cookies().get("access_token");

  const authorizationHeader = opts.auth
    ? {
        Authorization: "Bearer " + accessToken?.value,
      }
    : {};

  const res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...authorizationHeader,
    },
  });

  const data = await res.json();

  return data;
}

async function post(url, body, opts = { auth: true}) {
  const accessToken = cookies().get("access_token");

  const authorizationHeader = opts.auth
    ? {
        Authorization: "Bearer " + accessToken?.value,
      }
    : {};
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
      ...authorizationHeader,
    },
  });

  const data = await res.json();

  return data;
}

async function del(url, opts = { auth: true}) {
  const accessToken = cookies().get("access_token");

  const authorizationHeader = opts.auth
    ? {
        Authorization: "Bearer " + accessToken?.value,
      }
    : {};
  const res = await fetch(BASE_URL + url, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
      ...authorizationHeader,
    },
  });

  const data = await res.json();

  return data;
}

async function put(url, body, opts = { auth: true}) {
  const accessToken = cookies().get("access_token");

  const authorizationHeader = opts.auth
    ? {
        Authorization: "Bearer " + accessToken?.value,
      }
    : {};
  const res = await fetch(BASE_URL + url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
      ...authorizationHeader,
    },
  });

  const data = await res.json();

  return data;
}




export {get, post, del, put};