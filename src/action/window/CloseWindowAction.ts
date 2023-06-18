import { BaseAction } from '../../classes';
import { IBaseKernelModule, KernelWindowName } from '../../lib';

export default class CloseWindowAction extends BaseAction {
  constructor(moduel: IBaseKernelModule<any, any, any>) {
    super('window-close', moduel);
    this.handler = this.handler.bind(this);
  }

  handler(
    event: Electron.CrossProcessExports.IpcMainInvokeEvent,
    args: any
  ): any {
    const wm = this.getEKernel().getWindowManager();
    wm.close(KernelWindowName.MAIN);
  }
}
