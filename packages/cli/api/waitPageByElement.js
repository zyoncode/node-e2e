import { WAITE_FOR_PAGE_TIMEOUT } from '../const/index.js';
import { api } from './index.js';
const waitPageByElement = async elem => {
  try {
    await api.platformChain
      .not()
      .ios()
      .run(
        async () =>
          await elem.waitForDisplayed({ timeout: WAITE_FOR_PAGE_TIMEOUT }),
      );
    await api.platformChain
      .ios()
      .run(
        async () =>
          await elem.waitForExist({ timeout: WAITE_FOR_PAGE_TIMEOUT }),
      );
  } catch (error) {}
};

export default waitPageByElement;
