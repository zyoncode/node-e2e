import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';

import { FINALIZE_WALLET_SETUP } from '../../const/index.js';

class FinalizeWalletSetupPage extends Page {
  get finalizeWalletContainer() {
    return api.by.id('finalize-wallet-setup');
  }

  async waitForSetup() {
    await api.waitPageByElement(this.finalizeWalletContainer);
    await api.pause(FINALIZE_WALLET_SETUP);
  }
}

export const finalizeWalletSetupPage = new FinalizeWalletSetupPage();
