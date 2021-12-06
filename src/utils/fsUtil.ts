import { dialog, shell } from 'electron';
import { ICoreKernel } from '@grandlinex/core';

export async function getFile(event: any, ...args: any[]) {
  return dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
  });
}

export async function openConfigFolder(kernel: ICoreKernel<any>) {
  const path = kernel.getConfigStore().get('GLOBAL_PATH_HOME');
  if (!path) {
    throw kernel.lError('Cant open config folder');
  }
  return shell.openPath(path);
}
