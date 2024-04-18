import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';
import util from '../../util/index.js';
import { PHRASE_INPUT_INTERVAL } from '../../const/index.js';

class ImportRecoveryPhrase extends Page {
  get keyElement() {
    return this.selectPhraseLengthBtn;
  }

  get phraseInputPrefix() {
    return 'phrase-input-index';
  }
  get selectPhraseLengthBtn() {
    return api.by.id('phrase-length');
  }

  get clearAllBtn() {
    return api.by.id('clear-all');
  }
  async choosePhraseLength(len) {
    await api.tap(api.by.id(`select-item-${len}`));
  }

  async clickSelectPhraseLengthBtn() {
    await api.hideKeyboard();
    await api.tap(this.selectPhraseLengthBtn);
  }

  async clickClearAllBtn() {
    await api.scrollToId('clear-all');
    await api.pause(300);

    await api.platformChain
      .android()
      .ios()
      .run(async () => {
        const isShown = await browser.isKeyboardShown();
        if (isShown) {
          await api.tap(this.clearAllBtn);
        }
      });
    await api.tap(this.clearAllBtn);
  }

  async inputPhrases(phrases) {
    const len = Array.from(phrases).length;
    console.log('>>>>>>>>>>>>>> len', len);

    if (len !== 12) {
      await this.clickSelectPhraseLengthBtn();
      await this.choosePhraseLength(len);
    }
    await util.forEachAsync(phrases, async (phrase, index) => {
      const elem = await api.by.id(`${this.phraseInputPrefix}${index}`);
      await api.tap(elem);
      await api.setValue(elem, phrase.slice(0, 4));
      await api.tap(api.by.id(`suggest-${phrase}`));
      await api.pause(PHRASE_INPUT_INTERVAL);
    })();
  }
}

export const importRecoveryPhrase = new ImportRecoveryPhrase();
