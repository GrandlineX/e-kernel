import BaseAction from '../classes/BaseAction';
import { IBaseKernelModule } from '../lib';

export default class DevModeAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('dev-mode', module);
    this.handler = this.handler.bind(this);
  }

  handler(event: Electron.IpcMainInvokeEvent, args: any): any {
    const window = this.getEKernel().getMainWindow();
    if (window !== null) {
      window.webContents.openDevTools();
    }
    return null;
  }
}
