import { dialog, shell } from 'electron';
import { ICoreKernel } from '@grandlinex/core';

export async function getFile(event: any, ...args: any[]) {
  return dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
  });
}

export async function openConfigFolder(kernel: ICoreKernel<any>) {
  return shell.openPath(kernel.getGlobalConfig().dir.root);
}
