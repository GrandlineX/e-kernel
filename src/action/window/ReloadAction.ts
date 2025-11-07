import { IBaseKernelModule } from '../../lib';
import { BaseAction } from '../../classes';

export default class ReloadAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('reload', module);
    this.handler = this.handler.bind(this);
  }

  async handler() {
    this.getKernel().reload();
  }
}
