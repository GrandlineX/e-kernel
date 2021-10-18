import { BrowserWindow, shell } from 'electron';
import BaseAction from '../classes/BaseAction';
import { IBaseKernelModule } from '../lib';

export default class OpenExternalAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('open-external', module);
    this.handler = this.handler.bind(this);
  }

  handler(
    event: Electron.IpcMainInvokeEvent,
    args: { url: string; external: boolean }
  ): any {
    if (args.external) {
      shell.openExternal(args.url);
    } else {
      const mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        icon: this.getKernel().getGlobalConfig().img.icon,
      });
      mainWindow.setMenu(null);
      mainWindow.loadURL(args.url);
    }
    return true;
  }
}
