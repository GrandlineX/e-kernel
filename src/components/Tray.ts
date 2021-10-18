import { Menu, Tray } from 'electron';
import { IKernel } from '../lib';
import createWindow from './MainWindow';

export default function initTray(kernel: IKernel) {
  if (kernel.getTray() !== null) {
    return;
  }
  const tray = new Tray(kernel.getGlobalConfig().img.thump);
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
