import { api } from '@node-e2e/cli/api/index.js';

import Page from './base.js';

class ScanPage extends Page {
  get photoBtn() {
    return api.by.id('scan-open-photo');
  }

  get firstImage() {
    return api.by.xpath(
      '(//android.widget.ImageView[@resource-id="com.android.providers.media.module:id/icon_thumbnail"])[1]',
    );
  }

  async clickOpenPhoto() {
    await api.tap(this.photoBtn);
  }

  async selectFirstImage() {
    await api.tap(this.firstImage);
  }
}

export const scanPage = new ScanPage();
