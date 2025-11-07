import { BrowserWindow, shell } from 'electron';
import { BaseAction, XActionEvent } from '../../classes/BaseAction';
import { IBaseKernelModule } from '../../lib';

export default class OpenExternalAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('open-external', module);
    this.handler = this.handler.bind(this);
  }

  async handler({
    args,
  }: XActionEvent<{
    url: string;
    external: boolean;
    title?: string;
  }>) {
    const { url, external, title } = args;
    if (external) {
      shell.openExternal(url);
    } else {
      const wm = this.getEKernel().getWindowManager();
      const mainWindow = wm.create(url, (c) => {
        return new BrowserWindow({
          width: c.width,
          height: c.height,
          icon: c.icon,
        });
      });
      mainWindow.setMenu(null);
      mainWindow.loadURL(args.url);
      if (title) {
        mainWindow.setTitle(title);
      }
    }
    return true;
  }
}
