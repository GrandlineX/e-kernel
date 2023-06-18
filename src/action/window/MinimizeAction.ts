import { BaseAction } from '../../classes';
import { IBaseKernelModule } from '../../lib';

export default class MinimizeAction extends BaseAction {
  constructor(moduel: IBaseKernelModule<any, any, any>) {
    super('window-minimize', moduel);
    this.handler = this.handler.bind(this);
  }

  handler(
    event: Electron.CrossProcessExports.IpcMainInvokeEvent,
    args: any
  ): any {
    const window = this.getEKernel().getMainWindow();
    window?.minimize();
  }
}
