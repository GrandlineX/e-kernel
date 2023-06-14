import { contextBridge, ipcRenderer } from 'electron';

export type GLXElectronAPI = {
  invoke<Y = any, X = any>(channel: string, ...args: X[]): Promise<Y>;
  send<X = any>(channel: string, ...args: X[]): void;
  sendSync<Y = any, X = any>(channel: string, ...args: X[]): Y;
  on<E = Event, X = any>(
    channel: string,
    listener: (event: E, ...args: X[]) => void
  ): void;
  once<E = Event, X = any>(
    channel: string,
    listener: (event: E, ...args: X[]) => void
  ): void;
  removeListener<X = any>(
    channel: string,
    listener: (...args: X[]) => void
  ): void;
  removeAllListener(channel: string): void;
};

/**
 * ```typescript
 * type GLXElectronAPI = {
 *   invoke<Y = any, X = any>(channel: string, ...args: X[]): Promise<Y>;
 *   send<X = any>(channel: string, ...args: X[]): void;
 *   sendSync<Y = any, X = any>(channel: string, ...args: X[]): Y;
 *   on<E = Event, X = any>(
 *     channel: string,
 *     listener: (event: E, ...args: X[]) => void
 *   ): void;
 *   once<E = Event, X = any>(
 *     channel: string,
 *     listener: (event: E, ...args: X[]) => void
 *   ): void;
 *   removeListener<X = any>(
 *     channel: string,
 *     listener: (...args: X[]) => void
 *   ): void;
 *   removeAllListener(channel: string): void;
 * };
 * declare global {
 *   interface Window {
 *     glxApi: GLXElectronAPI;
 *   }
 * }
 * ```
 */
const api: GLXElectronAPI = {
  invoke: (channel: string, ...args: any[]) =>
    ipcRenderer.invoke(channel, ...args),
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
  sendSync: (channel: string, ...args: any[]) =>
    ipcRenderer.sendSync(channel, ...args),
  on: (channel: string, listener: (event: any, ...args: any[]) => void) =>
    ipcRenderer.on(channel, listener),
  once: (channel: string, listener: (event: any, ...args: any[]) => void) =>
    ipcRenderer.once(channel, listener),
  removeListener: (channel: string, listener: (...args: any[]) => void) =>
    ipcRenderer.removeListener(channel, listener),
  removeAllListener: (channel: string) =>
    ipcRenderer.removeAllListeners(channel),
};
contextBridge.exposeInMainWorld('glxApi', api);
