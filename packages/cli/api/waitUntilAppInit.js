import { api } from '../api/index.js';
import { APP_START_TIMEOUT } from '../const/index.js';
const waitUntilAppInit = async () => {
  await api.platformChain
    .android()
    .ios()
    .run(async () => {
      const element = await api.by.id('create-wallet');
      await element.waitForExist({ timeout: APP_START_TIMEOUT });
    });

  await api.platformChain.web().run(async () => {
    await browser.url(process.env.BASEURL);
    await api.pause(APP_START_TIMEOUT);
  });
  await api.platformChain.ext().run(async () => {
    await browser.setWindowSize(380, 700);
    await browser.url('chrome://extensions/');
    const extension = await $$('>>> extensions-item')[0];
    const extId = await extension.getAttribute('id');
    await browser.url(`chrome-extension://${extId}/ui-popup.html`);
    await api.pause(APP_START_TIMEOUT);
  });

  await api.platformChain.ios().run(async () => {
    try {
      await browser.execute('mobile: alert', {
        action: 'accept',
        buttonLabel: 'Allow',
      });
    } catch (error) {}
    try {
      await browser.execute('mobile: alert', {
        action: 'accept',
        buttonLabel: 'WLAN Only',
      });
    } catch (error) {}
  });
};

export default waitUntilAppInit;
