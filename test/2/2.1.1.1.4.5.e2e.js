describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.4.5 - 分享`, async () => {
    await platformChain
      .ios()
      .android()
      .run(async () => {
        await play(`2.1.1.1.4.5`, {}, (context) => {});
      });
  });
});
