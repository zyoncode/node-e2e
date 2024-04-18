import fs from 'node:fs';
import { api } from '@node-e2e/cli/api/index.js';

import {
  detectPlatform,
  PLATFORMS,
} from '@node-e2e/cli/utils/detectPlatform.js';

import util, { executeByPlatform, forEachAsync } from '../util/index.js';

const currentPlatform = detectPlatform();

export default class Page {
  constructor() {
    const _ = this;
    return new Proxy(_, {
      get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
          return async function(...args) {
            const className = target.constructor.name; // 获取类名
            const argsStr = args.map(arg => JSON.stringify(arg)).join(', ');

            const fucName = `${className}-${prop}`;
            const stepName = `# ${fucName} with args: ${argsStr}`;
            try {
              let result;
              await api.reporter.step(stepName, async () => {
                result = await target[prop].apply(_, args);
                await _.collectPerfData(fucName, 'end');
              });

              // if (
              //   currentPlatform === PLATFORMS.ios ||
              //   currentPlatform === PLATFORMS.android
              // ) {
              //   const res = await driver.compareScreen(`${className}/${prop}`);
              //   if (res.misMatchPercentage > 0 && res.baselineImageCreated) {
              //     api.reporter.addAttachment(
              //       'Baseline Image',
              //       fs.readFileSync(`${res.folders.baseline}/${res.fileName}`),
              //       'image/png',
              //     );
              //     api.reporter.addAttachment(
              //       'Diff Image',
              //       fs.readFileSync(`${res.folders.diff}/${res.fileName}`),
              //       'image/png',
              //     );
              //   }
              //   if (res.baselineImageCreated) {
              //     await expect(res.misMatchPercentage).toEqual(0);
              //   }
              // }

              return result;
            } catch (error) {
              console.error(`Error in ${prop}: ${error.message}`);
              throw error;
            }
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }
  get home() {
    return api.by.id('home');
  }

  get lockPasswordInput() {
    return api.by.id('enter-password');
  }
  get verifyingPasswordBtn() {
    return api.by.id('verifying-password');
  }

  get backIcon() {
    return api.by.id('nav-header-back');
  }
  get closeIcon() {
    return api.by.id('nav-header-close');
  }
  get devButton() {
    return api.by.id('dev-button');
  }

  get footerConfirmBtn() {
    return api.by.id('page-footer-confirm');
  }

  async goBack() {
    await api.platformChain
      .android()
      .ios()
      .run(async () => {
        await api.tap(this.backIcon);
      });

    await api.platformChain
      .not()
      .android()
      .ios()
      .run(async () => {
        await api.tap($('[data-testid="nav-header-back"]:last-of-type'));
      });
  }

  async close() {
    await api.tap(this.closeIcon);
  }

  async clickFooterConfirmBtn() {
    await api.tap(this.footerConfirmBtn);
  }

  async inputPassword(pass) {
    await api.setValue(this.lockPasswordInput, pass);
  }

  async clickVerifyingPasswordBtn() {
    await api.tap(this.verifyingPasswordBtn);
  }

  async unlockAppByPassword(pass) {
    await this.inputPassword(pass);
    await this.clickVerifyingPasswordBtn();
  }
  async clickDevBtn() {
    await api.tapOnDevBtn('dev-button');
  }

  async restart() {
    await api.restartApp();
  }
  async toHomePage() {
    await api.tapOnDevBtn('dev-button');
    await api.platformChain.ext().run(async () => {
      await api.pause(1000);
    });
    await api.tapOnDevBtn('open-home-page');
  }
  async toSettingPage() {
    await api.hideKeyboard();
    await api.tap(api.by.id('dev-button'));
    await api.tapOnDevBtn('open-home-page');
    await api.tap(api.by.id('dev-button'));
    await api.tap(api.by.id('open-settings-page'));
  }

  async waitEntryPage() {
    if (this.keyElement) {
      await api.waitPageByElement(this.keyElement);
    } else {
      await api.pause(600);
    }
  }

  async assertCurrentPage() {
    if (this.keyElement) {
      await this.keyElement.isDisplayed();
    }
  }
  async expectNavToHomePage() {
    await api.platformChain
      .not()
      .ios()
      .run(async () => await this.home.waitForDisplayed({ timeout: 10000 }));

    await api.platformChain
      .ios()
      .run(async () => await this.home.waitForExist({ timeout: 20000 }));
  }

  async collectPerfData(name, prefix) {
    await api.platformChain
      .android()
      .run(async () => {
        const types = await browser.getPerformanceDataTypes();
        await util.forEachAsync(types, async currentType => {
          const perfData = await browser.getPerformanceData(
            process.env.APPIUM_APPPACKAGE,
            currentType,
            5,
          );
          await api.globalStore.updatePerfData(
            `${currentPlatform}:${currentType}`,
            `${name}:${prefix}`,
            perfData,
          );
        })();
      })
      .catch(e => console.log(e.message));
  }
}
