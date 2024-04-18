describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.4.6  - 打开浏览器`, async () => {
    await platformChain
      .ios()
      .android()
      .run(async () => {
        await play(`2.1.1.1.4.6`, {}, (context) => {});
      });
  });
});
