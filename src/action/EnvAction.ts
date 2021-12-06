import BaseAction from '../classes/BaseAction';
import { IBaseKernelModule } from '../lib';

export default class EnvAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('full-env', module);
    this.handler = this.handler.bind(this);
  }

  async handler(event: Electron.IpcMainInvokeEvent, args: any) {
    // TODO return this.getKernel().getGlobalConfig();
    return {
      config: 'any',
    };
  }
}
