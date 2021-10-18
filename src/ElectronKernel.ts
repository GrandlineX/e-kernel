import CoreKernel, { ICoreCClient, sleep } from '@grandlinex/core';
import { app, BrowserWindow, Tray } from 'electron';
import * as Path from 'path';
import { IKernel } from './lib';
import ElectronKernelModule from './ElectronKernelModule';
import initTray from './components/Tray';
import createWindow from './components/MainWindow';

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
   * @param preloadRoot Path to preload html
   * @param appRoot Path to app html
   * @param appName App Name
   * @param appCode App Code (Only lower case)
   * @param pathOverride set base path for config folder
   */
  constructor(
    appName: string,
    appCode: string,
    appRoot?: string,
    preloadRoot?: string,
    pathOverride?: string
  ) {
    super(appName, appCode, pathOverride);
    this.setBaseModule(new ElectronKernelModule(this));
    this.appRoot = appRoot || Path.join(__dirname, '..', 'res', 'index.html');
    this.preloadRoot =
      preloadRoot || Path.join(__dirname, '..', 'res', 'preload.html');
    this.tray = null;
    this.mainWindow = null;
    this.preloadWindow = null;
    this.globalConfig.img.icon = Path.join(
      __dirname,
      '..',
      'res',
      'img',
      'favicon.png'
    );
    this.globalConfig.img.thump = Path.join(
      __dirname,
      '..',
      'res',
      'img',
      'favicon.png'
    );
    this.setTrigerFunction('pre', this.electronPre);
    this.setTrigerFunction('start', this.electronStart);
  }

  async setPreload(title: string): Promise<void> {
    if (this.preloadWindow === null) {
      this.preloadWindow = new BrowserWindow({
        width: 600,
        height: 450,
        resizable: false,
        icon: this.getGlobalConfig().img.icon,
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
    createWindow(this, newUser);
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

  openNewWindow(): void {
    createWindow(this, false);
  }

  reload(): void {
    this.closeAllWindows();
    this.openNewWindow();
  }
}
