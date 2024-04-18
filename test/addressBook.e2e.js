import { api } from '@node-e2e/cli/api/index.js';

import {
  addressBookDataset as dataset,
  lockPassword,
} from '../dataset/index.js';
import {
  pages,
  AddressBookHelper,
  OnboardingHelper,
  DevHelper,
  util,
} from '../config/setup.js';

const {
  onboardingPage,
  homePage,
  morePage,
  setPasswordPage,
  addressBookIndexPage,
  addressBookEditPage,
  settingPage,
  scanPage,
  networkSelectorModal,
  encryptedStorageModal,
  app,
} = pages;

describe('Address Book', () => {
  before(async () => {
    await api.globalStore.clear();
    await api.waitUntilAppInit();
    await api.back();
    await homePage.clickSettingBtn();
    await settingPage.waitEntryPage();
    await settingPage.enableDev();
    await settingPage.enableDevOverLay();
  });

  beforeEach(async () => {
    await DevHelper.clearContactData();
    await app.toSettingPage();
    await settingPage.clickAddressBookBtn();
    await encryptedStorageModal.clickConfirm();
    const isSetPass = await api.globalStore.get(
      api.globalStore.constStr.password,
    );
    if (!isSetPass) {
      await setPasswordPage.savePassword(lockPassword);
    }
  });

  it(
    'Initial Access - No password Center Button Add',
    util.forEachAsync(dataset.initialAccess, async ({ input, output }) => {
      await addressBookIndexPage.clickBankAddBtn();
      await addressBookEditPage.save({
        name: input.name,
        address: input.address,
      });
      await addressBookIndexPage.waitEntryPage();
      await addressBookIndexPage.expectAddressInfoExist({
        name: input.name,
        address: input.address,
      });
    }),
  );

  it(
    'Address Addition - Batch Creation',
    util.forEachAsync(
      [],
      async ({ input, output }) => {},
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Addition - Manual Input for Icon Addition',
    util.forEachAsync(dataset.manualAdd, async ({ input, output }) => {
      await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
        name: input.name,
        address: input.address,
      });
    }),
  );

  it(
    'Address Addition - Domain Method Addition',
    util.forEachAsync(dataset.domainAdd, async ({ input, output }) => {
      await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
        name: input.name,
        address: input.address,
        domain: input.domain,
      });
    }),
  );

  it('Address Addition - Adding Warning Address', async () => {
    throw new Error('Method not implemented.');
  });

  it('Address Addition - Photo Scan for Address Input', async () => {
    throw new Error('Method not implemented.');
  });

  it(
    'Address Addition - Image Scan for Address Input',
    api.platformChain.android().bind(
      util.forEachAsync(dataset.imageScan, async ({ input, output }) => {
        await addressBookIndexPage.clickAddIconBtn();
        await addressBookEditPage.inputName(input.name);
        await addressBookEditPage.pushQRcodeFile(input.QRcode);
        await addressBookEditPage.clickScanBtn();
        await scanPage.clickOpenPhoto();
        await scanPage.selectFirstImage();
        await addressBookEditPage.clickSaveBtnForScan();
        await addressBookIndexPage.expectAddressInfoExist({
          name: input.name,
          address: input.address,
        });
      }),
    ),
  );

  it(
    'Address Addition - Adding Duplicate Address',
    util.forEachAsync(dataset.duplicateAddress, async ({ input, output }) => {
      await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
        name: input.name,
        address: input.address,
      });
      await addressBookIndexPage.clickAddIconBtn();
      await addressBookEditPage.inputName(input.name);
      await addressBookEditPage.inputAddress(input.address);
      await addressBookEditPage.expectAddressDuplicateTip();
    }),
  );

  it(
    'Address Addition - Adding Duplicate Domain Address',
    util.forEachAsync(dataset.duplicateDomain, async ({ input, output }) => {
      await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
        name: input.name,
        address: input.address,
        domain: input.domain,
      });
      await addressBookIndexPage.clickAddIconBtn();
      await addressBookEditPage.inputName(input.name);
      await addressBookEditPage.inputAddress(input.domain);
      await addressBookEditPage.expectAddressDuplicateTip();
    }),
  );

  it(
    'Address Addition - Adding Different Chain Domain',
    util.forEachAsync(
      dataset.differentChainDomain,
      async ({ input, output }) => {
        await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
          name: input.name,
          domain: input.domain,
          address: input.address,
          chainId: input.chainId,
        });
      },
    ),
  );

  it(
    'Address Addition - Adding Different Chain Address',
    util.forEachAsync(dataset.differentChain, async ({ input, output }) => {
      await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
        name: input.name,
        address: input.address,
        chainId: input.chainId,
      });
    }),
  );

  it(
    'Address Addition - Mismatched Domain and Chain',
    util.forEachAsync(
      dataset.mismatchedDomainAndChain,
      async ({ input, output }) => {
        await addressBookIndexPage.clickAddIconBtn();
        await addressBookEditPage.waitEntryPage();
        await addressBookEditPage.clickSelectChain();
        await networkSelectorModal.waitEntryPage();
        await networkSelectorModal.selectNetworkById(input.chainId);
        await addressBookEditPage.inputAddress(input.domain);
        await addressBookEditPage.expectMismatchedDomainAndChainTip();
      },
    ),
  );
  it(
    'Address Addition - Return from Add Page Without Save',
    util.forEachAsync(dataset.returnWithoutSave, async ({ input, output }) => {
      await addressBookIndexPage.clickAddIconBtn();
      await addressBookEditPage.inputName(input.name);
      await addressBookEditPage.inputAddress(input.address);
      await addressBookEditPage.goBack();
      await addressBookIndexPage.waitEntryPage();
      await addressBookIndexPage.expectAddressNotExist(input.address);
    }),
  );

  it(
    'Address Addition - Re-adding after Deletion',
    util.forEachAsync(
      dataset.reAddingAfterDelete,
      async ({ input, output }) => {
        await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
          name: input.name,
          address: input.address,
          chain: input.chain,
        });
        await AddressBookHelper.deleteAddressByAddressWithExpect(input.address);
        await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
          name: input.name,
          address: input.address,
          chain: input.chain,
        });
      },
    ),
  );

  it('Address Addition - Addition to Other EVM Compatible Networks', async () => {
    throw new Error('Method not implemented.');
  });

  it(
    'Address Deletion - Single Deletion',
    util.forEachAsync(dataset.singleDelete, async ({ input, output }) => {
      await AddressBookHelper.addAddressFromAddIconBtnWithExpect({
        name: input.name,
        address: input.address,
        chain: input.chain,
      });
      await AddressBookHelper.deleteAddressByAddressWithExpect(input.address);
    }),
  );

  it(
    'Address Deletion - Multiple Deletions',
    util.forEachAsync(
      dataset.multipleDelete,
      async ({ input, output }) => {
        await util.forEachAsync(input.addresses, async address => {
          await AddressBookHelper.deleteAddressByAddressWithExpect(address);
        })();
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Deletion - Multiple Deletions across Categories',
    util.forEachAsync(
      dataset.multipleDelete,
      async ({ input, output }) => {
        await util.forEachAsync(input.addresses, async address => {
          await AddressBookHelper.deleteAddressByAddressWithExpect(address);
        })();
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Deletion - Delete All',
    util.forEachAsync(
      dataset.multipleDelete,
      async ({ input, output }) => {
        await util.forEachAsync(input.addresses, async address => {
          await AddressBookHelper.deleteAddressByAddressWithExpect(address);
        })();
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Editing - Edit Address',
    util.forEachAsync(
      dataset.editAddress,
      async ({ input, output }) => {
        await AddressBookHelper.editAddressInfo(input, output);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Editing - Edit Domain Address',
    util.forEachAsync(
      dataset.editAddress,
      async ({ input, output }) => {
        await AddressBookHelper.editAddressInfo(input, output);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it('Address Editing - Edit Warning Domain Address', async () => {
    throw new Error('Method not implemented.');
  });

  it(
    'Address Editing - Edit Different Chain',
    util.forEachAsync(
      dataset.editAddress,
      async ({ input, output }) => {
        await AddressBookHelper.editAddressInfo(input, output);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Editing - Edit Mismatched Chain and Address',
    util.forEachAsync(
      dataset.editMismatchChainAndAddress,
      async ({ input, output }) => {
        await addressBookIndexPage.clickItemMenuByAddress(input.address);
        await addressBookIndexPage.clickItemEditByAddress(input.address);
        await addressBookEditPage.waitEntryPage();
        await addressBookEditPage.clickSelectChain();
        await networkSelectorModal.waitEntryPage();
        await networkSelectorModal.selectNetworkById(input.chainId);
        await addressBookEditPage.waitEntryPage();
        await api.pause(10000); // 等待请求
        await addressBookEditPage.expectMismatchedDomainAndChainTip();
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Copy - Copy after Addition',
    util.forEachAsync(
      dataset.copyAfterAdd,
      async ({ input, output }) => {
        await AddressBookHelper.clipAddressByAddressWithExpect(input.address);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Copy - Copy after Editing',
    util.forEachAsync(
      dataset.copyAfterEdit,
      async ({ input, output }) => {
        await AddressBookHelper.editAddressInfo(input.form, input.to);
        await AddressBookHelper.clipAddressByAddressWithExpect(
          input.to.address,
        );
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Search - Fuzzy & Exact Search',
    util.forEachAsync(
      dataset.search,
      async ({ input, output }) => {
        await addressBookIndexPage.inputSearchTerm(input.term);
        await api.pause(3000);
        await addressBookIndexPage.expectAddressBookOrder(output.result);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Search - Search with No Results',
    util.forEachAsync(
      dataset.searchNoResult,
      async ({ input, output }) => {
        await addressBookIndexPage.inputSearchTerm(input.term);
        await addressBookIndexPage.expectAddressBookOrder(output.result);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Search - Search after Deletion',
    util.forEachAsync(
      dataset.searchAfterDelete,
      async ({ input, output }) => {
        await AddressBookHelper.deleteAddressesInAddressBookWithExpect(
          dataset.preloadData,
          input.addresses,
        );
        await addressBookIndexPage.inputSearchTerm(input.term);
        await addressBookIndexPage.expectAddressBookOrder(output.result);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Sorting - Post-Addition Sorting',
    util.forEachAsync(
      dataset.postAdditionSorting,
      async ({ input, output }) => {
        await addressBookIndexPage.expectAddressBookOrder(output.result);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Sorting - Sorting Different Currencies',
    util.forEachAsync(
      dataset.postAdditionSorting,
      async ({ input, output }) => {
        await addressBookIndexPage.expectAddressBookOrder(output.result);
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Sorting - Categorized Display',
    util.forEachAsync(
      dataset.catDisplay,
      async ({ input, output }) => {
        await addressBookIndexPage.foldOrUnfoldCatByChainName(
          input.chain,
          true,
        );
        await util.forEachAsync(output.addresses, async address => {
          await addressBookIndexPage.expectAddressDisplayStatus(address, false);
        })();

        await addressBookIndexPage.foldOrUnfoldCatByChainName(
          input.chain,
          false,
        );

        await util.forEachAsync(output.addresses, async address => {
          await addressBookIndexPage.expectAddressDisplayStatus(address, true);
        })();
      },
      () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );

  it(
    'Address Selection - Return to Selected Address in Specific Category',
    util.forEachAsync(
      dataset.blank,
      async ({ input, output }) => {
        // await morePage.clickPickAddressBook();
        // await addressBookIndexPage.clickAddressItemByAddress(input.address);
      },
      // () => AddressBookHelper.prepareAddressBook(dataset.preloadData),
    ),
  );
});
