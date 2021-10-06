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

export type IKernel = ICoreKernel<ICoreCClient>;

export type IBaseKernelModule<
  T extends IDataBase<any> | null,
  P extends BaseClient | null,
  C extends IBaseCache | null
> = ICoreKernelModule<IKernel, T, P, C, null>;

export type IBaseAction = ICoreAction;

export type IBaseService = ICoreService;
export type IBaseBrige = ICoreBridge;
export type IBaseCache = ICoreCache;
export type IBaseElement = ICoreElement;
