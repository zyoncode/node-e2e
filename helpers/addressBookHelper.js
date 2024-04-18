import { api } from '@node-e2e/cli/api/index.js';
import {
  onboardingPage,
  setPasswordPage,
  addressBookIndexPage,
  addressBookEditPage,
  scanPage,
  networkSelectorModal,
} from '../pages/index.js';
import util from '../util/index.js';

class AddressBookHelperClass {
  static async prepareAddressBook(data) {
    await util.forEachAsync(data, async parameter => {
      await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
        name: parameter.name,
        address: parameter.address,
        chain: parameter.chain,
        chainId: parameter.chainId,
      });
    })();
  }
  static async addAddressFromAddIconBtnWithExpect({
    name,
    address,
    domain,
    chainId,
  }) {
    await addressBookIndexPage.clickAddIconBtn();
    await addressBookEditPage.waitEntryPage();
    if (chainId) {
      await addressBookEditPage.clickSelectChain();
      await networkSelectorModal.waitEntryPage();
      await networkSelectorModal.selectNetworkById(chainId);
    }
    await addressBookEditPage.save({
      name: name,
      address: domain || address,
    });
    await addressBookIndexPage.waitEntryPage();
    await addressBookIndexPage.expectAddressInfoExist({
      name: name,
      address: address,
    });
  }

  static async deleteAddressByAddressWithExpect(address) {
    await addressBookIndexPage.clickItemMenuByAddress(address);
    await addressBookIndexPage.clickItemEditByAddress(address);
    await addressBookEditPage.clickRemoveBtn();
    await addressBookEditPage.clickRemoveConfirmBtn();
    await addressBookIndexPage.waitEntryPage();
    await addressBookIndexPage.expectAddressNotExist(address);
  }
  static async deleteAddressesInAddressBookWithExpect(data, addresses) {
    await AddressBookHelper.deleteAddressesWithExpect(addresses);
    const addressLeft = data
      .filter(o => !addresses.includes(o.address))
      .map(x => x.address);
    await AddressBookHelper.expectAddressesExist(addressLeft);
  }

  static async deleteAddressesWithExpect(addresses) {
    await util.forEachAsync(addresses, async address => {
      await AddressBookHelper.deleteAddressByAddressWithExpect(address);
    })();
  }

  static async editAddressInfo(addressInfoFrom, addressInfoTo) {
    await addressBookIndexPage.clickItemMenuByAddress(addressInfoFrom.address);
    await addressBookIndexPage.clickItemEditByAddress(addressInfoFrom.address);

    await addressBookEditPage.save({
      address: addressInfoTo.address,
      name: addressInfoTo.name,
      chainId: addressInfoTo.chainId,
    });

    await addressBookIndexPage.waitEntryPage();
    await api.pause(6000); // data load
    await addressBookIndexPage.expectAddressInfoExist({
      address: addressInfoTo.address,
      name: addressInfoTo.name,
      chainId: addressInfoTo.chainId,
    });
    await addressBookIndexPage.expectAddressNotExist(addressInfoFrom.address);
  }

  static async clipAddressByAddressWithExpect(address) {
    await addressBookIndexPage.clickItemMenuByAddress(address);
    await addressBookIndexPage.clickItemCopyByAddress(address);
    await addressBookIndexPage.expectClipboardEqualAddress(address);
  }

  static async expectAddressesExist(addresses) {
    await util.forEachAsync(addresses, async address => {
      await addressBookIndexPage.expectAddressExist(address);
    });
  }
}

export const AddressBookHelper = AddressBookHelperClass;
