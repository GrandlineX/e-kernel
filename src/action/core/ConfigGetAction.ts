import { IDataBase } from '@grandlinex/core';
import { BaseAction, XActionEvent } from '../../classes';
import { IBaseKernelModule } from '../../lib';

export default class ConfigSetAction extends BaseAction<IDataBase<any, any>> {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('config-get', module);
    this.handler = this.handler.bind(this);
  }

  async handler({ args }: XActionEvent<{ key: string }>) {
    return this.getModule().getDb().getConfig(args.key);
  }
}
