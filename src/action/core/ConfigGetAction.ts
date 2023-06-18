import { IDataBase } from '@grandlinex/core';
import { BaseAction } from '../../classes';
import { IBaseKernelModule, IKernel } from '../../lib';

export default class ConfigSetAction extends BaseAction<
  IKernel,
  IDataBase<any, any>
> {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('config-get', module);
    this.handler = this.handler.bind(this);
  }

  handler(event: Electron.IpcMainInvokeEvent, args: { key: string }): any {
    return this.getModule().getDb().getConfig(args.key);
  }
}
