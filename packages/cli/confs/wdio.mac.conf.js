import { config as base } from './wdio.conf.js';
import { isFirstRun } from '../utils/firstLock.js';

export const config = {
  ...base,
  runner: 'local',
  port: process.env.APPIUM_PORT || 4723,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.APPIUM_DEVICENAME,
      'appium:appPackage': process.env.APPIUM_APPPACKAGE,
      'appium:appActivity': process.env.APPIUM_APPACTIVITY,
      // 'appium:app': process.env.APPIUM_APP,
      'appium:waitForIdleTimeout': 1000,
      'appium:newCommandTimeout': 86400,
      // 设置以下 capabilities 以避免重新安装
      'appium:noReset': true, // 不重置应用状态
      'appium:fullReset': false, // 不进行完全重置（不重新安装应用）
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
    if (isFirstRun()) {
      await browser.execute('mobile: installApp', {
        appPath: process.env.APPIUM_APP,
      });
      await browser.execute('mobile: activateApp', {
        appId: process.env.APPIUM_APPPACKAGE,
      });
    }
    await base.before(capabilities, specs, browser);
  },
  after: async function(result, capabilities, specs) {
    try {
      // 关闭应用
      await browser.execute('mobile: terminateApp', {
        appId: process.env.APPIUM_APPPACKAGE,
      });
    } catch (error) {
      console.error('Error during cleanup: ', error);
    }
    await base.after(result, capabilities, specs);
  },
};
//cli/index.js test --platform android --framework wdio  --test-case ./test/recording.e2e.js
