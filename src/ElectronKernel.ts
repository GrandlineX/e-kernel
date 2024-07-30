import CoreKernel, { CoreLogger, ICoreCClient, XUtil } from '@grandlinex/core';
import { app, BrowserWindow, Tray } from 'electron';
import * as Path from 'path';
import { ElectronGlobals, IKernel, KernelWindowName } from './lib';
import ElectronKernelModule from './ElectronKernelModule';
import createWindow from './components/createWindow';
import initTray from './components/initTray';
import WindowManager from './classes/WindowManager';

/**
 *  @class ElectronKernel
 */

export default class ElectronKernel
  extends CoreKernel<ICoreCClient>
  implements IKernel
{
  private readonly appRoot: string;

  private readonly preloadRoot: string;

  private tray: Tray | null;

  private readonly windowManager: WindowManager;

  /**
   * Default Constructor
   * @param config
   */
  constructor(config: {
    appName: string;
    appCode: string;
    appRoot?: string;
    preloadRoot?: string;
    pathOverride?: string;
    envFilePath?: string;
    logger?: (kernel: CoreKernel<any>) => CoreLogger;
  }) {
    super({ ...config });
    const { appRoot, preloadRoot } = config;

    this.setBaseModule(new ElectronKernelModule(this));
    this.appRoot = appRoot ?? Path.join(__dirname, '..', 'res', 'index.html');
    this.preloadRoot =
      preloadRoot || Path.join(__dirname, '..', 'res', 'preload.html');
    this.tray = null;
    this.windowManager = new WindowManager(this);
    const store = this.getConfigStore();
    store.set(
      ElectronGlobals.GLX_IMG_ICON,
      Path.join(__dirname, '..', 'res', 'img', 'favicon.png'),
    );
    store.set(
      ElectronGlobals.GLX_IMG_THUMP,
      Path.join(__dirname, '..', 'res', 'img', 'favicon.png'),
    );
    this.electronPre = this.electronPre.bind(this);
    this.electronStart = this.electronStart.bind(this);
    this.on('pre', this.electronPre);
    this.on('start', this.electronStart);
  }

  async setPreload(title: string): Promise<void> {
    let win = this.windowManager.get(KernelWindowName.PRELOAD);

    if (!win) {
      win = this.windowManager.create(KernelWindowName.PRELOAD, (conf) => {
        const preWin = new BrowserWindow({
          width: 600,
          height: 450,
          resizable: false,
          icon: conf.icon,
          frame: false,
        });
        preWin.setTitle(this.getAppName());
        return preWin;
      });
    }
    const version = app.getVersion();
    await win.loadFile(this.preloadRoot, {
      search: `${version}& ${title}`,
    });
  }

  async electronPre(): Promise<unknown> {
    this.debug('preload');
    return new Promise((resolve) => {
      app.on('ready', async () => {
        await this.setPreload('Starting');
        resolve(undefined);
      });
    });
  }

  async electronStart(): Promise<unknown> {
    await XUtil.sleep(2000);
    initTray(this);
    const newUser = !this.getDb()?.configExist('hash');
    this.windowManager?.hide(KernelWindowName.PRELOAD);
    await createWindow(this, newUser);
    return undefined;
  }

  getPreloadRoot(): string {
    return this.preloadRoot;
  }

  getAppRoot(): string {
    return this.appRoot;
  }

  closeAllWindows() {
    this.windowManager.closeAll();
  }

  getMainWindow(): BrowserWindow | null {
    return this.windowManager.get(KernelWindowName.MAIN) || null;
  }

  getWindowManager(): WindowManager {
    return this.windowManager;
  }

  setTray(tray: Tray | null) {
    this.tray = tray;
  }

  getTray(): Tray | null {
    return this.tray;
  }

  async openNewWindow(): Promise<void> {
    await createWindow(this, false);
  }

  async reload(): Promise<void> {
    this.closeAllWindows();
    await this.openNewWindow();
  }
}
