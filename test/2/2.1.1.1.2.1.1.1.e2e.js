describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.2.1.1.1  - 点击 后一步
  check url = 2.1.1.1.2.1 url`, async () => {
    await play(`2.1.1.1.2.1.1.1`, {}, (context) => {
      //console.log('最终的上下文:', context);
    });
  });
});
