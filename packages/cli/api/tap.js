import { detectPlatform, PLATFORMS } from '../utils/detectPlatform.js';

import { WAITE_FOR_ELEMENT_TIMEOUT, TAP_WAIT } from '../const/index.js';
import { api } from './index.js';
const tap = async elem => {
  // try {
  //   await api.platformChain
  //     .android()
  //     .run(
  //       async () =>
  //         await elem.waitForDisplayed({ timeout: WAITE_FOR_ELEMENT_TIMEOUT }),
  //     );

  //   await api.platformChain
  //     .ios()
  //     .run(
  //       async () =>
  //         await elem.waitForExist({ timeout: WAITE_FOR_ELEMENT_TIMEOUT }),
  //     );

  //   await api.platformChain
  //     .not()
  //     .ios()
  //     .android()
  //     .run(
  //       async () =>
  //         await elem.waitForClickable({ timeout: WAITE_FOR_ELEMENT_TIMEOUT }),
  //     );
  //   await browser.pause(TAP_WAIT);
  // } catch (error) {}
  await elem.click();
};

export default tap;
