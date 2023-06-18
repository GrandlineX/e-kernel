import { XUtil } from '@grandlinex/core';
import { BaseAction } from '../../classes';
import { IBaseKernelModule, KernelWindowName } from '../../lib';
import createWindow from '../../components/createWindow';

export default class MainWindowAction extends BaseAction {
  constructor(moduel: IBaseKernelModule<any, any, any>) {
    super('main-window-action', moduel);
    this.handler = this.handler.bind(this);
  }

  async handler(
    event: Electron.CrossProcessExports.IpcMainInvokeEvent,
    args: {
      action: string;
      data?: any;
    }
  ): Promise<any> {
    let main = this.getEKernel().getWindowManager().get(KernelWindowName.MAIN);

    if (!main) {
      await createWindow(this.getEKernel(), false);
      main = this.getEKernel().getWindowManager().get(KernelWindowName.MAIN);
      let count = 0;
      while (main?.webContents.isLoading() && count < 10) {
        count++;
        await XUtil.sleep(1000);
      }
    }
    if (!main) {
      this.error('CANT ACCESS MAIN BROWSER WINDOW');
      return;
    }
    if (!main.isVisible()) {
      main.show();
    }
    main.webContents.send(args.action, args.data);
  }
}
