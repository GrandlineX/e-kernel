import BaseAction from '../../classes/BaseAction';
import { openConfigFolder } from '../../utils/fsUtil';
import { IBaseKernelModule } from '../../lib';

export default class ConfigOpenAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('open-config-folder', module);
    this.handler = this.handler.bind(this);
  }

  async handler() {
    return openConfigFolder(this.getKernel());
  }
}
