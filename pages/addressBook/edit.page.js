import { api } from '@node-e2e/cli/api/index.js';
import {
  detectPlatform,
  PLATFORMS,
} from '@node-e2e/cli/utils/detectPlatform.js';

import Page from '../base.js';
import { networkSelectorModal } from '../modal/networkSelectorModal.page.js';
import util from '../../util/index.js';
import {
  ADDRESS_BOOK_AFTER_INPUT_NAME,
  ADDRESS_BOOK_AFTER_INPUT_ADDRESS,
  ADDRESS_BOOK_AFTER_CLICK_SAVE,
} from '../../const/index.js';

const currentPlatform = detectPlatform();

class AddressBookEditPage extends Page {
  get keyElement() {
    return this.networkSelectBtn;
  }
  get currentNetworkText() {
    return api.by.idStartWith('address-form-network-value-');
  }
  get networkSelectBtn() {
    return api.by.id('network-selector-input');
  }
  get nameInput() {
    return api.by.id('address-form-name');
  }
  get addressInput() {
    return api.by.id('address-form-address');
  }

  get copyBtn() {
    return api.by.id('address-form-address-clip');
  }

  get scanBtn() {
    return api.by.id('address-form-address-scan');
  }

  get saveBtn() {
    return api.by.id('address-form-save');
  }
  get removeBtn() {
    return api.by.id('address-form-remove');
  }
  get removeConfirmBtn() {
    return api.by.id('address-remove-confirm');
  }
  get formNameMessage() {
    return api.by.id('address-form-name-field-message');
  }

  get formAddressMessage() {
    return api.by.id('address-form-address-field-message');
  }

  async inputName(name) {
    await api.setValue(this.nameInput, name);
    await api.pause(ADDRESS_BOOK_AFTER_INPUT_NAME); // Todo handle Validation
  }

  async inputAddress(value) {
    await api.setValue(this.addressInput, value);
    await api.pause(ADDRESS_BOOK_AFTER_INPUT_ADDRESS); // Todo handle Validation
  }

  async clickScanBtn() {
    await api.tap(this.scanBtn);
    await api.allowSysAlerts();
  }
  async clickSaveBtnForScan() {
    await api.tap(this.saveBtn);
  }

  async clickRemoveBtn() {
    await api.tap(this.removeBtn);
  }

  async save({ name, address, chainId }) {
    if (chainId) {
      await this.clickSelectChain();
      await networkSelectorModal.waitEntryPage();
      await networkSelectorModal.selectNetworkById(chainId);
    }

    if (name) {
      await this.inputName(name);
    }
    if (address) {
      await this.inputAddress(address);
    }

    await api.tap(this.saveBtn);
    // await api.pause(ADDRESS_BOOK_AFTER_CLICK_SAVE);
  }

  async clickSelectChain() {
    // if (
    //   currentPlatform === PLATFORMS.android ||
    //   currentPlatform === PLATFORMS.ios
    // ) {
    await api.tap(this.networkSelectBtn);
    // } else {
    //   await api.fixInterceptedClick('network-selector-input');
    // }
    // await api.pause(300);
  }

  async clickRemoveConfirmBtn() {
    await api.tap(this.removeConfirmBtn);
  }

  async pushQRcodeFile(text) {
    const base64 = await util.generateQRCodeBase64(text);
    await api.pushToImageDir(base64);
  }

  async expectAddressDuplicateTip() {
    const isNameMessageVisible = await this.formNameMessage.isDisplayed();
    expect(isNameMessageVisible).toBe(true);
    // const isAddressMessageVisible = await this.formAddressMessage.isDisplayed();
    // expect(isAddressMessageVisible).toBe(true); // 当 Name 有错误消息后 ，地址会一直 loading。
  }

  async expectMismatchedDomainAndChainTip() {
    const isAddressMessageVisible = await this.formAddressMessage.isDisplayed();
    expect(isAddressMessageVisible).toBe(true);
  }
}

export const addressBookEditPage = new AddressBookEditPage();
