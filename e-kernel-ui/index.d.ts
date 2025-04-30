declare global {
  interface Window {
    glxApi: GLXElectronAPI;
  }
}

export type IWindowFunctions = {
  close: () => Promise<any>;
  devMode: () => Promise<any>;
  maximize: () => Promise<any>;
  minimize: () => Promise<any>;
  reload: () => Promise<any>;
  sendToMainWindow: (args: { action: string; data?: any }) => Promise<any>;
};
export type ICoreFunctions = {
  alert: (args: { title: string; body: string }) => Promise<any>;
  openConfigFolder: () => Promise<any>;
  openExternal: (args: {
    url: string;
    external: boolean;
    title?: string;
  }) => Promise<any>;
  setConfig: (args: { key: string; value: string }) => Promise<any>;
  getConfig: (args: { key: string }) => Promise<any>;
};

export type GLXElectronAPI = {
  invoke<Y = any, X = any>(channel: string, ...args: X[]): Promise<Y>;
  send<X = any>(channel: string, ...args: X[]): void;
  sendSync<Y = any, X = any>(channel: string, ...args: X[]): Y;
  on<E = Event, X = any>(
    channel: string,
    listener: (event: E, ...args: X[]) => void,
  ): void;
  once<E = Event, X = any>(
    channel: string,
    listener: (event: E, ...args: X[]) => void,
  ): void;
  removeListener<X = any>(
    channel: string,
    listener: (...args: X[]) => void,
  ): void;
  removeAllListener(channel: string): void;
  windowFunctions: IWindowFunctions;
  coreFunctions: ICoreFunctions;
};
