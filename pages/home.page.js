import { api } from '@node-e2e/cli/api/index.js';
import Page from './base.js';
import { executeByPlatform } from '../util/index.js';

class HomePage extends Page {
  get homeBtn() {
    return api.by.id('home');
  }

  get settingBtn() {
    return api.by.id('setting');
  }
  get discoveryBtn() {
    return api.by.id('discovery');
  }

  async clickSettingBtn() {
    await executeByPlatform(
      async () => {
        await api.tap(this.settingBtn);
      },
      async () => {
        await api.fixInterceptedClick('setting');
      },
    );
  }
  async clickDiscoveryBtn() {
    await api.tap(this.discoveryBtn);
  }
}

export const homePage = new HomePage();
