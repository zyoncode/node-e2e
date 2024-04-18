import { api } from '@node-e2e/cli/api/index.js';
describe(`设置页面 - 偏好 - 设置语言 `, () => {
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
  
});
