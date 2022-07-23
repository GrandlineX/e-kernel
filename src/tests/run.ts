import ElectronKernel from '../ElectronKernel';
import { XUtil } from '@grandlinex/core';

const appName = 'TestKernel';
const appCode = 'tkernel';

const [testPath] =XUtil.setupEnvironment([__dirname,'..','..'],['data','config'])

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
