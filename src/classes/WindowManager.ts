import { app, BrowserWindow } from 'electron';
import * as Path from 'path';
import { CMap } from '@grandlinex/core';
import { ElectronGlobals, IKernel, IWindow, KernelWindowName } from '../lib';
import isDev from '../utils/isDev';
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;

export default class WindowManager implements IWindow {
  private kernel: IKernel;

  private winMap: CMap<string, BrowserWindow>;

  constructor(kernel: IKernel) {
    this.kernel = kernel;
    this.winMap = new CMap<string, BrowserWindow>();
  }

  create(
    key: string,
    fc: (prop: BrowserWindowConstructorOptions) => BrowserWindow,
  ) {
    this.close(key);
    const store = this.kernel.getConfigStore();
    const path = store.get(ElectronGlobals.GLX_IMG_ICON);
    const width = store.get(ElectronGlobals.GLX_WINDOW_W);
    const height = store.get(ElectronGlobals.GLX_WINDOW_H);
    const frame = store.get(ElectronGlobals.GLX_WINDOW_FRAME);
    const preload =
      store.get(ElectronGlobals.GLX_PRELOAD_JS) ||
      Path.join(__dirname, 'preload.js');
    const conf: BrowserWindowConstructorOptions = {
      width: width ? parseInt(width, 10) : 1024,
      height: height ? parseInt(height, 10) : 600,
      backgroundColor: '#2e2c29',
      frame: frame !== 'false',
      webPreferences: {
        preload,
        // nodeIntegration: true,
        // contextIsolation: false,
        additionalArguments: [isDev() ? '1' : '0', app.getVersion()],
      },
      icon: path,
    };

    const win = fc(conf);
    this.winMap.set(key, win);
    return win;
  }

  /**
   * Get Window
   * @param window window name
   */
  get(window: string) {
    return this.winMap.get(window);
  }

  /**
   * Has Window
   * @param window window name
   */
  has(window: string) {
    return this.winMap.has(window);
  }

  /**
   * Hide Window
   * @param window window name
   */
  hide(window: string) {
    this.get(window)?.hide();
  }

  /**
   * Show Window
   * @param window window name
   */
  show(window: string): boolean {
    if (!this.has(window)) {
      return false;
    }
    try {
      this.get(window)?.show();
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Send Message to Window
   * @param window window name
   * @param channel channel name
   * @param args arguments
   * @returns success
   */
  sendMessage(window: string, channel: string, args: any[]): boolean {
    if (!this.has(window)) {
      return false;
    }
    try {
      const wd = this.get(window)!;
      wd.webContents.send(channel, args);
      return true;
    } catch (e) {
      return false;
    }
  }

  close(window: string) {
    const win = this.get(window);
    if (win) {
      this.winMap.delete(window);
      if (win.isDestroyed()) {
        return true;
      }
      if (win.isClosable()) {
        win.close();
        return true;
      }
    }
    return false;
  }

  closeAll() {
    this.winMap.forEach((el, key) => {
      if (key !== KernelWindowName.PRELOAD) {
        this.close(key);
      }
    });
  }
}
