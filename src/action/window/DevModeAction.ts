import { IBaseKernelModule } from '../../lib';
import { BaseAction } from '../../classes';

export default class DevModeAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('dev-mode', module);
    this.handler = this.handler.bind(this);
  }

  async handler() {
    const window = this.getKernel().getMainWindow();
    if (window !== null) {
      window.webContents.openDevTools();
    }
    return null;
  }
}
