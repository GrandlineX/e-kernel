import { BaseAction, XActionEvent } from '../../classes';
import { IBaseKernelModule } from '../../lib';

export default class ConfigSetAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('config-set', module);
    this.handler = this.handler.bind(this);
  }

  async handler({ args }: XActionEvent<{ key: string; value: string }>) {
    this.getModule().getDb()?.setConfig(args.key, args.value);
    return true;
  }
}
