import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import { ElectronGlobals, IKernel } from '../lib';

export default async function createWindow(kernel: IKernel, newUser: boolean) {
  const store = kernel.getConfigStore();
  const path = store.get(ElectronGlobals.GLX_IMG_ICON);
  const width = store.get(ElectronGlobals.GLX_WINDOW_W);
  const height = store.get(ElectronGlobals.GLX_WINDOW_H);
  const frame = store.get(ElectronGlobals.GLX_WINDOW_FRAME);
  const mainWindow = new BrowserWindow({
    width: width ? parseInt(width, 10) : 1024,
    height: height ? parseInt(height, 10) : 600,
    backgroundColor: '#2e2c29',
    frame: frame !== 'false',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      additionalArguments: [isDev ? '1' : '0', app.getVersion()],
    },
    icon: path,
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
