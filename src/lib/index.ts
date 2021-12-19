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
import { BrowserWindow, Tray } from 'electron';

export enum ElectronGlobals {
  'GLX_IMG_ICON' = 'GLX_IMG_ICON',
  'GLX_IMG_THUMP' = 'GLX_IMG_THUMP',
}

export interface IKernel extends ICoreKernel<ICoreCClient> {
  closeAllWindows(): void;
  getPreloadRoot(): string;
  getAppRoot(): string;
  setMainWindow(window: BrowserWindow | null): void;
  getMainWindow(): BrowserWindow | null;
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
