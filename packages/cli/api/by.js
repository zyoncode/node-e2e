import { detectPlatform, PLATFORMS } from '../utils/detectPlatform.js';

const by = {
  id(str, element = { $ }, platform = detectPlatform()) {
    if (platform === PLATFORMS.ios) {
      return element.$(`~${str}`);
    }
    if (platform === PLATFORMS.android) {
      return element.$(`//*[@resource-id="${str}"]`);
      // return element.$(`id:${str}`);
    }
    return element.$(`[data-testid='${str}']`);
  },
  idStartWith(str, element = { $ }, platform = detectPlatform()) {
    if (platform === PLATFORMS.android) {
      return element.$(`//*[starts-with(@resource-id, "${str}")]`);
    }
    if (platform === PLATFORMS.ios) {
      return element.$(`//*[starts-with(@name, "${str}")]`);
    }
    return element.$(`[data-testid^='${str}']`);
  },
  idsStartWith(str, element = { $$ }, platform = detectPlatform()) {
    if (platform === PLATFORMS.android) {
      return element.$$(`//*[starts-with(@resource-id, "${str}")]`);
    }
    if (platform === PLATFORMS.ios) {
      return element.$$(`//*[starts-with(@name, "${str}")]`);
    }
    return element.$$(`[data-testid^='${str}']`);
  },
  xpath(str, element = { $ }) {
    return element.$(str);
  },
};

export default by;
