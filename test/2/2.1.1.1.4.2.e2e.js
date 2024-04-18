describe(`# 2.* 发现页`, () => {
  it(`2.1.1.1.4.2 - reload
  关闭 option 
  滚动页面 
  记录位置
  点击 option
  点击 reload
   check 位置`, async () => {
    await play(`2.1.1.1.4.2`, {}, (context) => {
      //console.log('最终的上下文:', context);
    });
  });
});
