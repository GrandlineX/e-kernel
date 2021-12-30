import CoreKernel, { ICoreCClient, sleep } from '@grandlinex/core';
import { app, BrowserWindow, Tray } from 'electron';
import * as Path from 'path';
import ELogger from '@grandlinex/bundle-elogger';
import { ElectronGlobals, IKernel } from './lib';
import ElectronKernelModule from './ElectronKernelModule';
import createWindow from './components/createWindow';
import initTray from './components/initTray';

/**
 *  @class ElectronKernel
 */

export default class ElectronKernel
  extends CoreKernel<ICoreCClient>
  implements IKernel
{
  private appRoot: string;

  private preloadRoot: string;

  private tray: Tray | null;

  private preloadWindow: BrowserWindow | null;

  private mainWindow: BrowserWindow | null;

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
  }) {
    super(config);
    const { appRoot, preloadRoot } = config;
    this.globalLogger = new ELogger(this);
    this.setLogger(this.globalLogger);

    this.setBaseModule(new ElectronKernelModule(this));
    this.appRoot = appRoot || Path.join(__dirname, '..', 'res', 'index.html');
    this.preloadRoot =
      preloadRoot || Path.join(__dirname, '..', 'res', 'preload.html');
    this.tray = null;
    this.mainWindow = null;
    this.preloadWindow = null;
    const store = this.getConfigStore();
    store.set(
      ElectronGlobals.GLX_IMG_ICON,
      Path.join(__dirname, '..', 'res', 'img', 'favicon.png')
    );
    store.set(
      ElectronGlobals.GLX_IMG_THUMP,
      Path.join(__dirname, '..', 'res', 'img', 'favicon.png')
    );
    this.setTriggerFunction('pre', this.electronPre);
    this.setTriggerFunction('start', this.electronStart);
  }

  async setPreload(title: string): Promise<void> {
    const store = this.getConfigStore();

    if (this.preloadWindow === null) {
      this.preloadWindow = new BrowserWindow({
        width: 600,
        height: 450,
        resizable: false,
        icon: store.get(ElectronGlobals.GLX_IMG_ICON),
        frame: false,
      });
      this.preloadWindow.setTitle(this.getAppName());
    }
    const version = app.getVersion();
    await this.preloadWindow.loadFile(this.preloadRoot, {
      search: `${version}& ${title}`,
    });
  }

  async electronPre(ik: this): Promise<void> {
    this.debug('preload');
    return new Promise((resolve) => {
      app.on('ready', async () => {
        await this.setPreload('Starting');
        resolve();
      });
    });
  }

  async electronStart(ik: this): Promise<void> {
    await sleep(2000);
    initTray(this);
    const newUser = !this.getDb()?.configExist('hash');
    this.preloadWindow?.hide();
    await createWindow(this, newUser);
  }

  getPreloadRoot(): string {
    return this.preloadRoot;
  }

  getAppRoot(): string {
    return this.appRoot;
  }

  closeAllWindows() {
    this.mainWindow?.destroy();
  }

  setMainWindow(window: BrowserWindow | null) {
    this.mainWindow = window;
  }

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
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
