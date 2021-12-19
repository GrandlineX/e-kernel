import { Menu, Tray } from 'electron';
import { ElectronGlobals, IKernel } from '../lib';
import createWindow from './createWindow';

export default function initTray(kernel: IKernel) {
  if (kernel.getTray() !== null) {
    return;
  }
  const path = kernel.getConfigStore().get(ElectronGlobals.GLX_IMG_THUMP);

  const tray = new Tray(path as string);

  const rows: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Open',
      type: 'normal',
      click: (menuItem) => {
        kernel.closeAllWindows();
        createWindow(kernel, false);
      },
    },
  ];
  if (kernel.getDevMode()) {
    rows.push({
      label: 'Dev Mode',
      type: 'normal',
      click: (menuItem) => {
        kernel.getMainWindow()?.webContents.openDevTools();
      },
    });
  }
  rows.push({
    label: 'Lock',
    type: 'normal',
    click: (menuItem) => {
      kernel.setCryptoClient(null);
      kernel.closeAllWindows();
    },
  });
  rows.push({
    label: 'Exit',
    type: 'normal',
    click: () => {
      process.exit(0);
    },
  });

  const contextMenu = Menu.buildFromTemplate(rows);

  tray.setToolTip(kernel.getAppName());
  tray.setContextMenu(contextMenu);
  kernel.setTray(tray);
}
