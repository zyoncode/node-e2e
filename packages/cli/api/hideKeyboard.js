import { detectPlatform, PLATFORMS } from '../utils/detectPlatform.js';
import by from './by.js';

const hideKeyboard = async (platform = detectPlatform()) => {
  const isKeyboardShown = browser.isKeyboardShown();
  if (isKeyboardShown) {
    try {
      if (platform === PLATFORMS.android) {
        await browser.hideKeyboard();
      }
      if (platform === PLATFORMS.ios) {
        await api.tap(api.by.xpath(`//XCUIElementTypeButton[@name="Done"]`));
      }
    } catch (error) {}
  }
};

export default hideKeyboard;
