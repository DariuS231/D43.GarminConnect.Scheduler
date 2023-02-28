import * as React from "react";
import { GarminApiContext, IGarminApiProps } from ".";

export const GarminApiProvider = (
  props: React.PropsWithChildren<IGarminApiProps>
): JSX.Element => {
  const baseUrl = "https://connect.garmin.com/modern/proxy";

  const headers = {
    nk: "NT",
    "x-app-ver": "4.54.0.14",
    accept: "application/json, text/plain, */*",
  };

  const wait = async (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const get = async <T,>(url: string): Promise<T> => {
    const resp = await fetch(`${baseUrl}${url}`, { headers });
    const data = (await resp.json()) as unknown as T;

    return data;
  };

  const post = async <T, P>(url: string, body: P): Promise<T> => {
    body = body ?? ({} as P);
    const resp = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    const jsonResp = (await resp.json()) as unknown as T;
    return jsonResp;
  };

  const value = {
    state: {
      isLocalHost: window.location.href.startsWith("http://localhost:"),
    },
    actions: { get, wait, post },
  };

  return (
    <GarminApiContext.Provider value={value}>
      {props.children}
    </GarminApiContext.Provider>
  );
};
