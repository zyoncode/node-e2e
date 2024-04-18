import { api } from '@node-e2e/cli/api/index.js';

import Page from './base.js';
import util from '../util/index.js';

class SettingPage extends Page {
  get keyElement() {
    return api.by.id('setting-version');
  }
  get addressBookBtn() {
    return api.by.id('setting-address-book');
  }

  get versionBtn() {
    return api.by.id('setting-version');
  }
  get devOverlayBtn() {
    return api.by.xpath('enable-dev-overlay');
  }

  get clearDataMenuBtn() {
    return api.by.id('clear-data-menu');
  }

  async clickClearDataMenuBtn() {
    await api.scrollToId('clear-data-menu');
    await api.tapOnDevBtn('clear-data-menu');
  }

  async clickAddressBookBtn() {
    await api.tap(this.addressBookBtn);
  }

  async enableDev() {
    let isDisplayed = await this.versionBtn.isDisplayed();
    if (!isDisplayed) {
      await api.scrollToId('setting-version');
    }
    for (const _ of new Array(10).fill(' ')) {
      await this.versionBtn.click();
    }
  }

  async enableDevOverLay() {
    await api.scrollToId('show-dev-overlay');
    await api.platformChain.android().run(async () => {
      await api.by
        .xpath(
          `//android.view.ViewGroup[@resource-id="show-dev-overlay"]/android.widget.Switch`,
        )
        .click();
    });

    await api.platformChain.ios().run(async () => {
      await api.by
        .xpath(
          `//XCUIElementTypeOther[@name="show-dev-overlay"]/XCUIElementTypeSwitch`,
        )
        .click();
    });

    await api.platformChain
      .not()
      .ios()
      .android()
      .run(async () => {
        await api.by
          .xpath(`//div[@data-testid="show-dev-overlay"]/button`)
          .click();
      });
  }
}

export const settingPage = new SettingPage();
