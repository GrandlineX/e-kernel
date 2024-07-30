import { BaseAction } from '../../classes';
import { IBaseKernelModule } from '../../lib';

export default class ConfigSetAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('config-set', module);
    this.handler = this.handler.bind(this);
  }

  handler(
    event: Electron.IpcMainInvokeEvent,
    args: { key: string; value: string },
  ): any {
    this.getModule().getDb()?.setConfig(args.key, args.value);
    return true;
  }
}
