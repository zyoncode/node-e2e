import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';
import { networkSelectorModal } from '../modal/networkSelectorModal.page.js';

class ImportAddressPage extends Page {
  get chooseChainBtn() {
    return api.by.id('network-selector-input');
  }
  get addressInput() {
    return api.by.id('address');
  }

  async clickChooseChainBtn() {
    await api.tap(this.chooseChainBtn);
  }

  async inputAddress(addr) {
    await api.tap(this.addressInput);
    await api.setValue(this.addressInput, addr);
  }

  async chooseNetwork(networkId) {
    if (networkId) {
      await this.clickChooseChainBtn();
      await networkSelectorModal.selectNetworkById(networkId);
    }
  }
}

export const importAddressPage = new ImportAddressPage();
