import { config as base } from './wdio.conf.js';
import { isFirstRun } from '../utils/firstLock.js';

export const config = {
  ...base,
  runner: 'local',
  port: process.env.APPIUM_PORT || 4723,
  capabilities: [
    {
      // capabilities for local Appium web tests on iOS
      'platformName': 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:platformVersion': process.env.APPIUM_PLATFORMVERSION,
      'appium:xcodeOrgId': process.env.APPIUM_XCODEORGID,
      'appium:bundleId': process.env.APPIUM_BUNDLEID,
      'appium:udid': process.env.APPIUM_UDID,
      'appium:app': process.env.APPIUM_APP,
      'appium:includeSafariInWebviews': true,
      // 'appium:waitForQuiescence': false,
      'appium:appInstallStrategy': 'ios-deploy',
      'appium:waitForIdleTimeout': 1,
      'appium:newCommandTimeout': 86400,
      'appium:snapshotMaxDepth': 62,
      // 'appium:usePrebuiltWDA': true,
      // 'appium:prebuiltWDAPath': process.env.WDA_PATH,
      'appium:language': 'en',
      'appium:locale': 'US',
      // 'appium:noReset': true,
      // 'appium:fullReset': false,
      'appium:updatedWDABundleId': 'so.onekey.WebDriverAgentRunner',
    },
  ],
  services: base.services.concat([
    [
      'appium',
      {
        args: {
          port: parseInt(process.env.APPIUM_PORT),
          allowInsecure: ['chromedriver_autodownload'],
        },
        command: 'appium',
      },
    ],
  ]),
  before: async function(capabilities, specs, browser) {
    // if (isFirstRun()) {
    //   await browser.execute('mobile: installApp', {
    //     app: process.env.APPIUM_APP,
    //     // strategy: 'parallel',
    //   });
    //   await browser.execute('mobile: launchApp', {
    //     bundleId: process.env.APPIUM_BUNDLEID,
    //   });
    // }

    await base.before(capabilities, specs, browser);
  },
  after: async function(result, capabilities, specs) {
    try {
      // 关闭应用
      await browser.execute('mobile: terminateApp', {
        bundleId: process.env.APPIUM_BUNDLEID,
      });
    } catch (error) {
      console.error('Error during cleanup: ', error);
    }
    await base.after(result, capabilities, specs);
  },
};
