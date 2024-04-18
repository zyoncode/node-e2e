import { api } from '@node-e2e/cli/api/index.js';

import Page from '../base.js';

class AddressBookIndexPage extends Page {
  get keyElement() {
    return this.searchInput;
  }
  get headerAddIconBtn() {
    return api.by.id('address-book-add-icon');
  }

  get bankAddBtn() {
    return api.by.id('address-book-add-button');
  }

  get searchInput() {
    return api.by.id('nav-header-search');
  }
  get searchInputClear() {
    return api.by.id('nav-header-search-clear');
  }
  get addressBookItemPrefix() {
    return 'address-item-';
  }

  // action
  async clickAddIconBtn() {
    await api.tap(this.headerAddIconBtn);
  }

  async clickBankAddBtn() {
    await api.tap(this.bankAddBtn);
  }
  async clickItemMenuByAddress(address) {
    await api.tap(api.by.id(`address-menu-${address}`));
  }
  async clickAddressItemByAddress(address) {
    await api.tap(api.by.id(`address-item-${address}`));
  }

  async clickUnfoldCatByChainName(cat) {
    await api.tap(api.by.id(`address-cat-${cat}-unfold`));
  }
  /**
   *
   * @param {string} cat chain name
   * @param {boolean} isFold true to fold cat
   */
  async foldOrUnfoldCatByChainName(cat, isFold) {
    await api.tap(
      api.by.id(`address-cat-${cat}-${isFold ? 'unfold' : 'fold'}`),
    );
  }

  async clickItemCopyByAddress(address) {
    await api.tap(api.by.id(`address-menu-copy-${address}`));
  }
  async clickItemEditByAddress(address) {
    await api.tap(api.by.id(`address-menu-edit-${address}`));
  }
  async inputSearchTerm(term) {
    let isElementPresent = await this.searchInputClear.isExisting();
    if (isElementPresent) {
      await api.tap(this.searchInputClear);
    }
    await api.setValue(this.searchInput, term);
  }

  // expect
  async expectAddressInfoExist({ address, name }) {
    if (address) {
      const addressName = await api.getText(
        api.by.id(`list-item-title-address-item-${address}`),
        false,
      );
      expect(addressName).toEqual(name);
    }
    if (name) {
      const addressText = await api.getText(
        api.by.id(`list-item-subtitle-address-item-${address}`),
        false,
      );

      expect(addressText).toEqual(address);
    }
  }
  async expectAddressExist(address) {
    const elementExists = await api.by
      .id(`address-item-${address}`)
      .isExisting();

    expect(elementExists).toBe(true);
  }
  async expectAddressNotExist(address) {
    const elementExists = await api.by
      .id(`address-item-${address}`)
      .isExisting();

    expect(elementExists).toBe(false);
  }

  async expectClipboardEqualAddress(address) {
    const clipboardContent = await api.getClipboard();
    expect(clipboardContent).toEqual(address);
  }
  /**
   *
   * @param {string []} Addresses
   */
  async expectAddressBookOrder(addresses) {
    let addressBookElements = await api.by.idsStartWith(
      this.addressBookItemPrefix,
    );

    let ids = [];
    for (let element of addressBookElements) {
      let id = await api.attr.id(element);
      if (id && id.indexOf(this.addressBookItemPrefix) >= 0) {
        ids.push(id.replace(this.addressBookItemPrefix, ''));
      }
    }
    expect(ids).toEqual(addresses);
  }

  /**
   *
   * @param {string} address
   * @param {boolean} status true displayed
   */
  async expectAddressDisplayStatus(address, status) {
    let isVisible = await api.by.id(`address-item-${address}`).isDisplayed();
    expect(isVisible).toBe(status);
  }
}

export const addressBookIndexPage = new AddressBookIndexPage();
