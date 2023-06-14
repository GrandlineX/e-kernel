import ElectronKernel from '../ElectronKernel';
import { XUtil } from '@grandlinex/core';
import { app } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, VUEJS3_DEVTOOLS } from 'electron-devtools-installer';

const appName = 'TestKernel';
const appCode = 'tkernel';

const [testPath] =XUtil.setupEnvironment([__dirname,'..','..'],['data','config'])

const kernel = new ElectronKernel( { appName, appCode, pathOverride: testPath });


kernel.setTriggerFunction("pre",async (ik)=>{

  const ek =(ik as ElectronKernel );
  app.whenReady().then(async () => {
    await installExtension(REACT_DEVELOPER_TOOLS)
    await installExtension(REDUX_DEVTOOLS)
    await installExtension(VUEJS3_DEVTOOLS)
  });
  ek.electronPre(ik);
})
kernel.start();
