import { OfflineService } from '@grandlinex/core';
import { BaseKernelModule } from './classes';
import { IKernel } from './lib';
import * as A from './action';

export default class ElectronKernelModule extends BaseKernelModule<
  null,
  null,
  null
> {
  constructor(kernel: IKernel) {
    super('base-mod', kernel);

    this.addAction(
      new A.AlertAction(this),
      new A.ConfigOpenAction(this),
      new A.ConfigSetAction(this),
      new A.DevModeAction(this),
      new A.ConfigGetAction(this),
      new A.OpenExternalAction(this),
      new A.ReloadAction(this),
      new A.CloseWindowAction(this),
      new A.MainWindowAction(this),
      new A.MaximizeAction(this),
      new A.MinimizeAction(this)
    );

    this.addService(new OfflineService(this));
  }

  initModule(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
