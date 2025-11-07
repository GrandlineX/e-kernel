import { CoreAction, ICoreClient, IDataBase } from '@grandlinex/core';
import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { IBaseAction, IBaseCache, IKernel } from '../lib';

export type XActionEvent<D = any> = {
  raw: IpcMainInvokeEvent;
  args: D;
};

export abstract class BaseAction<
    T extends IDataBase<any, any> | null = any,
    P extends ICoreClient | null = any,
    C extends IBaseCache | null = any,
    I = any,
    O = any,
  >
  extends CoreAction<IKernel, T, P, C>
  implements IBaseAction<IKernel, T, P, C>
{
  abstract handler(event: XActionEvent<I>): Promise<O>;
  register(): void {
    this.log('register');
    ipcMain.handle(this.getName(), (event, args) =>
      this.handler({
        raw: event,
        args,
      }),
    );
  }
}
