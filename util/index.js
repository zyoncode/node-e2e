import QRCode from 'qrcode';
import { api } from '@node-e2e/cli/api/index.js';

import {
  detectPlatform,
  PLATFORMS,
} from '@node-e2e/cli/utils/detectPlatform.js';

const currentPlatform = detectPlatform();

export const forEachAsync = (array, asyncCallback, setup) => {
  return async () => {
    if (setup) {
      await setup();
    }
    for (let index = 0; index < array.length; index++) {
      await asyncCallback(array[index], index, array);
    }
  };
};

const generateQRCodeBase64 = async text => {
  const qrCodeBase64 = await QRCode.toDataURL(text);
  return qrCodeBase64.replace('data:image/png;base64,', '');
};

export const executeByPlatform = async (mobileFn, otherFn) => {
  if (
    currentPlatform === PLATFORMS.android ||
    currentPlatform === PLATFORMS.ios
  ) {
    await mobileFn();
  } else {
    await otherFn();
  }
};

export const forEachParameterizeIt = async (name, array, asyncCallback) => {
  for (let index = 0; index < array.length; index++) {
    const current = array[index];

    it(`${name} ${current.name}`, async () => {
      await asyncCallback(current, index);
    });
  }
};

export default {
  forEachAsync,
  generateQRCodeBase64,
  forEachParameterizeIt,
};
