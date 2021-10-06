import * as Path from 'path';
import { config } from 'dotenv';
import { createFolderIfNotExist } from '@grandlinex/core';
import ElectronKernel from '../ElectronKernel';

config();

const appName = 'TestKernel';
const appCode = 'tkernel';
const testPathData = Path.join(__dirname, '..','..', 'data');
const testPath = Path.join(__dirname, '..','..', 'data', 'config');


createFolderIfNotExist(testPathData);
createFolderIfNotExist(testPath);

const kernel = new ElectronKernel(appName, appCode, testPath);

kernel.start();
