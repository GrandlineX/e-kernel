import * as Path from 'path';
import { createFolderIfNotExist } from '@grandlinex/core';
import ElectronKernel from '../ElectronKernel';

const appName = 'TestKernel';
const appCode = 'tkernel';
const testPathData = Path.join(__dirname, '..','..', 'data');
const testPath = Path.join(__dirname, '..','..', 'data', 'config');

createFolderIfNotExist(testPathData);
createFolderIfNotExist(testPath);

const kernel = new ElectronKernel( { appName, appCode, pathOverride: testPath });

/*kernel.setDevMode(true)
kernel.setTrigerFunction("pre",async (ik)=>{
  app.whenReady().then(async () => {
    await installExtension(REACT_DEVELOPER_TOOLS)
    await installExtension(REDUX_DEVTOOLS)
    await installExtension(VUEJS3_DEVTOOLS)
  });
  await ik.electronPre(ik)

})*/
kernel.start();
