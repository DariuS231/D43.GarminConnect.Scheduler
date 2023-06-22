export interface IGarminApiContext {
  state: { isLocalHost: boolean };
  actions: {
    get: <T>(url: string) => Promise<T>;
    post: <T, P>(url: string, body: P) => Promise<T>;
    wait: (ms: number) => Promise<void>;
    remove: (url: string) => Promise<void>;
  };
}

export interface IGarminApiProps {}
