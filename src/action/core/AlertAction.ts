import { BaseAction, XActionEvent } from '../../classes';
import { IBaseKernelModule } from '../../lib';
import showNotification from '../../utils/showNotification';

export default class AlertAction extends BaseAction {
  constructor(module: IBaseKernelModule<any, any, any>) {
    super('alert', module);
    this.handler = this.handler.bind(this);
  }

  async handler({ args }: XActionEvent<{ title: string; body: string }>) {
    const { title, body } = args;
    showNotification(title, body);
    return null;
  }
}
