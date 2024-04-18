import { api } from '@node-e2e/cli/api/index.js';

describe(`设置页面 - 偏好 - 设置语言 `, () => {
  before(async () => {});

  it(`OK-25296 默认语言-修改系统语言`, async () => {
    await api.resetApp();
  });
});
