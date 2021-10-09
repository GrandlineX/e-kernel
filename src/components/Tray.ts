import { app, Menu, Tray } from 'electron';
import Path from 'path';
import { IKernel } from '../lib';
import createWindow from './MainWindow';

export default function initTray(kernel: IKernel) {
  const tray = new Tray(kernel.getGlobalConfig().icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      type: 'normal',
      click: (menuItem) => {
        kernel.closeAllWindows();
        createWindow(kernel, false);
      },
    },
    {
      label: 'Dev Mode',
      type: 'normal',
      click: (menuItem) => {
        kernel.getMainWindow()?.webContents.openDevTools();
      },
    },
    {
      label: 'Lock',
      type: 'normal',
      click: (menuItem) => {
        kernel.setCryptoClient(null);
        kernel.closeAllWindows();
      },
    },
    {
      label: 'Exit',
      type: 'normal',
      click: () => {
        process.exit(0);
      },
    },
  ]);

  tray.setToolTip(kernel.getAppName());
  tray.setContextMenu(contextMenu);
  kernel.setTray(tray);
}
