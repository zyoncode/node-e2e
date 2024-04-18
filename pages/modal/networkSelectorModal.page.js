import { api } from '@node-e2e/cli/api/index.js';

import Popover from './popover.js';

class NetworkSelectorModal extends Popover {
  async keyElement() {
    return api.by.id('network-selector-input');
  }
  async selectNetworkById(id) {
    try {
      await api.tap(api.by.id(`select-item-${id}`));
    } catch (error) {}
  }
}

export const networkSelectorModal = new NetworkSelectorModal();
