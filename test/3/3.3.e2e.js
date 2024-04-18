import { api } from '@node-e2e/cli/api/index.js';
import play from '@node-e2e/cli/services/composer/core/play.js';

describe(`设置页面 - 偏好 - 设置语言 `, () => {
  const langs = [
    { 'title': 'English', 'value': 'en-US' },
    { 'title': '简体中文', 'value': 'zh-CN' },
  ];

  const checkPoint = {
    'setting-data-clear-cache-on-app-title-primary': {
      'en-US': 'Clear All Cache on App',
      'zh-CN': '清除 App 上的所有缓存',
    },
    'setting-data-clear-cache-on-browser-title-primary': {
      'en-US': 'Clear Cache of Web Browser',
      'zh-CN': '清除 Web 浏览器的缓存',
    },
    'setting-data-download_log-title-primary': {
      'en-US': 'State Logs',
      'zh-CN': '状态日志',
    },
  };

  before(async () => {
    await api.resetApp();
    await api.activeApp();
  });

  it(`OK-25294 默认语言`, async () => {
    await play('3.2.2', {}, async context => {
      const lang = context.getStore('3.2.2', 'currentLangText');
      await expect(lang).toEqual('Auto');
    });
  });

  for (let index = 0; index < langs.length; index++) {
    const lang = langs[index];

    it(`OK-25297 修改语言-${lang.title}`, async () => {
      await play(`3.2.1.1.2`, { lang }, async context => {
        for (let j = 0; j < Object.keys(checkPoint).length; j++) {
          const key = Object.keys(checkPoint)[j];
          const text = await api.getText(key);
          await expect(text).toEqual(checkPoint[key][lang.value]);
        }
      });
      await api.pause(1000);
    });
  }

  it(`OK-25296 默认语言-修改系统语言`, async () => {
    // 暂时只能启动时修改语言
    await play(`3.2.2`, {}, async context => {
      const lang = context.getStore('3.2.2', 'currentLangText');
      await expect(lang).toEqual('Auto');
    });
  });

  it(`OK-25298 取消设置语言`, async () => {
    await play(`3.2.1.1.1`, {}, async context => {
      await api.pause(3000);
      const current = await api.getText(
        'setting-preference-language-current-primary',
      );
      const lang = context.getStore('3.2.2', 'currentLangText');

      await expect(lang).toEqual(current);
    });
  });

  afterEach(async () => {
    await api.tap($(api.by.id(`nav-header-close`)));
  });
});
