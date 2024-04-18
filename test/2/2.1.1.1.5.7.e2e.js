describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.5.7 - close all 
  多 tab时
  check tab count = 0`, async () => {
    await platformChain
      .ios()
      .android()
      .run(async () => {
        await play(`2.1.1.1.5.7`, {}, (context) => {
          //console.log('最终的上下文:', context);
        });
      });
  });
});
