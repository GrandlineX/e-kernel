import { contextBridge, ipcRenderer } from 'electron';

/**
 * ```typescript
 * declare global {
 *   interface Window {
 *     glxApi: {
 *       invoke<Y = any, X = any>(chanel: string, ...args: X[]): Promise<Y>;
 *     };
 *   }
 * }
 * ```
 */
contextBridge.exposeInMainWorld('glxApi', {
  invoke: (chanel: string, ...args: any[]) =>
    ipcRenderer.invoke(chanel, ...args),
});
