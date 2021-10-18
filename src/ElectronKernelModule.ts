import { OfflineService } from '@grandlinex/core';
import { BaseKernelModule } from './classes';
import { IKernel } from './lib';
import * as A from './action';
import KernelDB from './db/KernelDB';
import Update001 from './db/update/Update001';

export default class ElectronKernelModule extends BaseKernelModule<
  KernelDB,
  null,
  null
> {
  constructor(kernel: IKernel) {
    super('kernel', kernel);

    [
      new A.AlertAction(this),
      new A.ConfigOpenAction(this),
      new A.ConfigSetAction(this),
      new A.DevModeAction(this),
      new A.EnvAction(this),
      new A.OpenExternalAction(this),
      new A.ReloadAction(this),
    ].forEach((action) => {
      this.addAction(action);
    });

    [new OfflineService(this)].forEach((service) => {
      this.addService(service);
    });
  }

  async initModule(): Promise<void> {
    const db = new KernelDB(this);
    db.setUpdateChain(new Update001(db));
    this.setDb(db);
    await this.getKernel().trigerFunction('load');
  }

  async startup(): Promise<void> {
    return Promise.resolve();
  }

  async beforeServiceStart(): Promise<void> {
    return Promise.resolve();
  }

  async final(): Promise<void> {
    return Promise.resolve();
  }
}
