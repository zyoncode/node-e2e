describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.5.5 - 点击关闭 单一 tab
  当有多个 tab时
  check tab = n-1`, async () => {
    await play(`2.1.1.1.5.5`, {}, (context) => {
      //console.log('最终的上下文:', context);
    });
  });
});
