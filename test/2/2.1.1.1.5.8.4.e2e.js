describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.5.8.4 - share`, async () => {
    await platformChain
      .ios()
      .android()
      .run(async () => {
        await play(`2.1.1.1.5.8.4`, {}, (context) => {
          //console.log('最终的上下文:', context);
        });
      });
  });
});
