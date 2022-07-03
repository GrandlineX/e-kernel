import {
  ICoreAction,
  ICoreBridge,
  ICoreCache,
  ICoreCClient,
  ICoreClient,
  ICoreElement,
  ICoreKernel,
  ICoreKernelModule,
  ICoreService,
  IDataBase,
} from '@grandlinex/core';
import { BrowserWindow, BrowserWindowConstructorOptions, Tray } from 'electron';

export enum KernelWindowName {
  'PRELOAD' = 'PRELOAD',
  'MAIN' = 'MAIN',
}

export enum ElectronGlobals {
  'GLX_IMG_ICON' = 'GLX_IMG_ICON',
  'GLX_IMG_THUMP' = 'GLX_IMG_THUMP',
  'GLX_WINDOW_W' = 'GLX_WINDOW_W',
  'GLX_WINDOW_H' = 'GLX_WINDOW_H',
  'GLX_WINDOW_FRAME' = 'GLX_WINDOW_FRAME',
}

export interface IWindow {
  create(
    key: string,
    fc: (prop: BrowserWindowConstructorOptions) => BrowserWindow
  ): BrowserWindow;
  get(window: string): BrowserWindow | undefined;
  has(window: string): boolean;
  hide(window: string): void;
  show(window: string): boolean;
  close(window: string): boolean;
  closeAll(): void;
}

export interface IKernel extends ICoreKernel<ICoreCClient> {
  closeAllWindows(): void;
  getPreloadRoot(): string;
  getAppRoot(): string;
  getMainWindow(): BrowserWindow | null;
  getWindowManager(): IWindow;
  setTray(tray: Tray | null): void;
  getTray(): Tray | null;
  openNewWindow(): void;
  reload(): void;
}

export interface KeyType {
  id: number;
  auth: Buffer;
  iv: Buffer;
}
export type IBaseKernelModule<
  T extends IDataBase<any, any> | null,
  P extends IBaseClient | null,
  C extends IBaseCache | null
> = ICoreKernelModule<IKernel, T, P, C, null>;

export type IBaseAction<
  K extends IKernel = IKernel,
  T extends IDataBase<any, any> | null = any,
  P extends IBaseClient | null = any,
  C extends IBaseCache | null = any
> = ICoreAction<K, T, P, C>;

export type IBaseService<
  K extends IKernel = IKernel,
  T extends IDataBase<any, any> | null = any,
  P extends IBaseClient | null = any,
  C extends IBaseCache | null = any
> = ICoreService<K, T, P, C>;
export type IBaseClient<
  K extends IKernel = IKernel,
  T extends IDataBase<any, any> | null = any,
  P extends IBaseClient | null = any,
  C extends IBaseCache | null = any
> = ICoreClient;
export type IBaseBrige = ICoreBridge;
export type IBaseCache<
  K extends IKernel = IKernel,
  T extends IDataBase<any, any> | null = any,
  P extends IBaseClient | null = any,
  C extends IBaseCache | null = any
> = ICoreCache<K, T, P, C>;
export type IBaseElement<
  K extends IKernel = IKernel,
  T extends IDataBase<any, any> | null = any,
  P extends IBaseClient | null = any,
  C extends IBaseCache | null = any
> = ICoreElement<K, T, P, C>;
