import {
  CoreBridge as BaseBridge,
  CoreCache as BaseCache,
  CoreClient as BaseClient,
  CoreElement as BaseElement,
  CoreLoopService as BaseLoopService,
  CoreService as BaseService,
} from '@grandlinex/core';
import WindowManager from './WindowManager';
import BaseKernelModule from './BaseKernelModule';
import { GLXElectronAPI, ICoreFunctions, IWindowFunctions } from './preload';

export * from './BaseAction';

export {
  WindowManager,
  BaseLoopService,
  BaseKernelModule,
  BaseService,
  BaseElement,
  BaseCache,
  BaseClient,
  BaseBridge,
  GLXElectronAPI,
  ICoreFunctions,
  IWindowFunctions,
};
