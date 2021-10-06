import { CoreAction } from '@grandlinex/core';
import { IBaseAction } from '../lib';

export default abstract class BaseAction
  extends CoreAction
  implements IBaseAction {}
