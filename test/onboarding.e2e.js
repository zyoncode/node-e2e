import { api } from '@node-e2e/cli/api/index.js';

import { onboardingDataset as dataset } from '../dataset/index.js';
import { pages, OnboardingHelper, DevHelper, util } from '../config/setup.js';

const { homePage, clearDataMenuPage, settingPage, app } = pages;

describe('Onboarding', () => {
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
    await DevHelper.clearWalletData();
  });

  it(
    'OK-23787 Create Software Wallet - Verify Address - without password ',
    util.forEachAsync(dataset.createWallet, async ({ input, output }) => {
      await OnboardingHelper.createWallet();
      await app.expectNavToHomePage();
    }),
  );

  it(
    'OK-23787 Create Software Wallet - Verify Address with password ',
    util.forEachAsync(dataset.createWallet, async ({ input, output }) => {
      await OnboardingHelper.createWallet();
      await app.expectNavToHomePage();
    }),
  );

  util.forEachParameterizeIt(
    'OK-23809 Import Software Wallet - by phrases without password',
    dataset.importPhrases,
    async ({ input, output }) => {
      await OnboardingHelper.importWalletByPhrases(input.phrases);
      await app.expectNavToHomePage();
    },
    async () => {
      //clear password
      await DevHelper.clearPassword();
      await api.restartApp();
    },
  );

  util.forEachParameterizeIt(
    'OK-23809 Import Software Wallet - by phrases with password',
    dataset.importPhrases,
    async ({ input, output }) => {
      await OnboardingHelper.importWalletByPhrases(input.phrases);
      await app.expectNavToHomePage();
    },
  );

  it(
    'Import Software Wallet - by private key with password',
    util.forEachAsync(dataset.importPrivatekey, async ({ input, output }) => {
      await OnboardingHelper.importWalletByPrivatekey(input);
      await app.expectNavToHomePage();
    }),
  );

  it(
    'Import Software Wallet - by address with password ',
    util.forEachAsync(dataset.importAddress, async ({ input, output }) => {
      await OnboardingHelper.importAddress({
        chainId: input.chainId,
        address: input.address,
      });
      await app.expectNavToHomePage();
    }),
  );
});
