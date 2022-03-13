/**
 * @name ElectronKernel Main Module
 * @author David Nagy
 */
import ElectronKernel from './ElectronKernel';
import ElectronKernelModule from './ElectronKernelModule';
import isDev from './utils/isDev';

export * from './classes';
export * from './lib';
export * from './action';
export * from '@grandlinex/core';
export * as bundleSQLight from '@grandlinex/bundle-sqlight';
export * as bundleELogger from '@grandlinex/bundle-elogger';
export { SQLCon } from '@grandlinex/bundle-sqlight';
export { ElectronKernelModule, ElectronKernel, isDev };
export default ElectronKernel;
