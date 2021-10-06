import CoreKernel, { ICoreCClient } from '@grandlinex/core';
import { IKernel } from './lib';
import ElectronKernelModule from './ElectronKernelModule';

/**
 *  @class ElectronKernel
 */

export default class ElectronKernel
  extends CoreKernel<ICoreCClient>
  implements IKernel
{
  /**
   * Default Constructor
   * @param appName App Name
   * @param appCode App Code (Only lower case)
   * @param pathOverride set base path for config folder
   */
  constructor(appName: string, appCode: string, pathOverride?: string) {
    super(appName, appCode, pathOverride);
    this.setBaseModule(new ElectronKernelModule(this));
  }
}
