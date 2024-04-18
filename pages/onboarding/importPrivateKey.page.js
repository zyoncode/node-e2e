import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';
import { networkSelectorModal } from '../modal/networkSelectorModal.page.js';

class ImportPrivateKeyPage extends Page {
  get chooseChainBtn() {
    return api.by.id('network-selector-input');
  }
  get privatekeyInput() {
    return api.by.id('private-key');
  }

  async inputPrivatekey(pk) {
    await api.tap(this.privatekeyInput);
    await api.setValue(this.privatekeyInput, pk);
  }

  async chooseNetwork(networkId) {
    if (networkId) {
      await api.tap(this.chooseChainBtn);
      await networkSelectorModal.selectNetworkById(networkId);
    }
  }
}

export const importPrivateKeyPage = new ImportPrivateKeyPage();
