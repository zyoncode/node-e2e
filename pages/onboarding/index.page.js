import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';

class OnboardingPage extends Page {
  get createWalletBtn() {
    return api.by.id('create-wallet');
  }
  get importWalletBtn() {
    return api.by.id('import-wallet');
  }

  async clickCreateWalletBtn() {
    await api.tap(this.createWalletBtn);
  }

  async clickImportWalletBtn() {
    await api.tap(this.importWalletBtn);
  }
  async sysBack() {
    await api.back();
  }
}

export const onboardingPage = new OnboardingPage();
