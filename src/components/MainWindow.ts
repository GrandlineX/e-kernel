import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { IKernel } from '../lib';

export default async function createWindow(kernel: IKernel, newUser: boolean) {
  const conf = kernel.getGlobalConfig();
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      additionalArguments: [isDev ? '1' : '0', app.getVersion()],
    },
    icon: conf.img.icon,
  });
  mainWindow.setMenu(null);

  if (kernel.getDevMode()) {
    await mainWindow.loadURL('http://localhost:9000');
  } else {
    await mainWindow.loadFile(kernel.getAppRoot());
  }
  kernel.setMainWindow(mainWindow);
  if (kernel.hasCryptoClient()) {
    // mainWindow.setTouchBar(SpinTouchBaar(kernel));
    mainWindow.maximize();
  } else if (newUser) {
    mainWindow.maximize();
  }
}
