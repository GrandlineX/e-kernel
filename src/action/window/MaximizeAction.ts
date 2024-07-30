import { BaseAction } from '../../classes';
import { IBaseKernelModule } from '../../lib';

export default class MaximizeAction extends BaseAction {
  constructor(moduel: IBaseKernelModule<any, any, any>) {
    super('window-maximize', moduel);
    this.handler = this.handler.bind(this);
  }

  async handler(): Promise<void> {
    const window = this.getEKernel().getMainWindow();
    if (window) {
      if (window.isMaximized()) {
        window.unmaximize();
      } else {
        window.maximize();
      }
    }
  }
}
