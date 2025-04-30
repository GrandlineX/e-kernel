import { BrowserWindow } from 'electron';
import { IKernel, KernelWindowName } from '../lib';

export default async function createWindow(kernel: IKernel) {
  const wm = kernel.getWindowManager();

  const mainWindow = wm.create(KernelWindowName.MAIN, (c) => {
    return new BrowserWindow(c);
  });

  mainWindow.setMenu(null);

  if (kernel.getDevMode()) {
    await mainWindow.loadURL('http://localhost:9000');
  } else {
    await mainWindow.loadFile(kernel.getAppRoot());
  }
  if (kernel.hasCryptoClient()) {
    mainWindow.maximize();
  }
}
