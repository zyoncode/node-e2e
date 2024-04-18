import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';

class BeforeYouProceedPage extends Page {
  get keyElement() {
    return this.confirmBtn;
  }
  get confirmBtn() {
    return api.by.id('show-recovery-phrase');
  }
  async clickConfirmBtn() {
    await api.tap(this.confirmBtn);
  }
}

export const beforeYouProceedPage = new BeforeYouProceedPage();
