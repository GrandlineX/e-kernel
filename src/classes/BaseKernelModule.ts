import { CoreKernelModule, IDataBase } from '@grandlinex/core';
import { BaseClient } from 'classes';
import { IBaseCache, IBaseKernelModule, IKernel } from '../lib';

export default abstract class BaseKernelModule<
    T extends IDataBase<any, any> | null,
    P extends BaseClient | null,
    C extends IBaseCache | null,
  >
  extends CoreKernelModule<IKernel, T, P, C, null>
  implements IBaseKernelModule<T | null, P | null, C | null> {}
