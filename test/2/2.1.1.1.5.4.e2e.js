describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.5.4 - 点击  关闭 单一tab
  当 只有一个 tab 时
  check tab count =0`, async () => {
    await play(`2.1.1.1.5.4`, {}, (context) => {
      //console.log('最终的上下文:', context);
    });
  });
});
