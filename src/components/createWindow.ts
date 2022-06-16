import { BrowserWindow } from 'electron';
import { IKernel, KernelWindowName } from '../lib';

export default async function createWindow(kernel: IKernel, newUser: boolean) {
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
    // mainWindow.setTouchBar(SpinTouchBaar(kernel));
    mainWindow.maximize();
  } else if (newUser) {
    mainWindow.maximize();
  }
}
