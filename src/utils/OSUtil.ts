import { CoreElement, OsRelease, StoreGlobal } from '@grandlinex/core';

// eslint-disable-next-line import/prefer-default-export
export function isOS(element: CoreElement, os: OsRelease): boolean {
  return element.getConfigStore().get(StoreGlobal.GLOBAL_OS) === os;
}
