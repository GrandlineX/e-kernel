import { OfflineService } from '@grandlinex/core';
import { BaseKernelModule } from './classes';
import { IKernel } from './lib';

export default class ElectronKernelModule extends BaseKernelModule<
  null,
  null,
  null
> {
  constructor(kernel: IKernel) {
    super('kernel', kernel);

    [].forEach((action) => {
      this.addAction(action);
    });

    [new OfflineService(this)].forEach((service) => {
      this.addService(service);
    });
  }

  async initModule(): Promise<void> {
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
