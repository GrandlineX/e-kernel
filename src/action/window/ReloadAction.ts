import BaseAction from '../../classes/BaseAction';
import { IBaseKernelModule } from '../../lib';

export default class ReloadAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('reload', module);
    this.handler = this.handler.bind(this);
  }

  handler(): any {
    this.getEKernel().reload();
  }
}
