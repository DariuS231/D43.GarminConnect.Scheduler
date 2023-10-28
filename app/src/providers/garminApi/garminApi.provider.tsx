import * as React from 'react';
import { GarminApiContext, IGarminApiProps, IGarminToken } from '.';

export const GarminApiProvider = (
  props: React.PropsWithChildren<IGarminApiProps>
): JSX.Element => {
  const baseUrl = 'https://connect.garmin.com';

  const localStoredToken = window.localStorage.getItem('token');

  if (!localStoredToken) {
    throw new Error('This is an example exception.');
  }
  const accessTokenMap: IGarminToken = JSON.parse(localStoredToken || '') as IGarminToken;
  const token = accessTokenMap.access_token;

  const headers = {
    nk: 'NT',
    'di-backend': 'connectapi.garmin.com',
    'x-app-ver': '4.72.3.0',
    accept: 'application/json, text/plain, */*',
    authorization: `Bearer ${token}`
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
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        ...headers,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });

    const jsonResp = (await resp.json()) as unknown as T;
    return jsonResp;
  };

  const remove = async (url: string): Promise<void> => {
    const resp = await fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        ...headers,
      },
    });
  };

  const value = {
    state: {
      isLocalHost: window.location.href.startsWith('http://localhost:'),
    },
    actions: { get, wait, post, remove },
  };

  return (
    <GarminApiContext.Provider value={value}>
      {props.children}
    </GarminApiContext.Provider>
  );
};
