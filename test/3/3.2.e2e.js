describe(`设置页面 - 偏好 - 设置语言 `, () => {
  it(`OK-25296 默认语言-修改系统语言`, async () => {
    // 暂时只能启动时修改语言
    await play(`3.2.2`, {}, async context => {
      const lang = context.getStore('3.2.2', 'currentLangText');
      await expect(lang).toEqual('Auto');
    });
  });
});
