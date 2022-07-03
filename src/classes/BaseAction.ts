import { CoreAction, ICoreClient, IDataBase } from '@grandlinex/core';
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { IBaseAction, IBaseCache, IKernel } from '../lib';

export default abstract class BaseAction<
    K extends IKernel = IKernel,
    T extends IDataBase<any, any> | null = any,
    P extends ICoreClient | null = any,
    C extends IBaseCache | null = any
  >
  extends CoreAction<K, T, P, C>
  implements IBaseAction<K, T, P, C>
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
