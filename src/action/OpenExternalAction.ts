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
      const store = this.getKernel().getConfigStore();

      const mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        icon: store.get('GLX_IMG_ICON'),
      });
      mainWindow.setMenu(null);
      mainWindow.loadURL(args.url);
    }
    return true;
  }
}
