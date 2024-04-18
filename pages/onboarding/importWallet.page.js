import { api } from '@node-e2e/cli/api/index.js';
import Page from '../base.js';

class ImportWalletPage extends Page {
  get keyElement() {
    return this.importRecoveryPhraseBtn;
  }
  get importRecoveryPhraseBtn() {
    return api.by.id('import-recovery-phrase');
  }
  get importPrivatekeyBtn() {
    return api.by.id('import-private-key');
  }
  get importAddressBtn() {
    return api.by.id('import-address');
  }
  get importAddressBtn() {
    return api.by.id('import-address');
  }
  get securityAlertAcknowledgedBtn() {
    return api.by.id('acknowledged');
  }
  get connectHardWareWalletBtn() {
    return api.by.id('hardware-wallet');
  }
  async clickSecurityAlertAcknowledgedBtn() {
    await api.tap(this.securityAlertAcknowledgedBtn);
  }
  async clickConnectHardWareWalletBtn() {
    await api.tap(this.connectHardWareWalletBtn);
  }

  async clickImportRecoveryPhraseBtn() {
    await api.tap(this.importRecoveryPhraseBtn);
  }

  async clickImportPrivatekeyBtn() {
    await api.tap(this.importPrivatekeyBtn);
  }
  async clickImportAddressBtn() {
    await api.tap(this.importAddressBtn);
  }
}

export const importWalletPage = new ImportWalletPage();
