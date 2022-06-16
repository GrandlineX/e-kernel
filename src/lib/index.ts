import {
  ICoreAction,
  ICoreBridge,
  ICoreCache,
  ICoreCClient,
  ICoreElement,
  ICoreKernel,
  ICoreKernelModule,
  ICoreService,
  IDataBase,
} from '@grandlinex/core';
import { BaseClient } from 'classes';
import { BrowserWindow, Tray, BrowserWindowConstructorOptions } from 'electron';

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
  P extends BaseClient | null,
  C extends IBaseCache | null
> = ICoreKernelModule<IKernel, T, P, C, null>;

export type IBaseAction = ICoreAction;

export type IBaseService = ICoreService;
export type IBaseBrige = ICoreBridge;
export type IBaseCache = ICoreCache;
export type IBaseElement = ICoreElement;
