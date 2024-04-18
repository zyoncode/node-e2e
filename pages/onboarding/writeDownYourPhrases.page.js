import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';
import util from '../../util/index.js';

class WriteDownYourPhrasesPage extends Page {
  get keyElement() {
    return this.confirmBtn;
  }
  get phrasePrefix() {
    return 'phrase-index';
  }
  get confirmBtn() {
    return api.by.id('saved-the-phrase');
  }
  async clickConfirmBtn() {
    await api.tap(this.confirmBtn);
  }
  async getPhrases(length = 12) {
    const phrases = [];
    await util.forEachAsync(new Array(length).fill(' '), async (_, index) => {
      const text = await api.getText(
        api.by.id(`${this.phrasePrefix}${index}`),
        false,
      );
      phrases.push(text);
    })();
    return phrases;
  }
}

export const writeDownYourPhrasesPage = new WriteDownYourPhrasesPage();
