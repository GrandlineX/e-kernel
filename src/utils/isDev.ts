import { app } from 'electron';

function isDev() {
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env;

  const getFromEnv = process.env.ELECTRON_IS_DEV
    ? Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1
    : false;

  return isEnvSet ? getFromEnv : !app.isPackaged;
}

export default isDev;
