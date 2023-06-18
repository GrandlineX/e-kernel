import { contextBridge, ipcRenderer } from 'electron';
import { ConfigType } from '@grandlinex/core';

export const windowFunctions = {
  close: () => ipcRenderer.invoke('window-close'),
  devMode: () => ipcRenderer.invoke('dev-mode'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  minimize: () => ipcRenderer.invoke('window-minimize'),
  reload: () => ipcRenderer.invoke('reload'),
  sendToMainWindow: (args: { action: string; data?: any }) =>
    ipcRenderer.invoke('main-window-action', args),
};
export type IWindowFunctions = typeof windowFunctions;
export const coreFunctions = {
  alert: (args: { title: string; body: string }) =>
    ipcRenderer.invoke('alert', args),
  openConfigFolder: () => ipcRenderer.invoke('open-config-folder'),
  openExternal: (args: { url: string; external: boolean; title?: string }) =>
    ipcRenderer.invoke('open-external', args),
  setConfig: (args: { key: string; value: string }) =>
    ipcRenderer.invoke('config-set', args),
  getConfig: (args: { key: string }) =>
    ipcRenderer.invoke('config-set', args) as Promise<ConfigType | undefined>,
};
export type ICoreFunctions = typeof coreFunctions;

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
  windowFunctions: IWindowFunctions;
  coreFunctions: ICoreFunctions;
};

/**
 * ```typescript
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
  windowFunctions,
  coreFunctions,
};
contextBridge.exposeInMainWorld('glxApi', api);
