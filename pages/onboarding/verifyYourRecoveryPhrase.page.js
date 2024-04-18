import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';
import util from '../../util/index.js';

import { PHRASE_INPUT_INTERVAL } from '../../const/index.js';

class VerifyYourRecoveryPhrasePage extends Page {
  get keyElement() {
    return this.confirmBtn;
  }

  get phraseInputPrefix() {
    return 'phrase-input-index';
  }
  get confirmBtn() {
    return api.by.id('saved-the-phrase');
  }
  async clickConfirmBtn() {
    await api.tap(this.confirmBtn);
  }
  async inputPhrases(phrases) {
    await util.forEachAsync(phrases, async (phrase, index) => {
      const isDisplayed = await api.by.id(`suggest-${phrase}`).isDisplayed();
      if (isDisplayed) {
        await api.tap(api.by.id(`suggest-${phrase}`));
      }
      // await api.tap(elem);
      // await api.setValue(elem, phrase.slice(0, 4));
      // await api.pause(PHRASE_INPUT_INTERVAL);
    })();
    await api.platformChain
      .android()
      .ios()
      .run(async () => {
        await browser.hideKeyboard();
      });
  }
}

export const verifyYourRecoveryPhrasePage = new VerifyYourRecoveryPhrasePage();
