import { detectPlatform, PLATFORMS } from '../utils/detectPlatform.js';
import by from './by.js';
import { api } from './index.js';

const getText = async (element, input = true, platform = detectPlatform()) => {
  if (!input) {
    return element.getText();
  } else {
    return element.getValue();
  }

  // if (
  //   (platform === PLATFORMS.android || platform === PLATFORMS.ios) &&
  //   !input
  // ) {
  //   return element.getText();
  // }

  // return element.getValue();
};

export default getText;
