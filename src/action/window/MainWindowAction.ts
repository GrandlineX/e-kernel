import { XUtil } from '@grandlinex/core';
import { BaseAction, XActionEvent } from '../../classes';
import { IBaseKernelModule, KernelWindowName } from '../../lib';

export default class MainWindowAction extends BaseAction {
  constructor(moduel: IBaseKernelModule<any, any, any>) {
    super('main-window-action', moduel);
    this.handler = this.handler.bind(this);
  }

  async handler({ args }: XActionEvent<{ action: string; data?: any }>) {
    let main = this.getKernel().getWindowManager().get(KernelWindowName.MAIN);

    if (!main) {
      await this.getKernel().openNewWindow();
      main = this.getKernel().getWindowManager().get(KernelWindowName.MAIN);
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
