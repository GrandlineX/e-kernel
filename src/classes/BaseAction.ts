import { CoreAction } from '@grandlinex/core';
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { IBaseAction, IKernel } from '../lib';

export default abstract class BaseAction
  extends CoreAction
  implements IBaseAction
{
  abstract handler(event: IpcMainInvokeEvent, args: any): any;
  register(): void {
    this.log('register');
    ipcMain.handle(this.getName(), this.handler);
  }

  getEKernel(): IKernel {
    return this.getKernel() as IKernel;
  }
}
